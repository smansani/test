const express = require('express');
const router = express.Router();

let data = [];
let id = 0;

// Route 1: Get data
router.get('/getdata', async (req, res) => {
    try {
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: Add data
router.post('/adddata', (req, res) => {
    try {
        const newData = req.body;
        const entry = {
            ...newData,
            id: id
        };

        data.push(entry);
        id += 1;
        res.status(200).send("Data added successfully");
    } catch (error) {
        console.error('Error writing data:', error);
        res.status(500).send("Internal Server Error");
    }
});

// Route 3: Delete data by ID
router.delete('/deletedata', (req, res) => {
    try {
        // Get the ID from the request header
        const idHeader = req.headers['id']; // Access the header 'id'
        const id = parseInt(idHeader, 10);

        if (isNaN(id)) {
            return res.status(400).send("Invalid ID");
        }

        // Find the index of the item with the matching ID
        const index = data.findIndex(item => item.id === id);

        if (index === -1) {
            return res.status(404).send("Item not found");
        }

        data.splice(index, 1);
        res.status(200).send("Data deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
