import styled from "styled-components";
import { IconButton } from "@mui/material";

const MenuButtonStyle = styled(IconButton)<{change?: boolean}>`
  height: ${props => props.change ? "8mm": "10mm"};
  width: ${props => props.change ? "8mm": "10mm"};
  color: white;
  background-color: rgba(49, 49, 49, 0.5);
  padding: 0;

  &:hover {
    color: white;
    background-color: rgb(49, 49, 49);
    box-shadow: 0px 1px 4px rgba(49, 49, 49, 1);
  }

  margin-top: 0px;
  box-shadow: 0px 1px 4px rgba(49, 49, 49, 0.5);
`;

const ContentStyle = styled.h1`
  display: flex;
  align-content: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  width: 100%;
  height: 10mm;
  margin: 0;
  color: rgba(255, 255, 255, 0.5);

  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`;

export default { MenuButtonStyle, ContentStyle };
