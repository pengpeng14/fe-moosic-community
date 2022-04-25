import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "../interfaces/user/UserProfile";
import { updateUserBio, updateUserUsername } from "../reducers/userSlice";
import user from "../services/user";
import EditUserFieldStyle from "../styles/EditUserFieldStyle";

interface BioData {
  bio: string;
  setEditBioState: (state: boolean) => void;
  userData: User;
}

const BioField: React.FC<BioData> = ({ bio, setEditBioState, userData }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const handleSave = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    const body = {
      username: userData.username,
      bio: input,
      genres: userData.genres,
    };
    dispatch(updateUserBio(input));
    const response = await user.updateUser(body);
    if (response.success) {
      console.log("update bio success: ", response.data);
    }
    setEditBioState(false);
  };

  useEffect(() => {
    setInput(bio);
  }, []);

  return (
    <>
      <EditUserFieldStyle.BioField
        value={input}
        placeholder="Bio..."
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleSave}
      />
    </>
  );
};

interface UsernameData {
  username: string;
  setEditUsernameState: (state: boolean) => void;
  userData: User;
}

const UsernameField: React.FC<UsernameData> = ({
  username,
  setEditUsernameState,
  userData,
}) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const handleSave = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    const body = {
      username: input,
      bio: userData.bio,
      genres: userData.genres,
    };
    dispatch(updateUserUsername(input));
    const response = await user.updateUser(body);
    if (response.success) {
      console.log("update username success: ", response.data);
    }
    setEditUsernameState(false);
  };

  useEffect(() => {
    setInput(username);
  }, []);

  return (
    <>
      <EditUserFieldStyle.UsernameField
        value={input}
        placeholder="Username..."
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleSave}
      />
    </>
  );
};

export default { BioField, UsernameField };
