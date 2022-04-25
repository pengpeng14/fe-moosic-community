import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
import styled from "styled-components";

const Container = styled(Dialog)``;
const Title = styled(DialogTitle)`
  font-weight: 800;
  font-size: 25px;
`;
const Content = styled(DialogContent)``;

const BadgeContainer = styled.div`
  // display: flex;
  width: 100%;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
const Badge = styled.div`
  cursor: pointer;
  border-radius: 20px;
  border: 1px solid rgb(136, 25, 182);
  // width: fit-content;
  padding: 0px 10px 0px 10px;
  background-color: white;
  font-weight: 600;
  font-size: 20px;
  // height: fit-content;
  // position: relative;
  //   box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.25);
  margin-right: 10px;
  display: inline-flex;
  margin-top: 5px;
  margin-bottom: 5px;
  border-color: gray;
`;

const BadgeSelected = styled.div`
  cursor: pointer;
  border-radius: 20px;
  border: 1px solid rgb(136, 25, 182);
  // width: fit-content;
  padding: 0px 10px 0px 10px;
  background-color: rgb(136, 25, 182);
  font-weight: 600;
  font-size: 20px;
  // height: fit-content;
  color: white;
  // position: relative;
  //   box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.25);
  margin-right: 10px;
  display: inline-flex;
`;

const Message = styled(Typography)`
  font-size: 16px;
  color: red;
  font-weight: 500;
  margin-left: 15px;
`;

export default {
  Container,
  Title,
  Content,
  Badge,
  BadgeContainer,
  BadgeSelected,
  Message,
};
