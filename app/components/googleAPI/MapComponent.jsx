import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableWithoutFeedback } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useBusData } from './busDataPrivate/busData.jsx';
import { SwipeablePanel } from 'rn-swipeable-panel';
import CustomMarker from './markers/customMarker.jsx'; // Import the CustomMarker component

const screenHeight = Dimensions.get('window').height;

const MapComponent = () => {
    const [region, setRegion] = useState({
        latitude: 53.1424,
        longitude: -8,
        latitudeDelta: 5.0,
        longitudeDelta: 6.0,
    });

    const busData = useBusData();
    const [showBuses, setShowBuses] = useState(false);
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [selectedBus, setSelectedBus] = useState(null);

    const handleRegionChangeComplete = (newRegion) => {
        setRegion(newRegion);
        setShowBuses(newRegion.latitudeDelta < 2);
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

    const openPanel = (bus) => {
        setSelectedBus(bus);
        setIsPanelActive(true);
    };

    const closePanel = () => {
        setIsPanelActive(false);
    };

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <MapView
                style={[StyleSheet.absoluteFillObject, { height: screenHeight * 1.1 }]}
                region={region}
                onRegionChangeComplete={handleRegionChangeComplete}
                rotateEnabled={false}
            >
                {showBuses && busData.filter(bus => isBusInRegion(bus, region)).slice(0, 10).map(bus => (
                    <Marker
                        key={bus.id}
                        coordinate={{ latitude: bus.latitude, longitude: bus.longitude }}
                    >
                        <CustomMarker
                            routeShortName={bus.route_short_name}
                            onPress={() => openPanel(bus)}
                        />
                        <Callout onPress={() => openPanel(bus)}>
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutText}>{bus.route_short_name}</Text>
                                <Text style={styles.calloutButtonText}>Details</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            {isPanelActive && (
                <TouchableWithoutFeedback onPress={closePanel}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            )}
            <SwipeablePanel
                fullWidth
                isActive={isPanelActive}
                onClose={closePanel}
                noBackgroundOpacity={true}
                showCloseButton={true}
                style={styles.swipeablePanel}
            >
                {selectedBus && (
                    <View style={styles.panelContent}>
                        <Text style={styles.panelTitle}>Bus Details</Text>
                        <Text style={styles.panelText}>Route: {selectedBus.route_short_name}</Text>
                        <Text style={styles.panelText}>Bus ID: {selectedBus.id}</Text>
                        {/* Add more bus details here */}
                    </View>
                )}
            </SwipeablePanel>
        </View>
    );
};

const styles = StyleSheet.create({
    calloutContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: 70,
        padding: 5,
        borderRadius: 8, // Add border radius for rounded corners
    },
    calloutText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    calloutButtonText: {
        color: 'blue',
        fontSize: 14,
    },
    swipeablePanel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1, // Ensure the panel is above the map but does not block interactions
    },
    panelContent: {
        padding: 20,
    },
    panelTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    panelText: {
        fontSize: 16,
        marginBottom: 5,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background
        zIndex: 1, // Ensure the overlay is above the map but below the panel
    },
});

export default MapComponent;