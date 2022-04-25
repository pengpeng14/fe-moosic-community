import { SearchUserData } from "./../interfaces/user/UserProfile";
import { SearchPostsData } from "../interfaces/post/Posts";
import request from "./request";

const searchPosts = async (keyword: string | undefined, pageNumber: number) => {
  // if (keyword) return;
  const url = `/search?page=${pageNumber}&keyword=${keyword}`;
  const postsResponse: SearchPostsData = await request
    .get(`${url}&type=post`)
    .then(({ data }) => data);

  return postsResponse;
};

const searchMoods = async (keyword: string | undefined, pageNumber: number) => {
  // if (keyword) return;
  const url = `/search?page=${pageNumber}&keyword=${keyword}`;
  const moodsResponse: SearchPostsData = await request
    .get(`${url}&type=mood`)
    .then(({ data }) => data);
  return moodsResponse;
};

const searchUsers = async (keyword: string | undefined, pageNumber: number) => {
  // if (keyword) return;
  const url = `/search?page=${pageNumber}&keyword=${keyword}`;
  const usersResponse: SearchUserData = await request
    .get(`${url}&type=user`)
    .then(({ data }) => data);
  return usersResponse;
};

export default { searchMoods, searchPosts, searchUsers };
