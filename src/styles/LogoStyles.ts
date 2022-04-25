import styled from "styled-components";
import { Typography } from "@mui/material";

const Moosic = styled(Typography)`
  font-weight: 700;
  font-size: 48px;
  text-transform: none;
  &:hover {
    cursor: pointer;
  }
`;

const Container = styled.div`
  height: fit-content;
  min-width: 160px;
`;

const MoosicDetails = styled(Typography)`
  font-family: "Handlee", cursive;
  color: #555555;
  text-transform: none;
  font-size: 18px;
  word-wrap: break-word;
  line-height: 1.2;
`;

export default { Moosic, MoosicDetails, Container };
