const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', require("./routes/usersRoutes" ));
app.use('/api/products', require("./routes/productsRoutes"));

mongoose.connect('mongodb+srv://mirts:mirts@cluster0.cxkom.mongodb.net/tcc', {useNewUrlParser: true})
.then(() => {
    console.log('Connected to database!');
    app.listen(process.env.PORT || 3001, () => {
        console.log('Server running on: ' + (process.env.PORT || 3001));
    });
})
.catch((err) => {
    console.log('Error connecting to database: ' + err);
})