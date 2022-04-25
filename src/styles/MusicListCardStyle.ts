import styled from "styled-components";
import { Paper, Typography, IconButton, Slider } from "@mui/material";

interface props {
  selected?: boolean;
}

const PaperContainer = styled(Paper)`
  width: 340px;
  height: 100%;
  background-color: #505050;
  border-radius: 15px;
  padding: 15px;
  overflow-y: scroll;
`;

const LoadingContainer = styled(Paper)`
  width: 340px;
  height: 100%;
  background-color: transparent;
  border-radius: 15px;
  padding: 15px;
  box-shadow: none;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const ListCard = styled.div<props>`
  height: fit-content;
  border-radius: 15px;
  padding: 10px 10px 5px 5px;
  background-color: ${(props) => (props.selected ? "#8900b9" : "whitesmoke")};
  // margin: 20px;
  cursor: pointer;
`;

const TopDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MusicDetails = styled.div`
  padding-left: 5px;
`;

const Title = styled(Typography)<props>`
  color: ${(props) => (props.selected ? "whitesmoke" : "black")};
  font-weight: bold;
  font-size: 16px;
  text-transform: none;
  line-height: 0.8;
  transition: all 0.5s;
`;

const Artist = styled(Typography)<props>`
  color: ${(props) => (props.selected ? "#aaaaaa" : "grey")};
  font-weight: 450;
  font-size: 14px;
  text-transform: none;
  transition: all 0.5s;
`;

const Mood = styled(Typography)<props>`
  color: ${(props) => (props.selected ? "whitesmoke" : "black")};
  font-weight: bold;
  font-size: 12px;
  text-transform: none;
  transition: all 0.5s;
  font-style: italic;
`;

const AlbumCover = styled.img<{ selected?: boolean }>`
  width: 50px;
  height: 50px;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 5px;
  box-shadow: ${(p) => (p.selected ? "0px 1px 5px black" : "none")};
  transition: all 0.5s;
`;

const ButtomContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const PlayerContainer = styled.div`
  width: 100%;
  margin-left: 20px;
`;

const PlayerIcon = styled.div<{ src?: string; selected?: boolean }>`
  width: 30px;
  height: 30px;
  background-color: ${(p) => (p.selected ? "white" : "black")};
  -webkit-mask: ${(p) => `url(${p.src})`} center/cover no-repeat;
  transition: all 0.5s;
`;

const PlayerBtn = styled(IconButton)`
  width: 30px;
  height: 30px;
  padding: 0;
  margin-left: 5px;
`;
const Player = styled(Slider)<{ selected: boolean }>`
  color: whitesmoke;

  span[class*="MuiSlider-track"] {
    padding: 0;
    color: ${(p) => (p.selected ? "white" : "rgb(136, 26, 182)")};
    transition: width 0.5s;
  }

  span[class*="MuiSlider-rail"] {
    opacity: 0.3;
    color: ${(p) => (p.selected ? "white" : "black")};
  }

  span[class*="MuiSlider-thumb"] {
    color: ${(p) => (p.selected ? "white" : "black")};
    transition: left 0.5s;
  }
  transition: all 0.5s;
`;

const Time = styled(Typography)<props>`
  color: ${(props) => (props.selected ? "whitesmoke" : "black")};
  font-size: 12px;
`;
const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px;
`;

export default {
  PaperContainer,
  ListCard,
  TopDetailsContainer,
  MusicDetails,
  Title,
  Artist,
  Mood,
  PlayerContainer,
  PlayerIcon,
  PlayerBtn,
  Player,
  Time,
  TimeContainer,
  ButtomContainer,
  LoadingContainer,
  AlbumCover,
};
