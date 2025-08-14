import { createSlice } from '@reduxjs/toolkit';

interface ChatState {
  id: string | null;
}

const initialState: ChatState = {
  id: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setChatId } = chatSlice.actions;

export default chatSlice.reducer;
