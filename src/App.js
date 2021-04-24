import classes from "./App.module.css";
import { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { GeoJsonLayer } from "@deck.gl/layers";
import { MenuField } from "./components/menuField";
import { GraphArea } from "./components/graphArea";
import { BottomMenuField } from "./components/bottomMenuField";
import { prefectures } from "./metadata";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibmF0c3Vub3RzdWt1ZGEiLCJhIjoiY2tua2l1ZzB0MGJqaDJucDNqYnd2MmVlZyJ9.n2deVJQiKF_O3D8TGX8E9Q";

function App() {
  const [perDayData, setPerDayData] = useState({});
  const [prefPolygon, setPrefPolygon] = useState({});
  const [yyyymmdd, setYYYYMMDD] = useState("2021-01-10");
  const [dateArray, setDateArray] = useState([]);
  const [viewState, setViewState] = useState({
    longitude: 135,
    latitude: 38,
    zoom: 4.6,
    pitch: 45,
  });
  const [isDisplayPolygon, setIsDisplayPolygon] = useState(true);
  const [isDisplayArc, setIsDisplayArc] = useState(true);
  const [isZenkoku, setIsZenkoku] = useState(true);
  const [isPrefsPolygon, setIsPrefsPolygon] = useState(Array(47).fill(false));
  const [isZenkokuArc, setIsZenkokuArc] = useState(true);
  const [isPrefsArc, setIsPrefsArc] = useState(Array(47).fill(false));

  //settings for deck.gl
  const geoLayer = new GeoJsonLayer({
    id: "geojson-layer",
    data: prefPolygon,
    wireframe: true,
    filled: true,
    stroked: true,
    opacity: 1.0,
    pickable: true,
    extruded: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: (f) => {
      if (
        !isZenkoku &&
        !isPrefsPolygon[prefectures.indexOf(f.properties.name)]
      ) {
        return [0, 0, 0, 0];
      }
      return [
        perDayData[yyyymmdd][f.properties.name]["per_day"]/0.5,
        122,
        122,
        255,
      ];
    },
    getRadius: 100,
    getLineWidth: 1,
    getLineColor: (f) => {
      if (
        !isZenkoku &&
        !isPrefsPolygon[prefectures.indexOf(f.properties.name)]
      ) {
        return [0, 0, 0, 0];
      }
      return [
        perDayData[yyyymmdd][f.properties.name]["per_day"]/0.5,
        122,
        122,
        255,
      ];
    },
    getElevation: (f) => {
      if (
        !isZenkoku &&
        !isPrefsPolygon[prefectures.indexOf(f.properties.name)]
      ) {
        return 0;
      }
      return perDayData[yyyymmdd][f.properties.name]["per_day"] * 200;
    },
    updateTriggers: {
      getFillColor: { yyyymmdd, isPrefsPolygon, isZenkoku },
      getLineColor: { yyyymmdd, isPrefsPolygon, isZenkoku },
      getElevation: { yyyymmdd, isPrefsPolygon, isZenkoku },
    },
  });

  useEffect(() => {
    console.log("mounted");
    async function fetchData() {
      const [dayData, dayArray] = await loadDayData();
      console.log(dayArray);
      setPerDayData(dayData);
      setDateArray(dayArray);
      setYYYYMMDD(dayArray[0]);

      const polygonData = await loadPrefPolygon();
      setPrefPolygon(polygonData);
    }
    fetchData();
    return () => console.log("unmounting...");
  }, []);
  return (
    <div className={classes.App}>
      <div className={classes.header}>
        <div className={classes.title}>
          新型コロナウイルスデータ可視化サイト
        </div>
        <a
          className={classes.detail}
          href={"https://github.com/tktkbohshi/cov19_map_vis"}
        >
          レポジトリ（リンク）
        </a>
        <div className={classes.update}>update at 2021.4.24</div>
      </div>
      <div className={classes.mapContainer}>
        <DeckGL
          layers={[geoLayer]}
          initialViewState={viewState}
          controller={true}
        >
          <StaticMap
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/natsunotsukuda/cknluz9sx1ovb17pd5et6hg4y"
          />
        </DeckGL>
        <MenuField
          isZenkoku={isZenkoku}
          isZenkokuArc={isZenkokuArc}
          isPrefsPolygon={isPrefsPolygon}
          isPrefsArc={isPrefsArc}
          setIsDisplayPlygon={isDisplayPolygon}
          isDiplayArc={isDisplayArc}
          setIsPrefsPolygon={(v) => setIsPrefsPolygon(v)}
          setIsPrefsArc={(v) => setIsPrefsArc(v)}
          setIsDisplayPolygon={(v) => setIsDisplayPolygon(v)}
          setIsDisplayArc={(v) => setIsDisplayArc(v)}
          onIsZenkokuChange={(v) => setIsZenkoku(v)}
          onIsZenkokuArcChange={(v) => setIsZenkokuArc(v)}
        />
        <BottomMenuField
          defaultValue={dateArray.length - 1}
          date={yyyymmdd}
          original_index={dateArray.indexOf(yyyymmdd)}
          date_length={dateArray.length}
          onSliderChange={(v) => {
            setYYYYMMDD(dateArray[v]);
            console.log("slider change");
          }}
        />
      </div>
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
    .then((resJson) => {
      return resJson;
    });
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
      const polyData = resJson["features"];
      return polyData;
    });
  return { type: "FeatureCollection", features: jsonData };
}

export default App;
