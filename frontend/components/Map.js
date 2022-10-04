import React, { useState } from 'react';
import {
  LoadScript,
  GoogleMap,
  InfoWindow,
  Marker,
} from '@react-google-maps/api';

const markers = [
  {
    id: 1,
    name: 'Chicago, Illinois',
    position: { lat: 41.881832, lng: -87.623177 },
  },
  {
    id: 2,
    name: 'Denver, Colorado',
    position: { lat: 39.739235, lng: -104.99025 },
  },
  {
    id: 3,
    name: 'Los Angeles, California',
    position: { lat: 34.052235, lng: -118.243683 },
  },
  {
    id: 4,
    name: 'New York, New York',
    position: { lat: 40.712776, lng: -74.005974 },
  },
];

function Map() {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleOnLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyA9RcmgPB0Ft3wvMYc1D78CsdyZm19LeoY">
      <GoogleMap
        onLoad={handleOnLoad}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={{ width: '100vw', height: '100vh' }}
      >
        {markers.map(
          ({ id, name, position }) => (
            console.log(id, name, position),
            (<Marker key={id} position={position}></Marker>)
          ),
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
