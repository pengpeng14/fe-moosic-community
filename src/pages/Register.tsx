import React from "react";
import HomeMoosic from "../components/HomeMoosic";
import RegisterCard from "../components/RegisterCard";
import HomeStyle from "../styles/HomeStyle";

const Register: React.FC = () => {
  return (
    <>
      <HomeStyle.Container>
        <HomeStyle.LeftContainer>
          <HomeMoosic />
        </HomeStyle.LeftContainer>
        <HomeStyle.RightContainer>
          <RegisterCard />
        </HomeStyle.RightContainer>
      </HomeStyle.Container>
    </>
  );
};

export default Register;
