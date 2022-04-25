import { Button, Divider, Paper, Typography } from "@mui/material";
import styled from "styled-components";

interface BtnProps {
  selected: boolean;
}

interface PaperProps {
  image?: string;
}

const Container = styled.div`
  width: 100%;
  flex-direction: "row";
  align-items: "center";
  display: flex;
  box-shadow: 0px 1px 5px 2px #aaaaaa;
  border-radius: 20px;
  overflow: hidden;
`;

const PaperCard = styled(Paper)<PaperProps>`
  width: 100%;
  height: fit-content;
  padding: 15px;
  // border-radius: 20px;
  background-color: rgba(0, 0, 0, 0);
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    // background-color: ${props => props.image === undefined ? "#e7a859" : "none"};
    background-image: ${props => props.image !== undefined ? `url(${props.image})` : "none"};
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    filter: blur(50px) brightness(50%);
    z-index: -1;
    margin: -100px;
  }
`;

const Weekly = styled(Typography)`
  color: white;
  font-weight: bold;
  font-size: 36px;
  margin-bottom: 20px;
  text-transform: none;
`;

const NRank = styled(Typography)`
  color: #aaaaaa;
  font-weight: bold;
  font-size: 28px;
  text-shadow: 3px 1px 5px rgba(0, 0, 0, 0.25);
`;

const CarouselContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 10px;
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CarouselIconBtn = styled(Button)`
  height: 5px;
  width: 100%;
  padding: 10px 0;
`;

const CarouselBtn = styled.div<BtnProps>`
  height: 4px;
  width: 100%;
  background-color: ${(props) => (props.selected ? "rgb(136,26,182)" : "#aaaaaa")};
  &:hover {
    background-color: ${(props) => (props.selected ? "rgb(136,26,182)" : "#aaaaaa")};
  }
  border-radius: 2px;
`;

const TopRankDivider = styled(Divider)`
  padding-left: 50px;
  padding-right: 50px;
`;

export default {
  PaperCard,
  Weekly,
  NRank,
  CarouselContainer,
  BtnContainer,
  CarouselBtn,
  CarouselIconBtn,
  Container,
  TopRankDivider,
};
