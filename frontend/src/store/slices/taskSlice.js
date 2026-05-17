import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axios';

const initialState = {
  tasks: [],
  task: null,
  stats: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const getTasks = createAsyncThunk('tasks/getAll', async (params, thunkAPI) => {
  try {
    const response = await API.get('/tasks', { params });
    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createTask = createAsyncThunk('tasks/create', async (taskData, thunkAPI) => {
  try {
    const response = await API.post('/tasks', taskData);
    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateTask = createAsyncThunk('tasks/update', async ({ id, taskData }, thunkAPI) => {
  try {
    const response = await API.put(`/tasks/${id}`, taskData);
    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
  try {
    await API.delete(`/tasks/${id}`);
    return id;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getTaskStats = createAsyncThunk('tasks/getStats', async (_, thunkAPI) => {
  try {
    const response = await API.get('/tasks/stats');
    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTaskStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTaskStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stats = action.payload;
      })
      .addCase(getTaskStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
