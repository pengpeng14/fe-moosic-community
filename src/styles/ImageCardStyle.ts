import styled, { keyframes } from "styled-components";
import { Paper, Typography } from "@mui/material";

const TopPaper = styled.div`
  aspect-ratio: 1/1;
  box-shadow: 0px 1px 5px rgb(144, 146, 148);
  align-items: space-evenly;
  background-color: white;
  border-radius: 5px 5px 0px 0px;
  overflow: hidden;
  position: relative;
`;

const ImgBG = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: 0;
  position: absolute;
  box-shadow: 0px 2px 7px rgb(144, 146, 148);
  border-radius: 3px 3px 0px 0px;
`;

const TopContainer = styled.div`
  display: flex;
  z-index: 2;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const SettingContainer = styled.div`
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-right: 10px;
`;

const DetailsContainer = styled.div<{ hovered?: boolean }>`
  z-index: 2;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0px 10px 10px 10px;
  flex-direction: column;
  position: absolute;
  bottom: ${(p) => (p.hovered ? 60 : 0)}px;
  transition: bottom 0.5s;
  transition-timing-function: ease;
`;

// const horizontalAnimation = keyframes`
// 0% {transform: translate(0, 0);}
// 100% {transform: translate(-100%, 0);}
// `;

const MusicDetailsContainer = styled.div`
  z-index: 2;
  width: 100%;
  display: flex;
  position: absolute;
  bottom: -50px;
  left: 0;
  right: 0;
  padding: 0px 10px;
`;

// const MusicTextContainter = styled.div`
//   display: inline-block;
//   line-height: 5em;
//   overflow: hidden;
//   white-space: nowrap;
//   animation: ${horizontalAnimation} 5s linear infinite;
//   position: relative;
// `;

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
  change?: boolean;
  animated: boolean;
  value: number;
}>`
  color: whitesmoke;
  font-weight: bold;
  font-size: ${(props) => (props.change ? 16 : 20)}px;
  text-transform: none;
  white-space: nowrap;

  animation-direction: alternate !important;
  animation-delay: 2s !important;
  animation: ${(props) =>
      props.animated ? horizontalAnimation(props.value) : "none"}
    ${(p) => p.value / 5}s linear infinite;
`;

const Artist = styled(Typography)<{
  change?: boolean;
  animated: boolean;
  value: number;
}>`
  color: whitesmoke;
  font-weight: 450;
  font-size: ${(p) => (p.change ? 13 : 16)}px;
  text-transform: none;
  white-space: nowrap;
  line-height: 0.8;
  color: "#aaaaaa";

  animation-direction: alternate !important;
  animation-delay: 2s !important;
  animation: ${(props) =>
      props.animated ? horizontalAnimation(props.value) : "none"}
    ${(p) => p.value / 5}s linear infinite;
`;

const MoodContainer = styled.div`
  z-index: 2;
  width: 20%;
  display: flex;
  justify-content: end;
  align-items: end;
`;

const Mood = styled(Typography)`
  color: whitesmoke;
  font-weight: bold;
  font-size: 20px;
  font-style: italic;
  text-transform: none;
`;

const ShadowButtomPaper = styled(Paper)`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(181, 181, 181, 0) 0%,
    rgba(0, 0, 0, 1) 142.81%
  );
  border-radius: 0px;
`;

const PostContent = styled.div<{ hovered?: boolean }>`
  display: flex;
  justify-content: space-between;
  position: absolute;
  right: 0;
  left: 0;
  padding: 0px 10px;
  bottom: ${(p) => (p.hovered ? 70 : 10)}px;
  transition: bottom 0.5s;
`;

export default {
  TopPaper,
  ImgBG,
  SettingContainer,
  DetailsContainer,
  MusicDetailsContainer,
  Title,
  Artist,
  MoodContainer,
  Mood,
  ShadowButtomPaper,
  TopContainer,
  // MusicTextContainter,
  PostContent,
};
