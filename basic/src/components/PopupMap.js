import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import bounds from './Map';
import { db } from "./config/firebase";
// import { getDocs } from "firebase/firestore"; 

const PopupMap = () => {
  const [popupPosts, setPopupPosts] = useState([]);

  // const postCollectionRef = collection(db, "posts");

  // Hardcoded dummy data for testing
  const dummyPopupPosts = [
    { title: 'Dummy Point 1', description: 'This is the first dummy point', coordinates: [-77.04, 38.907] },
    { title: 'Dummy Point 2', description: 'This is the second dummy point', coordinates: [-77.05, 38.9] },
    { title: 'Dummy Point 3', description: 'This is the third dummy point', coordinates: [-77.06, 38.92] },
  ];

  useEffect(() => {
  //   // Simulate fetching previously submitted popup posts from the database
  //   // Replace this with actual API calls to your backend
  //   const fetchPopupPosts = async () => {
  //     try {
  //       // Example: Fetch data from your API endpoint
  //       const response = await fetch('YOUR_API_ENDPOINT');
  //       // const data = await response getDocs(postCollectionRef);
  //       console.log(data);
  //       setPopupPosts(data);
  //     } catch (error) {
  //       console.error('Error fetching popup posts:', error);
  //     }
  //   };

  //   fetchPopupPosts();

    setPopupPosts(dummyPopupPosts);
  }, []);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoid3d3c3NzIiwiYSI6ImNscGl0YjQybDAybWcybG91Ynd6bTAxeWMifQ.b4pItpBiNsKBSQ2bmV-Wuw';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-77.04, 38.907],
      zoom: 11.15,
      maxBounds: bounds,
    });``

    // wait for popupPosts to be available before setting up the map 
    if (popupPosts.length > 0) {
      // Add a layer for previously submitted popup posts
    map.on('load', () => {
      map.addLayer({
        id: 'previousPopups',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: popupPosts.map((post) => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: post.coordinates
              },
              properties: {
                title: post.title,
                description: post.description
              }
            }))
          }
        },
        layout: {
          'icon-image': 'marker-15', // Use a custom marker icon
          'text-field': ['get', 'title'],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 1.5],
          'text-anchor': 'top'
        }
      });

      // Create a popup on click for previously submitted popup posts
      map.on('click', 'previousPopups', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;
        const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<h1>${description}</h1>`)
          .addTo(map);
      });

      // Change the cursor to a pointer when hovering over the previousPopups layer
      map.on('mouseenter', 'previousPopups', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to the default cursor when leaving the previousPopups layer
      map.on('mouseleave', 'previousPopups', () => {
        map.getCanvas().style.cursor = '';
      });
    });
  }
    // Cleanup the map on component unmount
    return () => map.remove();
  }, [popupPosts]);

  return <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />;
  // return () => map
};

export default PopupMap;
