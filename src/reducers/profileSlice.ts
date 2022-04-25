import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./../interfaces/user/UserProfile";
import { RootState } from "./../store";

interface Profile {
  user: User;
  postPage: Page;
  moodPage: Page;
  favPage: Page;
  playlistPage: Page;
}

interface Page {
  currentPage: number;
  total: number;
}

const SetPage = {
  currentPage: 0,
  total: 1,
};

const initialState: Profile = {
  user: {
    id: "",
    displayName: "",
    username: "",
    email: "",
    bio: "",
    photoUrl: "",
    genres: [],
    active: false,
  },

  postPage: SetPage,
  moodPage: SetPage,
  favPage: SetPage,
  playlistPage: SetPage,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state: Profile, data: PayloadAction<User>) => {
      // if (data.payload === undefined) return;
      return { ...state, user: data.payload };
    },
    setPostPage: (state: Profile, data: PayloadAction<Page>) => {
      return {
        ...state,
        postPage: {
          currentPage: data.payload.currentPage,
          total: data.payload.total,
        },
      };
    },
    setMoodPage: (state: Profile, data: PayloadAction<Page>) => {
      return {
        ...state,
        moodPage: {
          currentPage: data.payload.currentPage,
          total: data.payload.total,
        },
      };
    },
    setFavoritePage: (state: Profile, data: PayloadAction<Page>) => {
      return {
        ...state,
        favPage: {
          currentPage: data.payload.currentPage,
          total: data.payload.total,
        },
      };
    },
    setPlaylistPage: (state: Profile, data: PayloadAction<Page>) => {
      return {
        ...state,
        playlistPage: {
          currentPage: data.payload.currentPage,
          total: data.payload.total,
        },
      };
    },
    clearProfileData: (state: Profile) => {
      return { ...state, user: initialState.user };
    },
    clearAllPage: (state: Profile) => {
      return {
        ...state,
        postPage: { currentPage: 0, total: 1 },
        moodPage: { currentPage: 0, total: 1 },
        favPage: { currentPage: 0, total: 1 },
        playlistPage: { currentPage: 0, total: 1 },
      };
    },
    clearPlaylistPage: (state: Profile) => {
      return {
        ...state,
        playlistPage: { currentPage: 0, total: 1 },
      };
    },
    clearPostPage: (state: Profile) => {
      return {
        ...state,
        postPage: { currentPage: 0, total: 1 },
      };
    },
    clearMoodPage: (state: Profile) => {
      return {
        ...state,
        moodPage: { currentPage: 0, total: 1 },
      };
    },
    clearFavPage: (state: Profile) => {
      return {
        ...state,
        favPage: { currentPage: 0, total: 1 },
      };
    },
    updateProfileGenres: (state: Profile, data: PayloadAction<User>) => {
      return {
        ...state,
        user: data.payload,
      };
    },
  },
});

export const {
  setFavoritePage,
  setMoodPage,
  setProfileData,
  setPlaylistPage,
  setPostPage,
  clearAllPage,
  clearProfileData,
  clearFavPage,
  clearMoodPage,
  clearPlaylistPage,
  clearPostPage,
  updateProfileGenres,
} = profileSlice.actions;

export const selectVisitedProfile = (state: RootState) => state.profile;

export const selectPlaylistPage = (state: RootState) =>
  state.profile.playlistPage;

export const selectPostPage = (state: RootState) => state.profile.postPage;

export const selectMoodPostPage = (state: RootState) => state.profile.moodPage;

export const selectFavoritePostPage = (state: RootState) =>
  state.profile.favPage;

export default profileSlice.reducer;
