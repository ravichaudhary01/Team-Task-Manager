import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axios';

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const getUsers = createAsyncThunk('admin/getUsers', async (_, thunkAPI) => {
  try {
    const response = await API.get('/admin/users');
    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateUserRole = createAsyncThunk('admin/updateRole', async ({ id, role }, thunkAPI) => {
  try {
    const response = await API.put(`/admin/user/${id}/role`, { role });
    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteUser = createAsyncThunk('admin/deleteUser', async (id, thunkAPI) => {
  try {
    await API.delete(`/admin/user/${id}`);
    return id;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
