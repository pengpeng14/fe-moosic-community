import React, {
  createRef,
  Dispatch,
  RefObject,
  useLayoutEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { IImageCard } from "../interfaces/ISmallPostCard";
import ImageCardStyle from "../styles/ImageCardStyle";
import { selectVisitedProfile } from "./../reducers/profileSlice";
import { selectUser } from "./../reducers/userSlice";
import MenuButton from "./MenuButton";
import PlayerPanel from "./PlayerPanel";

// data from small-post-card component sent
// data set: img, music data, mood
// and we pass music data to Player Panel

const ImageCard: React.FC<IImageCard> = ({ change, music, playlist, post }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPlay, setIsPlay] = useState(false);

  const titleRef = createRef<HTMLDivElement>();
  const artistRef = createRef<HTMLDivElement>();

  const [isTitleOverflow, setIsTitleOverflow] = useState(false);
  const [titleOverflowDiff, setTitleOverflowDiff] = useState(0);
  const [isArtistOverflow, setIsArtistOverflow] = useState(false);
  const [artistOverflowDiff, setArtistOverflowDiff] = useState(0);

  const currentUser = useSelector(selectUser);
  const userProfile = useSelector(selectVisitedProfile);

  const location = useLocation();

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

  const handlePlayPanel = () => {
    if (!isPlay) {
      setIsHovered(false);
    }
  };

  return (
    <ImageCardStyle.TopPaper
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={handlePlayPanel}
    >
      <ImageCardStyle.ShadowButtomPaper />
      <ImageCardStyle.ImgBG src={post.img} />
      <ImageCardStyle.TopContainer>
        {/* if it's owner */}
        {post.user ? (
          currentUser.id === post.user.id &&
          !location.pathname.includes("/ranked") ? (
            <ImageCardStyle.SettingContainer>
              <MenuButton
                change={change}
                postId={post.id}
                url={music.previewURL}
              />
            </ImageCardStyle.SettingContainer>
          ) : (
            <div />
          )
        ) : userProfile.user.id === currentUser.id ? (
          <ImageCardStyle.SettingContainer>
            <MenuButton
              change={change}
              postId={post.id}
              url={music.previewURL}
            />
          </ImageCardStyle.SettingContainer>
        ) : (
          <div />
        )}
        <ImageCardStyle.DetailsContainer hovered={isHovered}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: 50,
            }}
          >
            <div
              style={{
                display: "flex",
                width: "fit-content",
                overflow: "hidden",
              }}
            >
              <img
                src={music.albumCoverURL}
                alt=""
                style={{
                  marginRight: 10,
                  borderRadius: 2,
                  boxShadow: "0 1px 5px black",
                }}
              />
              <div style={{ width: "calc(100% - 60px)" }}>
                <div ref={titleRef} style={{ overflow: "hidden" }}>
                  <ImageCardStyle.Title
                    change={change}
                    animated={isTitleOverflow && isPlay}
                    value={titleOverflowDiff}
                  >
                    {music.title}
                  </ImageCardStyle.Title>
                </div>
                <div ref={artistRef} style={{ overflow: "hidden" }}>
                  <ImageCardStyle.Artist
                    change={change}
                    animated={isArtistOverflow && isPlay}
                    value={artistOverflowDiff}
                  >
                    {music.artists.map((artist) => artist + " ")}
                  </ImageCardStyle.Artist>
                </div>
              </div>
            </div>
            <ImageCardStyle.MoodContainer>
              <ImageCardStyle.Mood
                style={{ fontSize: 14, lineHeight: 0.8, color: "#aaaaaa" }}
              >
                #{playlist.mood}
              </ImageCardStyle.Mood>
            </ImageCardStyle.MoodContainer>
          </div>
          <ImageCardStyle.MusicDetailsContainer style={{ marginTop: 10 }}>
            <PlayerPanel
              isPlay={isPlay}
              setIsPlay={setIsPlay}
              previewURL={music.previewURL}
              postId={post.id}
            />
          </ImageCardStyle.MusicDetailsContainer>
        </ImageCardStyle.DetailsContainer>
      </ImageCardStyle.TopContainer>
    </ImageCardStyle.TopPaper>
  );
};

export default ImageCard;
