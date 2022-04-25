import React, { createContext, useEffect } from "react";
import SearchFeedStyle from "../styles/SearchFeedStyle";
import useSearch from "./../custom hooks/useSearch";
import { ISearchURL, SearchType } from "./../interfaces/ISearchURL";
import TabsBarSearch from "./TabsBarSearch";

const SearchContext = createContext<ISearchURL>({
  type: SearchType.posts,
  keyword: "",
});

const SearchFeed: React.FC = () => {
  // const { keyword } = useParams();
  const searchParam = useSearch<ISearchURL>();
  // const searchParam = undefined;

  useEffect(() => {
    // search with keyword with all types (posts, moods, users)
    if (!searchParam || !searchParam.keyword) return;

  }, [searchParam]);

  return searchParam ? (
    <SearchContext.Provider value={searchParam}>
      <SearchFeedStyle.Container>
        <SearchFeedStyle.ResultKeyword>
          Results for "{searchParam.keyword}"
        </SearchFeedStyle.ResultKeyword>
        <SearchFeedStyle.TabsContainer>
          <TabsBarSearch />
        </SearchFeedStyle.TabsContainer>
      </SearchFeedStyle.Container>
    </SearchContext.Provider>
  ) : null;
};

export default SearchFeed;
export { SearchContext };

