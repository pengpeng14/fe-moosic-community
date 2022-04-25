import styled from "styled-components";

interface props {
  isProfile: boolean
}

const Container = styled.div<props>`
  display: grid;
  grid-template-columns: 17% ${props => props.isProfile ? "auto 0%" : "35vw 26%"};
  grid-column-gap: 50px;
  margin: 0px 15vw;
  padding-top: 30px;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: end;
  // width: 100%;
  // display: grid;
  // grid-template-rows: 30% 50px auto 50px;~
  // align-items: flex-end;
  // flex-direction: column;
  // height: calc(100vh - 60px);
  // min-width: 395.5px;
`;

const LeftChild = styled.div`
  display: grid;
  grid-template-rows: 30% 60px auto 40px;
  grid-row-gap: 10px;
  height: calc(100vh - 60px);
  position: fixed;
  max-width: 200px;
`;

const BottomLeftChid = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
`;

const MidContainer = styled.div`
  margin: 0;
  position: relative;
  max-width: 700px;
  width: 100%;
  margin: auto;
  display: grid;
  grid-row-gap: 15px;
  padding: 0 10%;
  margin-bottom: 30px;
`;
const RightContainer = styled.div`
  height: 100%;
  width: 30%;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  float: right;
`;

const RightChild = styled.div`
  position: fixed;
  display: grid;
  grid-template-rows: 50px auto;
  grid-row-gap: 10px;
  flex-direction: column;
  height: 100%;
  max-width: 250px;
`;

export default {
  Container,
  LeftContainer,
  MidContainer,
  RightContainer,
  LeftChild,
  BottomLeftChid,
  RightChild,
};
