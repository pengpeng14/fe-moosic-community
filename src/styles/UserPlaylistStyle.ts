import styled from "styled-components";
import { Button } from "@mui/material";

interface IButton {
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  fontColor?: string;
  hoverFontColor?: string;
  toggle?: boolean;
}

const ButtonsContainer = styled.div<{ fixed: boolean }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  top: ${(p) => (p.fixed ? 90 : 70)}px;
  right: calc((100vw - (40vw + 500px)) / 2);
  position: ${(p) => (p.fixed ? "fixed" : "none")};
  transition: all 0.5s;
  z-index: 5;
`;

const ExportBtn = styled(Button)<IButton>`
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
  height: fit-content;
  text-transform: none;
  font-size: 15px;
  width: fit-content;
  border: 1px solid ${(p) => p.backgroundColor ?? "#aaaaaa"};
  margin-bottom: 10px;
  box-shadow: 0 1px 5px #aaaaaa;
  background-color: ${(p) => p.backgroundColor ?? "white"};
  color: ${(p) => p.fontColor ?? "rgb(135, 37, 180)"};

  &:hover {
    border: 1px solid ${(p) => p.hoverBackgroundColor ?? "#aaaaaa"};
    background-color: ${(p) => p.hoverBackgroundColor ?? "rgb(136, 25, 182)"};
    color: ${(p) => p.hoverFontColor ?? "white"};
  }
`;

export default { ButtonsContainer, ExportBtn };
