import { createSlice } from '@reduxjs/toolkit';

interface GroupState {
  id: string | null;
}

const initialState: GroupState = {
  id: null,
};

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroupId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setGroupId } = groupSlice.actions;

export default groupSlice.reducer;
