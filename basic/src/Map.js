// import React, { useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import './Map.css';

// const Map = () => {
//   useEffect(() => {
  
//     // mapbox access token
//     mapboxgl.accessToken = 'pk.eyJ1Ijoid3d3c3NzIiwiYSI6ImNscGl0YjQybDAybWcybG91Ynd6bTAxeWMifQ.b4pItpBiNsKBSQ2bmV-Wuw';
    
//     // Set bounds to Harvard Yard 
//     const bounds = [
//       [-71.119340, 42.373465], // Southwest coordinates
//       [-71.114128, 42.380368] // Northeast coordinates
//     ];

//     // test fixed markers 
//     const geojson = {
//       'type': 'FeatureCollection', 
//       'features': [
//         {
//           'type': 'Feature', 
//           'properties': {
//             'message': 'Foo', 
//             'iconSize': [60, 60]
//           },
//           'geometry': {
//             'type': 'Point', 
//             'coordinates': [-71.11654109897812, 42.376128375508415]
//           }
//         },
//         {
//           'type': 'Feature', 
//           'properties': {
//             'message': 'Bar', 
//             'iconSize': [60, 60]
//           },
//           'geometry': {
//             'type': 'Point', 
//             'coordinates': [-71.1139399112255, 42.37570528527877]
//           }
//         },
//         {
//           'type': 'Feature', 
//           'properties': {
//             'message': 'Baz', 
//             'iconSize': [60, 60]
//           },
//           'geometry': {
//             'type': 'Point', 
//             'coordinates': [-71.11596991397062, 42.37511426893823]
//           }
//         },
//       ]
//     };
       
//     // set paramaters for map
//     const map = new mapboxgl.Map({
//       container: 'map', // container ID
//       // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
//       style: 'mapbox://styles/mapbox/streets-v12', // style URL
//       center: [-71.11671, 42.37443], // starting position
//       zoom: 8, // starting zoom
//       maxBounds: bounds // Set the map's geographical boundaries.
//     });

//     // Add markers by looping 
//     for (const marker of geojson.features){
//       // DOM element for each marker 
//       const el = document.createElement('div');
//       const width = marker.properties.iconSize[0];
//       const height = marker.properties.iconSize[1];
//       el.className = 'marker';
//       el.style.backgroundImage='/basic/assets/remylogo_tpt.png';
//       el.style.width = '$(width)px';
//       el.style.height = '$(height)px';
//       el.style.backdgroundSize = '100%';
      
//       // popup js
//       el.addEventListener('click', () => {
//         window.alert(marker.properties.message);
//       });

//       // add markers to the map 
//       new mapboxgl.Marker(el)
//         .setLngLat(marker.geometry.coordinates)
//         .addTo(map);
//     });

//     // const marker = new mapboxgl.Marker({
//     //   draggable: true
//     // })
//     //   .setLngLat([-71.11671, 42.37443])
//     //   .addTo(map);

//     // function onDragEnd() {
//     //   const lngLat = marker.getLngLat();
//     //   document.getElementById('coordinates').style.display = 'block';
//     //   document.getElementById('coordinates').innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
//     // }

//     // marker.on('dragend', onDragEnd);

//     // Cleanup the map on component unmount
//     return () => map.remove();
//   }, []); // Empty dependency array ensures useEffect runs only once

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
import './Map.css';

const Map = () => {
  useEffect(() => {
    // mapbox access token
    mapboxgl.accessToken = 'pk.eyJ1Ijoid3d3c3NzIiwiYSI6ImNscGl0YjQybDAybWcybG91Ynd6bTAxeWMifQ.b4pItpBiNsKBSQ2bmV-Wuw';

    // Set bounds to Harvard Yard
    const bounds = [
      [-71.119340, 42.373465], // Southwest coordinates
      [-71.114128, 42.380368] // Northeast coordinates
    ];

    // test fixed markers
    const geojson = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {
            'message': 'Foo',
            'iconSize': [60, 60]
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-71.11654109897812, 42.376128375508415]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'message': 'Bar',
            'iconSize': [60, 60]
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-71.1139399112255, 42.37570528527877]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'message': 'Baz',
            'iconSize': [60, 60]
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-71.11596991397062, 42.37511426893823]
          }
        },
      ]
    };

    // set parameters for map
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-71.11671, 42.37443], // starting position
      zoom: 8, // starting zoom
      maxBounds: bounds // Set the map's geographical boundaries.
    });

    // Add markers by looping
    for (const marker of geojson.features) {
      // DOM element for each marker
      const el = document.createElement('div');
      const width = marker.properties.iconSize[0];
      const height = marker.properties.iconSize[1];
      el.className = 'marker';
      el.style.backgroundImage = `url('/assets/remylogo_tpt.png')`; // Use url() for background-image
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundSize = '100%';

      // popup js
      el.addEventListener('click', () => {
        window.alert(marker.properties.message);
      });

      // add markers to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
    }

    // find mouse location 
    map.on('mousemove', (e) => {
      document.getElementById('mouse').innerHTML =
      // `e.point` is the x, y coordinates of the `mousemove` event
      // relative to the top-left corner of the map.
      JSON.stringify(e.point) +
      '<br />' +
      // `e.lngLat` is the longitude, latitude geographical position of the event.
      JSON.stringify(e.lngLat.wrap());
      });

    // Cleanup the map on component unmount
    return () => map.remove();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      <div id="map" className="flex-grow"></div>
      <pre id="coordinates" className="coordinates"></pre>
      <pre id="mouse"></pre>
    </div>
  );
};

export default Map;
