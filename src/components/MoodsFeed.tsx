import React, { useEffect, useState } from "react";
import { Moods, Posts } from "../interfaces/post/Posts";
import post from "../services/post";
import FeedStyle from "../styles/FeedStyle";
import MoodBadge from "./MoodBadge";
import SmallPostCard from "./SmallPostCard";

const MoodsFeed: React.FC = () => {
  const [moods, setMoods] = useState<Moods>();
  const [posts, setPosts] = useState<Posts[]>();
  const [selectedKeyword, setSelectedKeyword] = useState<string>("");

  useEffect(() => {
    const getMoods = async () => {
      const response = await post.getMoods();
      setMoods(response);
      setSelectedKeyword(response.data.moods[0]);

      const promises = response.data.moods.map((mood) => {
        console.log(mood);
        return post.getPostMood(0, mood);
      });

      const responses = await Promise.all(promises).then((resolve) => [
        ...resolve,
      ]);
      console.log(responses);
      setPosts(responses);
    };
    getMoods();
  }, []);

  return (
    <>
      <FeedStyle.MidContainer>
        <div style={{ marginTop: 10 }}>
          {moods?.data.moods.length && (
            <MoodBadge
              moods={moods.data.moods}
              setSelectedKeyword={setSelectedKeyword}
              selectedKeyword={selectedKeyword}
            />
          )}
        </div>
        {/* fix index with selected keyword */}
        <div
          style={{
            display: "grid",
            gridRowGap: 15,
            marginBottom: 30,
          }}
        >
          {posts &&
            moods &&
            posts[moods.data.moods.indexOf(selectedKeyword)].data.posts.map(
              (post, pindex) => (
                <SmallPostCard
                  key={pindex}
                  post={post.post}
                  playlist={post.playlist}
                  music={post.music}
                />
              )
            )}
        </div>
      </FeedStyle.MidContainer>
    </>
  );
};

export default MoodsFeed;
