import React, { useEffect, useRef, useState } from "react";
import { RecommendedMusic } from "../interfaces/recommend";
import MusicListPlayerStyle from "./../styles/MusicListPlayerStyle";

interface Data {
  open: boolean;
  musicPlaying: RecommendedMusic;
  mainIsPlay: boolean;
  setMainIsPlay: (play: boolean) => void;
}

const MusicListPlayer: React.FC<Data> = ({
  open,
  musicPlaying,
  mainIsPlay,
  setMainIsPlay,
}) => {
  const audio = useRef<HTMLAudioElement>(new Audio());
  const [value, setValue] = useState(0);
  const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    if (!mainIsPlay) {
      audio.current.pause();
      setIsPlay(false);
      return;
    }
    if (audio !== null) {
      setIsPlay(true);
      audio.current.play();
    }
  }, [musicPlaying, mainIsPlay]);

  const updateTimeOnPlayer = () => {
    const audio_time = parseInt(audio.current.currentTime.toString());
    if (audio_time === 30) {
      setValue(0);
      audio.current.currentTime = 0;
      return;
    }
    setValue(audio_time);
  };
  audio.current.ontimeupdate = updateTimeOnPlayer;

  const pause = () => {
    audio.current.pause();
    setIsPlay(false);
    setMainIsPlay(false);
  };
  const play = () => {
    audio.current.play();
    setIsPlay(true);
    setMainIsPlay(true);
  };
  const handleChangeAudioCurrentTime = (
    event: Event,
    newValue: number | number[]
  ) => {
    setValue(newValue as number);
    audio.current.currentTime = newValue as number;
  };

  return (
    <>
      <MusicListPlayerStyle.Container open={open}>
        <audio
          onTimeUpdate={updateTimeOnPlayer}
          ref={audio}
          src={musicPlaying.previewURL}
        />
        <MusicListPlayerStyle.SliderContainer>
          <MusicListPlayerStyle.Player
            min={0}
            max={audio.current.duration ? audio.current.duration : 30}
            value={audio.current.currentTime}
            onChange={handleChangeAudioCurrentTime}
          />
        </MusicListPlayerStyle.SliderContainer>
        <MusicListPlayerStyle.PlayerContainer
          style={{ display: open ? "" : "none" }}
        >
          <MusicListPlayerStyle.LeftPart>
            <MusicListPlayerStyle.IconContainer>
              <MusicListPlayerStyle.IcnBtn onClick={isPlay ? pause : play}>
                <MusicListPlayerStyle.Icon
                  src={`/assets/icons/${isPlay ? "play" : "pause"}-white.png`}
                />
              </MusicListPlayerStyle.IcnBtn>
            </MusicListPlayerStyle.IconContainer>
            <MusicListPlayerStyle.Time>
              00:
              {parseInt(audio.current.duration.toString()) - value < 10
                ? `0${parseInt(audio.current.duration.toString()) - value}`
                : 30 - value}{" "}
              / 00:30
            </MusicListPlayerStyle.Time>
          </MusicListPlayerStyle.LeftPart>
          <MusicListPlayerStyle.MidPart>
            <MusicListPlayerStyle.AlbumCoverContainer>
              <MusicListPlayerStyle.AlbumCover
                src={musicPlaying.albumCoverURL}
              />
            </MusicListPlayerStyle.AlbumCoverContainer>
            <MusicListPlayerStyle.DetailContainer>
              <MusicListPlayerStyle.Title>
                {musicPlaying.title}
              </MusicListPlayerStyle.Title>
              <MusicListPlayerStyle.Artist>
                {musicPlaying.artists.map((artist) => artist)}
              </MusicListPlayerStyle.Artist>
            </MusicListPlayerStyle.DetailContainer>
          </MusicListPlayerStyle.MidPart>
          <MusicListPlayerStyle.RightPart>
            <MusicListPlayerStyle.FavBtn>
              <MusicListPlayerStyle.FavIcon src="/assets/icons/liked.png" />
            </MusicListPlayerStyle.FavBtn>
          </MusicListPlayerStyle.RightPart>
        </MusicListPlayerStyle.PlayerContainer>
      </MusicListPlayerStyle.Container>
    </>
  );
};

export default MusicListPlayer;
