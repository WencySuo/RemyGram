// Map.js
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/Map.css';
import SignInPopup from './SignInPopup';

const Map = () => {
  const [map, setMap] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showSignInPopup, setShowSignInPopup] = useState(false);

  const handleSignInClick = () => {
    setShowSignInPopup(true);
  };

  const closeSignInPopup = () => {
    setShowSignInPopup(false);
  };

  useEffect(() => {
    const initializeMap = () => {
      mapboxgl.accessToken = 'pk.eyJ1Ijoid3d3c3NzIiwiYSI6ImNscGl0YjQybDAybWcybG91Ynd6bTAxeWMifQ.b4pItpBiNsKBSQ2bmV-Wuw';

      const bounds = [
        [-71.119340, 42.373465],
        [-71.114128, 42.380368]
      ];

      const initializedMap = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-71.11671, 42.37443],
        zoom: 8,
        maxBounds: bounds,
      });

      setMap(initializedMap);
    };

    initializeMap();

    return () => map?.remove();
  }, []);

  useEffect(() => {
    if (map) {
      map.on('click', (e) => {
        const coordinates = [e.lngLat.lng, e.lngLat.lat];

        handleSignInClick();

        // const newPost = {
        //   message: 'Your default message here',
        //   coordinates: coordinates,
        // };

        // setPosts([...posts, newPost]);

        const testpop = new mapboxgl.Popup({ closeOnClick: false})
          .setLngLat([-71.11671, 42.37443])
          .setHTML('<h1>Welcome to RemyGram!</h1>')
          .addTo(map);

        const signInPopupComponent = (
          <SignInPopup
            onClose={closeSignInPopup}
            onSignIn={(userData) => {
              console.log('User signed in:', userData);
            }}
          />
        );

        const signInPopupContainer = document.createElement('div');
        ReactDOM.render(signInPopupComponent, signInPopupContainer);

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setDOMContent(signInPopupContainer)
          .addTo(map);
      });

      map.on('mouseenter', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', () => {
        map.getCanvas().style.cursor = '';
      });

    }
  }, [map, posts]);

  return (
    <div>
      <div id="map" className="flex-grow"></div>
      <pre id="coordinates" className="coordinates"></pre>
    </div>
  );
};

export default Map;
