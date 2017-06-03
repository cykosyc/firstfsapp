"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var carSchema = new mongoose.Schema({
    make: {
        type: String,
        maxlength: 50,
        required: true
    },
    carModel: {
        type: String,
        maxlength: 50,
        required: true
    },
    year: {
        type: Number,
        min: 1980,
        max: 2050,
        minlength: 4,
        maxlength: 4,
        required: true
    }
});
exports["default"] = mongoose.model('car', carSchema);
