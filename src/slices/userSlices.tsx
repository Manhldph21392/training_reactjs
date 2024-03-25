import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    // Các reducers khác nếu có
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
