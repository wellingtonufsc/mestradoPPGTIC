import React, { useState } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import './Localization.scss';

const Localization = props => {

    const [viewport, setViewport] = useState({
        width: '100%',
        height: 400,
        latitude: parseFloat(parseFloat(props.lat[1]).toFixed(4)),
        longitude: parseFloat(parseFloat(props.lon[1]).toFixed(4)),
        zoom: 14
    });

    return (
        <div className="half">
            <ReactMapGL 
                {...viewport}
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken="pk.eyJ1IjoibWlydHMiLCJhIjoiY2toY2w5NjV5MDg1dzJ5cXNodnE1dmwyMyJ9.gI64rXBrrb-WQ-g_YixScw"
            >
                <Marker 
                    latitude={parseFloat(parseFloat(props.lat[1]).toFixed(4))} 
                    longitude={parseFloat(parseFloat(props.lon[1]).toFixed(4))} 
                    offsetTop={-30}
                    offsetLeft={-15}
                >
                    <div className="custom-pin">
                        <img src="/img/marker.png" alt="Gem" />
                    </div>
                </Marker>
            </ReactMapGL>
        </div>
    );
}

export default Localization;