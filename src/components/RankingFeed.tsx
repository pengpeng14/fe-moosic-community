import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import RankingFeedStyle from "../styles/RankingFeedStyle";
import RecommendMusics from "./RecommendMusics";
import { setUserData } from "../reducers/userSlice";

import TopRankCard from "./TopRankCard";

// disabled creating post button
const RankingFeed: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (posts.posts.length) {
  //     setLoading(false);
  //     return;
  //   }
  //   setLoading(true);
  // }, [posts]);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      dispatch(setUserData(JSON.parse(userData)));
    }
  }, []);

  return (
    <RankingFeedStyle.Container>
      <TopRankCard />
      <div style={{ marginBottom: "40px" }} />
      <RecommendMusics />
    </RankingFeedStyle.Container>
  );
};

export default RankingFeed;
