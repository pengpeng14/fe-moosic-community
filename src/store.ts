import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./reducers/musicSlice";
import userReducer from "./reducers/userSlice";
import postsReducer from "./reducers/postsSlice";
import profileReducer from "./reducers/profileSlice";
import userPostsReducer from "./reducers/userPostSlice";
import createPostBoxReducer from "./reducers/createPostBoxSlice";
import spotifyDialogueReducer from "./reducers/spotifyDialogueSlice";
import favouritePostsReducer from "./reducers/favouritePostsSlice";
import viewPostsReducer from "./reducers/viewPostsSlice";
import resultCardReducer from "./reducers/resultCardSlice";
import editPostBoxReducer from "./reducers/editPostBoxSlice";
import exportPostBoxReducer from "./reducers/exportBoxSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    music: musicReducer,
    posts: postsReducer,
    profile: profileReducer,
    userPosts: userPostsReducer,
    createPostBox: createPostBoxReducer,
    spotifyDialog: spotifyDialogueReducer,
    favouritePosts: favouritePostsReducer,
    profilePostView: viewPostsReducer,
    resultCard: resultCardReducer,
    editPostBox: editPostBoxReducer,
    exportPostBox: exportPostBoxReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
