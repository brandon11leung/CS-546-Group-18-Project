/*******************************************************************************
 * Name        : app.js
 * Author      : Brandon Leung
 * Date        : March 25, 2023
 * Description : Lab 6 starter file implementation.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/
// This file should set up the express server as shown in the lecture code

import express from 'express';
const app = express();
import configRoutes from './routes/index.js';

app.use(express.json());

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
