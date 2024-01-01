import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapRef from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectIsLoading, selectIsRideSelectionVisible, selectOrigin, setTimeTravel } from 'slices/navSlice';
import {useRef} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RideSelectionCard from './RideSelectionCard';
import LoadingBar from './component/LoadingBar';

const MapScreen = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const isRideSelectionVisible = useSelector(selectIsRideSelectionVisible);
  const isLoading = useSelector(selectIsLoading);
  const mapRef = useRef<MapRef | null>(null);
  const dispatch = useDispatch();
  const Stack = createStackNavigator();

  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async() => {
        fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
        units=imperial
        &origins=${origin.description}
        &destinations=${destination.description}
        &key=AIzaSyDgYL3Qv0aHXX3thFoyai6djprcF4Kla3M`
        ).then((res) => res.json())
        .then(data => {
            dispatch(setTimeTravel(data.rows[0].elements[0]));
        });
    }

    getTravelTime();
  }), [origin, destination, 'AIzaSyDgYL3Qv0aHXX3thFoyai6djprcF4Kla3M']



  return (
    <View style={{flex: 1 }}>
      <MapView
        ref={mapRef}
        mapType='mutedStandard'
        style={{flex: isRideSelectionVisible? 0.5: 1 }}
        initialRegion={{
          latitude: destination.location.lat,
          longitude: destination.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >

      {origin && destination && (
        isRideSelectionVisible ? (
          <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            strokeColor='blue'
            strokeWidth={5}
            apikey='AIzaSyDgYL3Qv0aHXX3thFoyai6djprcF4Kla3M'
            onReady={(result) => {
              // Get the coordinates of the direction
              const coordinates = result.coordinates;
              mapRef.current?.fitToCoordinates(coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
              });
            }}
          />
        ) : (
          // Your else content goes here
          mapRef.current?.fitToSuppliedMarkers(['origin'], {
            edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
            animated: true,
          })
        )
      )}

        <Marker
        coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
        }}
        title="Origin"
        description="Origin Location"
        identifier="origin"
        />

        <Marker
        coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
        }}
        title="Destination"
        description="Destination"
        identifier="destination"
        />
      </MapView>

      
      {isLoading && (
        <View style={styles.loadingContainer}>
          <LoadingBar />
        </View>
      )}

      <View style={{flex: isRideSelectionVisible? 0.5: 0}}>
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // Hide the header for all screens in the navigator
        }}>
            <Stack.Screen name="RideSelection" component={RideSelectionCard} />
        </Stack.Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center', // Adjust the background color and opacity as needed
  },
});

export { MapScreen };