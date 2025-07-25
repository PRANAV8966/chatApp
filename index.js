const express = require('express');
const app = express();

const { PORT } = require('./src/config/server-config.js');
const apiRoutes = require('./src/routes/apiRoutes.js');

const cors = require('cors');

const startServer = async () => {
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(cors());

    app.use('/api', apiRoutes)
    app.listen(PORT, () => {
        console.log(`Server Running on PORT:${PORT}`);
    });
};

startServer();