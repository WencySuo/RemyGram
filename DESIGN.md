# Design
======

## Project Overview

RemyGram is a social media platform built using React and Firebase. It is a map.

### Technology Stack

- **Frontend**: React.js for the user interface and components.
- **Backend**: Firebase for the serverless architecture, including Firestore for the database, Firebase Authentication for user management, and Firebase Storage for media storage.
- **Styling**: Tailwind CSS for styling components and UI elements.
- **Map Integration**: Mapbox GL JS for displaying and interacting with geographical maps.

## Implementation Details

### Firebase Integration

We decided on Firebase primarily due to the extensive amount of documentation on it online, meaning we were never absolutely stuck for hours on end (as we were when still trying to use Flask). It also comes with free hosting, as well as database and image storing and email authentication.

### Component Structure

Our frontend is structured around reusable React components for modularity and maintainability. Each major feature (posts, comments, likes) has its component to manage the UI and functionality separately. For instance, the `PostForm` component manages post creation, while `SignInPopup` handles user authentication.

### Database Schema

The Firestore database has collections for `users`, `posts`, and `comments`. While denormalization is discouraged in SQL databases, it is generally accepted in NoSQL databases such as Firebase to maximize speed at the slight cost of space. Therefore, every user "document" (the equivalent of an SQL row) also includes the IDs of every post and comment the user has ever made, as well as their entire like history. Similar redundancies are built into the posts and comments "collections" (the equivalent of a table) to maximize speed and scalability.

### Helper Functions

We kept functions dealing havily with the Firebase API inside the /helpers file in order to abstract back-end interactions such as user authentication and database queries. For example, operations like adding a user, creating a post, adding comments, and updating post metadata were kept here.

### Map Integration

We unfortunately were not the minds behind the map you see on the front page. We integrated Mapbox GL JS, a provider of online custom maps, into the `Map.js` file 

The `Map.js` component integrates Mapbox GL JS to display a map. It randomly generates dummy popups within predefined boundaries, allowing users to interact with and view specific locations.

### Design Decisions

- **Firebase Real-time Database**: We opted for Firebase's Firestore due to its real-time capabilities, enabling immediate updates across users in interactions like post creation, likes, and comments.
- **Modular Components**: To enhance maintainability, each major functionality is encapsulated within separate components, promoting reusability and ease of testing.
- **Mapbox Integration**: The Mapbox integration offers a visually appealing and interactive map display, enhancing the user experience.

### Future Considerations

For future enhancements, we plan to implement additional features like follower systems, direct messaging, and better geolocation-based services. Additionally, we aim to enhance security measures and optimize database queries for improved performance.
