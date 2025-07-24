import express from 'express';
const app = express();

import { PORT } from './src/config/server-config.js';

const startServer = async () => {
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    app.listen(PORT, () => {
        console.log(`Server Running on PORT:${PORT}`);
    });
};

startServer();