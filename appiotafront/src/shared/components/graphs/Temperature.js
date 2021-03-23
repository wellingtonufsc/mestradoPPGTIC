import React, { useEffect, useState } from 'react';
import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    LineMarkSeries,
    Hint
  } from 'react-vis';
import './Temperature.scss';

function compare( a, b ) {
    if ( a.timestamp < b.timestamp ){
      return -1;
    }
    if ( a.timestamp > b.timestamp ){
      return 1;
    }
    return 0;
  }

const Temperature = props => {

    const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(props.config.mam_provider)}&mode=${props.config.mode}&root=`

    let [data, setData] = useState([]);
    const [value, setValue] = useState(null);

    useEffect(() => {
        let data2 = [];

        if (props.time.length > 0) {
            props.time.forEach((element, index) => {
                data2.push({x: (new Date(props.time[index] * 1000)).toLocaleString() , y: props.temp[index], timestamp: props.time[index]});
            });
    
            data2 = data2.sort(compare);
            data2.forEach(function(v){ delete v.timestamp })
    
            setData(data2)
        }
        
    }, [props]);

    return (
        <div className="half">
            {data.length > 0 ? <FlexibleWidthXYPlot height={400} xType="ordinal" onMouseLeave={() => {setValue(null)}} >
                <XAxis title="Datas" tickLabelAngle={-45}/>
                <YAxis title="Temperatura ºC" />
                <LineMarkSeries data={data} onNearestXY={(datapoint, event)=>{setValue(datapoint)}} />
                {value && (
                    <Hint value={value}>
                        <div style={{
                            background: 'transparent', 
                            color: "white", 
                            fontSize: "14px",
                            lineHeight: "16px",
                            textAlign: "left",
                            border: "1px solid white",
                            borderRadius: "5px",
                            padding: "2px"
                        }}>
                            <p style={{
                                margin: "0"
                            }}>
                                Temperatura: {value.y} ºC
                                <br />
                                Data: {value.x}
                            </p>
                        </div>
                    </Hint>
                )}
            </FlexibleWidthXYPlot> : <h1>Sem dados de temperatura ainda</h1>}
            <a className="link-comprove" href={mamExplorerLink + props.root} target="_blank" rel="noopener noreferrer" >Comprove</a>
        </div>
    );
}

export default Temperature;