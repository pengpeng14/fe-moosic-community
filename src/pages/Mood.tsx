import React from "react";
import { useNavigate } from "react-router";
import FeedLeft from "../components/FeedLeft";
import FeedRight from "../components/FeedRight";
import MoodsFeed from "../components/MoodsFeed";
import FeedStyle from "../styles/FeedStyle";

const Mood: React.FC = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!login.checkUserData()) {
  //     navigate("/login");
  //   }
  //   console.log("Mood page");
  // }, []);
  return (
    <>
      {/* {login.checkUserData() && ( */}
      <FeedStyle.Container isProfile={false}>
        <FeedLeft />
        <MoodsFeed />
        <FeedRight />
      </FeedStyle.Container>
      {/* )} */}
    </>
  );
};

export default Mood;
