import React from "react";
import FeedStyle from "./../styles/FeedStyle";
import SearchBox from "./SearchBox";
import TopMoodCard from "./TopMoodCard";

const FeedRight: React.FC = () => {
  return (
    <>
      <FeedStyle.RightContainer>
        <FeedStyle.RightChild>
          <SearchBox />
          <TopMoodCard />
        </FeedStyle.RightChild>
      </FeedStyle.RightContainer>
    </>
  );
};
export default FeedRight;
