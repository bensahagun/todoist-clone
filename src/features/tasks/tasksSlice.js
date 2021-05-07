import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase';

const initialState = [];

export const fetchTasks = createAsyncThunk('firebase/fetchTasks', async () => {
  const response = await db
    .collection('tasks')
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

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // addTask: (state, action) => {
    //   state.push(action.payload);
    // },
  },
  extraReducers: {
    [fetchTasks.fulfilled]: (state, action) => {
      state.push(...action.payload);
    },
    [addTask.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
  },
});

// export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;
