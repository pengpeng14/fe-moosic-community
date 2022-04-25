import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import FeedLeft from "../components/FeedLeft";
import FeedRight from "../components/FeedRight";
import PostsFeed from "../components/PostsFeed";
import RankingFeed from "../components/RankingFeed";
import { setUserData } from "../reducers/userSlice";
import login from "../services/login";
import user from "../services/user";
import FeedStyle from "../styles/FeedStyle";
import "./../styles/InvertColor.css";

const Feed: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const setMe = async () => {
      if (!login.checkUserData()) {
        await user
          .getMe()
          .then((data) => {
            localStorage.setItem("userData", JSON.stringify(data.data));
            dispatch(setUserData(data.data));
          })
          .catch(() => {
            navigate("/login");
          });
      }
    };

    setMe();
  }, []);

  return (
    <>
      <FeedStyle.Container isProfile={false}>
        <FeedLeft />
        <PostsFeed />
        <FeedRight />
      </FeedStyle.Container>
    </>
  );
};

export default Feed;
