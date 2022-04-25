import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  openCreatePostBox,
  selectCreatePostBoxState,
} from "../reducers/createPostBoxSlice";
import { clear } from "../reducers/musicSlice";
import { resetPostsState } from "../reducers/postsSlice";
import { resetuserState } from "../reducers/userSlice";
import { signout } from "../services/signout";
import ButtonIconStyle from "../styles/ButtonIconStyle";
import FeedLeftStyle from "../styles/FeedLeftStyle";
import FeedStyle from "./../styles/FeedStyle";
import AlertCard from "./AlertCard";
import CreatePostBox from "./CreatePostBox";
import FeedButtonGroup from "./FeedButtonGroup";
import Logo from "./Logo";
import Time from "./Time";

const FeedLeft: React.FC = () => {
  const [alertLogout, setAlertLogout] = useState(false);
  const [logoutColor, setLogoutColor] = useState("rgb(215,68,62)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disable, setDisable] = useState<boolean>(new Date().getDay() > 5);
  const currentBoxState = useSelector(selectCreatePostBoxState);

  useEffect(() => {
    if (new Date().getDay() > 5) {
      setDisable(true);
      return;
    }
  }, []);

  const handlePostBoxCreation = () => {
    dispatch(openCreatePostBox());
  };

  const handleLogout = async (isCancle: boolean) => {
    if (!isCancle) {
      setAlertLogout(false);
      return;
    }
    const response = await signout();

    if (response.success) {
      setAlertLogout(false);
      dispatch(resetPostsState());
      dispatch(resetuserState());
      dispatch(clear());
      localStorage.clear();

      navigate("/login");
    }
  };

  return (
    <div>
      <FeedStyle.LeftContainer>
        <FeedStyle.LeftChild>
          <Logo />
          <ButtonIconStyle.ButtonIconColour
            onClick={handlePostBoxCreation}
            style={{
              height: 60,
              boxShadow: "0px 1px 5px grey",
            }}
            // disabled={disable}
            // style={{
            //   backgroundColor: disable ? "gray" : "",
            //   borderColor: disable ? "gray" : "",
            // }}
          >
            <div>
              <FeedLeftStyle.CreateText
                style={{
                  marginTop: !disable ? "-3px" : "0px",
                  marginBottom: !disable ? "-5px" : "0px",
                  maxHeight: 60,
                }}
                id="create-post-button"
              >
                Create post
              </FeedLeftStyle.CreateText>
              {disable ? null : (
                <FeedLeftStyle.TimeText>
                  <Time />
                </FeedLeftStyle.TimeText>
              )}
            </div>
            <div style={{ marginRight: "10px" }} />
            <ButtonIconStyle.ImgIcon
              src="/assets/icons/create.png"
              className="black-to-white"
              style={{
                width: !disable ? "27px" : "25px",
                height: !disable ? "27px" : "25px",
              }}
            />
          </ButtonIconStyle.ButtonIconColour>
          <FeedButtonGroup />
          <FeedStyle.BottomLeftChid>
            <ButtonIconStyle.ButtonIconTransparent
              className="convert-img-black-to-white"
              onClick={() => setAlertLogout(true)}
              onMouseOver={() => setLogoutColor("white")}
              onMouseOut={() => setLogoutColor("rgb(215,68,62)")}
            >
              <span style={{ marginRight: 10, fontSize: 14 }}>Log out</span>
              <ButtonIconStyle.ImgIcon
                color={logoutColor}
                src={"/assets/icons/logout.png"}
              />
            </ButtonIconStyle.ButtonIconTransparent>
          </FeedStyle.BottomLeftChid>
        </FeedStyle.LeftChild>
      </FeedStyle.LeftContainer>
      {/* <div> */}
        {currentBoxState.isOpen ? <CreatePostBox /> : null}
        {alertLogout && (
          <AlertCard type="logout" open={alertLogout} cancle={handleLogout} />
        )}
      {/* </div> */}
    </div>
  );
};

export default FeedLeft;
