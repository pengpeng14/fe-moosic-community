import React, { useEffect, useState } from "react";
import { Dialog, List, ListItem } from "@mui/material";
import request from "./../services/request";
import { SpotifyPlaylist, SpotifyPlaylistRes } from "../interfaces/playlist";
import SpotifyPlaylistDialogStyle from "../styles/SpotifyPlaylistDialogStyle";
import { PostEditData } from "../interfaces/post/Posts";
import ResultCard from "./ResultCard";
import { openResultCard } from "../reducers/resultCardSlice";
import { useDispatch } from "react-redux";

interface IDetails {
  open: boolean;
  selectedMusics: string[];
  setOpen: (value: boolean) => void;
  postData?: PostEditData;
}

const SpotifyMusicPostDialogue: React.FC<IDetails> = ({
  open,
  selectedMusics,
  setOpen,
  postData,
}) => {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [openResult, setOpenResult] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSpotifyPlaylist = async () => {
      const response: SpotifyPlaylistRes = await request
        .get("/spotify/playlists")
        .then(({ data }) => data)
        .catch(() => {
          window.open("http://localhost:8000/api/v1/auth/spotify");
          getSpotifyPlaylist();
        });
      setPlaylists(response.data);
      console.log(response);
    };
    getSpotifyPlaylist();
  }, []);

  const handleSelectPlaylist = async (playlist: SpotifyPlaylist) => {
    console.log(playlist);
    const body = {
      trackIds: selectedMusics,
      spotifyPlaylistName: playlist.name,
      spotifyPlaylistId: playlist.id,
    };
    console.log("Body: ", body);
    const response = await request
      .post("/spotify/playlists/export", body)
      .then(({ data }) => {
        dispatch(openResultCard("exported"));
        return data;
      });

    console.log(response);
  };

  const handleNewPlaylist = async () => {
    const body = {
      trackIds: selectedMusics,
      spotifyPlaylistName: postData?.data.playlists[0].musics[0].title,
      spotifyPlaylistId: null,
    };
    const response = await request
      .post("/spotify/playlists/export", body)
      .then(({ data }) => {
        dispatch(openResultCard("exported"));
        return data;
      });
    console.log(response);
  };

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <SpotifyPlaylistDialogStyle.Title>
          Spotify playlists
        </SpotifyPlaylistDialogStyle.Title>
        <SpotifyPlaylistDialogStyle.ContentContainer>
          <List>
            {playlists.map((playlist, index) => (
              <ListItem disablePadding style={{ width: "100%" }}>
                <SpotifyPlaylistDialogStyle.ItemButton
                  key={index}
                  onClick={() => handleSelectPlaylist(playlist)}
                >
                  {playlist.name}
                </SpotifyPlaylistDialogStyle.ItemButton>
              </ListItem>
            ))}
            <SpotifyPlaylistDialogStyle.CustomDivider />
            <ListItem disablePadding style={{ width: "100%" }}>
              <SpotifyPlaylistDialogStyle.ItemButton
                onClick={handleNewPlaylist}
              >
                + Create New Playlist
              </SpotifyPlaylistDialogStyle.ItemButton>
            </ListItem>
          </List>
        </SpotifyPlaylistDialogStyle.ContentContainer>
      </Dialog>
      <ResultCard type="exported" open={openResult} />
    </>
  );
};

export default SpotifyMusicPostDialogue;
