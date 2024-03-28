import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     user: null,
//     isLoggedIn: false,
//     isLoading: false,
//     error: null,
//   };

// export const userSlice = createSlice({
    export const user = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  },
   
  reducers: {
    loginStart(state) {
        state.isLoading = true;
        state.error = null;
      },
      loginSuccess(state, action) {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.error = null;
      },
      loginFailure(state, action) {
        state.isLoading = false;
        state.error = action.payload;
      },
      logout(state) {
        state.isLoggedIn = false;
        state.user = null;
      },
  },
})

export default user

// export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
// export default userSlice.reducer
// export const { loginStart, loginSuccess, loginFailure, logout } = user.actions;
// export default user.reducer