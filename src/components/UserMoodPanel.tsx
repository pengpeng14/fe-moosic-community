import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import {
  clearAllPage,
  selectMoodPostPage,
  selectVisitedProfile,
} from "../reducers/profileSlice";
import UtilStyle from "../styles/UtilStyle";
import useGetUserPostsByMood from "./../custom hooks/useGetUserPostsByMood";
import { IPanel } from "./../interfaces/IPanel";
import { Moods, Posts } from "./../interfaces/post/Posts";
import user from "./../services/user";
import PostsPanelStyle from "./../styles/PostsPanelStyle";
import MoodBadge from "./MoodBadge";
import SmallPostCard from "./SmallPostCard";

interface IData extends IPanel {}

const UserMoodPanel: React.FC<IData> = ({ index, value }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const page = useSelector(selectMoodPostPage);
  const userProfile = useSelector(selectVisitedProfile);

  const [moods, setMoods] = useState<string[]>([]);
  // const [posts, setPosts] = useState<Posts[]>([]);
  const [pageNumber, setPageNumber] = useState(page.currentPage);
  const [selectedKeyword, setSelectedKeyword] = useState<string>("");

  const { viewPosts, loading, error } = useGetUserPostsByMood(
    pageNumber,
    userProfile.user.id,
    selectedKeyword
  );

  useEffect(() => {
    if (value !== index) return;

    const getUserMoodList = async () => {
      const response = await user.getMoods(userProfile.user.id);
      setMoods(response.data.moods);
      setSelectedKeyword(response.data.moods[0]);
    };

    setPageNumber(0);
    getUserMoodList();
  }, [value]);

  useEffect(() => {
    setPageNumber(0);
  }, [selectedKeyword]);

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
    if (viewPosts.moods.length === 0) {
      setMoods(moods.filter((m) => m !== selectedKeyword));
    }
  }, [viewPosts]);

  return value === index ? (
    <div>
      {moods.length ? (
        <MoodBadge
          moods={moods}
          setSelectedKeyword={setSelectedKeyword}
          selectedKeyword={selectedKeyword}
        />
      ) : null}
      {viewPosts.moods.length === 0 && !loading ? <h1>No posts</h1> : null}
      <PostsPanelStyle.Container>
        {viewPosts.moods.map((val, idx) => (
          <div
            ref={
              idx === viewPosts.posts.length - 1 ? lastPostElement : undefined
            }
            key={idx}
          >
            <SmallPostCard
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

export default UserMoodPanel;
