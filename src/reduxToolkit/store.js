import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import githubRepoReducer from './slices/githubRepoSlice';


const store = configureStore({
  reducer: {
     // Add all reducer here
     login:loginReducer,
     githubRepo: githubRepoReducer,
  },
});

export default store;