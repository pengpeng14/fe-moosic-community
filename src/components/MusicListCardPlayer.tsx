import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clear,
  playpauseInCreate as playpause,
  selectMusic,
} from "../reducers/musicSlice";
import MusicListCardStyle from "../styles/MusicListCardStyle";
import { IMusicListCard } from "../interfaces/ICreatePostBox";

interface IMusicPlayer extends IMusicListCard {
  isSelected: boolean;
}

const MusicListCaPlayer: React.FC<IMusicPlayer> = ({ track, isSelected }) => {
  const currentPlaying = useSelector(selectMusic);
  const dispatch = useDispatch();
  const [audio, setAudio] = useState(new Audio(track.previewURL));
  const [value, setValue] = useState<number>(0);
  // const [isSelect, setIsSelect] = useState(false);

  console.log("Music Player");

  useEffect(() => {
    // console.log("Music palayer card useEffect");
    if (currentPlaying.playingId === track.id) {
      audio.play();
      return;
    }
    audio.pause();
  }, [currentPlaying]);

  const updateTimeOnPlayer = () => {
    const audio_time = parseInt(audio.currentTime.toString());
    if (audio_time === 30) {
      setValue(0);
      audio.currentTime = 0;
      dispatch(clear());
      return;
    }
    setValue(audio_time);
  };
  audio.ontimeupdate = updateTimeOnPlayer;

  const handleChangeAudioCurrentTime = (
    event: Event,
    newValue: number | number[]
  ) => {
    setValue(newValue as number);
    audio.currentTime = newValue as number;
  };

  return (
    <>
      <MusicListCardStyle.ButtomContainer>
        <MusicListCardStyle.PlayerBtn
          onClick={() => dispatch(playpause(track.id))}
        >
          <MusicListCardStyle.PlayerIcon
            selected={isSelected}
            src={`/assets/icons/${
              currentPlaying.playingId === track.id && currentPlaying.isPlaying
                ? "play"
                : "pause"
            }.png`}
          />
        </MusicListCardStyle.PlayerBtn>
        <MusicListCardStyle.PlayerContainer>
          <MusicListCardStyle.TimeContainer>
            <MusicListCardStyle.Time selected={isSelected}>
              00:{value < 10 ? `0${value}` : value}
            </MusicListCardStyle.Time>
            <MusicListCardStyle.Time selected={isSelected}>
              -00:
              {parseInt(audio.duration.toString()) - value < 10
                ? `0${parseInt(audio.duration.toString()) - value}`
                : 30 - value}
            </MusicListCardStyle.Time>
          </MusicListCardStyle.TimeContainer>
          <MusicListCardStyle.Player
            min={0}
            selected={isSelected}
            max={audio.duration ? audio.duration : 30}
            value={audio.currentTime}
            onChange={handleChangeAudioCurrentTime}
            className="MuiSlider-track"
          />
        </MusicListCardStyle.PlayerContainer>
      </MusicListCardStyle.ButtomContainer>
    </>
  );
};

export default MusicListCaPlayer;
