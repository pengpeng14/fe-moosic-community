import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useGetUserPosts from "../custom hooks/useGetUserPosts";
import PostsPanelStyle from "../styles/PostsPanelStyle";
import UtilStyle from "../styles/UtilStyle";
import { IPanel } from "./../interfaces/IPanel";
import {
  selectPostPage,
  selectVisitedProfile,
} from "./../reducers/profileSlice";
import SmallPostCard from "./SmallPostCard";

interface IData extends IPanel {}

const UserPostsPanel: React.FC<IData> = ({ value, index }) => {
  // const [userPosts, setUserPosts] = useState();
  // here is just try to mock up data
  // actually we have to request API with user-id
  // const posts = useSelector(selectPosts);

  // const [elements, setElements] = useState([]);

  const page = useSelector(selectPostPage);
  const userData = useSelector(selectVisitedProfile);

  const [pageNumber, setPageNumber] = useState<number>(page.currentPage);

  const { loading, error, viewPosts } = useGetUserPosts(
    pageNumber,
    page.total,
    userData.user.id
  );

  const observer = useRef<IntersectionObserver>();
  const lastPostElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current?.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (page.currentPage + 1 >= page.total) return;
          setPageNumber(page.currentPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    if (value === index) setPageNumber(0);
  }, [value]);

  return value === index ? (
    <div>
      {viewPosts.posts.length === 0 && !loading ? <h1>No posts</h1> : null}
      <PostsPanelStyle.Container>
        {viewPosts.posts.map((val, idx) => (
          <div
            ref={
              idx === viewPosts.posts.length - 1 ? lastPostElement : undefined
            }
          >
            <SmallPostCard
              key={idx}
              change={true}
              post={val.post}
              playlist={val.playlist}
              music={val.music}
              liked={val.liked}
            />
          </div>
        ))}
      </PostsPanelStyle.Container>
    </div>
  ) : null;
};

export default UserPostsPanel;
