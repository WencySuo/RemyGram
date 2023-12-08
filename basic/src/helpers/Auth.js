// Basic Google authentication
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";

// Uses Firebase's built-in Google authentication service to log the user in and out

export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
    } catch (err) {
        console.error(err);
    }
}

export const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (err) {
        console.error(err);
    }
}