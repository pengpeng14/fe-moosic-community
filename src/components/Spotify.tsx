import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SpotifyUser } from "../interfaces/user/SpotifyUser";
import request from "../services/request";

const Spotify: React.FC = () => {
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const getSpotifyCredentials = async () => {
      const code = params.get("code");
      const response: SpotifyUser = await request
        .post("/auth/spotify", { code })
        .then(async ({ data }) => data.data);

      localStorage.setItem("spotifyUser", JSON.stringify(response));
      window.close();
    };

    getSpotifyCredentials();
  }, []);

  return <></>;
};

export default Spotify;
