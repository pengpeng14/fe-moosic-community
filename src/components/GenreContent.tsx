import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectUser, updateUserGenres } from "../reducers/userSlice";
import genre from "../services/genre";
import user from "../services/user";
import GenreDialogStyle from "../styles/GenreDialogStyle";

interface IData {
  setSelectedGenre: (genres: string[]) => void;
  selectedGenre: string[];
  setMessage: (message: string) => void;
}
const GenreContent: React.FC<IData> = ({
  setSelectedGenre,
  selectedGenre,
  setMessage,
}) => {
  const [genres, setGenres] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  console.log(selectedGenre);

  useEffect(() => {
    //call api to get all genres
    const getGenres = async () => {
      const response = await genre.getGenres();
      setGenres(response.data.genres);
    };
    getGenres();
    if (location.pathname.includes("profile")) {
      if (currentUser.genres) {
        setSelectedGenre(currentUser.genres);
      }
    }
  }, []);

  useEffect(() => {}, [currentUser]);

  const handleSelect = (badge: string) => {
    console.log(badge);
    if (selectedGenre.length === 5) {
      setMessage("Genre limit at 5");
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    console.log("add genre");

    // oldVal.push(badge);

    setSelectedGenre([...selectedGenre, badge]);
  };
  const handleDeselect = (badge: string) => {
    const newSelected = selectedGenre.filter((s) => s !== badge);
    if (newSelected.length <= 5) {
      setMessage("");
    }
    setSelectedGenre(newSelected);
  };

  const handleContinue = async () => {
    // navigate("/basic-setting");
    setChecked(true);
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
    }
    // close dialogue
    // setOpen(false);
  };

  return (
    <>
      <GenreDialogStyle.Content>
        <GenreDialogStyle.BadgeContainer>
          {genres.map((genre) =>
            selectedGenre.includes(genre) ? (
              <GenreDialogStyle.BadgeSelected
                key={genre}
                onClick={() => handleDeselect(genre)}
              >
                {genre}
              </GenreDialogStyle.BadgeSelected>
            ) : (
              <GenreDialogStyle.Badge
                key={genre}
                onClick={() => handleSelect(genre)}
              >
                {genre}
              </GenreDialogStyle.Badge>
            )
          )}
        </GenreDialogStyle.BadgeContainer>
      </GenreDialogStyle.Content>
    </>
  );
};

export default GenreContent;
