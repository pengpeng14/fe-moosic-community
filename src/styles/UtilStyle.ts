import styled from "styled-components";

const Loading = styled.div`
  text-align: center;
  font-size: 16;
  color: grey;
  margin-bottom: 30px;
`;

const AppContainer = styled.div<{ isProfile: boolean }>`
  display: grid;
  grid-template-columns: 200px ${(p) =>
      p.isProfile ? "calc(40vw + 300px) 0" : "40vw 300px"};
  grid-column-gap: 20px;
  padding-top: 30px;
  width: fit-content;
  margin: auto;
  transition: all 1s;
`;

const AppTab = styled.div<{ fixed: boolean }>`
  width: calc(40vw + 300px);
  border-radius: 10px;
  top: 0px;

  ${(p) =>
    p.fixed
      ? "position: fixed; top: 30px; z-index: 5; box-shadow: 0 1px 5px black;"
      : ""}

  transition: top 0.5s;
`;

const AppTabBlur = styled.div<{ fixed: boolean }>`
  width: calc(40vw + 300px);
  position: fixed;
  height: 70px;
  top: 0;
  transition: top 0.5s;
  z-index: ${(p) => (p.fixed ? 5 : -1)};
  // background-color: rgba(0, 0, 0, ${(p) => (p.fixed ? 0.5 : 0)});
  backdrop-filter: blur(${(p) => (p.fixed ? 10 : 0)}px);
  background: linear-gradient(
    0deg,
    rgba(135, 37, 180, 0) 0%,
    rgba(135, 37, 180, ${(p) => (p.fixed ? 0.5 : 0)}) 80%
  );
`;

const AppPanelContainer = styled.div<{ fixed: boolean }>`
  position: relative;
  top: ${(p) => (p.fixed ? 50 : 0)}px;
  transition: top 0.5s;
`;

export default { Loading, AppContainer, AppTab, AppTabBlur, AppPanelContainer };
