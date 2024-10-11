/*
 * Arbetslivserfarenheter
 * Av Mikaela Frendin
 */

const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");

//inställningar för databasen
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

/*
mongoose.connection.on('error', err => {
    console.log('mongoose connection error');
    console.dir(err);
});
*/

//koppla upp till mongo db
mongoose.connect("mongodb://127.0.0.1:27017/mom3-backend").then(() => {
    console.log("Connected to database");

   
}).catch((error) => {
    console.log("Could not connect to database " + error)
})

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

//Start av applikationen
app.listen(port, () => {
    console.log("Started on port: " + port);
});

//hämta alla arbetsplatser
app.get("/workplaces", async(req, res) => {
    try {
        let result = await Workplace.find({});

        return res.json(result);
    }catch(error) {
        return res.status(500).json(error);
    }
});

//skickar till databasen
app.post("/workplaces", async(req, res) => {
    try {
        let result = await Workplace.create(req.body);
        return res.json(result);
    }catch(error) {
        return res.status(400).json(error);
    }
});

app.put("/workplaces/:id", async(req, res) => {
    try {
        let id = req.params.id;
        let companyname = req.body.companyname;
        let location = req.body.location;
        let startdate = req.body.startdate;
        let enddate = req.body.enddate;
        let title = req.body.title;
        let description = req.body.description;
       
        let result = await Workplace.findOne({_id: id});
            result.companyname = companyname; 
            result.location = location; 
            result.startdate = startdate; 
            result.enddate = enddate;
            result.title = title;
            result.description = description;
            result.save().then((data) => {
                return res.status(200).json(data);
            }, (error) => {
                return res.status(400).json(error);
            });
        
    }catch(error) {
       return res.status(500).json(error);
    };
});


//radera arbetsplats
app.delete("/workplaces/:id", async(req, res) => {
    
    try {
        let id = req.params.id;
        
        let result = await Workplace.deleteOne({_id: id}); 
        
        res.json({message: "The workplace is deleted ", id});    
    
    }catch(error) {
        //console.log(error);
        return res.status(400).json(error);
    };
});