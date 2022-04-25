import styled from "styled-components";
import { Slider, IconButton, Typography } from "@mui/material";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const PlayerContainer = styled.div`
  display: block;
  width: 100%;
  margin-left: 15px;
`;

const Player = styled(Slider)`
  color: whitesmoke;

  span[class*="MuiSlider-track"] {
    padding: 0;
    color: rgb(136, 26, 182);
    transition: width 0.5s;
  }

  span[class*="MuiSlider-rail"] {
    opacity: 0.3;
  }

  span[class*="MuiSlider-thumb"] {
    color: white;
    transition: left 0.5s;
    box-shadow: 0px 1px 5px black;
  }
`;

const PlayerIcon = styled.div<{ src: string; playing: boolean }>`
  width: 100%;
  height: 100%;
  margin-top: 5px;

  transition: background-color 0.5s;
  background-color: ${(p) => (p.playing ? "rgb(136,26,182)" : "white")};
  -webkit-mask: ${(p) => `url(${p.src})`} center/contain;
`;

const PlayerBtn = styled(IconButton)`
  width: 50px;
  height: 50px;
  padding: 0 5px 10px 5px;
`;

const Time = styled(Typography)`
  color: whitesmoke;
  font-size: 12px;
  text-transform: none;
  font-weight: 300;
  color: #aaaaaa;
`;
const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default {
  Player,
  PlayerIcon,
  Container,
  PlayerBtn,
  Time,
  TimeContainer,
  PlayerContainer,
};
