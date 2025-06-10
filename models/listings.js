const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: String,
    description: String,
    image: {
        filename: String,
        url: String
    },
    price: Number,
    location: String,
    country: String
});

const listing = mongoose.model("Listing",listingSchema);

module.exports = listing;

