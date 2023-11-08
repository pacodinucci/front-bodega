import dynamic from "next/dynamic";

const Location = dynamic(() => import("./Location"), {
    ssr: false
});

interface MapProps {
    center: [number, number];
    zoom: number;
}

const Map: React.FC<MapProps> = ({
    center, 
    zoom
}) => {
    return (
        <Location center={center} zoom={zoom} />
    )
}

export default Map;