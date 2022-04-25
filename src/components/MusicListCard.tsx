import React, { useState, useEffect } from "react";
import MusicListCardStyle from "../styles/MusicListCardStyle";
import MusicListCardPlayer from "./MusicListCardPlayer";
import { IMusicListCard } from "../interfaces/ICreatePostBox";
import { useDispatch, useSelector } from "react-redux";
import { select, selectMusic } from "../reducers/musicSlice";

const MusicListCard: React.FC<IMusicListCard> = ({
  track,
  mood,
  musicIndex,
  playlistIndex,
  playlistId,
  musicId,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();
  const currentSelect = useSelector(selectMusic);
  // console.log("Music list card");

  useEffect(() => {
    // console.log("Music list card useEffect");
    if (currentSelect.selectedId === track.id) {
      console.log("selected");
      console.log(currentSelect.selectedId, track.id);
      setIsSelected(currentSelect.isSelected);
      return;
    }
    setIsSelected(false);
  }, [currentSelect]);
  console.log("albumcover: ", track.albumCoverURL);
  return (
    <>
      <MusicListCardStyle.ListCard selected={isSelected}>
        <MusicListCardStyle.TopDetailsContainer
          onClick={() =>
            dispatch(
              select({
                id: track.id,
                playlistIndex,
                musicIndex,
                playlistId,
                musicId,
              })
            )
          }
          id={`music-list-${playlistIndex}${musicIndex}`}
        >
          <div>
            <MusicListCardStyle.AlbumCover
              selected={isSelected}
              src={track.albumCoverURL}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <MusicListCardStyle.MusicDetails>
              <MusicListCardStyle.Title selected={isSelected}>
                {track.title}
              </MusicListCardStyle.Title>
              <MusicListCardStyle.Artist selected={isSelected}>
                {track.artists.map((artist) => artist + " ")}
              </MusicListCardStyle.Artist>
            </MusicListCardStyle.MusicDetails>
            <MusicListCardStyle.Mood selected={isSelected}>
              #{mood}
            </MusicListCardStyle.Mood>
          </div>
        </MusicListCardStyle.TopDetailsContainer>
        <MusicListCardPlayer
          track={track}
          mood={mood}
          playlistIndex={playlistIndex}
          musicIndex={musicIndex}
          isSelected={isSelected}
          playlistId={playlistId}
          musicId={musicId}
        />
      </MusicListCardStyle.ListCard>
      <div style={{ marginBottom: "20px" }} />
    </>
  );
};

export default MusicListCard;
