import React from "react";
import AuthCardStyle from "../styles/AuthCardStyle";
import ButtonPureStyle from "../styles/ButtonPureStyle";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";

const RegisterCard: React.FC = () => {
  const navigate = useNavigate();
  function gotoLogin() {
    navigate("/login");
  }

  return (
    <>
      <AuthCardStyle.TopPaperCard type="register">
        <InputField label="Email" />
        <InputField label="Password" />
        <InputField label="Confirm password" />
        <AuthCardStyle.ButtonContainer>
          <ButtonPureStyle.ButtonPureAuthColour>
            Register
          </ButtonPureStyle.ButtonPureAuthColour>
          <ButtonPureStyle.ButtonPureAuthTransparent onClick={gotoLogin}>
            Login
          </ButtonPureStyle.ButtonPureAuthTransparent>
        </AuthCardStyle.ButtonContainer>
      </AuthCardStyle.TopPaperCard>
    </>
  );
};

export default RegisterCard;
