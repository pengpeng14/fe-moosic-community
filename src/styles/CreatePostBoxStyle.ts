import styled from "styled-components";
import { Button, Paper, Typography } from "@mui/material";

const TitleCard = styled(Typography)`
  font-weight: bold;
  color: black;
  font-size: 20px;
  padding: 20px;
  justify-content: center;
  display: flex;
  text-transform: none;
`;

const PaperCard = styled(Paper)`
  border-radius: 20px;
  width: fit-content;
  height: 600px;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.6);
  display: "flex";
  flex-direction: "column";
  justify-content: "space-between";
  padding: 15px;
`;

const ChildPaper = styled.div`
  display: flex;
  justify-content: center;
  height: 87%;
`;

const LeftContainer = styled.div`
  // margin-right: 15px;
`;

const RightContainer = styled.div`
  margin-left: 15px;
  height: 100%;
`;

const PictureArea = styled(Paper)`
  width: 440px;
  height: 440px;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Picture = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const UploadIconBtn = styled(Button)`
  width: 100px;
  height: 100px;
`;
const UploadIcon = styled.img`
  width: 150px;
  height: 150px;
`;
const UploadMessage = styled(Typography)`
  color: #8900b9;
  font-weight: bold;
  margin-top: 20px;
  font-size: 20px;
  text-transform: none;
`;
const ShowImgArea = styled.img`
  width: 440px;
  height: 440px;
  object-fit: cover;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export default {
  PaperCard,
  LeftContainer,
  RightContainer,
  PictureArea,
  ButtonContainer,
  TitleCard,
  UploadIcon,
  UploadIconBtn,
  UploadMessage,
  ShowImgArea,
  ChildPaper,
  Picture,
};
