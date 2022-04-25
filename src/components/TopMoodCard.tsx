import React, { createRef, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PostData } from "../interfaces/post/Posts";
import { PostsState, selectPosts } from "../reducers/postsSlice";
import TopMoodCardStyle from "../styles/TopMoodCardStyle";

interface ITopMoodDetail {
  post: PostData;
  topMoods: PostsState;
  index: number;
}

const TopMoodDetail: React.FC<ITopMoodDetail> = ({ post, topMoods, index }) => {
  const ref = createRef<HTMLDivElement>();
  const [isOverflow, setIsOverflow] = useState(false);
  const [overflowDiff, setOverflowDiff] = useState(0);

  useLayoutEffect(() => {
    const current = ref.current;

    // assert current is present
    if (!current) return;

    if (current.clientWidth < current.scrollWidth) {
      setIsOverflow(true);
      setOverflowDiff(
        (1 - current.clientWidth / current.scrollWidth) * 100 + 3.5
      );
    } else {
      setIsOverflow(false);
    }
  }, [ref]);

  return (
    <div ref={ref}>
      <div style={{ padding: "5px 10px" }}>
        <TopMoodCardStyle.Mood
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>#{post.playlist.mood}</span>
          <div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "grey" }}>
              {post.post.likeCount} likes
            </span>
          </div>
        </TopMoodCardStyle.Mood>
        <TopMoodCardStyle.MusicDetails
          animated={isOverflow}
          value={overflowDiff}
        >
          <span style={{ fontWeight: "bold", color: "rgb(100, 100, 100)" }}>
            {post.music.title}
          </span>
          <span> - </span>
          <span style={{ fontWeight: 300 }}>
            {post.music.artists.map((artist) => artist + " ")}
          </span>
        </TopMoodCardStyle.MusicDetails>
      </div>
      {index !== topMoods.topPosts.length - 1 && (
        <TopMoodCardStyle.DivideLine />
      )}
    </div>
  );
};

const TopMoodCard: React.FC = () => {
  const topMoods = useSelector(selectPosts);
  return (
    <>
      {topMoods.topPosts.length ? (
        <TopMoodCardStyle.PaperCard elevation={0} variant="outlined">
          <TopMoodCardStyle.TitleList>
            <TopMoodCardStyle.Title>Top moods now</TopMoodCardStyle.Title>
          </TopMoodCardStyle.TitleList>
          <div>
            {topMoods.topPosts.map((post, index) => (
              <TopMoodDetail post={post} index={index} topMoods={topMoods} />
            ))}
          </div>
        </TopMoodCardStyle.PaperCard>
      ) : null}
    </>
  );
};

export default TopMoodCard;
