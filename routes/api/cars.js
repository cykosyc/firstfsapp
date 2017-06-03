"use strict";
exports.__esModule = true;
var express = require("express");
var car_1 = require("../models/car");
var router = express.Router();
router.get('/', function (req, res) {
    car_1["default"].find().then(function (foundCars) {
        res.status(200).json(foundCars);
    })["catch"](function (err) {
        res.status(404).json(err);
    });
});
router.get('/:id', function (req, res) {
    var carId = req.params['id'];
    car_1["default"].findOne({ _id: carId }).then(function (foundCar) {
        res.status(200).json(foundCar);
    })["catch"](function (err) {
        res.status(404).json(err);
    });
});
router.put('/:id', function (req, res, next) {
    var carId = req.params['id'];
    car_1["default"].findOne({ _id: carId }).then(function (foundCar) {
        if (foundCar) {
            foundCar.make = req.body.make;
            foundCar.carModel = req.body.carModel;
            foundCar.year = req.body.year;
            foundCar.save().then(function (updatedCar) {
                res.status(200).json(updatedCar);
            })["catch"](function (err) {
                res.status(404).json(err);
            });
        }
        else {
            res.status(500).json(foundCar);
        }
    })["catch"](function (err) {
        res.status(404).json(err);
    });
});
router.post('/', function (req, res) {
    var car = new car_1["default"]();
    car.make = req.body.make;
    car.carModel = req.body.carModel;
    car.year = req.body.year;
    car.save().then(function (newCar) {
        res.status(200).json(newCar);
    })["catch"](function (err) {
        res.status(400).json(err);
    });
});
router["delete"]('/:id', function (req, res) {
    var carId = req.params['id'];
    car_1["default"].remove({ _id: carId }).then(function (deletedCar) {
        res.status(200).json(deletedCar);
    })["catch"](function (err) {
        res.status(404).json(err);
    });
});
exports["default"] = router;
