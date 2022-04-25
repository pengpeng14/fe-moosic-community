import React, { useCallback, useRef, useState } from "react";
import RecommendPlayerCardStyle from "../styles/RecommendPlayerCardStyle";
import useGetRecommendMusics from "./../custom hooks/useGetRecommendMusics";
import RecommendPlayerCard from "./RecommendPlayerCard";

const RecommendMusics: React.FC = () => {
  // const [musics, setMusics] = useState<RecommendMusic[]>();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const { musics, loading } = useGetRecommendMusics(pageNumber);

  const observer = useRef<IntersectionObserver>();
  const lastMusicElement = useCallback(
    (node) => {
      // if (loading) return;
      if (observer.current) {
        observer.current?.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("setPagenumber: ", pageNumber + 1);
          setPageNumber(pageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <>
      <RecommendPlayerCardStyle.Topic>
        Related to Top 3
      </RecommendPlayerCardStyle.Topic>
      {musics?.length
        ? musics.map((music, index) =>
            music.data.tracks.map((track, tindex) => (
              <div
                ref={
                  music.data.tracks.length - 1 === tindex
                    ? lastMusicElement
                    : undefined
                }
              >
                <RecommendPlayerCard
                  key={index}
                  music={track}
                  mood={music.data.mood}
                  index={index + tindex}
                />
              </div>
            ))
          )
        : null}
      <div
        style={{
          fontSize: 16,
          color: "grey",
          margin: "30px 0",
          textAlign: "center",
        }}
      >
        {loading && "Loading...."}
      </div>
    </>
  );
};

export default RecommendMusics;
