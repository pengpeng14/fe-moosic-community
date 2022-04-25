import React, { useState, useEffect } from "react";
import MusicListCardStyle from "../styles/MusicListCardStyle";
import { isEqual } from "../utils/isEqual";
import MusicListCardPlayer from "./MusicListCardPlayer";
import { IMusicListCard } from "../interfaces/ICreatePostBox";
import { useDispatch, useSelector } from "react-redux";
import { select, selectMusic } from "../reducers/musicSlice";

interface DataIndex {
  pIndex: number;
  mIndex: number;
}

interface IData extends IMusicListCard {
  setSelectedMusics: (data: DataIndex[]) => void;
  selectedMusics: DataIndex[];
  setDisableBtn: (value: boolean) => void;
}

const ExportMusicListCard: React.FC<IData> = ({
  track,
  mood,
  musicIndex,
  playlistIndex,
  playlistId,
  musicId,
  selectedMusics,
  setSelectedMusics,
  setDisableBtn,
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
      console.log(playlistIndex, musicIndex);
      setIsSelected(currentSelect.isSelected);
      const obj = { pIndex: playlistIndex, mIndex: musicIndex };
      const oldVal = selectedMusics;
      oldVal.push(obj);
      setSelectedMusics(oldVal);
      return;
    }
    setIsSelected(false);
  }, [currentSelect]);

  // useEffect(() => {
  //   if (selectedMusics.length > 0) {
  //     setDisableBtn(false);
  //     return;
  //   }
  //   setDisableBtn(true);
  // }, [selectedMusics]);

  const handleSelect = (playlistIndex: number, musicIndex: number) => {
    let isFound = false;
    for (let i = 0; i < selectedMusics.length; i++) {
      if (
        selectedMusics[i].pIndex === playlistIndex &&
        selectedMusics[i].mIndex === musicIndex
      ) {
        isFound = true;
        const filtered = selectedMusics.filter((music, index) => index !== i);
        setSelectedMusics(filtered);
        return;
      }
    }
    if (selectedMusics.length + 1 === 0) {
      console.log("zero");
      setDisableBtn(true);
    }
    if (!isFound) {
      setIsSelected(!isSelected);
      console.log("onclick");
      const obj = { pIndex: playlistIndex, mIndex: musicIndex };
      const oldVal = selectedMusics;
      oldVal.push(obj);
      setSelectedMusics(oldVal);
      console.log(oldVal);
    }
    setDisableBtn(false);
  };
  console.log("Albumcover export: ", track.albumCoverURL);
  return (
    <>
      <MusicListCardStyle.ListCard
        selected={
          selectedMusics.filter(
            (s) => s.pIndex === playlistIndex && s.mIndex === musicIndex
          ).length > 0
        }
      >
        <MusicListCardStyle.TopDetailsContainer
          onClick={() => {
            handleSelect(playlistIndex, musicIndex);
          }}
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
              <MusicListCardStyle.Title
                selected={
                  selectedMusics.filter(
                    (s) => s.pIndex === playlistIndex && s.mIndex === musicIndex
                  ).length > 0
                }
              >
                {track.title}
              </MusicListCardStyle.Title>
              <MusicListCardStyle.Artist
                selected={
                  selectedMusics.filter(
                    (s) => s.pIndex === playlistIndex && s.mIndex === musicIndex
                  ).length > 0
                }
              >
                {track.artists.map((artist) => artist + " ")}
              </MusicListCardStyle.Artist>
            </MusicListCardStyle.MusicDetails>
            <MusicListCardStyle.Mood
              selected={
                selectedMusics.filter(
                  (s) => s.pIndex === playlistIndex && s.mIndex === musicIndex
                ).length > 0
              }
            >
              #{mood}
            </MusicListCardStyle.Mood>
          </div>
        </MusicListCardStyle.TopDetailsContainer>
        <MusicListCardPlayer
          track={track}
          mood={mood}
          playlistIndex={playlistIndex}
          musicIndex={musicIndex}
          isSelected={
            selectedMusics.filter(
              (s) => s.pIndex === playlistIndex && s.mIndex === musicIndex
            ).length > 0
          }
          playlistId={playlistId}
          musicId={musicId}
        />
      </MusicListCardStyle.ListCard>
      <div style={{ marginBottom: "20px" }} />
    </>
  );
};

export default ExportMusicListCard;
