// Map.js
import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';
import PostForm from './PostForm';
import marker from './assets/remylogo_tpt.png';

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

  useEffect(() => {
    if (map) {
      // Ad a click event listener to the map 
      map.on('click', (e) => {
        // use the clicked coordinates to create a new post 
        const coordinates = [e.lngLat.lng, e.lngLat.lat];
        const newPost = {
          message: 'Your default message here',
          coordinates: coordinates, 
        };

        // update the state with the new post
        setPosts([...posts, newPost]);

        // Create a popup with the post message and open it at the clicked coordinates
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML('<p>${newPost.message}</p>')
          .addTo(map);
      });

      // Change the cursor to a pointer when hovering over the map
      map.on('mouseenter', ()=> {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to the default cursor when leaving the map 
      map.on('mouseleave', () => {
        map.getCanvas().style.cursor = '';
      });

      // // Add markers for existing posts
      // posts.forEach((post) => {
      //   const el = document.createElement('div');
      //   el.className = 'marker';
      //   el.style.backgroundImage = {marker};
      //   el.style.width = '60px';
      //   el.style.height = '60px';
      //   el.style.backgroundSize = '100%';

      //   // Create a popup with the post message
      //   const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      //     <h3>${post.message}</h3>
      //   );

      //   el.addEventListener('click', () => {
      //     window.alert(post.message);
      //   });

      //   // add new marker 
      //   new mapboxgl.Marker(el)
      //     .setLngLat(post.coordinates)
      //     .setPopup(popup)
      //     .addTo(map);
        
      //   // add click event listener to the marker to open the popup
      //   el.addEventListener('click', () => {
      //     new mapboxgl.Popup({ offset: 25 })
      //     .setLngLat(post.coordinates)
      //     .setHTML(<h3>${post.message}</h3>)
      //     .addTo(map);
      //   });
      // });
    }
  }, [map, posts]);

  const handlePostSubmit = async (message) => {
    if (map) {
      // Get the current map center coordinates
      const coordinates = map.getCenter().toArray();

      // Simulate a post request to jsonplaceholder
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: 'Post Title', 
            body: message, 
            userID: 1, // this can be any user ID
          }),
        });

        if (!response.ok){
          throw new Error('Failed to submit post');
        }
        
        const newPost = await response.json();

        // update the state with the new post 
        setPosts([...posts, { message, coordinates, id: newPost.id }]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div id="map" className="flex-grow"></div>
      <PostForm onPostSubmit={handlePostSubmit} />
      <pre id="coordinates" className="coordinates"></pre>
    </div>
  );
};

export default Map;
