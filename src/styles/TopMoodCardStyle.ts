import { Divider, ListItem, Paper, Typography } from "@mui/material";
import styled, { keyframes } from "styled-components";

interface props {
  index: number;
  length: number;
}

interface translation {
  animated: boolean;
  value: number;
}

const PaperCard = styled(Paper)`
  height: fit-content;
  border-radius: 10px;
  background-color: transparent;
  overflow: hidden;
  border: 0px;
  background-color: whitesmoke;
  box-shadow: 0px 1px 5px grey;
  max-width: inherit;
`;

const TitleList = styled(Paper)`
  background-color: #8900b9;
  height: 50px;
  border-radius: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Typography)`
  font-weight: bold;
  color: white;
  text-transform: none;
  font-size: 18px;
`;

const SubMood = styled(ListItem)<props>`
  display: block;
  height: 50px;
  overflow: hidden;
  max-width: 94%;
  // height: fit-content;
  // border-radius: ${(props) =>
    props.index === props.length ? "20px" : "0px"};
  float: right;
  padding-left: 0;
`;

const Mood = styled(Typography)`
  font-weight: bold;
  font-size: 18px;
  text-transform: none;
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

const MusicDetails = styled(Typography)<translation>`
  font-size: 14px;
  display: inline-block;
  line-height: 1em;
  max-height: 1em;
  white-space: nowrap;
  animation-direction: alternate !important;
  animation-delay: 3s !important;
  animation: ${props => props.animated ? horizontalAnimation(props.value) : "none"} ${p => p.value / 5}s linear infinite;
`;

const DivideLine = styled(Divider)`
  color: grey;
`;

export default {
  PaperCard,
  Mood,
  MusicDetails,
  SubMood,
  DivideLine,
  TitleList,
  Title,
};
