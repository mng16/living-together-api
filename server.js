const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const routes = express.Router();

let HouseData = require('./models/house-data.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/house-data', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

routes.route('/test').get(function(req, res) {
    res.json({message: 'hello! Welcome to your api!' });
});

routes.route('/').get(function(req, res) {
    HouseData.find(function(err, houseData) {
        if (err) {
            console.log(err);
        } else {
            res.json(houseData);
        }
    });
});

routes.route('/add').post(function(req, res) {

    let houseData = new HouseData(req.body);
    houseData.save()
    .then(andiInfo => {
        res.status(200).json({'houseData': 'info added successfully'});
    })
    .catch(err => {
        res.status(400).send('adding new info failed');
    });
});

routes.route('/update/:id').post(function(req, res) {
    HouseData.findById(req.params.id, function(err, houseData) {
        if(!houseData) {
            res.status(404).send("data is not found");
        } else {
            houseData.dataTitle = req.body.dataTitle;
            houseData.company = req.body.company;
            houseData.url = req.body.url;
            houseData.personResponsible = req.body.personResponsible;
            houseData.paymentsDue = req.body.paymentsDue;
            houseData.lastBillAmount = req.body.lastBillAmount;
            houseData.nextBillAmount = req.body.nextBillAmount;
            houseData.billSplit = req.body.billSplit;

            houseData.save().then(houseData => {
                res.json('House data updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");s
            });
        }});
});

routes.route('/delete/:id').delete(function (req, res) {
    HouseData.findByIdAndDelete(req.params.id, function(err, info) {
        if(err) {
            res.status(400).send(err);
        } else {
            res.status(200).send("Information successfully deleted");
        }
    });
});

app.use('/housedata', routes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

