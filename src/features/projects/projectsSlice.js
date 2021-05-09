import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase';

const initialState = [];

export const fetchProjects = createAsyncThunk('firebase/fetchProjects', async () => {
  const response = await db
    .collection('projects')
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

export const addProject = createAsyncThunk('firebase/addProject', async (project) => {
  const response = await db
    .collection('projects')
    .add(project)
    .then((docRef) => docRef.get())
    .then((doc) => ({ id: doc.id, ...doc.data() }));

  return response;
});

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProjects.fulfilled]: (state, action) => {
      state.push(...action.payload);
    },
    [addProject.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const selectProjects = (state) => state.projects;
export default projectsSlice.reducer;
