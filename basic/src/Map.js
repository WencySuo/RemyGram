import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';

const Map = () => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoid3d3c3NzIiwiYSI6ImNscGl0YjQybDAybWcybG91Ynd6bTAxeWMifQ.b4pItpBiNsKBSQ2bmV-Wuw';
    // Set bounds to San Francisco, California.
    const bounds = [
      [-71.119340, 42.373465], // Southwest coordinates
      [-71.114128, 42.380368] // Northeast coordinates
    ];

    const map = new mapboxgl.Map({
      container: 'map', // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-71.11671, 42.37443], // starting position
      zoom: 8, // starting zoom
      maxBounds: bounds // Set the map's geographical boundaries.
    });

    const marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([-71.11671, 42.37443])
      .addTo(map);

    function onDragEnd() {
      const lngLat = marker.getLngLat();
      document.getElementById('coordinates').style.display = 'block';
      document.getElementById('coordinates').innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
    }

    marker.on('dragend', onDragEnd);

    // Cleanup the map on component unmount
    return () => map.remove();
  }, []);

  return (
    <div>
      <div id="map" className="flex-grow"></div>
      <pre id="coordinates" className="coordinates"></pre>
    </div>
  );
};

export default Map;

