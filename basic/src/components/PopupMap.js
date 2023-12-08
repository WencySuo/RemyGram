// PopupMap.js
import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const PopupMap = () => {
  const [popupPosts, setPopupPosts] = useState([]);

  // Use a simplified dummy data for testing
  const dummyPopupPosts = [
    { title: 'Remy Sighting 1', description: 'I saw remy at Harvard Hall!', coordinates: [-71.118, 42.375]},
    { title: 'Remy Sighting 2', description: 'I saw remy near the Peabody Museum!', coordinates: [-71.115, 42.378]},
    { title: 'Remy Sighting 3', description: 'I saw remy near the Physics Research Library!', coordinates: [-71.1173, 42.3771]},
    { title: 'Remy Sighting 4', description: 'I saw remy outside of Annenberg and the Science Center!', coordinates: [-71.1160, 42.3760]},
    { title: 'Remy Sighting 5', description: 'I saw remy at near Sever Hall', coordinates: [-71.1148, 42.3749]},
    { title: 'Remy Sighting 6', description: 'I saw remy at Stoughton Hall', coordinates: [-71.1180, 42.3755]},
    { title: 'Remy Sighting 7', description: 'I saw remy at Tercentery Theater', coordinates: [-71.1167, 42.3744]},
    { title: 'Remy Sighting 8', description: 'I saw remy at outside Lamont', coordinates: [-71.1155, 42.3733]},
    { title: 'Remy Sighting 9', description: 'I saw remy at Greys Hall', coordinates: [-71.1177, 42.3739]},
    { title: 'Remy Sighting 10', description: 'I saw remy at on Harvard St', coordinates: [-71.1164, 42.3728]},
    { title: 'Remy Sighting 11', description: 'I saw remy at Cafe Pamplona', coordinates: [-71.1152, 42.3717]}
  ];

  useEffect(() => {
    // Simulate fetching previously submitted popup posts from the database
    setPopupPosts(dummyPopupPosts);
  }, []);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoid3d3c3NzIiwiYSI6ImNscGl0YjQybDAybWcybG91Ynd6bTAxeWMifQ.b4pItpBiNsKBSQ2bmV-Wuw';

    const bounds = [
      [-71.119340, 42.373465],
      [-71.114128, 42.380368]
    ];

    const map = new mapboxgl.Map({
      container: 'popup-map-container',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-71.11671, 42.37443],
      zoom: 15,
      maxBounds: bounds,
    });

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
            'icon-image': 'marker-15',
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
          const img_path = e.features[0].properties.img_path;

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

  return <div id="popup-map-container" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />;
};

export default PopupMap;
