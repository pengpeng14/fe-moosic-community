import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import FeedLeft from "../components/FeedLeft";
import FeedRight from "../components/FeedRight";
import MoodsFeed from "../components/MoodsFeed";
import PostsFeed from "../components/PostsFeed";
import RankingFeed from "../components/RankingFeed";
import ResultCard from "../components/ResultCard";
import SearchFeed from "../components/SearchFeed";
import Spotify from "../components/Spotify";
import { User } from "../interfaces/user/UserProfile";
import { clearAllPage, clearProfileData } from "../reducers/profileSlice";
import { setUserData } from "../reducers/userSlice";
import { clearAllView } from "../reducers/viewPostsSlice";
import login from "../services/login";
import user from "../services/user";
import UtilStyle from "../styles/UtilStyle";
import Auth from "./Auth";
import Profile from "./Profile";

const Preload: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authPaths = ["/login", "/register", "/logout"];

  useEffect(() => {
    if (authPaths.includes(location.pathname)) return;

    const setMe = async () => {
      let userDataString = login.checkUserData();
      let userDataObj: User;

      if (userDataString === "") {
        await user
          .getMe()
          .then((data) => {
            userDataObj = data.data;
            localStorage.setItem("userData", JSON.stringify(userDataString));
            dispatch(setUserData(data.data));
          })
          .catch(() => {
            navigate("/login");
          });
      }

      userDataObj = JSON.parse(userDataString);
      if (!userDataObj.active) {
        navigate("/basic-setting");
      }
    };

    setMe();
  }, []);

  useEffect(() => {
    if (!location.pathname.includes("profile")) {
      dispatch(clearAllView());
      dispatch(clearAllPage());
      dispatch(clearProfileData());
    }
  }, [location]);

  return (() => {
    if (authPaths.includes(location.pathname)) return <Auth />;
    if (location.pathname.includes("spotify"))
      return (
        <Routes>
          <Route path="/spotify/redirect" element={<Spotify />} />;
        </Routes>
      );
    else {
      return (
        <div>
          <UtilStyle.AppContainer
            isProfile={location.pathname.includes("profile")}
          >
            <FeedLeft />
            <Routes>
              <Route path="/feed" element={<PostsFeed />} />
              <Route path="/feed/:type" element={<RankingFeed />} />
              <Route path="/moods" element={<MoodsFeed />} />
              <Route path="/search" element={<SearchFeed />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route
                path="/result-card"
                element={<ResultCard type="created" open={true} />}
              />
              <Route path="/" element={<Navigate replace to="/feed" />} />
            </Routes>
            {!location.pathname.includes("profile") ? <FeedRight /> : null}
          </UtilStyle.AppContainer>
        </div>
      );
    }
  })();
};
export default Preload;
