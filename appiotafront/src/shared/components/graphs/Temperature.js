import React, { useEffect, useState } from 'react';
import {
    // HorizontalGridLines,
    // VerticalGridLines,
    FlexibleWidthXYPlot,
    XAxis,
    XYPlot,
    YAxis,
    LineMarkSeries
  } from 'react-vis';
import './Temperature.scss';

const Temperature = props => {

    let [data, setData] = useState([]);

    useEffect(() => {
        let data2 = [];

        props.time.forEach((element, index) => {
            data2.push({x: (new Date(props.time[index] * 1000)).toLocaleString() , y: props.temp[index]});
        });

        console.log(data2);
        setData(data2)
        
    }, [props]);

    return (
        <div className="half" >
            <FlexibleWidthXYPlot height={400} xType="ordinal">
                <XAxis title="Datas" />
                <YAxis title="Temperatura ºC" />
                <LineMarkSeries data={data} />
            </FlexibleWidthXYPlot>
        </div>
    );
}

export default Temperature;