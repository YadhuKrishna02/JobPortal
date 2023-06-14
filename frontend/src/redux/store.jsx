import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import recruiterReducer from './recruiter/recruiterSlice';
import jobReducer from './recruiter/jobSlice';
import appliedJobReducer from './user/jobSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    // Handle potential errors while saving
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    users: userReducer,
    recruiters: recruiterReducer,
    jobs: jobReducer,
    appliedJobs: appliedJobReducer,
  },

  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
