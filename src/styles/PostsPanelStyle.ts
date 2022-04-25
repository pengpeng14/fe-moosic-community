import styled from "styled-components";

const w = window.innerWidth;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-row-gap: 5px;
  grid-column-gap: 5px;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 30px;
`;

const RowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  width: 100%;
  // align-items: center;
  // justify-content: flex-start;
  height: fit-content;
`;

const CardContainer = styled.div`
  // width: ${(0.6 * w) / 3}px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export default { Container, RowContainer, CardContainer };
