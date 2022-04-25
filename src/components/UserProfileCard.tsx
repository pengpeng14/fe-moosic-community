import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectVisitedProfile, setProfileData } from "../reducers/profileSlice";
import { selectUser, setUserData } from "../reducers/userSlice";
import user from "../services/user";
import UserCardStyle from "../styles/UserCardStyle";
import Genre from "./../pages/Genre";
import Badge from "./Badge";

const UserProfileCard: React.FC = () => {
  const currentUser = useSelector(selectUser);
  const userData = useSelector(selectVisitedProfile);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // const getUser = async () => {
    //   const response = await user.getUser(userData.user.id);
    //   dispatch(setProfileData(response.data));
    // };

    const data = localStorage.getItem("userData");
    if (data) {
      dispatch(setUserData(JSON.parse(data)));
    }
    // getUser();
  }, []);

  return (
    <>
      {userData.user.id.length && (
        <UserCardStyle.PaperCard
          id="user-profile-paper-card"
          photoURL={userData.user.photoUrl}
        >
          <UserCardStyle.ProfileIconContainer>
            <UserCardStyle.ProfileIcon src={userData.user.photoUrl} />
          </UserCardStyle.ProfileIconContainer>
          <UserCardStyle.ProfileDetailsContainer
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <UserCardStyle.ProfileUsername>
                {userData.user.username}
              </UserCardStyle.ProfileUsername>
              <UserCardStyle.ProfileEmail>
                {userData.user.email}
              </UserCardStyle.ProfileEmail>
              <UserCardStyle.ProfileBio
                style={{
                  width: "60%",
                  color: "#b5b5b5",
                  fontSize: 16,
                }}
              >
                {userData.user.bio}
              </UserCardStyle.ProfileBio>
            </div>
            <div style={{ display: "flex" }}>
              {userData.user.genres && <Badge genres={userData.user.genres} />}
            </div>
          </UserCardStyle.ProfileDetailsContainer>
          <UserCardStyle.ProfileSettingContainer>
            {userData.user.id === currentUser.id && (
              <UserCardStyle.ProfileSettingBtn
                onClick={() => {
                  setOpen(true);
                }}
              >
                <UserCardStyle.ProfileSetting src="/assets/icons/gear-bright-gray.png" />
              </UserCardStyle.ProfileSettingBtn>
            )}
          </UserCardStyle.ProfileSettingContainer>
        </UserCardStyle.PaperCard>
      )}
      {open ? <Genre setOpen={setOpen} open={open} /> : null}
    </>
  );
};

export default UserProfileCard;
