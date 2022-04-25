import styled from "styled-components";
import { Tabs } from "@mui/material";

interface props {
  change?: boolean;
}

const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  // overflow-x: auto;
  scroll-behavior: smooth;
`;
const Badge = styled.div<props>`
  width: fit-content;
  height: 32px;
  background-color: whitesmoke;
  margin-right: 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 3px rgb(104, 106, 108);
  padding: 5px 10px 5px 10px;
  font-weight: bolder;
  font-size: 15px;
  margin-bottom: 5px;
  white-space: nowrap;
`;

const TabsContainer = styled(Tabs)<props>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: ${(props) => (props.change ? "flex-start" : "center")};
  margin-top: 0;
`;

export default { BadgesContainer, Badge, TabsContainer };
