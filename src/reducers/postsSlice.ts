import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Posts, PostData, PostDataFeed } from "./../interfaces/post/Posts";
import { Playlist } from "../interfaces/post/PlaylistAnalyze";
import post from "../services/post";

export interface PostsState {
  page: number;
  totalPage: number;
  count: number;
  posts: PostData[];
  topPosts: PostData[];
}

const initialState: PostsState = {
  page: -1,
  totalPage: -1,
  count: -1,
  posts: [],
  topPosts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPostsData: (state: PostsState, data: PayloadAction<PostsState>) => {
      const updated = { ...state, ...data.payload };

      return { ...state, ...updated };
    },
    getPosts: (state: PostsState) => {},
    addPost: (state: PostsState, data: PayloadAction<PostData>) => {
      console.log("New Data: ", data);
      console.log("prev data: ", state);
      const inserted = { ...state, posts: [data.payload, ...state.posts] };
      // inserted.posts.pop();
      return { ...state, ...inserted };
    },
    deletePost: (state: PostsState, id: PayloadAction<string>) => {
      console.log("post id: ", id.payload);
      console.log(state.posts);
      const remainPosts = state.posts.filter(
        (post) => post.post.id !== id.payload
      );
      const updated = { ...state, posts: [...remainPosts] };

      return { ...state, ...updated };
    },
    updatePost: (state: PostsState, data: PayloadAction<PostData>) => {
      const remainPosts = state.posts.filter(
        (post) => post.post.id !== data.payload.post.id
      );
      const updated = { ...state, posts: [data.payload, ...remainPosts] };

      return { ...state, ...updated };
    },
    updateLikePost: (state: PostsState, id: PayloadAction<string>) => {
      // let pos = -1;
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
    addNewPagePosts: (state: PostsState, data: PayloadAction<PostsState>) => {
      // prevent from duplicate data
      if (state.posts.length && state.page === data.payload.page) {
        return { ...state };
      }
      const updated = {
        ...state,
        count: state.count + data.payload.count,
        totalPage: data.payload.totalPage,
        page: data.payload.page,
        posts: [...state.posts, ...data.payload.posts],
        // topPosts: [...data.payload.topPosts],
      };
      return { ...state, ...updated };
    },
    resetPostsState: (state: PostsState) => {
      return { ...state, ...initialState };
    },
    updateTopPosts: (state: PostsState, data: PayloadAction<PostData[]>) => {
      const updated = {
        ...state,
        topPosts: [...data.payload],
      };
      return { ...state, ...updated };
    },
  },
});

export const {
  setPostsData,
  addPost,
  deletePost,
  updatePost,
  addNewPagePosts,
  resetPostsState,
  updateTopPosts,
  updateLikePost,
} = postsSlice.actions;

export const selectPosts = (state: RootState) => {
  return state.posts;
};

export default postsSlice.reducer;
