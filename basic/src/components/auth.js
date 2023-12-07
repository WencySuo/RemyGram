// Basic Google authentication
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export const Auth = () => {
    console.log(auth?.currentUser?.email, auth?.currentUser?.displayName)

    // Uses Firebase's built-in Google authentication service to log the user in and out
    const signIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.log(err);
        }
    }

    const signOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <button onClick={signIn}>Sign In</button>
            <button onClick={signOut}>Sign Out</button>
        </div>
    )
}