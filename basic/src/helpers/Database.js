// Hopefully every request to the database can be routed through here.
import { db, auth } from "../config/firebase";
import { serverTimestamp } from "firebase/database";
import { getDocs, collection, addDoc } from "firebase/firestore";

// If the user is logged in, creates a new entry in the database for them. Returns 1 if successful and 0 if not.
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
            console.error("Error adding user:", err);
        }
    } else {
        console.log('No user is currently signed in.');
    }
    return 0;
};

// Returns true if the logged-in user is already in the database of users, and false otherwise.
export const isUserInDatabase = () => {
    const currentUser = auth().currentUser;
  
    if (currentUser) {
      const { uid } = currentUser;
  
      // Check if user data exists at their UID location in the 'users' collection
      db().ref(`users/${uid}`).once('value').then((snapshot) => {
          return snapshot.exists();
        })
        .catch((error) => {
          console.error('Error checking user existence:', error);
        });
    }
    return false;
}

// TODO: addPost
export const addPost = async (caption, imagePath, geo, sightTime) => {
    try {
        // Getting everything ready
        ref = collection(db, "posts");
        uid = auth().currentUser.uid;
        location = new firebase.firestore.GeoPoint(geo["geometry"]["coordinates"][1], geo["geometry"]["coordinates"][0]);
        
        // Add the post to the database
        try {
            await addDoc(ref, {
                author: uid,
                caption: caption,
                comments: {},
                imagePath: imagePath,
                likes: {},
                location: location,
                metadata: {
                    numComments: 0,
                    numLikes: 0,
                    postTime: serverTimestamp()},
                sightTime: sightTime,
            });
        } catch (err) {
            console.error("Error making post:", err);
        }
    }
    catch (err) {
        console.error(err);
    }
}

// TODO: getPosts
export const getPosts = async () => {
    try {
        const dataUnfiltered = await getDocs(collection(db, "posts"));
        const data = dataUnfiltered.docs.map((doc) => ({
            ...doc.data(),
            id:doc.id,
        }));
        return data;
    } catch (err) {
        console.error("Error fetching posts:", err);
    }
}


// TODO: addComment


// TODO: addLike

