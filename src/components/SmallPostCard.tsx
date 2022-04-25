import React, { useEffect } from "react";
import IDetails from "../interfaces/ISmallPostCard";
import ImageCard from "./ImageCard";
import InteractionCard from "./InteractionCard";

const SmallPostCard: React.FC<IDetails> = ({
  change,
  post,
  playlist,
  music,
  liked,
}) => {
  useEffect(() => {
    return () => {
      setTimeout(() => {}, 3000);
    };
  }, []);
  // each post data will set here
  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
      }}
    >
      <ImageCard
        change={change ?? false}
        music={music}
        playlist={playlist}
        post={post}
      />
      <InteractionCard change={change ?? false} post={post} isLiked={liked} />
      {/* <div style={{ marginBottom: "10px" }} /> */}
    </div>
  );
};

export default SmallPostCard;
