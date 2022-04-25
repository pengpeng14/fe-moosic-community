import React from "react";
import HomeStyle from "../styles/HomeStyle";

const HomeMoosic: React.FC = () => {
  return (
    <>
      <HomeStyle.MoosicHeadTypo>Moosic</HomeStyle.MoosicHeadTypo>
      <HomeStyle.MoosicContentTypo>
        Find musics related to your image
      </HomeStyle.MoosicContentTypo>
    </>
  );
};

export default HomeMoosic;
