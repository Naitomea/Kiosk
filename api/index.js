const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

//#region Db Connection

mongoose.connect('mongodb://localhost/kiosk');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//#endregion

//#region Routers

const taxonomyRouter = require('./routes/taxonomy');
const nodesRouter = require('./routes/nodes');

app.use('/api/taxonomy', taxonomyRouter);
app.use('/api/nodes', nodesRouter);

//#endregion

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
