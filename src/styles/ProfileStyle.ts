import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: white;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const MidContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  position: relative;
  min-width: 100%;
  margin-bottom: 30px;
`;

const RightContainer = styled.div`
  width: 10%;
  height: 100%;
  min-width: 10px;
`;

export default { Container, MidContainer, RightContainer };
