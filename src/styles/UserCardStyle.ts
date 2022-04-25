import styled from "styled-components";
import { Paper, Grid, Typography, IconButton, Avatar } from "@mui/material";

interface props {
  change?: boolean;
}

interface data {
  photoURL?: string;
}

const PaperCard = styled(Paper)<data>`
  border-radius: 20px;
  width: 100%;
  height: 200px;
  display: flex;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    background-image: ${(data) => `url(${data.photoURL})`};
    background-repeat: no-repeat;
    background-position: center top;
    background-size: cover;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 20px;
    margin: -25px -25px -25px -25px;
    filter: blur(10px) brightness(40%);
  }

  &:hover {
    cursor: pointer;
  }
`;

const ProfileIconContainer = styled(Grid)<props>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35%;
  z-index: 2;
`;

const ProfileIcon = styled(Avatar)<props>`
  // border-radius: 50%;
  // object-fit: cover;
  // width: 85%;
  // height: 85%;
  // min-width: 170px;
  // min-height: 170px;
  // max-width: 170px;

  transform: scale(3.5);
  z-index: 2;
  filter: drop-shadow(0px 0px 35px rgba(0, 0, 0, 0.5));
`;

const ProfileDetailsContainer = styled.div<props>`
  margin: 8px 0px 15px 0px;
  // width: ${(props) => (props.change ? "45%" : "65%")};
  z-index: 2;
  width: 65%;
`;
const ProfileUsername = styled(Typography)<props>`
  font-weight: bold;
  font-size: ${(props) => (props.change ? "20px" : "25px")};
  color: white;
  cursor: pointer;
  text-transform: none;
  height: 40px;
`;
const ProfileEmail = styled(Typography)<props>`
  color: white;
  font-size: 14px;
  font-weight: 300;
  text-transform: none;
  line-height: 0.2;
`;

const ProfileBio = styled(Typography)<props>`
  color: white;
  font-size: 16px;
  font-weight: 300px;
  text-transform: none;
  margin-bottom: 10px;
  height: 80px;
  width: 80% !important;
  margin-top: 20px;
  line-height: 1.2;
  overflow-y: auto;
`;

const ProfileSettingContainer = styled.div`
  width: 60px;
  display: flex;
  justify-content: end;
  align-items: flex-start;
  margin: 10px 10px 10px 10px;
  width: 10%;
`;
const ProfileSetting = styled.img`
  width: 25px;
`;

const ProfileSettingBtn = styled(IconButton)`
  width: 30px;
  height: 30px;
`;

const ProfileBadgesContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;
const Badge = styled.div`
  width: 80px;
  height: 22px;
  background-color: whitesmoke;
  margin-right: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 3px rgb(104, 106, 108);
`;

export default {
  PaperCard,
  ProfileIconContainer,
  ProfileIcon,
  ProfileDetailsContainer,
  ProfileSettingContainer,
  ProfileSetting,
  ProfileUsername,
  ProfileEmail,
  ProfileBio,
  ProfileBadgesContainer,
  Badge,
  ProfileSettingBtn,
};
