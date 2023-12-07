// Hopefully every request to the database can be routed through here.
import { db } from "../config/firebase";

// TODO: addUser
export const addUser = async (email, username) => {
    try {
      // Generate a unique user ID
      const userId = database().ref().child('users').push().key;
  
      // Construct the user object
      const user = {
        email: email,
        username: username,
        posts: {},
        likes: {},
        comments: {}, 
      };
  
      // Save the user to the database under "users" collection with the generated ID
      await database().ref(`users/${userId}`).set(user);
  
      return userId; // Return the generated user ID if needed
    } catch (error) {
      console.error('Error adding user:', error);
      throw error; // Rethrow the error for handling in the UI
    }
  };

// TODO: addPost

// TODO: addComment

// TODO: addLike