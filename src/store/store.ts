import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import tasksSlice from './slice/taskSliceReducer';
import sessionSlice from './slice/sessionSliceReducer';


export const makeStore = () => {
  return configureStore({
    reducer: {
      session: sessionSlice,
      tasks: tasksSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Custom hooks for using dispatch and selector with types
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


