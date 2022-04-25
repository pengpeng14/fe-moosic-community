import React from "react";
import { useNavigate } from "react-router";
import { User } from "../interfaces/user/UserProfile";
import UserCardStyle from "../styles/UserCardStyle";
import Badge from "./Badge";

interface IUser {
  user: User;
}

const UserCard: React.FC<IUser> = ({ user }) => {
  // const currentUser = useSelector(selectUser);
  const navigate = useNavigate();
  const gotoProfile = () => {
    navigate(`/profile/${user.username}`);
  };

  return (
    <>
      <div onClick={gotoProfile}>
        <UserCardStyle.PaperCard photoURL={user.photoUrl}>
          <UserCardStyle.ProfileIconContainer>
            <UserCardStyle.ProfileIcon src={user.photoUrl} />
          </UserCardStyle.ProfileIconContainer>
          <UserCardStyle.ProfileDetailsContainer change={true}>
            <UserCardStyle.ProfileUsername change={true}>
              {user.username ? user.username : user.displayName}
            </UserCardStyle.ProfileUsername>
            <UserCardStyle.ProfileEmail change={true}>
              {user.email}
            </UserCardStyle.ProfileEmail>
            <UserCardStyle.ProfileBio>{user.bio}</UserCardStyle.ProfileBio>

            {user.genres && <Badge genres={user.genres} />}
          </UserCardStyle.ProfileDetailsContainer>
        </UserCardStyle.PaperCard>
      </div>
    </>
  );
};

export default UserCard;
