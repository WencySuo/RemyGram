// Hopefully every request to the database can be routed through here.
import { db, auth } from "../config/firebase";
import { serverTimestamp } from "firebase/database";
import { getDocs, collection, addDoc, doc, setDoc } from "firebase/firestore";

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

// Creates a new post with the current user as the author. "caption" and "imagePath" should be strings, "geo" should be a geoJSON, and "sightTime" should be a datetime.
export const addPost = async (caption, imagePath, geo, sightTime) => {
    try {
        // Getting everything ready
        const postsRef = collection(db, "posts");
        const usersRef = collection(db, "users");
        const uid = auth().currentUser.uid;
        const location = new firebase.firestore.GeoPoint(geo["geometry"]["coordinates"][1], geo["geometry"]["coordinates"][0]);

        // Add the post to the database
        const docRef = await addDoc(postsRef, {
            author: uid,
            caption: caption,
            comments: {},
            imagePath: imagePath,
            likes: {},
            location: location,
            metadata: {
                numComments: 0,
                numLikes: 0,
                postTime: serverTimestamp()
            },
            sightTime: sightTime,
            id: ''
        });

        // Update the document with the generated ID
        await updateDoc(docRef, { id: docRef.id });

        // Update the user's data with the post ID
        const user = doc(usersRef, uid);
        await updateDoc(user, {
            ['posts.${docRef.id}']: true,
        });
    } catch (err) {
        console.error("Error making post:", err);
    }
};

// Adds a comment, with the current user as the author, under the specified post
export const addComment = async (text, postId) => {
    try {
        // Getting everything ready
        const ref = collection(db, "comments");
        const postsRef = collection(db, "posts");
        const usersRef = collection(db, "users");
        const uid = auth().currentUser.uid;

        // Add the comment to the database
        const docRef = await addDoc(ref, {
            author: uid,
            text: text,
            postId: postId,
            id: '',
        });

        // Update the document with the generated ID
        await updateDoc(docRef, { id: docRef.id });

        // Update the user's data with the comment ID
        const user = doc(usersRef, uid);
        await updateDoc(user, {
            ['comments.${docRef.id}']: true,
        });

        // Update the post's data with the comment ID and increment the comment counter
        const post = doc(postsRef, postId);
        await updateDoc(post, {
            ['comments.${docRef.id}']: true,
            ['metadata.numComments']: FieldValue.increment(1),
        });
    } catch (err) {
        console.error("Error making comment:", err);
    }
}

// Adds a like by the current user on the specified post
export const addLike = async (postId) => {
    try {
        // Getting everything ready
        const postsRef = collection(db, "posts");
        const usersRef = collection(db, "users");
        const uid = auth().currentUser.uid;

        // Update the user's data with the post ID
        const user = doc(usersRef, uid);
        await updateDoc(user, {
            ['likes.${postId}']: true,
        });

        // Update the post's data with the user ID and increment the like counter
        const post = doc(postsRef, postId);
        await updateDoc(post, {
            ['likes.${uid}']: true,
            ['metadata.numLikes']: FieldValue.increment(1),
        });
    } catch (err) {
        console.error("Error adding like:", err);
    }
}

// Returns a list of all users
export const getUsers = async () => {
    try {
        const dataUnfiltered = await getDocs(collection(db, "users"));
        const data = dataUnfiltered.docs.map((doc) => ({
            ...doc.data(),
        }));
        return data;
    } catch (err) {
        console.error("Error fetching users:", err);
    }
}

// Returns a list of the X most recent posts, or every post ever if no numPosts is specified
export const getPosts = async (numPosts) => {
    try {
        var dataUnfiltered;
        if (numPosts === undefined) {
            dataUnfiltered = await getDocs(collection(db, "posts"));
        }
        else {
            dataUnfiltered = await getDocs(query(collection(db, "posts"), orderBy("metadata.postTime", "desc"), limit(numPosts)));
        }
        const data = dataUnfiltered.docs.map((doc) => ({
            ...doc.data(),
        }));
        return data;
    } catch (err) {
        console.error("Error fetching posts:", err);
    }
}

// Returns a list of every comment under a given post
export const getComments = async (postId) => {
    try {
        const dataUnfiltered = await getDocs(query(collection(db, "comments"), where("postId", "==", postId)));
        const data = dataUnfiltered.docs.map((doc) => ({
            ...doc.data(),
        }));
        return data;
    } catch (err) {
        console.error("Error fetching comments:", err);
    }
}

// Returns a list of every post by the specified user
export const getPostsByUser = async (userId) => {
    try {
        const dataUnfiltered = await getDocs(query(collection(db, "posts"), where("author", "==", userId)));
        const data = dataUnfiltered.docs.map((doc) => ({
            ...doc.data(),
        }));
        return data;
    } catch (err) {
        console.error("Error fetching posts:", err);
    }
}

// Returns a list of every comment by the specified user
export const getCommentsByUser = async (userId) => {
    try {
        const dataUnfiltered = await getDocs(query(collection(db, "comments"), where("author", "==", userId)));
        const data = dataUnfiltered.docs.map((doc) => ({
            ...doc.data(),
        }));
        return data;
    } catch (err) {
        console.error("Error fetching comments:", err);
    }
}