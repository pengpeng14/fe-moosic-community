import React, {
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { IPanel } from "../interfaces/IPanel";
import { RecommendedMusic } from "../interfaces/recommend";
import { SpotifyUser } from "../interfaces/user/SpotifyUser";
import { selectPlaylistPage, setPlaylistPage } from "../reducers/profileSlice";
import spotify from "../services/spotify";
import UserPlaylistStyle from "../styles/UserPlaylistStyle";
import SpotifyPlaylistDialogue from "./../components/SpotifyPlaylistDialogue";
import MusicsList from "./MusicsList";
import { TabContext } from "./TabsBar";

const UserPlaylistPanel: React.FC<IPanel> = ({ index, value }) => {
  const currentPlaylistPage = useSelector(selectPlaylistPage);
  const [spotifyUser, setSpotifyUser] = useState<SpotifyUser>();
  const { scrollY, pValue } = useContext(TabContext);
  const [selectedKeyword, setSelectedKeyword] = useState("All");
  const [moods, setMoods] = useState<string[]>(["All", "Test", "test"]);
  const [allMusics, setAllMusics] = useState([]);
  const [musics, setMusics] = useState<RecommendedMusic[]>([]);
  const [exportState, setExportState] = useState<boolean>(false);
  const [selectedMusics, setSelectedMusics] = useState<number[]>([]);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const [disableExportBtn, setDisableExportBtn] = useState(true);

  const handleStateExport = () => {
    // if current state is true and going to be false;
    // clear selected list;
    if (exportState) {
      setSelectedMusics([]);
      setDisableExportBtn(true);
    }

    setExportState(!exportState);
    // set new state;
  };

  const handleSignInWithSpotify = async () => {
    window.open("http://localhost:8000/api/v1/auth/spotify");
  };

  const handleExportTracks = async () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    const getSpotifyUser = async () => {
      setSpotifyUser(await spotify.getMe().catch((e) => undefined));
    };

    const handleStorageUpdate = () => {
      const spotifyUserStorage = localStorage.getItem("spotifyUser");

      if (spotifyUserStorage) {
        setSpotifyUser(JSON.parse(spotifyUserStorage));
      } else {
        setSpotifyUser(undefined);
      }
    };

    window.addEventListener("storage", handleStorageUpdate);

    getSpotifyUser();

    return () => window.removeEventListener("storage", handleStorageUpdate);
  }, []);

  useEffect(() => {
    dispatch(setPlaylistPage({ currentPage: 0, total: 1 }));
  }, [pValue]);

  return (
    <div>
      {index === value && (
        <div>
          <UserPlaylistStyle.ButtonsContainer
            fixed={scrollY > 250}
            id="button-container-playlists-tab"
          >
            <UserPlaylistStyle.ExportBtn
              // value={exportState ? "Deselect" : "Select"}
              toggle={exportState}
              onClick={handleStateExport}
              style={{ marginRight: "10px" }}
              id="select-music-button"
              backgroundColor={
                exportState ? "rgb(198 128 125)" : "rgb(183,112,213)"
              }
              fontColor={"white"}
              hoverFontColor={"white"}
              hoverBackgroundColor={
                exportState ? "rgb(215,68,62)" : "rgb(136,25,182)"
              }
              disabled={!spotifyUser}
            >
              {exportState ? "Deselect" : "Select"}
            </UserPlaylistStyle.ExportBtn>
            {spotifyUser ? (
              <UserPlaylistStyle.ExportBtn
                backgroundColor={"#189545"}
                fontColor={"white"}
                hoverFontColor={"white"}
                hoverBackgroundColor={"#1ccc5b"}
                disabled={disableExportBtn}
                onClick={handleExportTracks}
                // id="export-music-button"
              >
                {`Export to ${spotifyUser?.displayName} account`}
              </UserPlaylistStyle.ExportBtn>
            ) : (
              <UserPlaylistStyle.ExportBtn
                backgroundColor={"#189545"}
                fontColor={"white"}
                hoverFontColor={"white"}
                hoverBackgroundColor={"#1ccc5b"}
                onClick={handleSignInWithSpotify}
                // id="export-music-button"
              >
                Sign in with Spotify
              </UserPlaylistStyle.ExportBtn>
            )}
          </UserPlaylistStyle.ButtonsContainer>
          <MusicsList
            exportState={exportState}
            setMainMusics={setMusics}
            setSelectedMusics={setSelectedMusics}
            selectedMusics={selectedMusics}
            setDisableExportBtn={setDisableExportBtn}
          />
          {openDialog ? (
            <SpotifyPlaylistDialogue
              selectedMusics={selectedMusics}
              musics={musics}
              open={openDialog}
              setOpen={setOpenDialog}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default UserPlaylistPanel;
