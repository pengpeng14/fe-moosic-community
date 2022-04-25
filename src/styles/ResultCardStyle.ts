import styled from "styled-components";
import { Paper, Typography } from "@mui/material";

const PaperCard = styled(Paper)`
  width: fit-content;
  height: 70px;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  font-size: 20px;
  border-radius: 15px;
  padding: 0px 10px 0px 10px;
  backdrop-filter: blur(100px);
`;

const ImgIcon = styled.img`
  width: 40px;
  margin-right: 10px;
`;

const Message = styled(Typography)`
  font-weight: 400;
  font-size: 18px;
  text-transform: none;
`;

export default { PaperCard, ImgIcon, Message };
