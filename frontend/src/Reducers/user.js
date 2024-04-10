import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    isLoading: false,
    error: null,
    username: null,
    id: null,
  },

  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload;
      console.log("username", store.username);
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setId: (store, action) => {
      store.id = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export default user;


