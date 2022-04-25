import { BasedApiResponse } from "./BasedApiResponse";
export interface SpotifyPlaylist {
  id: string;
  name: string;
  externalURL: string;
}

export interface SpotifyPlaylistRes extends BasedApiResponse {
  data: SpotifyPlaylist[];
}
