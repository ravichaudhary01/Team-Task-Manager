import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axios';

const initialState = {
  projects: [],
  project: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const getProjects = createAsyncThunk('projects/getAll', async (_, thunkAPI) => {
  try {
    const response = await API.get('/projects');
    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getProject = createAsyncThunk('projects/getOne', async (id, thunkAPI) => {
  try {
    const response = await API.get(`/projects/${id}`);
    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createProject = createAsyncThunk('projects/create', async (projectData, thunkAPI) => {
  try {
    const response = await API.post('/projects', projectData);
    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.project = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      });
  },
});

export const { reset } = projectSlice.actions;
export default projectSlice.reducer;
