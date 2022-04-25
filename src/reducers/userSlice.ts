import { User } from "./../interfaces/user/UserProfile";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./../store";

const initialState: User = {
  id: "",
  displayName: "",
  username: "",
  email: "",
  bio: "",
  photoUrl: "",
  genres: [],
  active: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state: User, user: PayloadAction<User>) => {
      return { ...state, ...user.payload };
    },
    updateUserBio: (state: User, bio: PayloadAction<string>) => {
      // get field name
      // pass as key- value pair
      return { ...state, bio: bio.payload };
    },
    updateUserUsername: (state: User, username: PayloadAction<string>) => {
      return { ...state, username: username.payload };
    },
    updateUserGenres: (state: User, genres: PayloadAction<string[]>) => {
      return { ...state, genres: genres.payload };
    },
    resetuserState: (state: User) => {
      return { ...state, ...initialState };
    },
  },
});

export const {
  setUserData,
  updateUserBio,
  resetuserState,
  updateUserGenres,
  updateUserUsername,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
