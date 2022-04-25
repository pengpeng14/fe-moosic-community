import { SpotifyUser } from "../interfaces/user/SpotifyUser";
import request from "./request";

const getMe = async () => {
  const response: SpotifyUser = await request
    .get("/spotify/profile")
    .then(({ data }) => data.data);

  return response;
};

export default { getMe };
