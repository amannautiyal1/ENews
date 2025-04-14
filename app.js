const express = require('express');
const app = express();
const documentRoutes = require('./routes/document');

app.use(express.json());
app.use('/api/documents', documentRoutes);

module.exports = app;
