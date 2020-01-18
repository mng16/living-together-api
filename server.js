const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const routes = express.Router();

app.use(cors());
app.use(bodyParser.json());
// app.use('/test', routes);


mongoose.connect('mongodb://127.0.0.1:27017/house-data', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

routes.route('/test').get(function(req, res) {
    res.json({message: 'hello! Welcome to your api!' });
});

app.use('/housedata', routes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

