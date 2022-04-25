import { Button, Paper } from "@mui/material";
import styled from "styled-components";

const PaperCard = styled(Paper)`
  background-color: #8900b9;
  width: 600px;
  height: fit-content;
  border-radius: 10px;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const BtnStyled = styled(Button)`
  font-weight: bold;
  font-size: 20px;
  color: whitesmoke;
`;

export default { PaperCard, BtnContainer, BtnStyled };
