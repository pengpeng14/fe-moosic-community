import React, { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectVisitedProfile } from "../reducers/profileSlice";
import UtilStyle from "../styles/UtilStyle";
import useGetUserFavoritePosts from "./../custom hooks/useGetUserFavoritePosts";
import { IPanel } from "./../interfaces/IPanel";
import { selectFavoritePostPage } from "./../reducers/profileSlice";
import PostsPanelStyle from "./../styles/PostsPanelStyle";
import SmallPostCard from "./SmallPostCard";

interface IData extends IPanel {}

const UserFavoritePanel: React.FC<IData> = ({ index, value }) => {
  const page = useSelector(selectFavoritePostPage);
  const userData = useSelector(selectVisitedProfile);
  console.log("in fav panel ", userData);

  const [pageNumber, setPageNumber] = useState(page.currentPage);

  // const currentUser = useSelector(selectUser);
  // const favoritePosts = useSelector(selectFavouritePosts);

  // const [elements, setElements] = useState<JSX.Element[]>([]);

  const { loading, error, viewPosts } = useGetUserFavoritePosts(
    pageNumber,
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

  return index === value ? (
    <div>
      {viewPosts.favorites.length === 0 && !loading ? <h1>No posts</h1> : null}
      <PostsPanelStyle.Container>
        {viewPosts.favorites.map((val, idx) => (
          <div
            ref={
              idx === viewPosts.favorites.length - 1
                ? lastPostElement
                : undefined
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
      {loading ? <UtilStyle.Loading>Loading...</UtilStyle.Loading> : null}
    </div>
  ) : null;
};

export default UserFavoritePanel;
