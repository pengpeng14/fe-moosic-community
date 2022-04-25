import { Dialog, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeExportPostBox,
  selectExportPostBoxState,
} from "../reducers/exportBoxSlice";
import { selectMusic } from "../reducers/musicSlice";
import ButtonPureStyle from "../styles/ButtonPureStyle";
import MusicListCardStyle from "../styles/MusicListCardStyle";
import CreatePostBoxStyle from "./../styles/CreatePostBoxStyle";
import AlertCard from "./AlertCard";
import ExportMusicListCard from "./ExportMusicListCard";
import SpotifyMusicPostDialogue from "./SpotifyMusicPostDialogue";

// interface IDetails {
//   open: boolean;
//   setOpen: (value: boolean) => void;
//   postData?: PostEditData;
//   defaultMusicURL: string;
//   handleCloseMenu: () => void;
// }

interface DataIndex {
  pIndex: number;
  mIndex: number;
}

const ExportPostBox: React.FC = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const currentMusic = useSelector(selectMusic);
  const dispatch = useDispatch();
  const [selectedMusics, setSelectedMusics] = useState<DataIndex[]>([]);
  const [openSpotifyBox, setOpenSpotifyBox] = useState(false);
  const [trackIds, setTrackIds] = useState<string[]>([]);
  const currentExportBoxState = useSelector(selectExportPostBoxState);

  // useEffect(() => {
  //   if (selectedMusics.length === 0) {
  //     setDisableBtn(true);
  //     return;
  //   }
  //   setDisableBtn(false);
  // }, [selectedMusics]);

  const cancleExport = (isCancle: boolean) => {
    setOpenAlert(false);
    if (!isCancle) {
      return;
    }
    clearState();
    // accept cancle clear setting
  };

  const clearState = () => {
    setOpenAlert(false);
    setDisableBtn(false);
    // setOpen(false);
    dispatch(closeExportPostBox());
  };

  const getAllTrackIds = () => {
    const tracks: string[] = [];
    if (currentExportBoxState.postData) {
      selectedMusics.forEach((music) =>
        tracks.push(
          currentExportBoxState.postData.data.playlists[music.pIndex].musics[
            music.mIndex
          ].spotifyId
        )
      );
    }
    setTrackIds(tracks);
  };

  return (
    <>
      <Dialog
        open={currentExportBoxState.isOpen}
        maxWidth="md"
        PaperProps={{
          style: { backgroundColor: "transparent", borderRadius: "20px" },
        }}
      >
        <CreatePostBoxStyle.PaperCard>
          <CreatePostBoxStyle.TitleCard>
            Export Post
          </CreatePostBoxStyle.TitleCard>
          <CreatePostBoxStyle.ChildPaper>
            <CreatePostBoxStyle.LeftContainer>
              <CreatePostBoxStyle.PictureArea>
                <CreatePostBoxStyle.Picture src={currentExportBoxState.img} />
              </CreatePostBoxStyle.PictureArea>
              <CreatePostBoxStyle.ButtonContainer>
                <ButtonPureStyle.ButtonPureTransparent
                  onClick={() => setOpenAlert(true)}
                >
                  Cancle
                </ButtonPureStyle.ButtonPureTransparent>
                <ButtonPureStyle.ButtonPureColour
                  disabled={disableBtn}
                  onClick={() => {
                    getAllTrackIds();
                    setOpenSpotifyBox(true);
                  }}
                >
                  Export
                </ButtonPureStyle.ButtonPureColour>
              </CreatePostBoxStyle.ButtonContainer>
            </CreatePostBoxStyle.LeftContainer>
            <CreatePostBoxStyle.RightContainer>
              {currentExportBoxState.postData.data.playlists.length > 0 ? (
                <MusicListCardStyle.PaperContainer>
                  {currentExportBoxState.postData.data.playlists.map(
                    (playlist, pindex) =>
                      playlist.musics.map(
                        (music, mindex) =>
                          music &&
                          music.previewURL && (
                            <ExportMusicListCard
                              key={`${pindex}-${mindex}`}
                              mood={playlist.mood}
                              track={music}
                              playlistIndex={pindex}
                              musicIndex={mindex}
                              playlistId={playlist.id}
                              musicId={music.id}
                              setSelectedMusics={setSelectedMusics}
                              selectedMusics={selectedMusics}
                              setDisableBtn={setDisableBtn}
                            />
                          )
                      )
                  )}
                </MusicListCardStyle.PaperContainer>
              ) : (
                <CreatePostBoxStyle.RightContainer>
                  <MusicListCardStyle.LoadingContainer>
                    <Typography
                      style={{
                        color:
                          currentExportBoxState.message !== "Loading..."
                            ? "#aa0914"
                            : "black",
                      }}
                    >
                      {currentExportBoxState.message}
                    </Typography>
                  </MusicListCardStyle.LoadingContainer>
                </CreatePostBoxStyle.RightContainer>
              )}
            </CreatePostBoxStyle.RightContainer>
          </CreatePostBoxStyle.ChildPaper>
        </CreatePostBoxStyle.PaperCard>
      </Dialog>
      <AlertCard type="cancleExport" cancle={cancleExport} open={openAlert} />
      {openSpotifyBox && (
        <SpotifyMusicPostDialogue
          open={openSpotifyBox}
          selectedMusics={trackIds}
          postData={currentExportBoxState.postData}
          setOpen={setOpenSpotifyBox}
        />
      )}
    </>
  );
};

export default ExportPostBox;
