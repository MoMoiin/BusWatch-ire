import React, { createContext, useState, useEffect, useContext } from 'react';
import routes from '../busDataPublic/routes.json'; // Import routes.json

const BusDataContext = createContext();

export const useBusData = () => useContext(BusDataContext);

export const BusDataProvider = ({ children }) => {
    const [busData, setBusData] = useState([]);

    useEffect(() => {
        const fetchBusData = async () => {
            try {
                const response = await fetch('https://api.nationaltransport.ie/gtfsr/v2/Vehicles?format=json', {
                    method: 'GET',
                    headers: {
                        'Cache-Control': 'no-cache',
                        'x-api-key': '176e4d42b0ec476e9637ea0e421f69ab',
                    },
                });
                const data = await response.json();
                
                // Create a map of route_id to route_short_name
                const routeMap = routes.reduce((map, route) => {
                    map[route.route_id] = route.route_short_name;
                    return map;
                }, {});

                const buses = data.entity.map(bus => ({
                    id: bus.id,
                    latitude: bus.vehicle.position.latitude,
                    longitude: bus.vehicle.position.longitude,
                    route_id: bus.vehicle.trip.route_id,
                    route_short_name: routeMap[bus.vehicle.trip.route_id] || 'Unknown', // Map route_id to route_short_name
                })); 
                setBusData(buses);
                console.log(buses);
            } catch (error) {
                console.error('Error fetching bus data:', error);
            }
        };
        
        fetchBusData();
        const intervalId = setInterval(fetchBusData, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <BusDataContext.Provider value={busData}>
            {children}
        </BusDataContext.Provider>
    );
};