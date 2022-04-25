import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetPosts from "../custom hooks/useGetPosts";
import { PostData } from "../interfaces/post/Posts";
import { resetPostsState, selectPosts } from "../reducers/postsSlice";
import { setUserData } from "../reducers/userSlice";
import FeedStyle from "../styles/FeedStyle";
import UtilStyle from "../styles/UtilStyle";
import SmallPostCard from "./SmallPostCard";

const PostsFeed: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const dispatch = useDispatch();
  const currentPosts = useSelector(selectPosts);
  const [pageNumber, setPageNumber] = useState(0);
  const { loading, hasMore, error } = useGetPosts(pageNumber);

  const observer = useRef<IntersectionObserver>();
  const lastPostElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) {
        observer.current?.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          if (currentPosts.totalPage === currentPosts.page + 1) return;
          setPageNumber(currentPosts.page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    dispatch(resetPostsState());
    setPosts([]);
    const userData = localStorage.getItem("userData");
    if (userData) {
      dispatch(setUserData(JSON.parse(userData)));
    }
  }, []);

  useEffect(() => {
    setPosts(currentPosts.posts);
  }, [currentPosts]);
  return (
    <FeedStyle.MidContainer>
      {posts.map((post, index) => (
        <div ref={posts.length === index + 1 ? lastPostElement : undefined}>
          <SmallPostCard
            post={post.post}
            music={post.music}
            playlist={post.playlist}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            liked={post.liked}
          />
        </div>
      ))}
      {loading ? <UtilStyle.Loading>Loading....</UtilStyle.Loading> : null}
    </FeedStyle.MidContainer>
  );
};

export default PostsFeed;
