import { BasedApiResponse } from "./../BasedApiResponse";

export interface PlaylistAnalyze {
  data: {
    keywords: string[];
    playlists: Playlist[];
  };
}

export interface Playlist {
  mood: string;
  keyword: string;
  playlist: {
    externalURL: string;
    name: string;
    tracksURL: string;
    url: string;
  };
  tracks: Track[];
}

export interface Track {
  id: string;
  album: string;
  albumCoverURL?: string;
  artists: string[];
  externalAlbumURL?: string;
  externalArtistURLs?: string[];
  externalTrackURL?: string;
  previewURL: string;
  title: string;
}
