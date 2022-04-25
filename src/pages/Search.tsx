import React from "react";
import FeedLeft from "../components/FeedLeft";
import FeedRight from "../components/FeedRight";
import SearchFeed from "../components/SearchFeed";
import FeedStyle from "../styles/FeedStyle";

const Search: React.FC = () => {
  return (
    <>
      <FeedStyle.MidContainer>
        {/* <FeedLeft /> */}
        <SearchFeed />
        {/* <FeedRight /> */}
      </FeedStyle.MidContainer>
    </>
  );
};

export default Search;
