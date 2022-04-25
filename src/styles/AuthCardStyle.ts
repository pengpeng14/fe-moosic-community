import styled from "styled-components";
import { Paper, IconButton } from "@mui/material";

interface type {
  type: string;
}

const TopPaperCard = styled(Paper)<type>`
  border-radius: ${(props) =>
    props.type === "login" ? "20px 20px 0px 0px" : "20px 20px 20px 20px"};
  width: 100%;
  // height: ${(props) => (props.type === "login" ? "413px" : "613px")};
  background: linear-gradient(127.31deg, #d76dff 0%, #770056 100%);
  justify-content: center;
  align-content: center;
  display: flex;
  height: fit-content;
  padding: 40px;
  flex-direction: column;
  filter: drop-shadow(0px 0px 35px rgba(0, 0, 0, 0.5));
`;

const BottomPaperCard = styled(Paper)`
  background-color: white;
  border-radius: 0px 0px 20px 20px;
  width: 100%;
  height: 100px;
  filter: drop-shadow(0px 0px 35px rgba(0, 0, 0, 0.5));
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  margin-top: 20px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 20px;
`;

const ImgIcon = styled.img`
  width: 40px;
  height: 40px;
  box-shadow: 0px 2px 5px grey;
  -moz-border-radius: 190px;
  -webkit-border-radius: 190px;
`;
const IconBtn = styled(IconButton)`
  width: 40px;
  height: 40px;
`;

const Description = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top: 10px;
`;

export default {
  TopPaperCard,
  BottomPaperCard,
  ButtonContainer,
  ImgIcon,
  IconBtn,
  Description,
  IconContainer,
};
