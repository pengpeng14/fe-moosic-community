import React from "react";
import { useNavigate } from "react-router-dom";
import LogoStyles from "../styles/LogoStyles";

const Logo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <LogoStyles.Container id="logo-container">
        <LogoStyles.Moosic
          id="moosic-title"
          onClick={() => {
            navigate("/feed", { replace: true });
          }}
        >
          Moosic
        </LogoStyles.Moosic>
        <LogoStyles.MoosicDetails>
          Board started, Let’s share your feeling
        </LogoStyles.MoosicDetails>
      </LogoStyles.Container>
    </>
  );
};

export default Logo;
