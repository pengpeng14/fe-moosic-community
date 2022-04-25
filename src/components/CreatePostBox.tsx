import { Dialog, Tabs, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCreatePostBox,
  selectCreatePostBoxState,
} from "../reducers/createPostBoxSlice";
import { clear, selectMusic } from "../reducers/musicSlice";
import { openResultCard } from "../reducers/resultCardSlice";
import ButtonPureStyle from "../styles/ButtonPureStyle";
import CreatePostBoxStyle from "../styles/CreatePostBoxStyle";
import MusicListCardStyle from "../styles/MusicListCardStyle";
import { Playlist } from "./../interfaces/post/PlaylistAnalyze";
import post from "./../services/post";
import sleep from "./../utils/sleep";
import AlertCard from "./AlertCard";
import KeywordBadge from "./KeywordBadge";
import MusicListCard from "./MusicListCard";
import ResultCard from "./ResultCard";

interface IDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const CreatePostBox: React.FC = () => {
  const [img, setImg] = useState("");
  const [disable, setDisable] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [file, setFile] = useState();
  const [keywords, setKeywords] = useState<string[]>(["All"]);
  const [selectedKeyword, setSelectedKeyword] = useState<string>("All");
  const [value, setValue] = useState<number>(0);
  const [oldPlaylists, setOldPlaylists] = useState<Playlist[]>([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Loading...");
  const dispatch = useDispatch();
  const currentSelect = useSelector(selectMusic);
  const currentBoxState = useSelector(selectCreatePostBoxState);

  // to hide input file tag button
  const hiddenUploadImgBtn = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("create post useEffect");
    if (currentSelect.isSelected) {
      setDisable(false);
      return;
    }
    setDisable(true);
  }, [currentSelect]);

  useEffect(() => {
    console.log("current box state changed");
    setOpen(currentBoxState.isOpen);
  }, [currentBoxState]);

  //set selected img to show in picture area
  const handleSelectedFile = async (event: any) => {
    const file = event.target.files[0];
    setFile(file);
    const _file = URL.createObjectURL(file);
    setImg(_file);
    const response = await post.analyzeImage(file).catch((data) => {
      if (data.response.data.message.includes("exceeded")) {
        setMessage("Maximum upload size limited 1MB");
      } else {
        setMessage("Server error");
      }
    });
    if (response !== undefined) {
      setPlaylists(response.playlists);
      setOldPlaylists(response.playlists);
      setKeywords((prevState) => [...prevState, ...response.keywords]);
    }
  };

  // for click button to select image
  const uploadFile = () => {
    if (hiddenUploadImgBtn && hiddenUploadImgBtn.current) {
      hiddenUploadImgBtn.current.click();
    }
  };

  // close create post dialogue
  const closedialogue = () => {
    // if there is selected img open alert dialogue
    if (img.length) {
      setOpenAlert(true);
      return;
    }
    // setOpen(false);
    dispatch(closeCreatePostBox());
  };

  // for option that user select in alert card
  const cancleCreation = (isCancle: boolean) => {
    setOpenAlert(false);
    if (!isCancle) {
      return;
    }
    // canceled
    clearState();
  };

  const createPost = async () => {
    const selectedMusic = {
      playlistIndex: currentSelect.playlistIndex,
      musicIndex: currentSelect.musicIndex,
    };
    const data = { ...selectedMusic, playlists };

    const response = await post.createPost(data, file);
    console.log("response: ", response);
    dispatch(openResultCard("created"));

    // setOpenResult(true);
    // await sleep(2100);
    clearState();
  };

  const clearState = async () => {
    setImg("");
    dispatch(clear());
    setDisable(true);
    setPlaylists([]);
    setOldPlaylists([]);
    setKeywords(["All"]);
    setSelectedKeyword("All");
    // setOpen(false);
    dispatch(closeCreatePostBox());
  };

  const filterKeyword = (keyword: string) => {
    setSelectedKeyword(keyword);
    if (keyword === "All") {
      setPlaylists(oldPlaylists);
      return;
    }
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Dialog
        open={open}
        maxWidth="md"
        PaperProps={{
          style: { backgroundColor: "transparent", borderRadius: "20px" },
        }}
        id="create-post-dialog-box"
      >
        <CreatePostBoxStyle.PaperCard>
          <CreatePostBoxStyle.TitleCard>Post</CreatePostBoxStyle.TitleCard>
          <CreatePostBoxStyle.ChildPaper id="space-child-upload-image-file">
            <CreatePostBoxStyle.LeftContainer>
              <CreatePostBoxStyle.PictureArea>
                {!img.length ? (
                  <>
                    <input
                      hidden
                      type="file"
                      ref={hiddenUploadImgBtn}
                      onChange={(e) => handleSelectedFile(e)}
                      id="uploaded-image-space"
                    />
                    <CreatePostBoxStyle.UploadIconBtn
                      onClick={uploadFile}
                      id="upload-image-file-button"
                    >
                      <CreatePostBoxStyle.UploadIcon src="/assets/icons/uploadimage.png" />
                    </CreatePostBoxStyle.UploadIconBtn>

                    <CreatePostBoxStyle.UploadMessage>
                      Double Click or drag <br /> image here to upload
                    </CreatePostBoxStyle.UploadMessage>
                  </>
                ) : (
                  <>
                    <CreatePostBoxStyle.Picture src={img} />
                  </>
                )}
              </CreatePostBoxStyle.PictureArea>
              <CreatePostBoxStyle.ButtonContainer>
                <ButtonPureStyle.ButtonPureTransparent onClick={closedialogue}>
                  Cancel
                </ButtonPureStyle.ButtonPureTransparent>
                <ButtonPureStyle.ButtonPureColour
                  disabled={disable}
                  onClick={createPost}
                  id="post-button"
                >
                  Post
                </ButtonPureStyle.ButtonPureColour>
              </CreatePostBoxStyle.ButtonContainer>
            </CreatePostBoxStyle.LeftContainer>
            {playlists.length ? (
              <CreatePostBoxStyle.RightContainer id="right-container">
                <MusicListCardStyle.PaperContainer>
                  {keywords.length && (
                    <Tabs
                      variant="scrollable"
                      scrollButtons="auto"
                      value={value}
                      style={{ backgroundColor: "transparent" }}
                      onChange={handleChangeTab}
                    >
                      {keywords.map((keyword, index) => (
                        <KeywordBadge
                          key={index}
                          keyword={keyword}
                          handleClick={filterKeyword}
                          selectedKeyword={selectedKeyword}
                        />
                      ))}
                    </Tabs>
                  )}
                  {playlists.map((playlist, pindex) =>
                    selectedKeyword === "All"
                      ? playlist.tracks.map(
                          (track, mindex) =>
                            track &&
                            track.previewURL && (
                              <MusicListCard
                                key={mindex}
                                track={track}
                                mood={playlist.mood}
                                playlistIndex={pindex}
                                musicIndex={mindex}
                              />
                            )
                        )
                      : playlist.keyword === selectedKeyword &&
                        playlist.tracks.map(
                          (track, mindex) =>
                            track &&
                            track.previewURL && (
                              <MusicListCard
                                key={mindex}
                                track={track}
                                mood={playlist.mood}
                                playlistIndex={pindex}
                                musicIndex={mindex}
                              />
                            )
                        )
                  )}
                </MusicListCardStyle.PaperContainer>
              </CreatePostBoxStyle.RightContainer>
            ) : (
              img && (
                <CreatePostBoxStyle.RightContainer>
                  <MusicListCardStyle.LoadingContainer>
                    <Typography
                      style={{
                        color: message !== "Loading..." ? "#aa0914" : "black",
                      }}
                    >
                      {message}
                    </Typography>
                  </MusicListCardStyle.LoadingContainer>
                </CreatePostBoxStyle.RightContainer>
              )
            )}
          </CreatePostBoxStyle.ChildPaper>
        </CreatePostBoxStyle.PaperCard>
      </Dialog>
      <AlertCard
        type="cancleCreation"
        open={openAlert}
        cancle={cancleCreation}
      />
      {/* <ResultCard type="created" open={openResult} /> */}
    </>
  );
};

export default CreatePostBox;
