import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(response.user);
  };

  return (
    <div>
      <h2>Sign In Page</h2>
      <button onClick={logGoogleUser}>Sign In With Google popup</button>
    </div>
  );
};

export default SignIn;
