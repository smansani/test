const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const port = 5000;

// Use the curd route
app.use('/api/curd', require('./routes/curd'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
