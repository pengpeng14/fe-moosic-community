import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavoritePage
} from "../reducers/profileSlice";
import {
  selectViewPosts,
  setFavPost,
  updateFavPostChuck
} from "../reducers/viewPostsSlice";
import user from "../services/user";

const useGetUserFavoritePosts = (pageNumber: number, userId: string) => {
  // const [elements, setElements] = useState<JSX.Element[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const viewPosts = useSelector(selectViewPosts);

  useEffect(() => {
    const getPosts = async () => {
      // if (pageNumber === 0) {
      //   dispatch(clearViewPosts());
      //   dispatch(clearAllPage());
      // }
      await user
        .getFavourties(pageNumber, userId)
        .then((data) => {
          dispatch(
            setFavoritePage({
              currentPage: data.data.page,
              total: data.data.totalPage,
            })
          );

          dispatch(updateFavPostChuck(data.data.posts));
          setLoading(false);
        })
        .catch(() => setError(true));
    };

    setLoading(true);
    getPosts();
  }, [pageNumber, userId]);

  return { viewPosts, loading, error };
};

export default useGetUserFavoritePosts;
