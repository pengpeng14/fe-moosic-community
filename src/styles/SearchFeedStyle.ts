import { Typography } from "@mui/material";
import styled from "styled-components";

const ResultKeyword = styled(Typography)`
  font-weight: 600;
  font-size: 35px;
  color: black;
  margin-bottom: 20px;
`;

const Container = styled.div`
  padding: 0 10%;
`;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const ResultText = styled(Typography)`
  text-align: center;
  font-size: 25px;
  color: grey;
  text-transform: none;
  text-transform: none;
`;

export default { ResultKeyword, Container, TabsContainer, ResultText };
