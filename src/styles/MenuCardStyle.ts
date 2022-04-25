import { Menu, Typography, Button } from "@mui/material";
import styled from "styled-components";

interface props {
  color: string;
}

const PaperStyle = styled(Menu)`
  background-color: whitesmoke;
  width: 115px;
  height: 50px;
  border-radius: 15px;
`;

const ContentStyle = styled.div`
  color: black;
  font-weight: bold;
`;

const IconBtnStyle = styled.div<{ src?: string; isDelete?: boolean }>`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background-color: ${(p) => (p.isDelete ? "rgb(215,68,62)" : "black")};
  -webkit-mask: ${(p) => `url(${p.src})`} center/cover no-repeat;
`;

const ListItemStyle = styled.div<props>`
  color: ${(props) => (props.color === "red" ? "rgb(215, 68, 62)" : "black")};
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  justify-content: left;
  display: flex;
  padding: 10px;
  height: 35px;
  align-items: center;
  height: 40px;
  width: 100%;
`;

const Text = styled(Typography)`
  font-weight: 600;
  text-transform: none;
`;
export default {
  PaperStyle,
  ContentStyle,
  IconBtnStyle,
  ListItemStyle,
  Text,
};
