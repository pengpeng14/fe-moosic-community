import { Music, Post, PostData, Playlist } from "./post/Posts";

export default interface IDetails extends PostData {
  change?: boolean;
}

export interface IImageCard {
  change?: boolean;
  music: Music;
  playlist: Playlist;
  post: Post;
}

export interface IInteactionCard {
  change?: boolean;
  post: Post;
  isLiked?: boolean;
}
