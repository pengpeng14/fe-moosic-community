import styled from "styled-components";
import { Button, InputBase } from "@mui/material";

const SearchFieldStyle = styled(InputBase)`
  width: 100%;
  height: 40px;
  // border-radius: 10px 0px 0px 10px;
  border-radius: 10px;
  background: white;
  border: solid 1px #e8e8e8;
  // padding: 2px 10px 2px 10px;
  padding-left: 40px;
  box-shadow: 0px 0px 1px 1px #e8e8e8 inset;
  margin: 5px 0px 5px 0px;
`;

const ButtonStyle = styled(Button)`
  // border-radius: 0px 10px 10px 0px;
  border-radius: 10px;
  background-color: rgb(135, 37, 180);
  &:hover {
    background-color: rgb(135, 37, 180);
  }
  height: 40px;
  margin: 0px;
`;
const IconStyle = styled.img`
  width: 25px;
  height: 25px;
  filter: invert(50%);
  position: absolute;
  top: 12.5px;
  left: 10px;

`;

export default { SearchFieldStyle, ButtonStyle, IconStyle };
