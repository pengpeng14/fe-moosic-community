import { DialogTitle, ListItemButton, Divider } from "@mui/material";
import styled from "styled-components";

const ContentContainer = styled.div`
  width: 100%;
  height: fit-content;
  padding-bottom: 20px;
`;

const Title = styled(DialogTitle)`
  font-weight: 700;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemButton = styled(ListItemButton)`
  color: black !important;
  font-size: 17px;
  font-weight: 500;
  width: 100%;
  margin: 0px 10px 0px 10px;
`;

const CustomDivider = styled(Divider)`
  margin: 5px 10px 5px 10px;
`;

export default { ContentContainer, Title, ItemButton, CustomDivider };
