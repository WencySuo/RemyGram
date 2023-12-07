// App.js
import React, { useState } from 'react';
import Map from './Map';
import Nav from './Nav';
import PostForm from './PostForm';

function App() {
  const [posts, setPosts] = useState([]);

  const handlePostSubmit = (message) => {
    // Add logic to send the post to your database or API
    // For now, let's just update the state to simulate a new post
    setPosts((prevPosts) => [...prevPosts, { id: Date.now(), message }]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <Map posts={posts} />
    </div>
  );
}

export default App;
