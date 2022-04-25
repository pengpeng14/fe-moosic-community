import { Dialog, List, ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SpotifyPlaylist, SpotifyPlaylistRes } from "../interfaces/playlist";
import { RecommendedMusic } from "../interfaces/recommend";
import { openResultCard } from "../reducers/resultCardSlice";
import SpotifyPlaylistDialogStyle from "../styles/SpotifyPlaylistDialogStyle";
import request from "./../services/request";
import ResultCard from "./ResultCard";

interface IDetails {
  open: boolean;
  selectedMusics: number[];
  musics: RecommendedMusic[];
  setOpen: (value: boolean) => void;
}

const SpotifyPlaylistDialogue: React.FC<IDetails> = ({
  open,
  selectedMusics,
  musics,
  setOpen,
}) => {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [openResult, setOpenResult] = useState(false);
  // const currentSpotifyState = useSelector(selectSpotifyDialogState);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSpotifyPlaylist = async () => {
      const response: SpotifyPlaylistRes = await request
        .get("/spotify/playlists")
        .then(({ data }) => data);
      setPlaylists(response.data);
      console.log(response);
    };
    getSpotifyPlaylist();
  }, []);

  const handleSelectPlaylist = async (playlist: SpotifyPlaylist) => {
    console.log(playlist);
    let tracks: string[] = [];
    console.log(musics[0]);
    selectedMusics.forEach((i) => tracks.push(musics[i].spotifyId));
    const body = {
      trackIds: tracks,
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
    let tracks: string[] = [];
    selectedMusics.forEach((i) => tracks.push(musics[i].spotifyId));
    const body = {
      trackIds: tracks,
      spotifyPlaylistName: musics[selectedMusics[0]].title,
      spotifyPlaylistId: null,
    };
    const response = await request.post("/spotify/playlists/export", body);
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
              <ListItem
                disablePadding
                style={{ width: "100%" }}
                id={`spotify-playlist-${index}`}
              >
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

export default SpotifyPlaylistDialogue;
