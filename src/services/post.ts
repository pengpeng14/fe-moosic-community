import {
  PostEditData,
  Top3Posts,
  RecommendedMusics,
} from "./../interfaces/post/Posts";
import { BasedApiResponse } from "./../interfaces/BasedApiResponse";
import request from "./request";
import { PlaylistAnalyze } from "../interfaces/post/PlaylistAnalyze";
import { PostDataFeed, Posts } from "../interfaces/post/Posts";
import { Moods } from "./../interfaces/post/Posts";

const getPlaylist = (keyword: string) => {
  // receive keyword to get playlist with keyword

  //return playlist
  return null;
};

const getPostImage = async (postId: string) => {
  return request
    .get(`/posts/${postId}/image`)
    .then(({ data }) => window.URL.createObjectURL(new Blob(data)));
};

// /feeds?page=${pageNumber} (normal feed)
// /feeds/moods (only mood list for badge) for request(3)
// /feeds?type=mood&mood={mood}?page={number} (3)
const getPosts = async (pageNumber: number) => {
  const posts: Posts = await request
    .get(`/feeds?page=${pageNumber}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then(({ data }) => data);

  return posts;
};

const analyzeImage = async (image: any) => {
  let fd = new FormData();

  fd.append("image", image);
  const response: PlaylistAnalyze = await request
    .post("/image/analyze", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data);
  return response.data;
};

const createPost = async (data: {}, image: any) => {
  let fd = new FormData();

  fd.append("image", image);
  fd.append("data", JSON.stringify(data));

  const response: PostDataFeed = await request
    .post("/posts/create", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data);
  return response.data;
};

// get post all information to edit
// - post's playlist
// - selected music
// - img
const getPost = async (id: string) => {
  const response: PostEditData = await request
    .get(`/posts/${id}?type=edit`, {
      headers: { "Content-Type": "application/json" },
    })
    .then(({ data }) => data);
  return response;
};

const updatePost = async (data: {}, id: string) => {
  const response: PostDataFeed = await request
    .put(`/posts/update/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    })
    .then(({ data }) => data);

  return response;
};

const deletePost = async (id: string) => {
  const response: BasedApiResponse = await request
    .delete(`/posts/delete/${id}`)
    .then(({ data }) => data);
  return response;
};

export const toggleLike = async (id: string, isLike: boolean) => {
  if (isLike) {
    const response: PostDataFeed = await request
      .delete(`/interactions/delete/?post-id=${id}`)
      .then(({ data }) => data);

    return response.data;
  }
  const response: PostDataFeed = await request
    .post(`/interactions/create/?post-id=${id}`)
    .then(({ data }) => data);

  return response.data;
};

// weekly ranking
const top3posts = async () => {
  const response: Top3Posts = await request
    .get(`/feeds?type=ranked`, {
      headers: { "Content-Type": "application/json" },
    })
    .then(({ data }) => data);
  return response;
};

const recommendedMusics = async (pageNumber: number) => {
  const response: RecommendedMusics = await request
    .get(`/recommendations/top-posts?page=${pageNumber}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then(({ data }) => data);
  return response;
};

const getMoods = async () => {
  const response: Moods = await request
    .get(`/feeds/moods`)
    .then(({ data }) => data);
  return response;
};

const getPostMood = async (page: number, mood: string) => {
  const response: Posts = await request
    .get(`/feeds?type=mood&mood=${mood}&page=${page}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then(({ data }) => data);
  return response;
};

export default {
  getPlaylist,
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  analyzeImage,
  toggleLike,
  top3posts,
  recommendedMusics,
  getMoods,
  getPostMood,
};
