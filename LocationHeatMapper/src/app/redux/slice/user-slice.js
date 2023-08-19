import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
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
      state.user = action.payload;
      state.isAuthenticated = true;
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

export const {reset, login} = userSlice.actions;

export default userSlice.reducer;
