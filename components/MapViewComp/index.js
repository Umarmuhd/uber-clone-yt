import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { GOOGLE_MAPS_API_KEY } from "@env";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInfo,
} from "../../redux/slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { useRef } from "react";

const MapViewComp = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, left: 50, bottom: 50, right: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      const URL = `https://maps.googleapis.com/maps/api/dictancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_API_KEY}`;

      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          dispatch(setTravelTimeInfo(data.rows[0].element[0]));
        });
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_API_KEY]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin?.location?.lat ?? 37.78825,
        longitude: origin?.location?.lng ?? -122.4324,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin?.location?.lat ?? 37.78825,
            longitude: origin?.location?.lng ?? -122.4324,
          }}
          title="origin"
          description={origin?.description}
          identifier="origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination?.location?.lat ?? 45.78825,
            longitude: destination?.location?.lng ?? -12.4324,
          }}
          title="destination"
          description={destination?.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default MapViewComp;

const styles = StyleSheet.create({});
