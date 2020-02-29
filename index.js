const express = require('express');
const morgan = require('morgan');
const appDebug = require('debug')('app:debug');
const index_router = require('./routers/index_router');
const port = process.env.PORT || 3000;
const app = express();

app.use('',index_router);

app.listen(port , () => appDebug(`Listening on ${port}....`));