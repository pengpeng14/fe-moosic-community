import { BasedApiResponse } from "../interfaces/BasedApiResponse";
import { UserProfile } from "../interfaces/user/UserProfile";
import authenticate from "./authenticateWithFirebase";
import registerCustomToken from "./registerCustomToken";
import request from "./request";

interface CustomTokenRes extends BasedApiResponse {
  data: {
    customToken: string;
  };
}

interface UserDataRes extends BasedApiResponse {
  data: UserProfile;
}

const login = async () => {
  const data = await authenticate();

  const customToken: CustomTokenRes = await request
    .post("auth/oauth/sign-in", JSON.stringify(data))
    .then(({ data }) => data);

  const credential = await registerCustomToken(customToken.data.customToken);
  console.log(credential);
  const userData: UserProfile = await request
    .post("auth/oauth/token/register", JSON.stringify(credential))
    .then(({ data }) => data)
    .catch((e) => console.log(e));
  console.log("dfdfdfd");
  console.log(userData);
  localStorage.setItem("userData", JSON.stringify(userData.data));

  return userData;
};

const checkUserData = () => {
  const data = localStorage.getItem("userData");

  return data == null ? "" : data;
};

export default { login, checkUserData };
