// // Map.js
// import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '../styles/Map.css';
// import SignInPopup from './SignInPopup';

// const Map = () => {
//   const [map, setMap] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [showSignInPopup, setShowSignInPopup] = useState(false);

//   const handleSignInClick = () => {
//     setShowSignInPopup(true);
//   };

//   const closeSignInPopup = () => {
//     setShowSignInPopup(false);
//   };

//   useEffect(() => {
//     const initializeMap = () => {
//       mapboxgl.accessToken = 'pk.eyJ1Ijoid3d3c3NzIiwiYSI6ImNscGl0YjQybDAybWcybG91Ynd6bTAxeWMifQ.b4pItpBiNsKBSQ2bmV-Wuw';

//       const bounds = [
//         [-71.119340, 42.373465],
//         [-71.114128, 42.380368]
//       ];

//       const initializedMap = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/streets-v12',
//         center: [-71.11671, 42.37443],
//         zoom: 8,
//         maxBounds: bounds,
//       });

//       setMap(initializedMap);
//     };

//     initializeMap();

//     return () => map?.remove();
//   }, []);

//   useEffect(() => {
//     if (map) {
//       map.on('click', (e) => {
//         const coordinates = [e.lngLat.lng, e.lngLat.lat];

//         handleSignInClick();

//         // const newPost = {
//         //   message: 'Your default message here',
//         //   coordinates: coordinates,
//         // };

//         // setPosts([...posts, newPost]);

//         const testpop = new mapboxgl.Popup({ closeOnClick: false})
//           .setLngLat([-71.11671, 42.37443])
//           .setHTML('<h1>Welcome to RemyGram!</h1>')
//           .addTo(map);

//         const signInPopupComponent = (
//           <SignInPopup
//             onClose={closeSignInPopup}
//             onSignIn={(userData) => {
//               console.log('User signed in:', userData);
//             }}
//           />
//         );

//         const signInPopupContainer = document.createElement('div');
//         ReactDOM.render(signInPopupComponent, signInPopupContainer);

//         new mapboxgl.Popup()
//           .setLngLat(coordinates)
//           .setDOMContent(signInPopupContainer)
//           .addTo(map);
//       });

//       map.on('mouseenter', () => {
//         map.getCanvas().style.cursor = 'pointer';
//       });

//       map.on('mouseleave', () => {
//         map.getCanvas().style.cursor = '';
//       });

//     }
//   }, [map, posts]);

//   return (
//     <div>
//       <div id="map" className="flex-grow"></div>
//       <pre id="coordinates" className="coordinates"></pre>
//     </div>
//   );
// };

// export default Map;

import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoid3d3c3NzIiwiYSI6ImNscGl0YjQybDAybWcybG91Ynd6bTAxeWMifQ.b4pItpBiNsKBSQ2bmV-Wuw';

    const bounds = [
      [-71.119340, 42.373465],
      [-71.114128, 42.380368]
    ];

    const getRandomCoordinates = () => {
      const minLng = bounds[0][0];
      const maxLng = bounds[1][0];
      const minLat = bounds[0][1];
      const maxLat = bounds[1][1];

      const randomLng = minLng + Math.random() * (maxLng - minLng);
      const randomLat = minLat + Math.random() * (maxLat - minLat);

      return [randomLng, randomLat];
    };

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-77.04, 38.907],
      zoom: 11.15,
      maxBounds: bounds,
    });

    map.on('load', () => {
      // Generate three random points within the bounds as dummy popups
      const dummyPopups = Array.from({ length: 3 }, (_, index) => {
        const coordinates = getRandomCoordinates();
        return {
          type: 'Feature',
          properties: {
            description: `<strong>Dummy Popup ${index + 1}</strong><p>This is a dummy popup description.</p>`,
            icon: 'theatre', // Choose an appropriate icon
          },
          geometry: {
            type: 'Point',
            coordinates: coordinates,
          },
        };
      });

      map.addSource('dummyPopups', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: dummyPopups,
        },
      });

      map.addLayer({
        id: 'dummyPopups',
        type: 'symbol',
        source: 'dummyPopups',
        layout: {
          'icon-image': ['get', 'icon'],
          'icon-allow-overlap': true,
        },
      });

      // When a click event occurs on a feature in the dummyPopups layer, open a popup.
      map.on('click', 'dummyPopups', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the dummyPopups layer.
      map.on('mouseenter', 'dummyPopups', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'dummyPopups', () => {
        map.getCanvas().style.cursor = '';
      });
    });

    // Cleanup the map on component unmount
    return () => map.remove();
  }, []); // Empty dependency array ensures useEffect runs only once

  return <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />;
};

export default { Map };
