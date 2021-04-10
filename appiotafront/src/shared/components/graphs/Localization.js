import React, { useState } from 'react';
import ReactMapGL, {Marker, WebMercatorViewport } from 'react-map-gl';
import { getScaleObjectFromProps } from 'react-vis/dist/utils/scales-utils';
import './Localization.scss';

function compare( a, b ) {
    if ( a.timestamp < b.timestamp ){
      return 1;
    }
    if ( a.timestamp > b.timestamp ){
      return -1;
    }
    return 0;
}

function sortProps( props ) {
    let list = [];

    for (var j = 0; j < props.time.length; j++) 
        list.push({'timestamp': props.time[j], 'lat': props.lat[j], 'lon': props.lon[j]});

    list.sort(compare)

    for (var k = 0; k < list.length; k++) {
        props.time[k] = list[k].timestamp;
        props.lat[k] = list[k].lat;
        props.lon[k] = list[k].lon;
    }
}

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
    sortProps(props)
    const bounds = getBoundsForPoints(props)

    const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(props.config.mam_provider)}&mode=${props.config.mode}&root=`

    const [viewport, setViewport] = useState({
        width: '100%',
        height: 400,
        zoom: 14,
        ...bounds
    });

    function pegaTemperaturaPerto(data) {
        if (props.temp.length < 1) return '';

        let temperaturaMaisPerto = 0;
        let diferenca = 999999;

        for (let i = 0; i < props.temp.length; i++) {
            if (diferenca > Math.abs(props.timeTemp[i] - data)) temperaturaMaisPerto = props.temp[i];
        }

        return temperaturaMaisPerto;
    }

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
                            <span className="temp">Temp.:{pegaTemperaturaPerto(data)}ºC</span>
                            <a href={mamExplorerLink + props.root} target="_blank" rel="noopener noreferrer" >Comprove</a>
                        </div>
                    </Marker>
                ))}
            </ReactMapGL> : <h1>Sem dados de localização ainda.</h1>}
        </div>
    );
}

export default Localization;