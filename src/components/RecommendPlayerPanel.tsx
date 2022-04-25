import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clear,
  selectMusic,
  playpauseInFeed as playpause,
} from "../reducers/musicSlice";
import RecommendPlayerCardStyle from "../styles/RecommendPlayerCardStyle";

interface IData {
  isPlay: boolean;
  setIsPlay: Dispatch<SetStateAction<boolean>>;
  musicId: string;
  previewURL: string;
}

const RecommendPlayerPanel: React.FC<IData> = ({
  musicId,
  previewURL,
  isPlay,
  setIsPlay,
}) => {
  const dispatch = useDispatch();
  const currentPlaying = useSelector(selectMusic);
  // const [isPlay, setIsPlay] = useState(false);
  const [value, setValue] = useState<number>(0);
  const audio = useRef<HTMLAudioElement>(new Audio());

  useEffect(() => {
    if (currentPlaying.musicId === musicId) {
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
      <RecommendPlayerCardStyle.PlayerBtn
        onClick={() => {
          dispatch(playpause({ id: musicId, previewURL }));
        }}
      >
        <audio onTimeUpdate={updateTimeOnPlayer} ref={audio} src={previewURL} />
        <RecommendPlayerCardStyle.PlayerIcon
          src={`/assets/icons/${isPlay ? "play" : "pause"}-white.png`}
        />
      </RecommendPlayerCardStyle.PlayerBtn>
      <RecommendPlayerCardStyle.PlayerContainer>
        <RecommendPlayerCardStyle.TimeContainer>
          <RecommendPlayerCardStyle.Time>
            {previewURL ? `00:${value < 10 ? "0" + value : value}` : "--:--"}
          </RecommendPlayerCardStyle.Time>
          <RecommendPlayerCardStyle.Time>
            {previewURL
              ? `00:${
                  parseInt(audio.current.duration.toString()) - value < 10
                    ? "0" +
                      (parseInt(audio.current.duration.toString()) - value)
                    : 30 - value
                }`
              : "--:--"}
          </RecommendPlayerCardStyle.Time>
        </RecommendPlayerCardStyle.TimeContainer>
        <RecommendPlayerCardStyle.Player
          min={0}
          max={audio.current.duration ? audio.current.duration : 30}
          value={audio.current.currentTime}
          onChange={handleChangeAudioCurrentTime}
          className="MuiSlider-track"
        />
      </RecommendPlayerCardStyle.PlayerContainer>
    </>
  );
};

export default RecommendPlayerPanel;
