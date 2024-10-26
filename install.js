const mongoose = require("mongoose");

//connectar till databasen
mongoose.connect("mongodb://127.0.0.1:27017/mom3-backend").then(() => {
    console.log("Connected to database");

}).catch((error) => {
    console.log("Could not connect to database " + error)
});

//schema 
const WorkplaceSchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: [true, "Companyname has to be filled in"],
    },
    location: {
        type: String,
        required: [true, "Location has to be filled in"],
    }, 
    startdate: {
        type: String,
        required: [true, "Startdate has to be filled in"],
    },
    enddate: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: [true, "Title has to be filled in"],
    },
    description: {
        type: String,
        required: [true, "Description has to be filled in"],
    } 
});

const Workplace = mongoose.model("Workplace", WorkplaceSchema);
//skapar en modell med förinsatta object
Workplace.create(
    {
        companyname: "Frösunda",
        location : "Nässjö", 
        startdate: "2010-01-01",
        enddate:  "2016-02-01",
        title:  "Personlig assistent/teamleader",
        description: "Vara hos olika kunder och hjälpa dom i vardagen, planera schema med mera"
    },
    {
        companyname: "Nytida", 
        location: "Taberg", 
        startdate: "2016-02-01", 
        enddate: "2020-08-01",
        title:  "Gruppchef",
        description: "Schemaläggning, varksamhetsplanering, hålla personalmöten m.m."
    
    },
    {
        companyname: "Espressohouse",
        location: "Nässjö",
        startdate:  "2023-06-01",
        enddate: "2024-10-07",
        title: "Barista",
        description: "Tillverka och servera olika drycker och lättare måltider"
    }
).then(() => {
    mongoose.disconnect();
});