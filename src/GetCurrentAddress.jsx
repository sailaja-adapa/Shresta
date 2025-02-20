import React, { useEffect } from "react";

const GetCurrentAddress = ({ fetchAddressNow, onAddressFetched }) => {
    useEffect(() => {
        if (!fetchAddressNow) return; // Only fetch address when `fetchAddressNow` is true

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
                onAddressFetched("Error fetching address");
            }
        };

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude, accuracy } = pos.coords;
                if (accuracy < 50) { // Better accuracy threshold
                    fetchAddress(latitude, longitude);
                } else {
                    console.warn("Location accuracy is too low");
                    onAddressFetched("Location accuracy is too low. Please move to an open area.");
                }
            },
            (error) => {
                console.error("Error obtaining location:", error);
                onAddressFetched("Error obtaining location");
            },
            {
                enableHighAccuracy: true,
                timeout: 20000, // Increased timeout
                maximumAge: 5000 // Reduced maximumAge to ensure fresh data
            }
        );
    }, [fetchAddressNow, onAddressFetched]); // Dependency on fetchAddressNow

    return null;
};

export default GetCurrentAddress;
