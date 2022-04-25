import React from "react";
import InputField from "./InputField";
import AuthCardStyle from "../styles/AuthCardStyle";
import ButtonPureStyle from "../styles/ButtonPureStyle";
import { useNavigate } from "react-router-dom";
import login from "../services/login";
import { useAppDispatch } from "./../hooks";
import { useSelector } from "react-redux";
import { selectUser, setUserData } from "../reducers/userSlice";

const LoginCard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

  function gotoRegister() {
    navigate("/register");
  }

  async function signIn() {
    const result = await login.login();
    console.log("result login: ", result);

    if (result.success) {
      dispatch(setUserData(result.data));
      if (!result.data.active) {
        navigate("/genres");
        return;
      }
      navigate("/feed");
    }

    // navigate("/login");
  }

  return (
    <>
      <AuthCardStyle.TopPaperCard type="login">
        <InputField label="Email" />
        <div style={{ marginBottom: "10px" }} />
        <InputField label="Password" />
        <AuthCardStyle.ButtonContainer>
          <ButtonPureStyle.ButtonPureAuthColour>
            Login
          </ButtonPureStyle.ButtonPureAuthColour>
          <ButtonPureStyle.ButtonPureAuthTransparent onClick={gotoRegister}>
            Register
          </ButtonPureStyle.ButtonPureAuthTransparent>
        </AuthCardStyle.ButtonContainer>
      </AuthCardStyle.TopPaperCard>
      <AuthCardStyle.BottomPaperCard>
        <AuthCardStyle.Description>or log in with</AuthCardStyle.Description>
        <AuthCardStyle.IconContainer>
          <AuthCardStyle.IconBtn>
            <AuthCardStyle.ImgIcon src="/assets/icons/facebook.png" />
          </AuthCardStyle.IconBtn>
          <div style={{ marginRight: "15px" }} />
          <AuthCardStyle.IconBtn onClick={signIn} id="google-icon-button">
            <AuthCardStyle.ImgIcon src="/assets/icons/google.png" />
          </AuthCardStyle.IconBtn>
        </AuthCardStyle.IconContainer>
      </AuthCardStyle.BottomPaperCard>
    </>
  );
};

export default LoginCard;
