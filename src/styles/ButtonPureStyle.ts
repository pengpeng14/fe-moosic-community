import styled from "styled-components";
import { Button } from "@mui/material";

const ButtonPureAuthTransparent = styled(Button)`
  background-color: transparent;
  height: 50px;
  width: 50;
  border-radius: 50px;
  &:hover {
    background-color: transparent;
    color: whitesmoke;
  }
  font-weight: bold;
  color: whitesmoke;
  margin-left: 15px;
`;
const ButtonPureAuthColour = styled(Button)`
  background-color: rgb(82, 11, 111);
  height: 50px;
  width: 110px;
  border-radius: 30px;
  box-shadow: 0px 1px 3px rgb(104, 106, 108);
  &:hover {
    background-color: rgb(82, 11, 111);
    color: whitesmoke;
  }
  font-weight: bold;
  color: whitesmoke;
`;

const ButtonPureColour = styled(Button)`
  background-color: rgb(136, 25, 182);
  color: white;
  border-radius: 10px;
  &:hover {
    background-color: #9623c7;
    color: white;
  }
  width: 100%;
  font-weight: bold;
  height: 40px;
  text-transform: none;
  font-size: 15px;
`;

const ButtonPureTransparent = styled(Button)`
  background-color: transparent;
  color: #aa0914;
  border-radius: 10px;
  &:hover {
    background-color: transparent;
    color: #da0b19;
  }
  width: 100%;
  height: 40px;
  font-weight: bold;
  text-transform: none;
  font-size: 15px;
`;

const ContinueBtn = styled(Button)`
  background-color: rgb(136, 25, 182);
  color: white;
  border-radius: 20px;
  &:hover {
    background-color: rgb(136, 25, 182);
    color: white;
  }
  width: 100%;
  font-weight: bold;
  height: 40px;
  text-transform: none;
  font-size: 15px;
  padding: 0px 15px 0px 15px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditGenreBtn = styled(Button)`
  border-radius: 20px;
  background-color: rgb(136, 25, 182);
  color: white;
  padding: 5px 10px 5px 10px;
  font-weight: bolder;
  font-size: 15px;
  width: fit-content;
  height: 22px;
  text-transform: none;
  box-shadow: 0px 1px 3px rgb(104, 106, 108);
`;

export default {
  ButtonPureColour,
  ButtonPureTransparent,
  ButtonPureAuthColour,
  ButtonPureAuthTransparent,
  ContinueBtn,
  Container,
  EditGenreBtn,
};
