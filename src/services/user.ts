import { Moods, Posts } from "../interfaces/post/Posts";
import { UpdateUserRes, UserProfile } from "../interfaces/user/UserProfile";
import { LikedMusic } from "./../interfaces/recommend";
import { UpdateUser } from "./../interfaces/user/UserProfile";
import request from "./request";

const getUser = async (id: string) => {
  console.log("getUser: ", id);
  const response: UserProfile = await request
    .get(`/users/profile/${id}`)
    .then(({ data }) => data);

  return response;
};

const getUserByUsername = async (username: string) => {
  const response: UserProfile = await request
    .get(`/users/profile/username/${username}`)
    .then(({ data }) => data);

  return response;
};

const getMe = async () => {
  const response: UserProfile = await request
    .get(`/users/profile/me`)
    .then(({ data }) => data);
  return response;
};

const getPosts = async (id: string, page: number = 0) => {
  console.log(id);
  const response: Posts = await request
    .get(`/users/profile/${id}/posts`, {
      params: {
        page,
      },
    })
    .then(({ data }) => data);
  return response;
};

const getMoods = async (id: string) => {
  const response: Moods = await request
    .get(`/users/profile/${id}/moods`)
    .then(({ data }) => data);

  return response;
};

const getPostByMood = async (page: number, mood: string, id: string) => {
  const response: Posts = await request
    .get(`/users/profile/${id}/posts?page=${page}&type=mood&mood=${mood}`)
    .then(({ data }) => data);
  return response;
};

const getFavourties = async (page: number, id: string) => {
  const response: Posts = await request
    .get(`/users/profile/${id}/posts?page=${page}&type=liked`)
    .then(({ data }) => data);
  return response;
};

const setUserData = async (state: any, username: string) => {
  console.log(state);
  if (!state) {
    // console.log("enter here js");
    // const userData = userUtils.getUserData();
    const response = await getUserByUsername(username as string);
    return response.data;
  } else {
    // console.log("araiwa: ", state);
    const response = await getUser(state.userId);
    if (response.success) {
      return response.data;
    }
  }
};

const getLikedMusics = async (pageNumber: number) => {
  // /playlist/favourites?page=${0}?mood="day"
  const response: LikedMusic = await request
    .get(`/playlists/favorites?page=${pageNumber}`)
    .then(({ data }) => data);
  return response;
};

const updateUser = async (user: UpdateUser) => {
  const response: UpdateUserRes = await request
    .put("users/profile/update", user)
    .then(({ data }) => data);
  return response;
};

export default {
  getUser,
  getPosts,
  setUserData,
  getMoods,
  getPostByMood,
  getFavourties,
  getLikedMusics,
  updateUser,
  getMe,
};
