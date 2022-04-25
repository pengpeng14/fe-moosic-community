import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostData } from "./../interfaces/post/Posts";
import { RootState } from "./../store";

interface favouritePostsState {
  posts: PostData[];
}

interface IAddFavouritePosts {
  posts: PostData[];
  id: string;
}

const initialState: favouritePostsState = {
  posts: [],
};

export const favouritePotsSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    defaultFavouritePosts: (
      state: favouritePostsState,
      posts: PayloadAction<PostData[]>
    ) => {
      return { ...state, posts: [...posts.payload] };
    },
    addFavouritePost: (
      state: favouritePostsState,
      data: PayloadAction<IAddFavouritePosts>
    ) => {
      const post: PostData[] = data.payload.posts.filter(
        (post) => post.post.id === data.payload.id
      );
      return { ...state, posts: [post[0], ...state.posts] };
    },
    removeFavouritePost: (
      state: favouritePostsState,
      id: PayloadAction<string>
    ) => {
      const remainPosts = state.posts.filter(
        (post) => post.post.id !== id.payload
      );
      return { ...state, posts: [...remainPosts] };
    },
    updateLikeFavouritePost: (
      state: favouritePostsState,
      id: PayloadAction<string>
    ) => {
      for (let post of state.posts) {
        if (post.post.id === id.payload) {
          post.post.likeCount = post.liked
            ? post.post.likeCount - 1
            : post.post.likeCount + 1;
          post.liked = !post.liked;
          break;
        }
      }
      return state;
    },
  },
});

export const {
  defaultFavouritePosts,
  addFavouritePost,
  removeFavouritePost,
  updateLikeFavouritePost,
} = favouritePotsSlice.actions;
export const selectFavouritePosts = (state: RootState) => state.favouritePosts;
export default favouritePotsSlice.reducer;
