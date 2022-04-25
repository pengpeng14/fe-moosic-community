import React, {
  createRef,
  Dispatch,
  RefObject,
  useLayoutEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { RecommendMusic } from "../interfaces/post/Posts";
import recommend from "../services/recommend";
import RecommendPlayerCardStyle from "../styles/RecommendPlayerCardStyle";
import musicUtils from "../utils/musicUtils";
import RecommendPlayerPanel from "./RecommendPlayerPanel";
import { selectUser } from "./../reducers/userSlice";
import { current } from "@reduxjs/toolkit";

interface IMusic {
  music: RecommendMusic;
  mood: string;
  index: number;
}

const RecommendPlayerCard: React.FC<IMusic> = ({ music, mood, index }) => {
  const currentUser = useSelector(selectUser);
  const titleRef = createRef<HTMLDivElement>();
  const artistRef = createRef<HTMLDivElement>();

  const [isTitleOverflow, setIsTitleOverflow] = useState(false);
  const [titleOverflowDiff, setTitleOverflowDiff] = useState(0);
  const [isArtistOverflow, setIsArtistOverflow] = useState(false);
  const [artistOverflowDiff, setArtistOverflowDiff] = useState(0);

  const [isLike, setIsLike] = useState<boolean>(false);
  const [isPlay, setPlay] = useState(false);

  useLayoutEffect(() => {
    const calAnimation = (
      ref: RefObject<HTMLDivElement>,
      setOverflowState: Dispatch<React.SetStateAction<boolean>>,
      setDiffState: Dispatch<React.SetStateAction<number>>
    ) => {
      const current = ref.current;

      if (!current) return;

      if (current.clientWidth < current.scrollWidth) {
        setOverflowState(true);
        setDiffState((1 - current.clientWidth / current.scrollWidth) * 100);
      } else {
        setOverflowState(false);
        setDiffState(0);
      }
    };

    calAnimation(titleRef, setIsTitleOverflow, setTitleOverflowDiff);
    calAnimation(artistRef, setIsArtistOverflow, setArtistOverflowDiff);
  }, [titleRef, artistRef]);

  const like = async () => {
    console.log(isLike);
    if (!isLike) {
      setIsLike(true);
      const body = musicUtils.formatRecommendMusicBody(
        music,
        currentUser.id,
        mood
      );
      console.log("Format body: ", body);
      return recommend.like(body);
    }
    const response = await recommend.unlike(music.id);
    if (response.success) {
      setIsLike(false);
    }
  };

  return (
    <>
      <RecommendPlayerCardStyle.PaperCard>
        <RecommendPlayerCardStyle.TopPaperCard image={music.albumCoverURL}>
          <RecommendPlayerCardStyle.FavBtn
            onClick={like}
            id={`like-recommend-music-${index}`}
          >
            <RecommendPlayerCardStyle.FavIcon
              liked={isLike}
              src={`/assets/icons/${isLike ? "liked" : "unlike"}.png`}
            />
          </RecommendPlayerCardStyle.FavBtn>
          <RecommendPlayerCardStyle.TopPart>
            <div style={{ display: "flex", width: "80%" }}>
              <img
                alt=""
                src={music.albumCoverURL}
                style={{
                  width: "50px",
                  marginRight: "10px",
                  borderRadius: 3,
                  boxShadow: "0px 1px 5px black",
                }}
              />
              <div style={{ width: "inherit" }}>
                <div ref={titleRef} style={{ overflow: "hidden" }}>
                  <RecommendPlayerCardStyle.Title
                    animated={isTitleOverflow && isPlay}
                    value={titleOverflowDiff}
                  >
                    <span>{music.title}</span>
                  </RecommendPlayerCardStyle.Title>
                </div>
                <div ref={artistRef} style={{ overflow: "hidden" }}>
                  <RecommendPlayerCardStyle.Artist
                    animated={isArtistOverflow && isPlay}
                    value={artistOverflowDiff}
                  >
                    <span>
                      {music.artists.map((artist, index) => artist + " ")}
                    </span>
                  </RecommendPlayerCardStyle.Artist>
                </div>
              </div>
            </div>
            <RecommendPlayerCardStyle.Mood>
              #{mood}
            </RecommendPlayerCardStyle.Mood>
          </RecommendPlayerCardStyle.TopPart>
          <RecommendPlayerCardStyle.BottomPart>
            <RecommendPlayerPanel
              isPlay={isPlay}
              setIsPlay={setPlay}
              musicId={music.id}
              previewURL={music.previewURL}
            />
          </RecommendPlayerCardStyle.BottomPart>
        </RecommendPlayerCardStyle.TopPaperCard>
      </RecommendPlayerCardStyle.PaperCard>
    </>
  );
};

export default RecommendPlayerCard;
