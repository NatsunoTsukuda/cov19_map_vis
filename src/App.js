import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import { PolygonLayer } from "@deck.gl/layers";

function App() {
  const [yyyymmdd, setYYYYMMDD] = useState("20210110");
  const [perDayData, setPerDayData] = useState({});
  useEffect(() => {
    console.log("mounted");
    async function fetchData() {
      await loadDayData();
    }
    fetchData();
    return () => console.log("unmounting...");
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <DeckGL
          viewState={viewState}
        />
      </header>
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
    .then((resJson) => console.log(resJson));
  return jsonData;
}

export default App;
