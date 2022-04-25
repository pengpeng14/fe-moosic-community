import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clear,
  playpauseInFeed as playpause,
  selectMusic,
} from "../reducers/musicSlice";
import PlayerPanelStyle from "../styles/PlayerPanelStyle";

interface IDetails {
  previewURL: string;
  postId: string;
  isPlay: boolean;
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlayerPanel: React.FC<IDetails> = ({
  previewURL,
  postId,
  isPlay,
  setIsPlay,
}) => {
  const dispatch = useDispatch();
  const currentPlaying = useSelector(selectMusic);
  const [value, setValue] = useState<number>(0);
  const audio = useRef<HTMLAudioElement>(new Audio());

  useEffect(() => {
    if (currentPlaying.postId === postId) {
      if (audio !== null) {
        audio.current.play();
      }
      setIsPlay(true);
      return;
    }
    audio.current.pause();
    setIsPlay(false);
  }, [currentPlaying]);

  const updateTimeOnPlayer = () => {
    const audio_time = parseInt(audio.current.currentTime.toString());
    if (audio_time === 30) {
      setValue(0);
      audio.current.currentTime = 0;
      dispatch(clear());
      return;
    }
    setValue(audio_time);
  };
  audio.current.ontimeupdate = updateTimeOnPlayer;

  const handleChangeAudioCurrentTime = (
    event: Event,
    newValue: number | number[]
  ) => {
    setValue(newValue as number);
    audio.current.currentTime = newValue as number;
  };

  return (
    <>
      <PlayerPanelStyle.Container>
        <audio
          onTimeUpdate={updateTimeOnPlayer}
          ref={audio}
          src={currentPlaying.playingURL}
        />
        <PlayerPanelStyle.PlayerBtn
          onClick={() => {
            dispatch(playpause({ id: postId, previewURL }));
          }}
        >
          <PlayerPanelStyle.PlayerIcon
            playing={isPlay}
            src={`/assets/icons/${isPlay ? "play" : "pause"}.png`}
            id={`play-pause-button-${postId}`}
          />
        </PlayerPanelStyle.PlayerBtn>
        <PlayerPanelStyle.PlayerContainer>
          <PlayerPanelStyle.TimeContainer>
            <PlayerPanelStyle.Time>
              {previewURL ? `00:${value < 10 ? "0" + value : value}` : "--:--"}
            </PlayerPanelStyle.Time>
            <PlayerPanelStyle.Time>
              {previewURL
                ? `00:${
                    parseInt(audio.current.duration.toString()) - value < 10
                      ? "0" +
                        (parseInt(audio.current.duration.toString()) - value)
                      : 30 - value
                  }`
                : "--:--"}
            </PlayerPanelStyle.Time>
          </PlayerPanelStyle.TimeContainer>
          <PlayerPanelStyle.Player
            min={0}
            max={audio.current.duration ? audio.current.duration : 30}
            value={audio.current.currentTime}
            onChange={handleChangeAudioCurrentTime}
          />
        </PlayerPanelStyle.PlayerContainer>
      </PlayerPanelStyle.Container>
    </>
  );
};

export default PlayerPanel;
