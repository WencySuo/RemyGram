// // Map.js
import React, { useEffect } from 'react';
import mapboxgl, { Popup } from 'mapbox-gl';
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
      container: 'map-container',
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
            title: `Dummy Popup ${index + 1}`,
            description: 'This is a dummy popup description.',
            'marker-symbol': 'theatre', // Adjust this to an appropriate icon
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
          'icon-image': ['get', 'marker-symbol'],
          'icon-allow-overlap': true,
        },
      });

      // When a click event occurs on the Map, open a popup to submit a post.
      map.on('click', (e) => {
        const coordinates = e.lngLat;

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<h1>Clicked Here!</h1>`)
          .addTo(map);

        new mapboxgl.Marker({ color: 'red', scale: 2 })
          .setLngLat(coordinates)
          .addTo(map);
      });
    

      // When a click event occurs on a feature in the dummyPopups layer, open a popup.
      map.on('click', 'dummyPopups', (e) => {

        const coordinates = e.features[0].geometry.coordinates.slice();
        const title = e.features[0].properties.title;
        const description = e.features[0].properties.description;

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<h1>${title}</h1><p>${description}</p>`)
          .addTo(map);

        new mapboxgl.Marker({ color: 'red', scale: 2 })
          .setLngLat(coordinates)
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

  return <div id="map-container" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />;
};

export default Map;
