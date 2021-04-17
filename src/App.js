import "./App.css";
import { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from 'react-map-gl';
import { GeoJsonLayer } from "@deck.gl/layers";
import { Slider, Tooltip } from '@material-ui/core';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibmF0c3Vub3RzdWt1ZGEiLCJhIjoiY2tua2l1ZzB0MGJqaDJucDNqYnd2MmVlZyJ9.n2deVJQiKF_O3D8TGX8E9Q';

function App() {
  const [perDayData, setPerDayData] = useState({});
  const [prefPolygon, setPrefPolygon] = useState({})
  const [yyyymmdd, setYYYYMMDD] = useState("2021-01-10");
  const [dateArray, setDateArray] = useState([])
  const [dateSliderValue, setDateSliderValue] = useState(0)
  const [viewState, setViewState] = useState({
    longitude: 135,
    latitude: 38,
    zoom: 4.6,
    pitch: 45
  })

  //settings for deck.gl
  const geoLayer = new GeoJsonLayer({
    id: 'geojson-layer',
    data: prefPolygon,
    wireframe: true,
    filled: true,
    stroked: true,
    opacity: 0.8,
    pickable: true,
    filled: true,
    extruded: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [240, 68, 47, 180],
    getRadius: 100,
    getLineWidth: 1,
    getElevation: f => perDayData[yyyymmdd][f.properties.name]['per_day'] * 100
  });

  useEffect(() => {
    console.log("mounted");
    async function fetchData() {
      const [dayData, dayArray] = await loadDayData();
      console.log(dayArray)
      setPerDayData(dayData)
      setDateArray(dayArray)
      setDateSliderValue(0)
      setYYYYMMDD(dayArray[0])
      
      const polygonData = await loadPrefPolygon();
      setPrefPolygon(polygonData)
    }
    fetchData();
    return () => console.log("unmounting...");
  }, []);
  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      display: "flex"
    }}
    >
      <DeckGL
        layers={[geoLayer]}
        initialViewState={viewState}
        controller={true}
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100%",
        }}
      >
        <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
      </DeckGL>
      <Slider
        defaultValue={dateArray.length-1}
        ValueLabelComponent={props => ValueLabelComponent(props, yyyymmdd)}
        valueLabelDisplay="on"
        step={1}
        marks
        min={0}
        max={dateArray.length-1}
        style={{
          position: "absolute",
          bottom: "25px",
          width: "90vw",
          marginLeft: "5vw"
        }}
        onChange={(e, v)=>setYYYYMMDD(dateArray[v])}
      />
      {/*<Slider
          value={dateSliderValue}
          aria-labelledby="discrete-slider"
          ValueLabelComponent={props => ValueLabelComponent(props, yyyymmdd)}
          valueLabelDisplay="on"
          step={1}
          marks
          min={0}
          max={(dateArray).length-1}
          onChange={value=>{
            setYYYYMMDD(dateArray[value])
          }}
          style={{bottom: 10, position: 'absolute', right: 10, left: 10}}
        />*/}
    </div>
  );
}

async function loadDayData() {
  const jsonData = await fetch("jsonData/newCovid19JapanAll.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((resJson) => { return resJson });
  return [jsonData, Object.keys(jsonData)];
}

async function loadPrefPolygon() {
  const jsonData = await fetch("jsonData/prefectures.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((resJson) => {
      const polyData = resJson['features']
      return polyData
    });
  return { type: "FeatureCollection", features: jsonData };
}

function ValueLabelComponent(props, date) {
  const { children, open, value } = props;
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={date}>
      {children}
    </Tooltip>
  );
}

function getHeight(data) {
}

function getColor(data) {

}

export default App;
