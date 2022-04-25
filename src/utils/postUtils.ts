import { PostEditData } from "./../interfaces/post/Posts";
import { PostsState } from "../reducers/postsSlice";

const findPost = (posts: PostsState, id: string) => {
  const post = posts.posts.filter((post) => post.post.id === id);
  return post[0];
};

// const findSelectedMusic = (data: PostEditData) => {
//   const selectdMusic = data.data.playlist.filter(pl => pl.musics.filter(music => music.previewURL)
// }

export default { findPost };
