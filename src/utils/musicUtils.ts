import { MusicAdded } from "./../interfaces/recommend";
import { RecommendMusic } from "../interfaces/post/Posts";

const formatRecommendMusicBody = (
  music: RecommendMusic,
  userId: string,
  mood: string
) => {
  const newFormat: MusicAdded = {
    playlistName: userId,
    mood,
    track: {
      id: music.id,
      title: music.title,
      artists: music.artists,
      album: music.album,
      albumCoverURL: music.albumCoverURL,
      previewURL: music.previewURL,
      artistURLs: music.artistURLs,
      albumURL: music.albumURL,
      trackURL: music.trackURL,
    },
  };
  return newFormat;
};

export default { formatRecommendMusicBody };
