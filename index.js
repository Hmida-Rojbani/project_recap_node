const express = require('express');
const morgan = require('morgan');
const appDebug = require('debug')('app:debug');
const port = process.env.PORT || 3000;
const app = express();


app.listen(port , () => appDebug(`Listening on ${port}....`));