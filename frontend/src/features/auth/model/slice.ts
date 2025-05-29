import { createSlice } from "@reduxjs/toolkit";

interface AccessTokenState {
  token: string | null;
}

const initialState: AccessTokenState = {
  token: null,
};

export const accessTokenSlice = createSlice({
  name: "access_token",
  initialState,
  reducers: {
    setAccessToken: (state, action: { payload: string }) => {
      state.token = action.payload;
    },
  },
});

export const { setAccessToken } = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
