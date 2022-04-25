import React, { useEffect, useState } from "react";
import {
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Slide,
} from "@mui/material";
import ButtonPureStyle from "../styles/ButtonPureStyle";
import GenreDialogStyle from "./../styles/GenreDialogStyle";
import user from "../services/user";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserData } from "../reducers/userSlice";

interface IProps {
  setUsername: (username: string) => void;
  username: string;
  setBio: (bio: string) => void;
  bio: string;
  setMessage: (message: string) => void;
}

const BasicUserSetting: React.FC<IProps> = ({
  setUsername,
  username,
  bio,
  setBio,
  setMessage,
}) => {
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      dispatch(setUserData(JSON.parse(data)));
    }
  }, []);

  const handleSave = async () => {
    console.log("currentUser: ", currentUser);
    const body = {
      username,
      bio,
      genres: currentUser.genres,
    };
    await user
      .updateUser(body)
      .then(({ data }) => {
        localStorage.setItem("userData", JSON.stringify(data));
        dispatch(setUserData(data));

        navigate("/feed");
      })
      .catch(() => {
        setMessage("Username is duplicated");
      });
  };
  return (
    <>
      <GenreDialogStyle.Content>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setDisable(e.target.value.length ? false : true);
            setMessage("");
          }}
          style={{ width: "100%" }}
        />
        <div style={{ margin: "20px" }} />
        <TextField
          id="outlined-multiline-flexible"
          label="Bio (optional)"
          multiline
          rows={3}
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
          style={{ width: "100%" }}
        />
      </GenreDialogStyle.Content>
    </>
  );
};

export default BasicUserSetting;
