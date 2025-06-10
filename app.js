const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("../Major Project/models/listings");
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));

main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Wanderer");
};

app.get("/",(req,res)=>{
    res.send("Working well");
});

app.post("/listings",async(req,res)=>{
    let {title,description,image,price,location,country} = req.body;
    // console.log(req.body);
    let newlisting = await listing.insertOne({title,description,image:{url:image},price,location,country});
    // console.log(newlisting);
    newlisting.save();
    res.redirect("/listing")
});

app.put("/listing/:id",async(req,res)=>{
    let {id} = req.params;
    let {title,description,image,price,location,country} = req.body;

    await listing.findByIdAndUpdate(id, {
        title,
        description,
        image:{url : image},
        price,
        location,
        country
    });
    res.redirect("/listing");
});

app.post("/listing/:id/delete",async(req,res)=>{
    let {id} = req.params;
    await listing.findByIdAndDelete(id);
    res.redirect("/listing")
    // await listing.deleteOne(list);
});

app.get("/listing/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let list = await listing.findById(id);
    res.render("listings/update.ejs",{list});
});

// app.post("/listing/:id/edit",async(req,res)=>{
//     let {id} = req.params;
    


//     res.redirect("/listing");
// });

app.get("/listing",async (req,res)=>{
    const allListing = await listing.find();
    res.render("listings/index.ejs",{allListing});
});

app.get("/listing/new",(req,res)=>{
    res.render("listings/create.ejs");
});

app.get("/listing/:id",async (req,res)=>{
    const {id} = req.params;
    const list = await listing.findById(id);
    res.render("listings/detail.ejs",{list});
});



app.listen(8080,()=>{
    console.log("Listening to the server");
});
