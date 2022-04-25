import { Typography } from "@mui/material";
import styled from "styled-components";

const CreateText = styled(Typography)`
  color: white;
  font-weight: 700;
  text-transform: none;
  font-size: 18px;
  margin-top: -3px;
  margin-bottom: -5px;
`;

const TimeText = styled(Typography)`
  color: rgb(210, 210, 210);
  font-weight: 700;
  font-size: 11px;
  justify-content: flex-start;
  align-items: start;
  display: flex;
  margin-top: -1;
`;

const TopContainer = styled.div`
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BottomContainer = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default { CreateText, TimeText, TopContainer, BottomContainer };
