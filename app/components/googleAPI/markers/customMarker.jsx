// CustomMarker.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomMarker = ({ routeShortName }) => {
    return (
        <View style={styles.markerContainer}>
            <Text style={styles.markerText}>
                Bus: {routeShortName}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    markerContainer: {
        alignItems: 'center',
        justifyContent: 'center', // Center the text within the marker
    },
    markerText: {
        fontSize: 12,
        color: 'black',
        backgroundColor: 'white', // Set background color for the text
        padding: 5, // Add padding for better appearance
        borderRadius: 5, // Add border radius for rounded corners
        borderWidth: 1, // Add border width
        borderColor: 'black', // Add border color
        textAlign: 'center', // Center the text
    },
});

export default CustomMarker;