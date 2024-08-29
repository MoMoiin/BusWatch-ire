// MapComponent.jsx
import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useBusData } from './busDataPrivate/busData.jsx'; // Corrected import path
import CustomMarker from './markers/customMarker.jsx'; // Ensure this path is correct

const screenHeight = Dimensions.get('window').height;

const MapComponent = () => {
    const [region, setRegion] = useState({
        latitude: 53.3498,
        longitude: -6.2603,
        latitudeDelta: 3.5,
        longitudeDelta: 3.5,
    });

    const busData = useBusData();
    const [showBuses, setShowBuses] = useState(false);

    const handleRegionChangeComplete = (newRegion) => {
        setRegion(newRegion);
        if (newRegion.latitudeDelta < 2) {
            setShowBuses(true);
        } else {
            setShowBuses(false);
        }
    };

    const isBusInRegion = (bus, region) => {
        const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
        const latMin = latitude - latitudeDelta / 2;
        const latMax = latitude + latitudeDelta / 2;
        const lonMin = longitude - longitudeDelta / 2;
        const lonMax = longitude + longitudeDelta / 2;

        return (
            bus.latitude >= latMin &&
            bus.latitude <= latMax &&
            bus.longitude >= lonMin &&
            bus.longitude <= lonMax
        );
    };

    return (
        <MapView
            style={[StyleSheet.absoluteFillObject, { height: screenHeight * 1.1 }]}
            region={region}
            onRegionChangeComplete={handleRegionChangeComplete}
        >
            {showBuses && busData.filter(bus => isBusInRegion(bus, region)).map(bus => (
                <Marker
                    key={bus.id}
                    coordinate={{ latitude: bus.latitude, longitude: bus.longitude }}
                >
                    <CustomMarker 
                        routeShortName={bus.route_short_name} // Pass routeShortName as a prop
                    />
                </Marker>
            ))}
        </MapView>
    );
};

export default MapComponent;