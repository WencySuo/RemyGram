// Basic Google authentication
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

// Uses Firebase's built-in Google authentication service to log the user in and out
export const signIn = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (err) {
        console.error(err);
    }
}

export const signOut = async () => {
    try {
        await signOut(auth);
    } catch (err) {
        console.error(err);
    }
}