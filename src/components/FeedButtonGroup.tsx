import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearProfileData } from "../reducers/profileSlice";
import { selectUser } from "../reducers/userSlice";
import ButtonIconStyle from "../styles/ButtonIconStyle";
import "./../styles/InvertColor.css";

const FeedButtonGroup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);

  const handleRedirect = (type: string) => {
    dispatch(clearProfileData());
    navigate(`/${type}`);
  };

  const gotoProfile = () => {
    navigate(`/profile/${userData.username}`);
  };

  return (
    <>
      <ButtonIconStyle.Menu>
        <ButtonIconStyle.ButtonIconInGroup
          // className="convert-img-black-to-white"
          className={
            location.pathname === "/feed"
              ? "active"
              : "convert-img-black-to-white"
          }
          onClick={() => handleRedirect("feed")}
          path={location.pathname}
        >
          <ButtonIconStyle.ImgIcon
            src={`/assets/icons/home.png`}
            color={location.pathname === "/feed" ? "white" : "black"}
          />
          <div style={{ marginRight: "10px" }} />
          Home
        </ButtonIconStyle.ButtonIconInGroup>
        <ButtonIconStyle.ButtonIconInGroup
          className={
            location.pathname === "/feed/ranked"
              ? "active"
              : "convert-img-black-to-white"
          }
          onClick={() => handleRedirect("feed/ranked")}
          path={location.pathname}
        >
          <ButtonIconStyle.ImgIcon
            src={`/assets/icons/ranking.png`}
            color={location.pathname === "/feed/ranked" ? "white" : "black"}
          />
          <div style={{ marginRight: "10px" }} />
          Ranking
        </ButtonIconStyle.ButtonIconInGroup>
        <ButtonIconStyle.ButtonIconInGroup
          // className="convert-img-black-to-white"
          className={
            location.pathname === "/moods"
              ? "active"
              : "convert-img-black-to-white"
          }
          onClick={() => handleRedirect("moods")}
          path={location.pathname}
        >
          <ButtonIconStyle.ImgIcon
            src={`/assets/icons/moods.png`}
            color={location.pathname === "/moods" ? "white" : "black"}
          />
          <div style={{ marginRight: "10px" }} />
          Mood
        </ButtonIconStyle.ButtonIconInGroup>
        <ButtonIconStyle.ButtonIconInGroup
          className={
            location.pathname.includes("profile")
              ? "active"
              : "convert-img-black-to-white"
          }
          onClick={gotoProfile}
          path={location.pathname}
        >
          <ButtonIconStyle.ImgIcon
            color={location.pathname.includes("profile") ? "white" : "black"}
            src={`/assets/icons/profile.png`}
            id="goto-profile-button"
          />
          <div style={{ marginRight: "10px" }} />
          Profile
        </ButtonIconStyle.ButtonIconInGroup>
      </ButtonIconStyle.Menu>
    </>
  );
};

export default FeedButtonGroup;
