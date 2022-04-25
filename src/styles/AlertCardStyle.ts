import styled from "styled-components";
import { Paper, Typography } from "@mui/material";

const AlertPaper = styled(Paper)`
  width: 264px;
  height: 253px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(100px);
  display: grid;
  align-content: space-between;
`;
const AlertHeader = styled(Typography)`
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-content: center;
  text-transform: none;
`;
const AlertDetails = styled(Typography)`
  text-transform: none;
`;

const DetailsContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  text-align: center;
  padding-top: 20px;
`;

const ButtonContainer = styled.div`
  padding: 10px;
`;

export default {
  AlertPaper,
  AlertHeader,
  AlertDetails,
  DetailsContainer,
  ButtonContainer,
};
