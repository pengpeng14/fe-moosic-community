import React, { useEffect, useState } from "react";
import { Dialog, Typography } from "@mui/material";
import CreatePostBoxStyle from "./../styles/CreatePostBoxStyle";
import ButtonPureStyle from "../styles/ButtonPureStyle";
import MusicListCardStyle from "../styles/MusicListCardStyle";
import MusicListCard from "./MusicListCard";
import AlertCard from "./AlertCard";
import { PostEditData } from "../interfaces/post/Posts";
import { useDispatch, useSelector } from "react-redux";
import { clear, selectMusic } from "../reducers/musicSlice";
import post from "./../services/post";
import { updatePost } from "../reducers/postsSlice";
import { Playlist } from "./../interfaces/post/PlaylistAnalyze";
import { openResultCard } from "../reducers/resultCardSlice";
import {
  closeEditPostBox,
  selectEditPostBoxState,
} from "../reducers/editPostBoxSlice";

// interface IDetails {
//   open: boolean;
//   setOpen: (value: boolean) => void;
//   postData?: PostEditData;
//   defaultMusicURL: string;
//   handleCloseMenu: () => void;
//   img: string;
//   message: string;
// }

const EditPostBox: React.FC = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const currentMusic = useSelector(selectMusic);
  const dispatch = useDispatch();
  const currentEditPostBox = useSelector(selectEditPostBoxState);

  // const [oldPlaylists, setOldPlaylists] = useState<Playlist[]>([]);
  // const [keywords, setKeywords] = useState<string[]>(["All"]);
  // const [selectedKeyword, setSelectedKeyword] = useState<string>("All");

  useEffect(() => {
    if (
      currentMusic.selectedId === currentEditPostBox.url ||
      !currentMusic.selectedId.length
    ) {
      setDisableBtn(true);
      return;
    }
    setDisableBtn(false);
  }, [currentMusic]);

  const cancleEditing = (isCancle: boolean) => {
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
    dispatch(closeEditPostBox());
  };

  const update = async () => {
    const obj = {
      musicId: currentMusic.musicId,
      playlistId: currentMusic.playlistId,
    };
    if (currentEditPostBox.postData?.data.id) {
      const response = await post.updatePost(
        obj,
        currentEditPostBox.postData?.data.id
      );

      if (response.success) {
        dispatch(updatePost(response.data));
        dispatch(clear());
        dispatch(openResultCard("saved"));
        // handleCloseMenu();
        clearState();
      }
    }
  };

  const handleDiscard = () => {
    setOpenAlert(true);
  };

  return (
    <>
      <Dialog
        open={currentEditPostBox.isOpen}
        maxWidth="md"
        PaperProps={{
          style: { backgroundColor: "transparent", borderRadius: "20px" },
        }}
      >
        <CreatePostBoxStyle.PaperCard>
          <CreatePostBoxStyle.TitleCard>Edit Post</CreatePostBoxStyle.TitleCard>
          <CreatePostBoxStyle.ChildPaper>
            <CreatePostBoxStyle.LeftContainer>
              <CreatePostBoxStyle.PictureArea>
                <CreatePostBoxStyle.Picture src={currentEditPostBox.img} />
              </CreatePostBoxStyle.PictureArea>
              <CreatePostBoxStyle.ButtonContainer>
                <ButtonPureStyle.ButtonPureTransparent onClick={handleDiscard}>
                  Discard
                </ButtonPureStyle.ButtonPureTransparent>
                <ButtonPureStyle.ButtonPureColour
                  disabled={disableBtn}
                  onClick={update}
                >
                  Save
                </ButtonPureStyle.ButtonPureColour>
              </CreatePostBoxStyle.ButtonContainer>
            </CreatePostBoxStyle.LeftContainer>
            <CreatePostBoxStyle.RightContainer>
              {currentEditPostBox.postData.data.playlists.length > 0 ? (
                <MusicListCardStyle.PaperContainer>
                  {currentEditPostBox.postData.data.playlists.map(
                    (playlist, pindex) =>
                      playlist.musics.map(
                        (music, mindex) =>
                          music &&
                          music.previewURL && (
                            <MusicListCard
                              key={`${pindex}-${mindex}`}
                              mood={playlist.mood}
                              track={music}
                              playlistIndex={0}
                              musicIndex={mindex}
                              playlistId={playlist.id}
                              musicId={music.id}
                            />
                          )
                      )
                  )}
                </MusicListCardStyle.PaperContainer>
              ) : (
                <MusicListCardStyle.LoadingContainer>
                  <Typography
                    style={{
                      color:
                        currentEditPostBox.message !== "Loading..."
                          ? "#aa0914"
                          : "black",
                    }}
                  >
                    {currentEditPostBox.message}
                  </Typography>
                </MusicListCardStyle.LoadingContainer>
              )}
            </CreatePostBoxStyle.RightContainer>
          </CreatePostBoxStyle.ChildPaper>
        </CreatePostBoxStyle.PaperCard>
      </Dialog>
      <AlertCard type="cancleEditing" cancle={cancleEditing} open={openAlert} />
    </>
  );
};

export default EditPostBox;
