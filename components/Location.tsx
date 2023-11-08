"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LocationProps {
    center: L.LatLngExpression;
    zoom: number;
}

const Location: React.FC<LocationProps> = ({
    center,
    zoom
}) => {
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (mapRef.current === null) {
            mapRef.current = L.map('map', {
                center,
                zoom
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapRef.current);

            const myIcon = L.icon({
                iconUrl: '/pinmapa.svg',
                iconSize: [38, 95],
                iconAnchor: [22, 94],
                popupAnchor: [-3, -76], 
            });

            L.marker(center, { icon: myIcon }).addTo(mapRef.current)
        }
    }, [center, zoom])

    return <div id="map" style={{ height: '400px', width: '100%', borderRadius: '8px' }}></div>;
}

export default Location;