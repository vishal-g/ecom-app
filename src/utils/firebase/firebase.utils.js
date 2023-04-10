import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUqSweqdTYEGse6foWBfTPaDNBtzUDxJw",
  authDomain: "crwn-clothing-db-ceaaa.firebaseapp.com",
  projectId: "crwn-clothing-db-ceaaa",
  storageBucket: "crwn-clothing-db-ceaaa.appspot.com",
  messagingSenderId: "764040680781",
  appId: "1:764040680781:web:1a190799fc052d37c95304",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  // for getting the document ref
  const userDocRef = doc(db, "users", userAuth.uid);

  // for document data

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userDocRef;
};
