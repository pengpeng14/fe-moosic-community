import { Tab, Tabs } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectVisitedProfile } from "../reducers/profileSlice";
import { selectUser } from "../reducers/userSlice";
import UtilStyle from "../styles/UtilStyle";
import useSearch from "./../custom hooks/useSearch";
import "./../styles/TabsBarCSS.css";
import UserFavoritePanel from "./UserFavouritePanel";
import UserMoodPanel from "./UserMoodPanel";
import UserPlaylistPanel from "./UserPlaylistPanel";
import UserPostsPanel from "./UserPostsPanel";
interface ITabContext {
  scrollY: number;
  pValue: number;
}

enum ProfileTab {
  posts = 0,
  moods = 1,
  favorites = 2,
  playlists = 3,
}

interface IProfileURL {
  type: ProfileTab;
}

export const TabContext = createContext<ITabContext>({
  scrollY: -1,
  pValue: 0,
});

const TabsBar: React.FC = () => {
  const [pValue, setPValue] = useState(0);
  const [scrollY, setScrollY] = useState(-1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchParam = useSearch<IProfileURL>();

  const visitedProfile = useSelector(selectVisitedProfile);
  const loggedUser = useSelector(selectUser);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(
      `/profile/${visitedProfile.user.username}?type=${ProfileTab[newValue]}`,
      {
        replace: true,
      }
    );
  };

  useEffect(() => {
    const handleScrollY = () => {
      console.log(window.scrollY);
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScrollY);

    return () => window.removeEventListener("scroll", handleScrollY);
  }, []);

  // useEffect(() => {
  //   dispatch(clearAllPage);
  //   dispatch(clearViewPosts);
  // }, [pValue]);

  useEffect(() => {
    if (!searchParam) return;

    if (!searchParam.type) {
      return navigate(`/profile/${visitedProfile.user.username}?type=posts`, {
        replace: true,
      });
    }

    const val = parseInt(ProfileTab[searchParam.type.valueOf()]);
    setPValue(val);
  }, [searchParam]);

  return searchParam ? (
    <TabContext.Provider value={{ scrollY, pValue }}>
      <div style={{ width: "100%" }}>
        <UtilStyle.AppTabBlur fixed={scrollY > 250} />
        <UtilStyle.AppTab fixed={scrollY > 250}>
          <Tabs
            value={pValue}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="full width tabs example"
            style={{
              borderRadius: "10px",
            }}
          >
            <Tab
              label="Posts"
              id={`simple-tabpanel-0`}
              aria-labelledby={`simple-tab-0`}
            />
            <Tab
              label="Moods"
              id={`simple-tabpanel-1`}
              aria-labelledby={`simple-tab-1`}
            />
            <Tab
              label="Favourites"
              id={`simple-tabpanel-2`}
              aria-labelledby={`simple-tab-2`}
            />
            {visitedProfile.user.id === loggedUser.id ? (
              <Tab
                label="Playlists"
                id={`simple-tabpanel-3`}
                aria-labelledby={`simple-tab-3`}
              />
            ) : null}
          </Tabs>
        </UtilStyle.AppTab>
        <UtilStyle.AppPanelContainer
          fixed={scrollY > 250}
          style={{ margin: "20px 0" }}
        >
          <UserPostsPanel value={pValue} index={0} />
          <UserMoodPanel value={pValue} index={1} />
          <UserFavoritePanel value={pValue} index={2} />
          <UserPlaylistPanel value={pValue} index={3} />
        </UtilStyle.AppPanelContainer>
      </div>
    </TabContext.Provider>
  ) : null;
};

export default TabsBar;
