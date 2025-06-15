import React, { useState, useEffect } from 'react';

const CarInfo = () => {
    const [carData, setCarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log({data})
                setCarData(data.Results);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCarData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Car Makes</h1>
            <ul>
                {carData.map((car) => (
                    <li key={car.Make_ID}>{car.Make_Name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CarInfo;
