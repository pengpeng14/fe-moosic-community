import { InputBase } from "@mui/material";
import styled from "styled-components";

const UsernameField = styled(InputBase)`
  width: 210px;
  height: 30px;
  border-radius: 5px 5px 5px 5px;
  background: white;
  border: solid 1px #e8e8e8;
  padding: 2px 10px 2px 10px;
  box-shadow: 0px 0px 2px 1px #e8e8e8 inset;
  margin: 5px 0px 5px 0px;
  font-size: 18px;
  font-weight: 500;
`;

const BioField = styled(InputBase)`
  width: 100%;
  height: 30px;
  border-radius: 5px 5px 5px 5px;
  background: white;
  border: solid 1px #e8e8e8;
  padding: 2px 10px 2px 10px;
  box-shadow: 0px 0px 2px 1px #e8e8e8 inset;
  margin: 5px 0px 5px 0px;
  font-size: 18px;
  font-weight: 500;
`;

export default { UsernameField, BioField };
