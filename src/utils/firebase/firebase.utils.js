import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = []
) => {
  if (!userAuth) return;

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
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return response;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("can not create user, email already in use");
    } else {
      console.log("error creating user", error.message);
    }
  }
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (error) {
    console.log("error creating user", error.message);
  }
};
