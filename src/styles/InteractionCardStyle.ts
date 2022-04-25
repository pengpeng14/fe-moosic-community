import styled from "styled-components";
import { Paper, IconButton, Typography } from "@mui/material";

interface props {
  change?: boolean;
}

const BottomPaper = styled(Paper)<props>`
  z-index: 2;
  width: 100%;
  height: ${(props) => (props.change ? "50px" : "60px")};
  border-radius: 0px 0px 3px 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 1px 5px rgb(144, 146, 148);
  background-color: white;
`;
const FavContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;
const FavIcon = styled.img`
  width: 25px;
  height: 25px;
`;
const FavBtn = styled(IconButton)`
  width: 25px;
  height: 25px;
`;
const NLikes = styled(Typography)`
  font-weight: bold;
  margin-left: 10px;
`;
const Username = styled(Typography)<props>`
  font-weight: bold;
  font-style: italic;
  margin-right: 10px;
  text-transform: none;
  font-size: ${(props) => (!props.change ? "18px" : "14px")};
  cursor: pointer;
  &:hover {
    color: rgb(135, 37, 180);
  }
`;

const Date = styled(Typography)<props>`
  font-size: ${(props) => (!props.change ? "14px" : "14px")};
  margin-right: 10px;
  color: #555555;
  line-height: 0.8;
`;

export default {
  FavContainer,
  FavBtn,
  FavIcon,
  NLikes,
  Username,
  BottomPaper,
  Date,
};
