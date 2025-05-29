import { configureStore } from "@reduxjs/toolkit";
import group from "@/entities/group/model/slice";
import chat from "@/entities/chat/model/slice";
import accessToken from "@/features/auth/model/slice";

const store = configureStore({
  reducer: { group, chat, accessToken },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
