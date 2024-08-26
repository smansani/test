import React, { useState, useEffect } from 'react';

const DataManager = () => {
    const [data, setData] = useState([]);
    const [newData, setNewData] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/curd/getdata');
            if (response.ok) {
                const result = await response.json();
                setData(result);
            } else {
                const result = await response.text();
                console.error('Failed to fetch data:', result);
                setError(result || 'Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data');
        }
    };

    const addData = async () => {
        if (!newData) {
            setError('Please enter some data');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/curd/adddata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newData })
            });

            if (response.ok) {
                const result = await response.text(); // Read response as text
                console.log('Response:', result); // Log the response for debugging
                fetchData(); // Refresh the data list
                setNewData('');
                setError('');
            } else {
                const result = await response.text(); // Read the error response as text
                console.error('Failed to add data:', result);
                setError(result || 'Failed to add data');
            }
        } catch (error) {
            console.error('Error adding data:', error);
            setError('Failed to add data');
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await fetch('http://localhost:5000/api/curd/deletedata', {
                method: 'DELETE',
                headers: {
                    'id': id // Pass the ID in the headers
                }
            });

            if (response.ok) {
                const result = await response.text(); // Read response as text
                console.log('Response:', result); // Log the response for debugging
                fetchData(); // Refresh the data list
                setError('');
            } else {
                const result = await response.text(); // Read the error response as text
                console.error('Failed to delete data:', result);
                setError(result || 'Failed to delete data');
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            setError('Failed to delete data');
        }
    };

    return (
        <div>
            <h1>Data Manager</h1>
            <input
                type="text"
                value={newData}
                onChange={(e) => setNewData(e.target.value)}
                placeholder="Enter new data"
            />
            <button onClick={addData}>Add Data</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        {item.name} 
                        <button onClick={() => deleteData(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DataManager;
