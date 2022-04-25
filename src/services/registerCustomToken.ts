import { signInWithCustomToken } from "firebase/auth";
import authentication from "../configs/firebase-config";

export interface CustomUserCredential {
  uid: string;
  accessToken: string;
  refreshToken: string;
  expiredAt: number;
}

const registerCustomToken = async (
  token: string
): Promise<CustomUserCredential> => {
  const userCredential = await signInWithCustomToken(authentication, token);

  const data: CustomUserCredential = {
    uid: userCredential.user.uid,
    accessToken: await userCredential.user.getIdToken(),
    refreshToken: userCredential.user.refreshToken,
    expiredAt: new Date(
      (await userCredential.user.getIdTokenResult()).expirationTime
    ).getTime(),
  };

  return data;
};

export default registerCustomToken;
