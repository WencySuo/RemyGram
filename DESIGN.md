# Design
======

## Project Overview

RemyGram is a social media platform built using React and Firebase. It allows users to create posts, comment on others' posts, like content, and engage within a social community. This document provides an in-depth technical overview of our implementation choices, design architecture, and the reasoning behind our decisions.

### Technology Stack

- **Frontend**: React.js for the user interface and components.
- **Backend**: Firebase for the serverless architecture, including Firestore for the database, Firebase Authentication for user management, and Firebase Storage for media storage.
- **Styling**: Tailwind CSS for styling components and UI elements.
- **Map Integration**: Mapbox GL JS for displaying and interacting with geographical maps.

## Implementation Details

### Firebase Integration

We chose Firebase due to its ease of use and real-time capabilities. Firestore handles our data storage requirements, including collections for users, posts, comments, and likes. Firebase Authentication ensures secure user authentication, allowing users to sign in via Google authentication.

### Component Structure

Our frontend is structured around reusable React components for modularity and maintainability. Each major feature (posts, comments, likes) has its component to manage the UI and functionality separately. For instance, the `PostForm` component manages post creation, while `SignInPopup` handles user authentication.

### Database Schema

The Firestore database has collections for `users`, `posts`, `comments`, and `likes`. Each user document includes information like email, display name, and maps to their respective posts, likes, and comments using key-value pairs. Posts store author information, captions, image paths, and metadata like timestamps and location.

### Helper Functions

We structured our helper functions within the `Database.js` file to abstract database interactions. These functions handle operations like adding a user, creating a post, adding comments, and updating post metadata.

### Map Integration

The `Map.js` component integrates Mapbox GL JS to display a map. It randomly generates dummy popups within predefined boundaries, allowing users to interact with and view specific locations.

### Design Decisions

- **Firebase Real-time Database**: We opted for Firebase's Firestore due to its real-time capabilities, enabling immediate updates across users in interactions like post creation, likes, and comments.
- **Modular Components**: To enhance maintainability, each major functionality is encapsulated within separate components, promoting reusability and ease of testing.
- **Mapbox Integration**: The Mapbox integration offers a visually appealing and interactive map display, enhancing the user experience.

### Future Considerations

For future enhancements, we plan to implement additional features like follower systems, direct messaging, and better geolocation-based services. Additionally, we aim to enhance security measures and optimize database queries for improved performance.
