// const express = require("express");
// const app = express();
const mongoose = require("mongoose");
const listing = require("../models/listings");
const sampleListings = require("../init/data");

main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Wanderer");
};

const initDB = async ()=>{
    await listing.deleteMany();
    await listing.insertMany(sampleListings.data);
    console.log("Saved in dataBase");
};

initDB();