// index.jsx
import React from 'react';
import { BusDataProvider } from './components/googleAPI/busDataPrivate/busData.jsx';
import  MapComponent from './components/googleAPI/MapComponent';

export default function App() {
    return (
        <BusDataProvider>
            <MapComponent />
        </BusDataProvider>
    );
}