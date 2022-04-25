import authentication from "../configs/firebase-config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

interface UserCredential {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  accessToken: string;
  refreshToken: string;
}

const authenticate = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(authentication, provider);

  const data:UserCredential = {
    uid: userCredential.user.uid,
    displayName: userCredential.user.displayName ?? "",
    email: userCredential.user.email ?? "",
    photoURL: userCredential.user.photoURL ?? "",
    accessToken: await userCredential.user.getIdToken(),
    refreshToken: userCredential.user.refreshToken,
  };

  return data;
};

export default authenticate;
