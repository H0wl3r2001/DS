import ReactMapGL, {Popup, NavigationControl, FullscreenControl, GeolocateControl, Source, Layer,
} from "react-map-gl";
import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import * as Mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
import useSuperCluster from "use-supercluster";

import METROSTOPS from "../../resources/data/other/metro-stops.json";
import BUSSTOPS from "../../resources/data/other/bus-stops.json";
import GYMS from "../../resources/data/other/gyms.json";
import BIKELANES from "../../resources/data/other/bike-lanes.geojson";
import Cluster from "./Cluster";

// eslint-disable-next-line import/no-webpack-loader-syntax
Mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function Map({ data }) {
  const mapRef = React.useRef();

  const [metroInfo, setMetroInfo] = useState(false);
  const changeMetroStopsInfo = (event) => {
    // toggle map shown state
    setMetroInfo((current) => !current);
  };

  const [busInfo, setBusInfo] = useState(false);
  const changeBusStopsInfo = (event) => {
    // toggle map shown state
    setBusInfo((current) => !current);
  };

  const [gymsInfo, setGymsInfo] = useState(false);
  const changeGymsInfo = (event) => {
    // toggle map shown state
    setGymsInfo((current) => !current);
  };

  const [bikeLanesInfo, setBikeLanesInfo] = useState(false);
  const changeBikeLanesInfo = (event) => {
    setBikeLanesInfo((current) => !current);
  };

  const checkboxes = () => (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          value="bikeLanesToggle"
          id="flexSwitchCheckDefault"
          onChange={changeBikeLanesInfo}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Show Bike Lanes
        </label>
      </div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          value="busStopsToggle"
          id="flexSwitchCheckDefault"
          onChange={changeBusStopsInfo}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Show Bus Stops
        </label>
      </div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          value="metroStopsToggle"
          id="flexSwitchCheckDefault"
          onChange={changeMetroStopsInfo}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Show Metro Stops
        </label>
      </div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          value="gyms"
          id="flexSwitchCheckDefault"
          onChange={changeGymsInfo}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Show Gyms
        </label>
      </div>
    </>
  );

  const [popupInfo, setPopupInfo] = useState(null);
  const [popupPointsInfo, setPopupPointsInfo] = useState(null);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    longitude: -8.629,
    latitude: 41.159,
    zoom: 12.5,
    position: "relative"
  });

  //listings points
  const points = data.map(listing => ({
  type: "Feature",
  properties: {
    cluster: false,
    listingId: listing._id,
    title: listing.title,
    thumbnail: listing.thumbnail
  },
  geometry: {
    type: "Point",
    coordinates: [listing.coordinates.longitude, listing.coordinates.latitude]
  }
  }));

  // get bounds
  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  // get clusters
  const { clusters, supercluster } = useSuperCluster({
    points,
    zoom: viewport.zoom,
    bounds: bounds,
    options: { radius: 75, maxZoom: 20 },
  });

  //bus points
  const busPoints = BUSSTOPS.map((busStop) => ({
    type: "Feature",
    properties: {
      cluster: false,
      busStopId: busStop.code,
      title: busStop.name,
    },
    geometry: {
      type: "Point",
      coordinates: [busStop.coordinates[0], busStop.coordinates[1]],
    },
  }));

  // bus cluster
  const { clusters: busClusters, supercluster: busSupercluster } =
    useSuperCluster({
      points: busPoints,
      zoom: viewport.zoom,
      bounds: bounds,
      options: { radius: 75, maxZoom: 20 },
    });

  //metro points
  const metroPoints = METROSTOPS.map((metroStop, index) => ({
    type: "Feature",
    properties: {
      cluster: false,
      metroStopId: index,
      title: metroStop.name,
    },
    geometry: {
      type: "Point",
      coordinates: [metroStop.coordinates[1], metroStop.coordinates[0]],
    },
  }));

  // metro cluster
  const { clusters: metroClusters, supercluster: metroSupercluster } =
    useSuperCluster({
      points: metroPoints,
      zoom: viewport.zoom,
      bounds: bounds,
      options: { radius: 75, maxZoom: 20 },
    });

  //gyms points
  const gymPoints = GYMS.map((gymStop, index) => ({
    type: "Feature",
    properties: {
      cluster: false,
      gymStopId: index,
      title: gymStop.name,
    },
    geometry: {
      type: "Point",
      coordinates: [gymStop.coordinates[1], gymStop.coordinates[0]],
    },
  }));

  // metro cluster
  const { clusters: gymClusters, supercluster: gymSupercluster } =
    useSuperCluster({
      points: gymPoints,
      zoom: viewport.zoom,
      bounds: bounds,
      options: { radius: 75, maxZoom: 20 },
    });

  const layerStyle = {
    id: "bikelane",
    type: "line",
    paint: {
      "line-width": 2,
      "line-color": "#0080ef",
    },
  };


  return (
    <>

      {/* Display the map */}
      {
        <ReactMapGL
          ref={mapRef}
          {...viewport}
          maxZoom={20}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken="pk.eyJ1IjoiY2FybG9zdmVyaXNzaW1vMzAwMSIsImEiOiJjbDlyZXExdXcwMGlmM3Bvdjdma25tbm1hIn0.aPCY2bEmrpEHfHYjiELx1A"
          onMove={(evt) => setViewport(evt.viewState)}
          onClick={onclick}
        >
          {/* Display the listings, as clusters */}
          {clusters.map((cluster,index) => {
            return(
              <Cluster
                key= {index}
                cluster={cluster}
                viewport={viewport}
                setPopupInfo={setPopupInfo}
                supercluster={supercluster}
                classN={"cluster-marker"}
                points={points}
                setViewport={setViewport}
                src={"https://cdn-icons-png.flaticon.com/512/25/25694.png"}
                alt={"listing"}
              >

              </Cluster>
              )
        })}
          {/* If show metro stops is toggle, show the metro stops on the map */}
          {metroInfo && metroClusters.map((cluster, index)=> {
                  return(
                    <Cluster
                  key={index}
                  cluster={cluster}
                  viewport={viewport}
                  setPopupInfo={setPopupPointsInfo}
                  supercluster={metroSupercluster}
                  classN={"cluster-marker-metro"}
                  points={metroPoints}
                  setViewport={setViewport}
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/d/de/Porto_Metro_logo.svg"
                  }
                  alt={"metro-stop"}
                ></Cluster>
              );
            })}

          {/* If show bus stops is toggle, show the bus stops on the map */}
          {busInfo &&
            busClusters.map((cluster, index) => {
              return (
                <Cluster
                  key={index}
                  cluster={cluster}
                  viewport={viewport}
                  setPopupInfo={setPopupPointsInfo}
                  supercluster={busSupercluster}
                  classN={"cluster-marker-bus"}
                  points={busPoints}
                  setViewport={setViewport}
                  src={
                    "https://www.freeiconspng.com/thumbs/bus-icon/blue-bus-icon-2.png"
                  }
                  alt={"bus-stop"}
                ></Cluster>
              );
            })}

          {/* If show gyms is toggle, show the gyms on the map */}
          {gymsInfo &&
              gymClusters.map((cluster, index) => {
                return(
                  <Cluster
                    key= {index}
                    cluster={cluster}
                    viewport={viewport}
                    setPopupInfo={setPopupPointsInfo}
                    supercluster={gymSupercluster}
                    classN={"cluster-marker-gym"}
                    points={gymPoints}
                    setViewport={setViewport}
                    src={"https://cdn-icons-png.flaticon.com/512/69/69840.png"}
                    alt={"gym"}
                  >
                  </Cluster>
                )
              })}

          {/* Display the map controls */}
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />

          {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupInfo.geometry.coordinates[0])}
              latitude={Number(popupInfo.geometry.coordinates[1])}
              onClose={() => setPopupInfo(null)}
            >
              <div>
                {popupInfo.properties.title} |{" "}
                <a target="_new" href={`/listings/${popupInfo.properties.listingId}`}>
                  {" "}
                  Open listing
                </a>
              </div>
              <img width="100%" src={popupInfo.properties.thumbnail} alt={popupInfo.properties.title} />
            </Popup>
          )}
           {popupPointsInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupPointsInfo.geometry.coordinates[0])}
              latitude={Number(popupPointsInfo.geometry.coordinates[1])}
              onClose={() => setPopupPointsInfo(null)}
            >
              <div>
                {popupPointsInfo.properties.title}
              </div>
            </Popup>
          )}

          {bikeLanesInfo && <Source id="track" type="geojson" data={BIKELANES}>
            <Layer {...layerStyle} />
          </Source> }

        </ReactMapGL>
    }

      {checkboxes()}
    </>
  );
}

export default Map;
