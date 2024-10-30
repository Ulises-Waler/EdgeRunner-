import React from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 21.8781, 
  lng: -102.2915 
};

const MapComponent = ({ incidents, patrolRoutes }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDkCXkdamNXTN3uZyM_7o7sWobnf-Ml6mA">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        {}
        {incidents.map((incident) => (
          <Marker 
            key={incident._id} 
            position={{ lat: incident.location.coordinates[1], lng: incident.location.coordinates[0] }} 
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", 
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {}
        {patrolRoutes.map((route, index) => (
          <Polyline
            key={index}
            path={route}
            options={{
              strokeColor: '#00FF00', 
              strokeOpacity: 0.7,
              strokeWeight: 4,
              zIndex: 1,
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
