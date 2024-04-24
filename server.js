const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// init express
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// självkörande funktion för att hantera anslutning
(async () => {
    try {
        await mongoose.connect("mongodb+srv://jeja2306:Vj5CmU06Op3zINNT@jeja2306-dt207g-moment3.x7zbafc.mongodb.net/cv?retryWrites=true&w=majority&appName=jeja2306-dt207g-moment3-2-1");
        //await mongoose.connect("mongodb+srv://jeja2306:Vj5CmU06Op3zINNT@jeja2306-dt207g-moment3.x7zbafc.mongodb.net/cv");
        console.log("Connected to MongoDB...");
        
        const newExperience = new workExperience({
            companyname: "Connect to moongose", 
            jobtitle: "Connect to moongose", 
            location: "Connect to moongose", 
            description: "Connect to moongose"
        });

        await newExperience.save();
        console.log("Insert successful");
        
    } catch (error) {
        console.error("Error when connecting to the database:", error);
    }
})();

// egenskaper för alla objekt
const schema = new mongoose.Schema({
    companyname: {
        type: String, 
        required: [true, "Du måste ange arbetsgivare"],
        trim: true
    },
    jobtitle: {
        type: String,
        required: [true, "Du måste ange en arbetsroll"],
        trim: true
    },
    location: {
        type: String,
        required: [true, "Du måste ange vart du arbetade"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Du måste ange en beskrivning av ditt arbete"],
        trim: true,
        minlength: 10
    }
});

// routes
app.get("/cv", async (req, res) => {
    res.json({ message: "API för arbetserfarenheter" });
});

// inkludera till databas
const workExperience = mongoose.model("workexperiences", schema);

// hitta innehåll
app.get("/cv/workexperiences", async (req, res) => {
    try {
        const result = await workExperience.find({});
        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// hitta specifikt innehåll
app.get("/cv/workexperiences/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await workExperience.findById(id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// lägga till data
app.post("/cv/workexperiences", async (req, res) => {
    try {
        const result = await workExperience.create(req.body);
        return res.json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
});

// radera data
app.delete("/cv/workexperiences/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const deleteData = await workExperience.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Could not be deleted" });
        }
        res.json({ message: "Deleted succesfully", deleteData});
    } catch (error) {
        console.error("Error when deleting", error);
        res.status(500).json({ message: "Error when deleting", error });
    }
});

// uppdatera befintlig
app.put("/cv/workexperiences/:id", async (req, res) => {
    const id = req.params.id; // tar id frpn url och ger variabel
    const update = req.body; // tar uppdatering från body och ger variabel

    try {
        const result = await workExperience.findByIdAndUpdate(id, update, { new: true }); // returnen blir det uppdaterade
        if (!result) {
            return res.status(404).json({ message: "Could not update data" });
        }
        res.json({ message: "Updated succesfully", result});
    } catch (error) {
        console.error("Error when updating", error);
        res.status(500).json({ message: "Error when updating", error });
    }
});

// starta server
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});