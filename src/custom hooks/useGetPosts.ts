import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clear } from "../reducers/musicSlice";
import { resetuserState } from "./../reducers/userSlice";
import { addNewPagePosts, resetPostsState } from "../reducers/postsSlice";
import post from "../services/post";

const useGetPosts = (pageNumber: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getAllPosts = async () => {
      await post
        .getPosts(pageNumber)
        .then((data) => {
          console.log("data: ", data);
          dispatch(addNewPagePosts(data.data));
          setHasMore(
            data.data.totalPage > 0 && pageNumber < data.data.totalPage
          );
          setLoading(false);
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
          dispatch(resetPostsState());
          dispatch(resetuserState());
          dispatch(clear());
          setError(true);
          localStorage.clear();
          navigate("/login");
        });
    };
    setLoading(true);
    setError(false);
    getAllPosts();
    return () => {};
  }, [pageNumber]);

  return { loading, hasMore, error };
};

export default useGetPosts;
