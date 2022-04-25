import { Typography, IconButton, Checkbox } from "@mui/material";
import styled from "styled-components";

const List = styled.div`
  height: fit-content;
  padding: 10px 15px 10px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  border-color: rgb(230, 230, 230);
  height: 55px;
`;

const LeftPart = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 40%;
  padding: 5px 0;
  height: inherit;
`;

const IconContainer = styled.div`
  position: relative;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
`;

const AlbumCover = styled.img`
  border-radius: 5px;
  width: 40px;
  height: 40px;
  z-index: 0;
  object-fit: cover;
  position: absolute;
`;

const IcnBtn = styled(IconButton)`
  border-radius: 5px;
  width: 30px;
  height: 30px;
  z-index: 1;
`;
const Icon = styled.img`
  border-radius: 5px;
  width: 30px;
  height: 30px;
  z-index: 1;
`;

const Title = styled(Typography)`
  font-weight: bold;
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 90%;
  overflow: hidden;
`;

const MidPart = styled.div`
  display: flex;
  justify-content: start;
  width: 25%;
`;

const Artist = styled(Typography)`
  font-weight: 450;
  font-size: 14px;
  color: grey;
`;

const RightPart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 10%;
`;

const Time = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
`;

const FavBtn = styled(IconButton)`
  width: 25px;
  height: 25px;
`;
const FavIcon = styled.img`
  width: 25px;
  height: 25px;
`;

const CheckboxStyle = styled(Checkbox)`
  padding: 0;
  margin-right: 10px;
  width: 100%;
  height: 100%;
  justify-content: initial;

  &.MuiCheckbox-root {
    color: rgb(183, 112, 213) !important;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0) !important;
  }
`;

const BasicMusicContainer = styled.div<{ selection?: boolean }>`
  display: flex;
  position: absolute;
  left: ${(p) => (p.selection ? 50 : 10)}px;
  transition: left 0.5s;
  height: inherit;
  align-items: center;
`;

export default {
  List,
  LeftPart,
  AlbumCover,
  Title,
  MidPart,
  Artist,
  RightPart,
  Time,
  Icon,
  IconContainer,
  FavBtn,
  FavIcon,
  IcnBtn,
  CheckboxStyle,
  BasicMusicContainer,
};
