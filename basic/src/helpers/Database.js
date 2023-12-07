// Hopefully every request to the database can be routed through here.
import { db, auth } from "../config/firebase";

// TODO: addCurrentUser
export const addCurrentUser = () => {
    const currentUser = auth().currentUser;

    if (currentUser) {
        const { uid, email, displayName } = currentUser;

        // Add user information to the 'users' collection
        try {
            db().ref(`users/${uid}`).set({
                email: email,
                displayName: displayName,
                posts: {},
                likes: {},
                comments: {},
                });
            return 1;
        }
        catch (err) {
            console.error(err);
        }
    } else {
        console.log('No user is currently signed in.');
    }
    return 0;
};

export const getCurrentUser = () => {

}

// TODO: addPost


// TODO: addComment

// TODO: addLike