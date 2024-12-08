import React from 'react';
function hexToBytes(hex: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }
  return bytes;
}

function binaryToNumber(bytes: number[]): number {
  let value = 0;
  for (let i = 0; i < bytes.length; i++) {
    value = (value * 256) + bytes[i];
  }
  return value;
}

function wkbToCoordinates(wkbString: string): { longitude: number; latitude: number } {
  const binaryData = hexToBytes(wkbString);
  const longitude = binaryToNumber(binaryData.slice(5, 13));
  const latitude = binaryToNumber(binaryData.slice(13, 21));
  return { longitude, latitude };
}

interface MapProps {
  wkbString: string;
}

const PlacesVidg: React.FC<MapProps> = ({ wkbString }) => {
  const { latitude, longitude } = wkbToCoordinates(wkbString);
  console.log(latitude, longitude)
  //const mapUrl = `https://yandex.ru/map-widget/v1/-/CGZK45a?ll=${longitude},${latitude}&z=17;`
  const mapUrl = `https://yandex.ru/map-widget/v1/?ll=${longitude},${latitude}&z=13`

  return (
  <>
  <iframe 
    style={{marginTop: '15px'}}
    src={mapUrl} 
    width="100%" 
    height="400"
    frameBorder="0" 
    allowFullScreen 
    title="Yandex Map"
  /></>
  );
};

export default PlacesVidg;