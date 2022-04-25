import React, { useCallback, useContext, useRef, useState } from "react";
import useGetPostsSearch from "../custom hooks/useGetPostsSearchByMusic";
import { IPanel } from "../interfaces/IPanel";
import SearchFeedStyle from "../styles/SearchFeedStyle";
import UtilStyle from "../styles/UtilStyle";
import { SearchContext } from "./SearchFeed";
import SmallPostCard from "./SmallPostCard";

// interface ID extends IPanel {
//   posts: SearchPostsData | undefined;
// }

const PostsPanel: React.FC<IPanel> = ({ value, index }) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const { keyword } = useContext(SearchContext);
  const { loading, hasMore, error, posts } = useGetPostsSearch(
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
          if (posts?.totalPage === pageNumber + 1) return;
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
            {posts?.contents.map((post, index) => (
              <div
                ref={
                  index === posts?.contents.length - 1
                    ? lastPostElement
                    : undefined
                }
              >
                <SmallPostCard
                  key={index}
                  post={post.post}
                  playlist={post.playlist}
                  music={post.music}
                  liked={post.liked}
                />
              </div>
            ))}
          </div>

          {loading ? (
            <UtilStyle.Loading>Loading...</UtilStyle.Loading>
          ) : !posts?.contents.length ? (
            <SearchFeedStyle.ResultText>
              {`No posts with "${keyword}" found`}
            </SearchFeedStyle.ResultText>
          ) : null}
        </>
      )}
    </>
  );
};

export default PostsPanel;
