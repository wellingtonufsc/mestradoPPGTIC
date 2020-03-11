//Esse mesmo servidor está rodando em
// https://iota-server.herokuapp.com/

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use('/', require("./routes"));

app.listen(process.env.PORT || 3001);