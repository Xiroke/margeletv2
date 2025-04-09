import { configureStore } from '@reduxjs/toolkit';
import group from '@/entities/group/model/slice';

const store = configureStore({
  reducer: { group },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
