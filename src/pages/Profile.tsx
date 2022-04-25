import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import TabsBar from "../components/TabsBar";
import UserProfileCard from "../components/UserProfileCard";
import {
  clearAllPage,
  selectVisitedProfile,
  setProfileData,
} from "../reducers/profileSlice";
import { clearAllView } from "../reducers/viewPostsSlice";
import user from "../services/user";
import ProfileStyle from "../styles/ProfileStyle";

//data all cards]
// get all post wuth user-id
// sent all data to TabsBar

const Profile: React.FC = () => {
  // const [pValue, setPValue] = useState(0);
  const userProfile = useSelector(selectVisitedProfile);
  const dispatch = useDispatch();
  const location = useLocation();
  const currentProfile = useSelector(selectVisitedProfile);

  useEffect(() => {
    const pathNames = location.pathname.split("profile/");
    const username = pathNames[1];

    const setUser = async (username: string) => {
      const response = await user.setUserData(location.state, username);
      // setUserData(response);
      // const response = await user.getMe();
      if (response === undefined) return;

      dispatch(setProfileData(response));
      dispatch(clearAllView());
      dispatch(clearAllPage());
    };

    if (username === currentProfile.user.username) return;
    setUser(username);

    console.log("Reinit profile", location);

    // return () => {
    //   dispatch(clearAllPage)
    //   dispatch(clearProfileData)
    // };
  }, [location.pathname]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(clearAllPage);
  //     dispatch(clearProfileData);
  //     console.log("Clear!!!");
  //   };
  // }, []);

  return (
    <>
      {/* <FeedStyle.Container isProfile={true}>
        <FeedLeft /> */}
      <ProfileStyle.MidContainer id="profile-container">
        {userProfile.user.id.length ? (
          <>
            <div style={{ marginBottom: 20, width: "100%" }}>
              <UserProfileCard />
            </div>
            <TabsBar />
          </>
        ) : null}
      </ProfileStyle.MidContainer>
      {/* </FeedStyle.Container> */}
    </>
  );
};

export default Profile;
