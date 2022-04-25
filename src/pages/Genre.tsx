import { DialogActions, Slide, SlideProps } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import GenreContent from "../components/GenreContent";
import { User } from "../interfaces/user/UserProfile";
import {
  selectUser,
  setUserData,
  updateUserGenres,
} from "../reducers/userSlice";
import GenreDialogStyle from "../styles/GenreDialogStyle";
import "./../App.css";
import BasicUserSetting from "./../components/BasicUserSetting";
import user from "./../services/user";
import ButtonPureStyle from "./../styles/ButtonPureStyle";
import Badge from "./../components/Badge";
import { updateProfileGenres } from "../reducers/profileSlice";
import {
  updateUserViewFavPost,
  updateUserViewPost,
} from "../reducers/viewPostsSlice";

interface Data {
  setOpen: (open: boolean) => void;
  open: boolean;
}

const Genre: React.FC<Data> = ({ setOpen, open }) => {
  const [selectedGenre, setSelectedGenre] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState(false);
  const [checkedGenre, setCheckedGenre] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [direction, setDirection] = useState<SlideProps["direction"]>("left");

  useEffect(() => {
    const data = localStorage.getItem("userData");

    if (data) {
      const userDataJson: User = JSON.parse(data);

      if (userDataJson.active && location.pathname === "/basic-setting") {
        navigate("/feed", { replace: true });
      }

      dispatch(setUserData(JSON.parse(data)));
      setUsername(currentUser.username);
      setBio(currentUser.bio);
    } else {
      navigate("/", { replace: true });
    }
  }, []);

  const handleSave = async () => {
    console.log("currentUser: ", currentUser);
    const body = {
      username,
      bio,
      genres: selectedGenre,
    };
    await user
      .updateUser(body)
      .then(({ data }) => {
        localStorage.setItem("userData", JSON.stringify(data));
        dispatch(setUserData(data));
        dispatch(updateProfileGenres(data));
        dispatch(updateUserViewPost(data.username));
        dispatch(
          updateUserViewFavPost({ username: data.username, id: data.id })
        );
        if (location.pathname.includes("profile")) {
          navigate(`/profile/${currentUser.username}`, { replace: true });
          setOpen(false);
          return;
        }
        setOpen(false);
        navigate("/feed");
      })
      .catch(() => {
        setMessage("Username is duplicated");
      });
  };

  const handleContinue = async () => {
    // navigate("/basic-setting");
    setDirection("left");
    setMessage("");
    setChecked(true);
    setCheckedGenre(false);
    setIndex(index === 0 ? 1 : 0);
    // close dialogue
    // setOpen(false);
    // // call api to save selected genre
    // const body = {
    //   username: currentUser.username
    //     ? currentUser.username
    //     : currentUser.displayName,
    //   bio: currentUser.bio,
    //   genres: selectedGenre,
    // };
    // console.log(body);
    // const response = await user.updateUser(body);
    // // redirect to feed page
    // if (response.success) {
    //   dispatch(updateUserGenres(selectedGenre));
    //   localStorage.setItem("userData", JSON.stringify(response.data));
    //   navigate("/basic-setting");
    // }
  };

  const handleBack = () => {
    setDirection("right");
    setMessage("");
    setCheckedGenre(true);
    setChecked(false);
    setIndex(0);
  };

  const saveEditGenres = async () => {
    const body = {
      username: currentUser.username
        ? currentUser.username
        : currentUser.displayName,
      bio: currentUser.bio,
      genres: selectedGenre,
    };
    console.log(body);
    dispatch(updateUserGenres(selectedGenre));
    const response = await user.updateUser(body);
    if (response.success) {
      console.log("update genres success: ", response.data);
      localStorage.setItem("userData", JSON.stringify(response.data));
      dispatch(setUserData(response.data));
    }
    // close dialogue
    setOpen(false);
  };

  return (
    <>
      <GenreDialogStyle.Container
        onClose={() => setOpen(false)}
        open={open}
        fullWidth={true}
        maxWidth="sm"
      >
        <GenreDialogStyle.Title>
          {checkedGenre ? "Select genre" : "Basic Setting"}
        </GenreDialogStyle.Title>

        <Slide direction={direction} in={checkedGenre} timeout={400}>
          <div style={{ display: index === 0 ? "" : "none" }}>
            <GenreContent
              setSelectedGenre={setSelectedGenre}
              selectedGenre={selectedGenre}
              setMessage={setMessage}
            />
          </div>
        </Slide>
        <Slide direction={direction} in={checked} timeout={400}>
          <div style={{ display: index !== 0 ? "" : "none" }}>
            <BasicUserSetting
              setUsername={setUsername}
              username={username}
              setBio={setBio}
              bio={bio}
              setMessage={setMessage}
            />
          </div>
        </Slide>

        <DialogActions style={{ justifyContent: "space-between" }}>
          {checkedGenre ? (
            <div style={{ width: "80%" }}>
              {message ? (
                <GenreDialogStyle.Message>{message}</GenreDialogStyle.Message>
              ) : (
                <Badge genres={selectedGenre} />

                // <BadgeStyle.BadgesContainer style={{ overflow: "hidden" }}>
                //   {selectedGenre.map((g) => (
                //     <BadgeStyle.Badge>{g}</BadgeStyle.Badge>
                //   ))}
                // </BadgeStyle.BadgesContainer>
              )}
            </div>
          ) : (
            <div />
          )}
          <ButtonPureStyle.Container>
            {checkedGenre ? (
              <ButtonPureStyle.ContinueBtn
                style={{ backgroundColor: selectedGenre.length ? "" : "gray" }}
                onClick={handleContinue}
                disabled={selectedGenre.length > 0 ? false : true}
              >
                Continue
              </ButtonPureStyle.ContinueBtn>
            ) : (
              <>
                <div style={{ marginRight: "10px" }}>
                  <ButtonPureStyle.ButtonPureTransparent
                    onClick={handleBack}
                    style={{ color: "rgb(136, 25, 182)" }}
                  >
                    Back
                  </ButtonPureStyle.ButtonPureTransparent>
                </div>
                <div>
                  <ButtonPureStyle.ContinueBtn
                    style={{
                      backgroundColor: username.length ? "" : "gray",
                    }}
                    onClick={handleSave}
                    disabled={username.length > 0 ? false : true}
                  >
                    Save
                  </ButtonPureStyle.ContinueBtn>
                </div>
              </>
            )}
          </ButtonPureStyle.Container>
        </DialogActions>
      </GenreDialogStyle.Container>
    </>
  );
};

export default Genre;
