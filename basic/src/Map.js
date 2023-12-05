// Map.js
import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';
import PostForm from './PostForm';

const Map = () => {
  const [map, setMap] = useState(null); // State to store the map instance
  const [posts, setPosts] = useState([]); // State to store submitted posts

  useEffect(() => {
    // Initialize map
    const initializeMap = () => {
      mapboxgl.accessToken = 'pk.eyJ1Ijoid3d3c3NzIiwiYSI6ImNscGl0YjQybDAybWcybG91Ynd6bTAxeWMifQ.b4pItpBiNsKBSQ2bmV-Wuw';

      const bounds = [
        [-71.119340, 42.373465], // Southwest coordinates
        [-71.114128, 42.380368]  // Northeast coordinates
      ];

      const initializedMap = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-71.11671, 42.37443],
        zoom: 8,
        maxBounds: bounds,
      });

      setMap(initializedMap); // Store the map instance in state
    };

    initializeMap();

    // Cleanup the map on component unmount
    return () => map?.remove();
  }, []); // Empty dependency array ensures useEffect runs only once

  const handlePostSubmit = (message) => {
    if (map) {
      // Get the current map center coordinates
      const coordinates = map.getCenter().toArray();

      // Simulate a new post object (replace this with your actual post creation logic)
      const newPost = {
        message,
        coordinates,
      };

      // Update the state with the new post
      setPosts([...posts, newPost]);
    }
  };

  useEffect(() => {
    if (map) {
      // Add markers for existing posts
      posts.forEach((post) => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = `url('/basic/assets/remylogo_tpt.png')`;
        el.style.width = '60px';
        el.style.height = '60px';
        el.style.backgroundSize = '100%';

        el.addEventListener('click', () => {
          window.alert(post.message);
        });

        new mapboxgl.Marker(el)
          .setLngLat(post.coordinates)
          .addTo(map);
      });
    }
  }, [map, posts]);

  return (
    <div>
      <div id="map" className="flex-grow"></div>
      <PostForm onPostSubmit={handlePostSubmit} />
      <pre id="coordinates" className="coordinates"></pre>
    </div>
  );
};

export default Map;
