import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const DisplayMap = (props) => {
  const mapRef = React.useRef(null);
  const [trajectory, setTrajectory] = useState([]);
  // const [center, setCenter] = useState({});
  const pathData = props.booking.pathData;

  useEffect(() => {
    if (pathData.Distance > 0) {
      setTrajectory(pathData.Path);
    }
  }, [pathData]);
  React.useLayoutEffect(() => {
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "H_VWF9nCDdA3JfbAQEfqeovXQPI5hYN3W7Ufyi8xJxc",
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: {
        lat: props.lastRide.AddressPickUpLat || 48.8552406,
        lng: props.lastRide.AddressPickUpLong || 2.3342767,
      },
      zoom: 13,
      pixelRatio: window.devicePixelRatio || 1,
    });

    var svgMarkupPickup =
      '<svg width="37" height="49" viewBox="0 0 37 49" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="rgb(255,255,255)"><path fill="rgb(60,60,60)" d="M18.435 1C8.821 1 1 8.906 1 18.625c0 8.076 5.53 15.177 13.235 17.106l3.269 11.558a.969.969 0 00.931.711c.432 0 .812-.29.93-.71l3.269-11.559c7.706-1.929 13.237-9.03 13.237-17.106C35.871 8.905 28.048 1 18.435 1"></path><path fill="rgb(43,213,113)" d="M20.063 15.136v13.193a1.5 1.5 0 01-1.5 1.5h-.75a1.5 1.5 0 01-1.5-1.5V15.136l-3.396 3.395a1.503 1.503 0 01-2.114-.005l-.513-.513a1.498 1.498 0 01-.003-2.116l6.844-6.844a1.493 1.493 0 012.113 0l6.844 6.844a1.495 1.495 0 01-.003 2.116l-.513.513a1.497 1.497 0 01-2.114.005l-3.396-3.395z"></path></g></svg>';

    var svgMarkupDropOff =
      '<svg xmlns="http://www.w3.org/2000/svg" width="37" height="49" viewBox="0 0 37 49"><g fill="none" fill-rule="evenodd" stroke="rgb(255,255,255)"><path fill="rgb(60,60,60)" d="M18.435 1C8.821 1 1 8.906 1 18.625c0 8.076 5.53 15.177 13.235 17.106l3.269 11.558c.118.421.498.711.931.711.432 0 .812-.29.93-.71l3.269-11.559c7.706-1.929 13.237-9.03 13.237-17.106C35.871 8.905 28.048 1 18.435 1"></path><path fill="rgb(255,106,106)" d="M20.063 22.897V9.704a1.5 1.5 0 0 0-1.5-1.5h-.75a1.5 1.5 0 0 0-1.5 1.5v13.193L12.916 19.5a1.503 1.503 0 0 0-2.114.005l-.513.513a1.498 1.498 0 0 0-.003 2.117l6.844 6.843c.584.585 1.53.584 2.113 0l6.844-6.843a1.495 1.495 0 0 0-.003-2.117l-.513-.513a1.497 1.497 0 0 0-2.114-.005l-3.396 3.396z"></path></g></svg>';

    var icon = new H.map.Icon(svgMarkupPickup),
      coords = {
        lat: props.lastRide.AddressPickUpLat || 48.8552406,
        lng: props.lastRide.AddressPickUpLong || 2.3342767,
      },
      marker = new H.map.Marker(coords, { icon: icon });

    var icon2 = new H.map.Icon(svgMarkupDropOff),
      coords2 = {
        lat: props.lastRide.AddressDropOffLat || 48.8702034,
        lng: props.lastRide.AddressDropOffLong || 2.3051428,
      },
      marker2 = new H.map.Marker(coords2, { icon: icon2 });

    hMap.addObject(marker);
    hMap.addObject(marker2);
    // hMap.setCenter(coords2);
    var points = [
      { lat: 48.8552406, lng: 2.3342767 },
      { lat: 48.8702034, lng: 2.3051428 },
    ];
    if (trajectory.length > 0) {
      points = [];
      trajectory.map((el) => {
        points.push({ lat: el.Lat, lng: el.Lng });
      });
    }

    var linestring = new H.geo.LineString();
    points.forEach(function (point) {
      linestring.pushPoint(point);
    });
    var polyline = new H.map.Polyline(linestring, {
      style: { lineWidth: 10 },
    });
    hMap.addObject(polyline);

    hMap.getViewModel().setLookAtData({ bounds: polyline.getBoundingBox() });
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    return () => {
      hMap.dispose();
    };
  }, [mapRef, trajectory]);

  return <div className="map" ref={mapRef} style={{ height: "500px" }} />;
};
const mapStateToProps = (state) => ({
  booking: state.booking,
});
export default connect(mapStateToProps)(withRouter(DisplayMap));
