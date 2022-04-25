import { BasedApiResponse } from "./../BasedApiResponse";
import { User } from "./../user/UserProfile";

export interface PostsContent {
  page: number;
  totalPage: number;
  count: number;
  posts: PostData[];
  topPosts: PostData[];
}
export interface Posts extends BasedApiResponse {
  data: PostsContent;
}

export interface PostData extends DateTime {
  post: Post;
  playlist: Playlist;
  music: Music;
  liked?: boolean;
}

export interface PostDataFeed extends BasedApiResponse {
  data: {
    post: Post;
    playlist: Playlist;
    music: Music;
    liked: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Post extends DateTime {
  id: string;
  user: User;
  img: string;
  likeCount: number;
}

export interface Playlist extends DateTime {
  id: string;
  post: string;
  name: string;
  mood: string;
  keyword: string;
  url: string;
}

export interface Music extends DateTime {
  id: string;
  playlist: string;
  artists: string[];
  title: string;
  album: string;
  albumURL: string;
  trackURL: string;
  artistURLs: string[];
  albumCoverURL: string;
  previewURL: string;
}

export interface RecommendMusic extends Music {
  albumCoverURL: string;
  externalTrackURL: string;
  externalArtistURLs: string[];
  externalAlbumURL: string;
}
export interface RecommendedMusics extends BasedApiResponse {
  data: {
    page: number;
    count: number;
    tracks: RecommendMusic[];
    mood: string;
    keyword: string;
  };
}

export interface SearchPostsData extends BasedApiResponse {
  data: {
    page: number;
    totalPage: number;
    count: number;
    contents: PostData[];
  };
}

export interface SearchPostsDataNoRaw {
  page: number;
  totalPage: number;
  count: number;
  contents: PostData[];
}

export interface PostEditData extends BasedApiResponse {
  data: {
    id: string;
    playlists: PlaylistEditData[];
    img: string;
  };
}

export interface PlaylistEditData {
  id: string;
  name: string;
  musics: MusicEditData[];
  mood: string;
  keyword: string;
}

export interface MusicEditData {
  id: string;
  artists: string[];
  album: string;
  title: string;
  previewURL: string;
  albumURL: string;
  spotifyId: string;
}

export interface Top3Posts extends BasedApiResponse {
  data: {
    posts: PostData[];
    topPosts: PostData[];
  };
}

export interface Moods extends BasedApiResponse {
  data: {
    moods: string[];
  };
}

interface DateTime {
  createdAt?: string;
  updatedAt?: string;
}
