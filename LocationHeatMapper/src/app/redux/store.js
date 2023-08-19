import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slice/user-slice';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
