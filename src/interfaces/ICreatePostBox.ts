import { Track } from "./post/PlaylistAnalyze";

export interface IMusicListCard {
  track: Track;
  mood: string;
  playlistIndex: number;
  musicIndex: number;
  playlistId?: string;
  musicId?: string;
}

export interface IMusicCardPalyer {}
