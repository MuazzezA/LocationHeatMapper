import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: undefined,
  user: {},
  token: '',
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = action.payload ? true : false;
      state.user = action.payload;
    },
    updateAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    reset: state => {
      state.isAuthenticated = false;
      state.user = {};
      state.token = '';
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {reset, login, updateAuthenticated} = userSlice.actions;

export default userSlice.reducer;
