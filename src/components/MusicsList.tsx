import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useGetUserPlaylist from "../custom hooks/userGetUserPlaylist";
import { RecommendMusic } from "../interfaces/post/Posts";
import { RecommendedMusic } from "../interfaces/recommend";
import { selectPlaylistPage } from "../reducers/profileSlice";
import recommend from "../services/recommend";
import MusicListStyle from "../styles/MusicListStyle";
import UtilStyle from "../styles/UtilStyle";
import "./../styles/MusicListCSS.css";
import MusicListPlayer from "./MusicListPlayer";

// loop musics list here

interface IData {
  exportState: boolean;
  setMainMusics: (value: RecommendedMusic[]) => void;
  setSelectedMusics: (value: number[]) => void;
  selectedMusics: number[];
  setDisableExportBtn: (value: boolean) => void;
}

const MusicsList: React.FC<IData> = ({
  exportState,
  setSelectedMusics,
  setMainMusics,
  selectedMusics,
  setDisableExportBtn,
}) => {
  const currentPlaylistPage = useSelector(selectPlaylistPage);

  const [open, setOpen] = useState(false);
  const [mouseEnter, setMouseEnter] = useState({ hover: false, index: -1 });
  const [musicPlaying, setMusicPlaying] = useState<RecommendedMusic>();
  const [isPlay, setIsPlay] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState(-1);
  const [pageNumber, setPageNumber] = useState(currentPlaylistPage.currentPage);

  const { setMusics, musics, loading, error } = useGetUserPlaylist(pageNumber);

  useEffect(() => {
    setMainMusics(musics);
  }, [musics]);

  const observer = useRef<IntersectionObserver>();
  const lastMusicElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) {
        observer.current?.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (
            currentPlaylistPage.total ===
            currentPlaylistPage.currentPage + 1
          ) {
            console.log(
              currentPlaylistPage.total,
              currentPlaylistPage.currentPage
            );
            return;
          }
          setPageNumber(currentPlaylistPage.currentPage + 1);
          console.log("update page");
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const play = (index: number) => {
    //get music data with index in mouse enter
    //setMusicPlaying and send to MusicPlayer

    // list display
    setIsPlay(true);

    // open player
    setOpen(true);
    console.log("music index: ", index);
    setMusicPlaying(musics[index]);
    setCurrentPlaying(index);
  };

  const pause = (index: number) => {
    console.log("pause", index);
    if (index !== currentPlaying) {
      setIsPlay(true);
      setMusicPlaying(musics[index]);
      setCurrentPlaying(index);
      return;
    }
    setIsPlay(false);
  };

  const handleCheck = (index: number) => {
    if (selectedMusics.includes(index)) {
      const filtered = selectedMusics.filter((num) => num !== index);
      console.log("filtered: ", filtered);
      if (filtered.length === 0) {
        setDisableExportBtn(true);
      } else {
        setDisableExportBtn(false);
      }
      setSelectedMusics(filtered);
      return;
    }
    const values = selectedMusics;
    values.push(index);
    setSelectedMusics(values);
    if (values.length === 0) {
      setDisableExportBtn(true);
    } else {
      setDisableExportBtn(false);
    }
    console.log("values: ", values);
  };

  const handleUnLikeMusic = async (id: string) => {
    await recommend.unlike(id);
    setMusics(musics.filter((m) => m.id !== id));
  };

  const handleSelectAll = () => {
    // set every index in musics
    // setSelectedMusics();
  };

  const handleDeSelect = () => {
    setSelectedMusics([]);
  };

  const handleCheckChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    console.log(selectedMusics.includes(index));
    event.target.checked = selectedMusics.includes(index);
  };

  const unlike = async (music: RecommendMusic) => {
    const response = await recommend.unlike(music.id);
    if (response.success) {
      // ui remove from playlist;
    }
  };

  return (
    <div>
      <MusicListStyle.List style={{ fontWeight: "bold" }}>
        <MusicListStyle.LeftPart>Title</MusicListStyle.LeftPart>
        <MusicListStyle.MidPart>Artists</MusicListStyle.MidPart>
        <MusicListStyle.MidPart>Album</MusicListStyle.MidPart>
        <MusicListStyle.RightPart style={{ justifyContent: "start" }}>
          Length
        </MusicListStyle.RightPart>
      </MusicListStyle.List>
      <div style={{ marginBottom: open ? 120 : 10 }}>
        {musics.map((music, index) => (
          <MusicListStyle.List
            id="MusicListHover"
            onMouseEnter={() => {
              !exportState && setMouseEnter({ hover: true, index });
            }}
            onMouseLeave={() => {
              !exportState && setMouseEnter({ hover: false, index: -1 });
            }}
            onClick={() => console.log(index)}
            key={index}
            style={{
              backgroundColor:
                currentPlaying === index ? "rgb(235,217,244)" : "",
            }}
            ref={index + 1 === musics.length ? lastMusicElement : undefined}
          >
            <MusicListStyle.LeftPart>
              {exportState ? (
                <MusicListStyle.CheckboxStyle
                  // checked={selectedMusics.includes(index)}
                  onClick={() => handleCheck(index)}
                  // onChange={(event) => handleCheckChange(event, index)}
                  id={`music-in-playlist-${index}`}
                />
              ) : null}
              <MusicListStyle.BasicMusicContainer selection={exportState}>
                <MusicListStyle.IconContainer>
                  <MusicListStyle.IcnBtn
                    onClick={() => (isPlay ? pause(index) : play(index))}
                  >
                    <MusicListStyle.Icon
                      hidden={
                        currentPlaying === index
                          ? false
                          : !(index === mouseEnter.index)
                      }
                      src={`/assets/icons/${
                        isPlay && currentPlaying === index ? "play" : "pause"
                      }-white.png`}
                    />
                  </MusicListStyle.IcnBtn>
                  <MusicListStyle.AlbumCover src={music.albumCoverURL} />
                </MusicListStyle.IconContainer>
                <MusicListStyle.Title>{music.title}</MusicListStyle.Title>
              </MusicListStyle.BasicMusicContainer>
            </MusicListStyle.LeftPart>

            <MusicListStyle.MidPart>
              <MusicListStyle.Artist>
                {music.artists.map((artist) => artist)}
              </MusicListStyle.Artist>
            </MusicListStyle.MidPart>

            <MusicListStyle.MidPart>
              <MusicListStyle.Artist>{music.album}</MusicListStyle.Artist>
            </MusicListStyle.MidPart>

            <MusicListStyle.RightPart>
              <MusicListStyle.Time>00:30</MusicListStyle.Time>
              <MusicListStyle.FavBtn
                onClick={() => handleUnLikeMusic(music.id)}
              >
                <MusicListStyle.FavIcon src="/assets/icons/liked.png" />
              </MusicListStyle.FavBtn>
            </MusicListStyle.RightPart>
          </MusicListStyle.List>
        ))}
      </div>

      {loading ? (
        <UtilStyle.Loading style={{ marginTop: 30 }}>
          Loading...
        </UtilStyle.Loading>
      ) : null}
      {open
        ? musicPlaying && (
            <MusicListPlayer
              open={open}
              musicPlaying={musicPlaying}
              mainIsPlay={isPlay}
              setMainIsPlay={setIsPlay}
            />
          )
        : null}
    </div>
  );
};

export default MusicsList;
