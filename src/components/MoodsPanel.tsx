import React, { useCallback, useContext, useRef, useState } from "react";
import useGetPostsSearch from "../custom hooks/useGetPostsSearchByMood";
import { IPanel } from "../interfaces/IPanel";
import SearchFeedStyle from "../styles/SearchFeedStyle";
import { SearchContext } from "./SearchFeed";
import SmallPostCard from "./SmallPostCard";
import UtilStyle from "../styles/UtilStyle";

const MoodsPanel: React.FC<IPanel> = ({ value, index }) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const { keyword } = useContext(SearchContext);
  const { loading, hasMore, error, moodPosts } = useGetPostsSearch(
    pageNumber,
    keyword
  );

  const observer = useRef<IntersectionObserver>();
  const lastPostElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) {
        observer.current?.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          if (moodPosts?.totalPage === pageNumber + 1) return;
          setPageNumber(pageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },

    [loading, hasMore]
  );

  return (
    <>
      {value === index && (
        <>
          <div
            style={{
              display: "grid",
              gridRowGap: 15,
              marginBottom: 30,
            }}
          >
            {moodPosts?.contents.map((post, index) => (
              <>
                {moodPosts.contents.length === index + 1 ? (
                  <div
                    ref={lastPostElement}
                    key={index}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <SmallPostCard
                      key={index}
                      post={post.post}
                      music={post.music}
                      playlist={post.playlist}
                      liked={post.liked}
                    />
                  </div>
                ) : (
                  <SmallPostCard
                    key={index}
                    post={post.post}
                    music={post.music}
                    playlist={post.playlist}
                    liked={post.liked}
                  />
                )}
              </>
            ))}
          </div>
          {loading ? (
            <UtilStyle.Loading>Loading...</UtilStyle.Loading>
          ) : moodPosts?.contents.length === 0 ? (
            <SearchFeedStyle.ResultText>
              {`No mood "${keyword}" found`}
            </SearchFeedStyle.ResultText>
          ) : null}
        </>
      )}
    </>
  );
};

export default MoodsPanel;
