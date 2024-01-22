import { mLocation } from "./car-matching.service";

interface DistanceAndTime {
    distance: string;
    duration: string;
}

export const getDistanceAndTime = async (origin: mLocation, destination: mLocation, apiKey: string): Promise<DistanceAndTime> => {
    const originCoords = `${origin.x},${origin.y}`;
    const destinationCoords = `${destination.x},${destination.y}`;

    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${originCoords}&destinations=${destinationCoords}&key=${apiKey}`);
        const data = await response.json();

        if (response.ok) {
            if (data.rows && data.rows.length > 0 && data.rows[0].elements && data.rows[0].elements.length > 0) {
                const distance = data.rows[0].elements[0].distance?.text || 'N/A';
                const duration = data.rows[0].elements[0].duration?.text || 'N/A';
                return { distance, duration };
            } else {
                throw new Error('Invalid response format from Google Maps API');
            }
        } else {
            throw new Error(`Error fetching distance and time: ${data.status}`);
        }
    } catch (error) {
        throw new Error(`Error fetching distance and time: ${error}`);
    }
};
