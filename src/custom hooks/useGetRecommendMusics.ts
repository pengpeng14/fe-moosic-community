import { useEffect, useState } from "react";
import { RecommendedMusics } from "./../interfaces/post/Posts";
import post from "./../services/post";

const useGetRecommendMusics = (pageNumber: number) => {
  const [musics, setMusics] = useState<RecommendedMusics[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getMusics = async () => {
      console.log(pageNumber);
      await post
        .recommendedMusics(pageNumber)
        .then((data) => {
          data.data.tracks = data.data.tracks.filter(t => t.previewURL !== null);
          data.data.count = data.data.tracks.length;
          const newValue = musics;
          newValue.push(data);
          setMusics(newValue);
          setLoading(false);
        })
        .catch(() => setError(true));
    };
    setLoading(true);
    setError(false);
    getMusics();
  }, [pageNumber]);
  console.log("musics", musics);

  return { musics, loading, error };
};

export default useGetRecommendMusics;
