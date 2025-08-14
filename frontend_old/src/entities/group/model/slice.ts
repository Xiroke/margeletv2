import { createSlice } from "@reduxjs/toolkit";

interface GroupState {
  id: string | null;
  title: string | null;
  search_query: string | null;
  avatar_path: string | null;
  panorama_path: string | null;
}

const initialState: GroupState = {
  id: null,
  title: null,
  search_query: null,
  avatar_path: null,
  panorama_path: null,
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroupData: (
      state,
      action: { payload: { id: string | null; title: string | null } }
    ) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
    },

    setSearchQuery: (state, action: { payload: string }) => {
      state.search_query = action.payload;
    },

    setAvatarPath: (state, action: { payload: string | null }) => {
      state.avatar_path = action.payload;
    },

    setPanoramaPath: (state, action: { payload: string | null }) => {
      state.panorama_path = action.payload;
    },
  },
});

export const { setGroupData, setSearchQuery, setAvatarPath, setPanoramaPath } =
  groupSlice.actions;

export default groupSlice.reducer;
