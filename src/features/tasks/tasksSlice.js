import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import firebase from 'firebase';

const initialState = [];

export const fetchTasksAsync = createAsyncThunk('firebase/fetchTasks', async () => {
  let result = [];

  await db
    .collection('tasks')
    .get()
    .then((snapshot) => {
      result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });

  return result;
});

export const addTaskAsync = createAsyncThunk('firebase/addTask', async (task) => {
  // const doc = await db
  //   .collection('tasks')
  //   .add(task)
  //   .then((docRef) => docRef.get());
  // const doc = await result.then( )
  // return await result;
});

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: {
    [fetchTasksAsync.fulfilled]: (state, action) => {
      state.push(...action.payload);
    },
    [addTaskAsync.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;
