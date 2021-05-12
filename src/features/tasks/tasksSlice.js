import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { getDateToday } from '../../helpers';

const initialState = [];

export const fetchTasks = createAsyncThunk('firebase/fetchTasks', async () => {
  const response = await db
    .collection('tasks')
    .where('isCompleted', '==', false)
    .orderBy('dateCreated')
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });

  return response;
});

export const addTask = createAsyncThunk('firebase/addTask', async (task) => {
  const response = await db
    .collection('tasks')
    .add(task)
    .then((docRef) => docRef.get())
    .then((doc) => ({ id: doc.id, ...doc.data() }));

  return response;
});

export const completeTask = createAsyncThunk('firebase/completeTask', async (taskId) => {
  await db.collection('tasks').doc(taskId).update({
    isCompleted: true,
  });

  return taskId;
});

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTasks.fulfilled]: (state, action) => {
      state.push(...action.payload);
    },
    [addTask.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [completeTask.fulfilled]: (state, action) => {
      state.forEach((task) => {
        if (task.id === action.payload) task.isCompleted = true;
      });
    },
  },
});

export const selectTasks = (state) => state.tasks;
export const selectCompletedTasks = (state) => state.tasks.filter((task) => task.isCompleted);
export const selectPendingTasks = (state) => state.tasks.filter((task) => !task.isCompleted);
export const selectPendingTasksToday = (state) => state.tasks.filter((task) => {
  
  if( task.dueDate === '' || task.dueDate === undefined || task.isCompleted) return false;
 
  const date = new Date(task.dueDate);
  const filterStart = (new Date()).setHours(0,0,0);
  const filterEnd = new Date();

  console.log(date, filterStart, filterEnd);

  return ( date >= filterStart && date <= filterEnd);
});

export const selectUpcomingTasks = (state) => state.tasks.filter((task) => {
  if( task.dueDate === '' || task.dueDate === undefined || task.isCompleted) return false;

  const date = new Date(task.dueDate);
  const filterStart = (new Date()).setHours(24,60,60);

  return (date >= filterStart);
});

// export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;
