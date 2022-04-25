import { useDispatch } from "react-redux";
import user from "./../services/user";
import { useEffect, useState } from "react";
import { RecommendedMusic } from "../interfaces/recommend";
import { setPlaylistPage } from "../reducers/profileSlice";

const useGetUserPlaylist = (pageNumber: number = 0) => {
  const [musics, setMusics] = useState<RecommendedMusic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(pageNumber);
    const getLikedMusic = async () => {
      await user
        .getLikedMusics(pageNumber)
        .then(({ data }) => {
          const oldVal = musics;
          data.musics.map((music) => oldVal.push(music));
          setMusics(oldVal);
          dispatch(
            setPlaylistPage({ currentPage: data.page, total: data.totalPage })
          );
          setLoading(false);
          console.log("custon: ", data);
        })
        .catch(() => setError(true));
    };
    setLoading(true);
    getLikedMusic();
  }, [pageNumber]);

  return { setMusics, musics, loading, error };
};

export default useGetUserPlaylist;
