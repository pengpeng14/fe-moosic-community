import { BasedApiResponse } from "./BasedApiResponse";

export interface LikedMusic extends BasedApiResponse {
  data: {
    page: number;
    totalPage: number;
    count: number;
    name: string;
    id: string;
    keyword: string;
    mood: string;
    musics: RecommendedMusic[];
  };
}

export interface RecommendedMusic {
  id: string;
  title: string;
  album: string;
  artistURLs: string[];
  albumURL: string;
  previewURL: string;
  trackURL: string;
  artists: string[];
  albumCoverURL: string;
  spotifyId: string;
}

export interface MusicAdded {
  playlistName: string;
  mood: string;
  track: {
    id: string;
    title: string;
    artists: string[];
    album: string;
    albumCoverURL: string;
    previewURL: string;
    trackURL: string;
    artistURLs: string[];
    albumURL: string;
  };
}
