import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMoodPage } from "../reducers/profileSlice";
import { setMoodPosts, updateMoodPosts } from "../reducers/viewPostsSlice";
import user from "../services/user";
import { selectViewPosts } from "./../reducers/viewPostsSlice";

const useGetUserPostsByMood = (
  pageNumber: number,
  userId: string,
  mood: string
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const viewPosts = useSelector(selectViewPosts);

  useEffect(() => {
    if (!mood) return;

    const getPosts = async () => {
      // if (pageNumber === 0) {
      //   dispatch(clearViewPosts());
      //   dispatch(clearAllPage());
      // }

      // with page number too
      await user
        .getPostByMood(pageNumber, mood, userId)
        .then((data) => {
          dispatch(
            setMoodPage({
              currentPage: data.data.page,
              total: data.data.totalPage,
            })
          );

          if (pageNumber === 0) {
            dispatch(setMoodPosts(data.data.posts));
          } else {
            dispatch(updateMoodPosts(data.data.posts));
          }

          setLoading(false);
        })
        .catch(() => setError(true));
    };

    setLoading(true);
    getPosts();
  }, [pageNumber, userId, mood]);

  return { viewPosts, loading, error };
};

export default useGetUserPostsByMood;
