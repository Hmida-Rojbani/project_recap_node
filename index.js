const express = require('express');
const morgan = require('morgan');
const appDebug = require('debug')('app:debug');
const index_router = require('./routers/index_router');
const connectDB = require('./db/connect');
const port = process.env.PORT || 3000;
connectDB('mongodb://localhost:27017/project_recap');
const app = express();

app.use('',index_router);

app.listen(port , () => appDebug(`Listening on ${port}....`));