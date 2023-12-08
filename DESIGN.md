# Design

## Project Overview

RemyGram is a (still in development!) social media platform built using React and Firebase. Currently, it functions as a map of Harvard's campus that you can navigate around and see various Remy sightings during the past semester.

### Technology Stack

- **Frontend**: React.js for the user interface and components.
- **Backend**: Firebase for the serverless architecture, including Firestore for the database, Firebase Authentication for user management, and Firebase Storage for media storage.
- **Styling**: Tailwind CSS for styling components and UI elements.
- **Map Integration**: Mapbox GL JS for displaying and interacting with geographical maps.

## Implementation Details

### Firebase Integration

We decided on Firebase primarily due to the extensive amount of documentation on it online, meaning we were never absolutely stuck for hours on end (as we were when still trying to use Flask). It also comes with free hosting, as well as database and image storing and email authentication. We weren't able to fully connect the front- and back- end in time for the deadline, but the database is still fully functional.

### Database Schema

The Firestore database has collections for `users`, `posts`, and `comments`. While denormalization is discouraged in SQL databases, it is generally accepted in NoSQL databases such as Firebase to maximize speed at the slight cost of space. Therefore, every user "document" (the equivalent of an SQL row) also includes the IDs of every post and comment the user has ever made, as well as their entire like history. Similar redundancies are built into the posts and comments "collections" (the equivalent of a table) to maximize speed and scalability.

### Helper Functions

We kept functions dealing havily with the Firebase API inside the /helpers file in order to abstract back-end interactions such as user authentication and database queries. For example, operations like adding a user, creating a post, adding comments, and updating post metadata are kept here.

### Map Integration

We unfortunately were not the minds behind the map you see on the front page. We integrated the [Mapbox GL JS API](https://docs.mapbox.com/mapbox-gl-js/guides/), a provider of online custom maps, into the `Map.js` file. We chose Mapbox because it was free, easy-to-use, and well-established.

### Next Steps

RemyGram is currently a beautiful website, but there's no user functionality yet! Our next step is to allow users to create their own posts that anyone on the internet will be able to view and comment on. We also plan to store the images for each post on the Firebase online file service rather than in the source code, so that people can upload their own images.