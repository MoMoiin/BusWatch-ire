import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomMarker = ({ routeShortName, onPress }) => {
    return (
        <TouchableOpacity onPress={() => {
            console.log('CustomMarker pressed');
            onPress();
        }}>
            <View style={styles.markerContainer}>
                <Text style={styles.markerText}>
                    {routeShortName}
                </Text>
            </View>
        </TouchableOpacity>
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
        padding: 3, // Add padding for better appearance
        borderRadius: 8, // Add border radius for rounded corners
        borderWidth: 1, // Add border width
        borderColor: 'black', // Add border color
        textAlign: 'center', // Center the text
    },
});

export default CustomMarker;