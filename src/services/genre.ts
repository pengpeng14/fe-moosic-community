import { BasedApiResponse } from "./../interfaces/BasedApiResponse";
import request from "./request";
import { Genre } from "../interfaces/user/UserProfile";

const getGenres = async () => {
  const response: Genre = await request
    .get("users/profile/genre-seeds")
    .then(({ data }) => data);
  return response;
};

const saveGenres = async () => {
  const response: BasedApiResponse = await request
    .post("users/profile/genre-seeds")
    .then(({ data }) => data);
  return response;
};

export default { getGenres, saveGenres };
