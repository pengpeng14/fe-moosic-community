import { IconButton, Typography, Slider } from "@mui/material";
import styled from "styled-components";

const Container = styled.div<{ open?: boolean }>`
  position: fixed;
  width: calc(40vw + 300px);
  background-color: rgb(134, 46, 178);
  z-index: 2;
  bottom: ${(p) => (p.open ? 0 : -100)}px;
  transition: bottom 0.5s;
  transition-delay: 1s;
`;

const SliderContainer = styled.div`
  margin-top: -13px;
`;

const PlayerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(134, 46, 178);
  padding: 10px 15px 10px 15px;
  z-index: 2;
`;

const LeftPart = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: ${100 / 3}%;
`;

const IconContainer = styled.div``;

const IcnBtn = styled(IconButton)`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;
const Icon = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 10px;
`;

const Time = styled(Typography)`
  font-weight: 400;
  color: white;
`;

const MidPart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${100 / 3}%;
`;
const AlbumCoverContainer = styled.div`
  display: flex;
  jutisfy-content: center;
  align-items: center;
  margin-right: 10px;
`;
const AlbumCover = styled.img`
  border-radius: 5px;
  width: 40px;
  height: 40px;
`;

const DetailContainer = styled.div`
  justify-content: flex-start;
  align-items: center;
`;
const Title = styled(Typography)`
  color: white;
  font-weight: 500;
  font-size: 16px;
`;
const Artist = styled(Typography)`
  color: white;
  font-weight: 400;
  font-size: 15px;
`;

const RightPart = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: ${100 / 3}%;
`;

const FavBtn = styled(IconButton)`
  width: 20px;
  height: 20px;
`;
const FavIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Player = styled(Slider)`
  color: whitesmoke;
  "&.muislider-track": {
    color: black;
  }
  z-index: 2;
`;

export default {
  PlayerContainer,
  LeftPart,
  Icon,
  Time,
  MidPart,
  AlbumCover,
  AlbumCoverContainer,
  DetailContainer,
  Title,
  Artist,
  RightPart,
  FavBtn,
  FavIcon,
  IconContainer,
  IcnBtn,
  Player,
  Container,
  SliderContainer,
};
