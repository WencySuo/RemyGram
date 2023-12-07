// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './components/Map';
import Nav from './components/Nav';
import SignIn from './components/SignIn';

function App() {
  const [posts, setPosts] = useState([]);

  const handlePostSubmit = (message) => {
    // Add logic to send the post to your database or API
    // For now, let's just update the state to simulate a new post
    setPosts((prevPosts) => [...prevPosts, { id: Date.now(), message }]);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Nav />
        <Routes>
          <Route path="/" exact component={App} />
          <Route path="/signin" component={SignIn} />
        </Routes>
        <Map posts={posts} />
      </div>
    </Router>
  );
}

export default App;
