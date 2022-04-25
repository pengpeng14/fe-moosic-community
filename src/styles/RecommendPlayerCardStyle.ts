import styled, { keyframes } from "styled-components";
import { IconButton, Paper, Slider, Typography } from "@mui/material";

interface CardProps {
  image?: string;
}

const Container = styled.div`
  background-color: purple;
  border-radius: 20px;
  height: fit-content;
  padding: 15px;
  width: 100%;
`;

const Topic = styled(Typography)`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: none;
`;

const PaperCard = styled(Paper)`
  width: 100%;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0);
  height: fit-content;
  box-shadow: 0px 1px 5px rgb(144, 146, 148);
  margin-bottom: 10px;
  overflow: hidden;
`;

const TopPaperCard = styled(Paper)<CardProps>`
  width: 100%;
  height: fit-content;
  // border-radius: 10px;
  box-shadow: 0px 1px 5px rgb(144, 146, 148);
  padding: 5px;
  position: relative;
  // overflow: hidden;
  background-color: rgba(0, 0, 0, 0);

  &:before {
    ${(props) =>
      props.image === undefined
        ? "background-color: rgb(136,26,182);"
        : `background-image: url(${props.image});`}
    content: "";
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(3px) brightness(20%);
    margin: -5px;
    z-index: -1;
  }
`;

const TopPart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  margin: 10px;
`;

const horizontalAnimation = (value: number) => keyframes`
  0%, 20% {
    animation-delay: 3s;
    transform: translate(0, 0);
  }

  80%, 100% {
    animation-delay: 3s;
    transform: translate(${value * -1}%, 0);
  }
`;

const Title = styled(Typography)<{
  animated: boolean;
  value: number;
}>`
  font-weight: bold;
  font-size: 20px;
  color: whitesmoke;
  margin-top: 5px;
  text-transform: none;
  line-height: 1.2;
  white-space: nowrap;
  width: max-content;
  animation-direction: alternate !important;
  animation-delay: 2s !important;
  animation: ${(props) =>
      props.animated ? horizontalAnimation(props.value) : "none"}
    ${(p) => p.value / 5}s linear infinite;
`;

const Artist = styled(Typography)<{
  animated: boolean;
  value: number;
}>`
  line-height: 1.2;
  font-weight: 450;
  font-size: 16px;
  color: rgb(170, 170, 170);
  text-transform: none;
  white-space: nowrap;
  animation-direction: alternate !important;
  animation-delay: 2s !important;
  animation: ${(props) =>
      props.animated ? horizontalAnimation(props.value) : "none"}
    ${(p) => p.value / 5}s linear infinite;
`;

const Mood = styled(Typography)`
  font-weight: bold;
  font-size: 16px;
  margin-right: 20px;
  color: whitesmoke;
  text-transform: none;
`;

const BottomPart = styled.div`
  display: flex;
  margin: 0 0 10px 10px;
`;
const PlayerContainer = styled.div`
  width: 100%;
  margin-left: 25px;
  margin-right: 10px;
  height: fit-content;
`;

const PlayerIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-left: 5px;
`;

const PlayerBtn = styled(IconButton)`
  width: 35px;
  height: 35px;
  margin-left: 5px;
`;
const Player = styled(Slider)`
  margin-top: -5px;
  color: whitesmoke;
`;

const Time = styled(Typography)`
  font-size: 12px;
  color: whitesmoke;
  margin-top: -5px;
  text-transform: none;
`;
const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px;
`;

const BottomPaperCard = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const FavIcon = styled.img<{ liked: boolean }>`
  width: 25px;
  height: 25px;
  filter: ${(props) => (!props.liked ? "grayscale(1) invert(0.6)" : "none")};
`;

const FavBtn = styled(IconButton)`
  width: 25px;
  height: 25px;
  position: absolute;
  top: 15px;
  right: 15px;
`;

const Nlikes = styled(Typography)`
  font-weight: bold;
  font-size: 18px;
  margin-left: 10px;
`;

export default {
  TopPaperCard,
  TopPart,
  BottomPaperCard,
  BottomPart,
  FavIcon,
  FavBtn,
  Title,
  Artist,
  Mood,
  PlayerContainer,
  PlayerIcon,
  Player,
  PlayerBtn,
  Time,
  TimeContainer,
  PaperCard,
  Nlikes,
  Container,
  Topic,
};
