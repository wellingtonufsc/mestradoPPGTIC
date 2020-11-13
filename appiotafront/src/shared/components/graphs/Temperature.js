import React, { useEffect, useState } from 'react';
import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    LineMarkSeries,
    Hint
  } from 'react-vis';
import './Temperature.scss';

const Temperature = props => {

    const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(props.config.mam_provider)}&mode=${props.config.mode}&root=`

    let [data, setData] = useState([]);
    const [value, setValue] = useState(null);

    useEffect(() => {
        let data2 = [];

        props.time.forEach((element, index) => {
            data2.push({x: (new Date(props.time[index] * 1000)).toLocaleString() , y: props.temp[index]});
        });

        setData(data2)
        
    }, [props]);

    return (
        <div className="half" >
            <FlexibleWidthXYPlot height={400} xType="ordinal" onMouseLeave={() => {setValue(null)}} >
                <XAxis title="Datas" />
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
            </FlexibleWidthXYPlot>
        </div>
    );
}

export default Temperature;