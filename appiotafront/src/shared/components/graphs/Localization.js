import React, { useState } from 'react';
import ReactMapGL, {Marker, WebMercatorViewport } from 'react-map-gl';
import './Localization.scss';

const applyToArray = (func, array) => func.apply(Math, array)

const getBoundsForPoints = (points) => {
  
  const pointsLong = points.time.map((point, index) => points.lon[index])
  const pointsLat = points.time.map((point, index) => points.lat[index])
  const cornersLongLat = [
    [applyToArray(Math.min, pointsLong), applyToArray(Math.min, pointsLat)],
    [applyToArray(Math.max, pointsLong), applyToArray(Math.max, pointsLat)]
  ]
  
  const viewport = new WebMercatorViewport({ width: 800, height: 600 })
    .fitBounds(cornersLongLat, { padding: 200 })

  const { longitude, latitude, zoom } = viewport

  return { longitude, latitude, zoom }
}

const Localization = props => {
    const bounds = getBoundsForPoints(props)

    const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(props.config.mam_provider)}&mode=${props.config.mode}&root=`

    const [viewport, setViewport] = useState({
        width: '100%',
        height: 400,
        zoom: 14,
        ...bounds
    });

    return (
        <div className="half">
            {props.time.length > 0 ? <ReactMapGL 
                {...viewport}
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken="pk.eyJ1IjoibWlydHMiLCJhIjoiY2toY2w5NjV5MDg1dzJ5cXNodnE1dmwyMyJ9.gI64rXBrrb-WQ-g_YixScw"
            >
                {props.time.length > 0 && props.time.map((data, index) => (
                    <Marker 
                    key={index}
                    latitude={parseFloat(parseFloat(props.lat[index]).toFixed(4))} 
                    longitude={parseFloat(parseFloat(props.lon[index]).toFixed(4))} 
                    offsetTop={-30}
                    offsetLeft={-15}
                    >
                        <div className="custom-pin">
                            <img src={'/img/marker-' + (index === 0 ? "red" : (index === props.time.length - 1 ? "green" : "blue")) + '.png'} alt="Gem" />
                            <span>{(new Date(data * 1000)).toLocaleString()}</span>
                            <a href={mamExplorerLink + props.root} target="_blank" rel="noopener noreferrer" >Comprove</a>
                        </div>
                    </Marker>
                ))}
            </ReactMapGL> : <h1>Sem dados de localização ainda.</h1>}
        </div>
    );
}

export default Localization;