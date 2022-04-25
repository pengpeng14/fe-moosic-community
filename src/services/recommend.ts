import { BasedApiResponse } from "./../interfaces/BasedApiResponse";
import { LikedMusic, MusicAdded } from "../interfaces/recommend";
import request from "./request";

const like = async (music: MusicAdded) => {
  const response: LikedMusic = await request
    .post("/playlists/favorites/add", music, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(({ data }) => data);

  return response;
};

const unlike = async (id: string) => {
  const response: BasedApiResponse = await request
    .delete(`/playlists/favorites/remove?music-id=${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(({ data }) => data);
  return response;
};

export default { like, unlike };
