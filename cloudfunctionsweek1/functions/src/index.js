const functions = require('firebase-functions');
// const compression = require('compression');
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const https = require('https');
var compression = require('compression');
const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });
// app.use(compression());
// Automatically allow cross-origin requests

app.use(cors({ origin: true }));


//Load orders and products for pseudo database
// const Data = require("../data/data.json").data;
//Get all orders
app.get("/", (req, res) => {
    // res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.send(Data)
});
//Get orders by ID
app.get("/:id", (req, res) => {
    // res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.send(Data.find(data => data.id === req.params.id))
});
//Start the server
exports.cloudfunctionsweek1optimize = functions.https.onRequest(app);