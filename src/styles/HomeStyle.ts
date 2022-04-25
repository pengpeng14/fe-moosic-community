import styled from "styled-components";
import { Typography } from "@mui/material";

const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
`;

const LeftContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: whitesmoke;
  flex-direction: column;
  padding: 80px;
`;
const RightContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px;
  background-image: url(/assets/icons/bg.jpeg);
  background-size: cover;
  background-position: 70% 0;
`;

const MoosicHeadTypo = styled(Typography)`
  font-weight: bold;
  font-size: 60px;
  text-transform: none;
`;
const MoosicContentTypo = styled(Typography)`
  color: grey;
  font-size: 40px;
  font-weight: 400;
  text-transform: none;
`;
export default {
  Container,
  LeftContainer,
  RightContainer,
  MoosicHeadTypo,
  MoosicContentTypo,
};
