import styled from "styled-components";
import { Button } from "@mui/material";

interface props {
  isReverse?: boolean;
  path?: string;
}

const ButtonIconTransparent = styled(Button)<props>`
  flex-direction: ${(props) => (props.isReverse ? "row-reverse" : "row")};
  border-radius: 10px;
  background-color: transparent;
  color: rgb(215, 68, 62);

  &:hover {
    background-color: rgb(215, 68, 62);
    color: white;
  }

  font-weight: bold;
  text-transform: none;
  font-size: 16px;
  justify-content: flex-start;
  width: fit-content;
  height: 40px;
  transition: color 0.5s, background-color 0.5s;
`;

const ButtonIconColour = styled(Button)<props>`
  flex-direction: ${(props) => (props.isReverse ? "row-reverse" : "row")};
  border: solid 1px rgb(136, 26, 182);
  border-radius: 10px;
  background-color: rgb(136, 25, 182);
  color: white;
  &:hover {
    background-color: rgb(136, 25, 182);
    color: white;
  }
  font-weight: bold;
  min-width: 150px;
  display: flex;
  justify-content: space-around;
  text-transform: none;
  font-size: 15px;
`;

const ButtonIconInGroup = styled(Button)<props>`
  flex-direction: ${(props) => (props.isReverse ? "row-reverse" : "row")};
  justify-content: flex-start;
  background-color: transparent;
  color: black;

  &:hover {
    background-color: rgb(183, 112, 213);
    color: white;
  }
  &.active {
    background-color: rgb(136, 25, 182);
    color: white;
  }

  font-weight: bold;
  border-radius: 10px;
  border-block: 1px;
  width: fit-content;
  text-transform: none;
  font-size: 16px;
  border-style: none;
`;

const FirstButtonIconInGroup = styled(Button)<props>`
  // border: solid 1px rgb(136, 25, 182);
  flex-direction: ${(props) => (props.isReverse ? "row-reverse" : "row")};
  justify-content: flex-start;
  background-color: transparent;
  color: black;
  &:hover {
    background-color: rgb(183, 112, 213);
    color: white;
    border: solid 1px rgb(183, 112, 213);
  }
  &.active {
    background-color: rgb(136, 25, 182);
    color: white;
    border: solid 1px rgb(136, 25, 182);
  }
  font-weight: bold;
  border-radius: 10px 10px 0px 0px;
  min-width: 160px;
  text-transform: none;
  font-size: 16px;
  border: solid 1px gray;
`;

const LastButtonIconInGroup = styled(Button)<props>`
  // border: solid 1px rgb(136, 25, 182);
  flex-direction: ${(props) => (props.isReverse ? "row-reverse" : "row")};
  justify-content: flex-start;
  background-color: transparent;
  color: black;
  &:hover {
    background-color: rgb(183, 112, 213);
    color: white;
    border: solid 1px rgb(183, 112, 213);
  }
  &.active {
    background-color: rgb(136, 25, 182);
    color: white;
    border: solid 1px rgb(136, 25, 182);
  }
  font-weight: bold;
  border-radius: 0px 0px 10px 10px;
  min-width: 160px;
  text-transform: none;
  font-size: 16px;
  font-size: 16px;
  border: solid 1px gray;
`;

const Menu = styled.div`
  background-color: transparent;
  width: 100%;
  height: fit-content;
  display: grid;
  grid-row-gap: 5px;
`;

const ImgIcon = styled.div<{ src: string, color?: string }>`
  width: 20px;
  height: 20px;
  background-color: ${p => p.color ?? "black"};
  -webkit-mask: ${p => `url(${p.src})`} center/contain;

  transition: background-color 0.5s;
`;

export default {
  ButtonIconTransparent,
  ButtonIconColour,
  ButtonIconInGroup,
  Menu,
  FirstButtonIconInGroup,
  LastButtonIconInGroup,
  ImgIcon,
};
