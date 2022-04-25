import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import HomeMoosic from "../components/HomeMoosic";
import LoginCard from "../components/LoginCard";
import login from "../services/login";
import HomeStyle from "../styles/HomeStyle";

const Login: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (login.checkUserData()) {
      navigate("/feed");
      return;
    }
  }, []);
  return (
    <>
      {!login.checkUserData() && (
        <>
          {console.log("login!!")}
          <HomeStyle.Container>
            <HomeStyle.LeftContainer>
              <HomeMoosic />
            </HomeStyle.LeftContainer>
            <HomeStyle.RightContainer>
              <LoginCard />
            </HomeStyle.RightContainer>
          </HomeStyle.Container>
        </>
      )}
    </>
  );
};

export default Login;
