import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { SignUpForm } from "../../components/sign-up-form/sign-up-form.component";
import { SignInForm } from "../../components/sign-in-form/sign-in-form.component";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./authentication.styles.scss";

const Authentication = () => {
  useEffect(() => {
    const getResponse = async () => {
      const response = await getRedirectResult(auth);

      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    };

    getResponse().catch(console.error);
  }, []);

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(response.user);
  };

  return (
    <div className="authentication-container">
      <SignInForm />
      {/*   <button onClick={logGoogleUser}>Sign In With Google popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign In With Google Redirect
  </button> */}
      <SignUpForm />
    </div>
  );
};

export default Authentication;
