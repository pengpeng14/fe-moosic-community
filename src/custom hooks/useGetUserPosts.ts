import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostPage } from "../reducers/profileSlice";
import { updateViewPosts } from "../reducers/viewPostsSlice";
import user from "../services/user";
import { selectViewPosts } from "./../reducers/viewPostsSlice";

const useGetUserPosts = (
  pageNumber: number,
  totalPage: number,
  userId: string
) => {
  // const [elements, setElements] = useState<JSX.Element[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const viewPosts = useSelector(selectViewPosts);

  useEffect(() => {
    console.log(new Date(), pageNumber, totalPage);

    const getPosts = async () => {
      // if (pageNumber === 0) {
      //   dispatch(clearPostPage());
      //   dispatch(clearPostView());
      // }
      // with page number too
      await user
        .getPosts(userId, pageNumber)
        .then((data) => {
          dispatch(
            setPostPage({
              currentPage: data.data.page,
              total: data.data.totalPage,
            })
          );

          dispatch(updateViewPosts(data.data.posts));
          setLoading(false);
        })
        .catch(() => setError(true));
    };

    setLoading(true);
    getPosts();
  }, [pageNumber, userId]);

  return { viewPosts, loading, error };
};

export default useGetUserPosts;
