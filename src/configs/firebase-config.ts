import { initializeApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

interface FirebaseConfigs {
  [key: string]: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}

const env = process.env.REACT_APP_ENV || "dev";
const firebaseConfig: FirebaseConfigs = {
  dev: {
    apiKey: "AIzaSyBq-ZTWQsRzYcE6sNqw9LofCDjY1u4OIrU",
    authDomain: "moosic-dev.firebaseapp.com",
    projectId: "moosic-dev",
    storageBucket: "moosic-dev.appspot.com",
    messagingSenderId: "485200343517",
    appId: "1:485200343517:web:723b5bb862a29af9544634",
  },
  deploy: {
    apiKey: "AIzaSyAJqjoY3sZ-l5fVxIfPOCK1luLUOKqGzRs",
    authDomain: "moosic-c4234.firebaseapp.com",
    projectId: "moosic-c4234",
    storageBucket: "moosic-c4234.appspot.com",
    messagingSenderId: "795737542763",
    appId: "1:795737542763:web:4f28fe202e6a15b4b2a12e",
  },
};

const envConfig = firebaseConfig[env];

// Initialize Firebase
const app = initializeApp(envConfig);
const authentication = getAuth(app);

export default authentication;
