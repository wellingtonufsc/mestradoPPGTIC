const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const extendTimeoutMiddleware = (req, res, next) => {
    const space = ' ';
    let isFinished = false;
    let isDataSent = false;
  
    // Only extend the timeout for API requests
    if (!req.url.includes('/api')) {
      next();
      return;
    }
  
    res.once('finish', () => {
      isFinished = true;
    });
  
    res.once('end', () => {
      isFinished = true;
    });
  
    res.once('close', () => {
      isFinished = true;
    });
  
    res.on('data', (data) => {
      // Look for something other than our blank space to indicate that real
      // data is now being sent back to the client.
      if (data !== space) {
        isDataSent = true;
      }
    });
  
    const waitAndSend = () => {
      setTimeout(() => {
        // If the response hasn't finished and hasn't sent any data back...
        if (!isFinished && !isDataSent) {  
          res.write(space);
          waitAndSend();
        }
      }, 20000);
    };
  
    res.write(space);
    waitAndSend();
    next();
};

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(cors());
app.use(extendTimeoutMiddleware);

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