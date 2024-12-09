import React from 'react';

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const mapUrl = `https://yandex.ru/map-widget/v1/-/CGZK45a?ll=${longitude},${latitude}&z=14`
;

  return (
    <iframe 
      src={mapUrl} 
      width="100%" 
      height="400" 
      frameBorder="0" 
      allowFullScreen 
      title="Yandex Map"
    />
  );
};

export default Map;