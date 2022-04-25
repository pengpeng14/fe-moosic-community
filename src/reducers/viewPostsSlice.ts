import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../store";
import { PostData } from "./../interfaces/post/Posts";
import produce from "immer";

interface ProfilePostView {
  posts: PostData[];
  moods: PostData[];
  favorites: PostData[];
}

export interface IProfileMoodPost {
  [key: string]: PostData[];
}

interface IMoodPostPayload {
  posts: PostData[];
  mood: string;
}

const initialState: ProfilePostView = {
  posts: [],
  moods: [],
  favorites: [],
};

export const profilePostView = createSlice({
  name: "viewPosts",
  initialState,
  reducers: {
    setPosts: (state: ProfilePostView, data: PayloadAction<PostData[]>) => {
      return { ...state, posts: data.payload };
    },
    setMoodPosts: (state: ProfilePostView, data: PayloadAction<PostData[]>) => {
      return { ...state, moods: data.payload };
    },
    setFavPost: (state: ProfilePostView, data: PayloadAction<PostData[]>) => {
      return { ...state, favorites: data.payload };
    },
    clearAllView: (state: ProfilePostView) => {
      return { ...state, posts: [], moods: [], favorites: [] };
    },
    clearPostView: (state: ProfilePostView) => {
      return { ...state, posts: [] };
    },
    clearMoodView: (state: ProfilePostView) => {
      return { ...state, moods: [] };
    },
    clearFavView: (state: ProfilePostView) => {
      return { ...state, favorites: [] };
    },
    updateViewPosts: (
      state: ProfilePostView,
      data: PayloadAction<PostData[]>
    ) => {
      return { ...state, posts: [...state.posts, ...data.payload] };
    },
    updateMoodPosts: (
      state: ProfilePostView,
      data: PayloadAction<PostData[]>
    ) => {
      return { ...state, mood: [...state.moods, ...data.payload] };
    },
    addFavouritePost: (
      state: ProfilePostView,
      data: PayloadAction<PostData>
    ) => {
      return {
        ...state,
        favorites: [data.payload, ...state.favorites],
      };
    },
    removeFavouritePost: (
      state: ProfilePostView,
      id: PayloadAction<string>
    ) => {
      const remainFavPosts = state.favorites.filter(
        (post) => post.post.id !== id.payload
      );
      const remainMoodPosts = state.moods.filter(
        (post) => post.post.id !== id.payload
      );

      // const updatingPosts = state.posts.map((p) => {
      //   if (p.post.id === id.payload) {
      //     p.post.likeCount = p.liked
      //       ? p.post.likeCount - 1
      //       : p.post.likeCount - 1;
      //     p.liked = !p.liked;
      //   }

      //   return p;
      // });

      // console.log("End");
      // console.log("Target id:", id.payload);
      // console.log(remainFavPosts.findIndex((p) => p.post.id === id.payload));
      // console.log(remainMoodPosts.findIndex((p) => p.post.id === id.payload));

      return {
        ...state,
        // posts: updatingPosts,
        favorites: remainFavPosts,
        moods: remainMoodPosts,
      };
    },
    updateViewPostLike: (state: ProfilePostView, id: PayloadAction<string>) => {
      return produce(state, (draft) => {
        for (let post of draft.posts) {
          if (post.post.id === id.payload) {
            post.post.likeCount = post.liked
              ? post.post.likeCount - 1
              : post.post.likeCount + 1;
            post.liked = !post.liked;
            break;
          }
        }
      });

      // for (let post of state.posts) {
      //   if (post.post.id === id.payload) {
      //     post.post.likeCount = post.liked
      //       ? post.post.likeCount - 1
      //       : post.post.likeCount + 1;
      //     post.liked = !post.liked;
      //     break;
      //   }
      // }
      // return state;
    },
    updateViewFavoriteLike: (
      state: ProfilePostView,
      id: PayloadAction<string>
    ) => {
      return produce(state, (draft) => {
        for (let post of state.favorites) {
          if (post.post.id === id.payload) {
            post.post.likeCount = post.liked
              ? post.post.likeCount - 1
              : post.post.likeCount + 1;
            post.liked = !post.liked;
            break;
          }
        }
      });
    },

    updateFavPostChuck: (
      state: ProfilePostView,
      data: PayloadAction<PostData[]>
    ) => {
      return { ...state, favorites: [...state.favorites, ...data.payload] };
    },
    updateUserViewPost: (
      state: ProfilePostView,
      data: PayloadAction<string>
    ) => {
      return produce(state, (draft) => {
        for (let post of state.posts) {
          post.post.user.username = data.payload;
        }
      });
    },
    updateUserViewFavPost: (
      state: ProfilePostView,
      data: PayloadAction<{ username: string; id: string }>
    ) => {
      return produce(state, (draft) => {
        for (let post of state.favorites) {
          if (post.post.user.id === data.payload.id) {
            post.post.user.username = data.payload.username;
          }
        }
      });
    },
  },
});

export const selectViewPosts = (state: RootState) => state.profilePostView;
export const {
  setPosts,
  setMoodPosts,
  setFavPost,
  updateViewPosts,
  updateViewPostLike,
  updateMoodPosts,
  updateFavPostChuck,
  clearAllView,
  clearFavView,
  clearMoodView,
  clearPostView,
  removeFavouritePost,
  addFavouritePost,
  updateViewFavoriteLike,
  updateUserViewPost,
  updateUserViewFavPost,
} = profilePostView.actions;

export default profilePostView.reducer;
