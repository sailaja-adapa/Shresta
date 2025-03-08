import React, { useEffect, useState } from "react";

const GetCurrentAddress = ({ fetchAddressNow, onAddressFetched }) => {
    const [attempt, setAttempt] = useState(0); // Track retry attempts

    useEffect(() => {
        if (!fetchAddressNow) return; // Only fetch address when triggered

        const fetchAddress = async (latitude, longitude) => {
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=en`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                if (!data.address) {
                    throw new Error('No address data returned');
                }
                const address = data.address;
                const formattedAddress = `${address.amenity || ''}, ${address.road || ''}, ${address.village || ''}, ${address.state_district || ''}, ${address.state || ''}, ${address.postcode || ''}, ${address.country || ''}`;
                onAddressFetched(formattedAddress);
            } catch (error) {
                console.error("Error fetching address:", error);
                onAddressFetched("Error fetching address. Try again.");
            }
        };

        const getLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude, accuracy } = pos.coords;
                    console.log(`Location Accuracy: ${accuracy} meters`);
                    
                    if (accuracy < 100) { // Allow up to 100 meters
                        fetchAddress(latitude, longitude);
                    } else {
                        if (attempt < 1) { // Retry once before failing
                            setAttempt(attempt + 1);
                            getLocation();
                        } else {
                            console.warn("Location accuracy is too low");
                            onAddressFetched("Location accuracy is too low. Move to an open area.");
                        }
                    }
                },
                (error) => {
                    console.error("Error obtaining location:", error);
                    let errorMessage = "Error obtaining location. Try again.";
                    
                    if (error.code === error.PERMISSION_DENIED) {
                        errorMessage = "Location access denied. Please enable GPS permissions.";
                    } else if (error.code === error.POSITION_UNAVAILABLE) {
                        errorMessage = "Location data is unavailable. Try again later.";
                    } else if (error.code === error.TIMEOUT) {
                        errorMessage = "Location request timed out. Move to an open area.";
                    }
                    
                    onAddressFetched(errorMessage);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000, // 15 seconds timeout
                    maximumAge: 3000 // Less cache, but not too frequent requests
                }
            );
        };

        getLocation(); // Start fetching location

    }, [fetchAddressNow, onAddressFetched, attempt]); // Dependency on fetchAddressNow & retry attempt

    return null;
};

export default GetCurrentAddress;
