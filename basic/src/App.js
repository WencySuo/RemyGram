// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './components/Map';
import PopupMap from './components/PopupMap';
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
          {/* Render both Map and PopupMap components */}
          <Route
            path="/"
            element={
              <div className="flex flex-grow">
                <div className="map-container">
                  <Map onPostSubmit={handlePostSubmit} />
                </div>
                <div className="popup-map-container">
                  <PopupMap posts={posts} />
                </div>
              </div>
            }
          />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
