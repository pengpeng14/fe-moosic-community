import React from "react";
import NavigationBarStyle from "../styles/NavigationBarStyle";

const NavigationBar: React.FC = () => {
  return (
    <>
      <NavigationBarStyle.PaperCard>
        <NavigationBarStyle.BtnContainer>
          <NavigationBarStyle.BtnStyled>Posts</NavigationBarStyle.BtnStyled>
          <NavigationBarStyle.BtnStyled>Moods</NavigationBarStyle.BtnStyled>
          <NavigationBarStyle.BtnStyled>
            Favourites
          </NavigationBarStyle.BtnStyled>
        </NavigationBarStyle.BtnContainer>
      </NavigationBarStyle.PaperCard>
    </>
  );
};

export default NavigationBar;
