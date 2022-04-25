import React from "react";
import ButtonPureStyle from "../styles/ButtonPureStyle";

interface IDetails {
  btnName: string;
  btnType: string;
}
//auth-transparent, auth-colour, transparent, colour
const ButtonPure: React.FC<IDetails> = ({ btnName, btnType }) => {
  return (
    <>
      <ButtonPureStyle.ButtonPureAuthColour>
        {btnName}
      </ButtonPureStyle.ButtonPureAuthColour>
      <ButtonPureStyle.ButtonPureAuthTransparent>
        {btnName}
      </ButtonPureStyle.ButtonPureAuthTransparent>
      <div style={{ width: "200px" }}>
        <ButtonPureStyle.ButtonPureColour>
          {btnName}
        </ButtonPureStyle.ButtonPureColour>
        <ButtonPureStyle.ButtonPureTransparent>
          {btnName}
        </ButtonPureStyle.ButtonPureTransparent>
      </div>
    </>
  );
};

export default ButtonPure;
