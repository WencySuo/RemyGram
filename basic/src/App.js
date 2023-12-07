// App.js
import React from 'react';
import Map from './Map';
import Nav from './Nav';
import PostForm from './PostForm';

function App() {
  const handlePostSubmit = (message) => {
    // add logic to handle the post submission 
    console.log('Post submitted:', message);
  };

  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <PostForm onPostSubmit={handlePostSubmit} />
      <Map />
    </div>
  );
}

export default App;
