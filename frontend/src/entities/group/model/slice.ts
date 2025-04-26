import { createSlice } from '@reduxjs/toolkit';

interface GroupState {
  id: string | null;
  title: string | null;
}

const initialState: GroupState = {
  id: null,
  title: null,
};

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroupData: (state, action: { payload: { id: string; title: string } }) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
    },
  },
});

export const { setGroupData } = groupSlice.actions;

export default groupSlice.reducer;
