const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// init express
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// självkörande funktion för att hantera anslutning
(async () => {
    try {
        await mongoose.connect("mongodb+srv://jeja2306:JejaMiun123@jeja.t13agrm.mongodb.net/");
        console.log("Connected to MongoDB...");
        /*
        const newExperience = new workExperience({
            companyname: "test db three", 
            jobtitle: "test db three", 
            location: "test db three", 
            description: "test db three"
        });
        
        await newExperience.save();
        console.log("Insert successful");
        */
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
        minlength: [10, "Beskrivningen måste vara minst 10 tecken lång"]
    }
});

// routes
app.get("/", async (req, res) => {
    res.json({ message: "API för arbetserfarenheter" });
});

// inkludera till databas
const workExperience = mongoose.model("workexperiences", schema);

// hitta innehåll
app.get("/workexperiences", async (req, res) => {
    try {
        const result = await workExperience.find({});
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ messeage: "Error fetching data", error: error.message });
    }
});

// hitta specifikt innehåll
app.get("/workexperiences/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await workExperience.findById(id);
        if (!result) {
        return res.status(404).json({ message: "Data not found" });
        }
        res.json(result);
    } catch (error) {
        return res.status(500).json({ messeage: "Error fetching data", error: error.message });
    }
});

// lägga till data
app.post("/workexperiences", async (req, res) => {
    try {
        const newWorkexperience = new workExperience(req.body);
        await newWorkexperience.validate(); // validerar mot mongoose schemat
        const result = await workExperience.create(req.body);
        return res.status(201).json(result);
    } catch (error) {
        if (error.name === "ValidationError") { // kontrollerar valieringsfel
            const errors = {}; // vid valideringsfel skapas error
            for (let field in error.errors) { // loopar över fält med valideringsfel
                errors[field] = error.errors[field].message; // och lägger till felmeddelande
            }
            return res.status(400).json({ errors });
        }
        return res.status(400).json({ message: "Error adding data", error: error.message });
    }
});

// radera data
app.delete("/workexperiences/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const deleteData = await workExperience.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Data could not be deleted" });
        }
        res.json({ message: "Deleted succesfully", deleteData});
    } catch (error) {
        console.error("Error when deleting", error);
        res.status(500).json({ message: "Error when deleting", error: error.message });
    }
});

// uppdatera befintlig
app.put("/workexperiences/:id", async (req, res) => {
    const id = req.params.id; // tar id frpn url och ger variabel
    const update = req.body; // tar uppdatering från body och ger variabel

    try {
        const result = await workExperience.findByIdAndUpdate(id, update, { new: true, runValidators: true }); // returnen blir det uppdaterade
        if (!result) {
            return res.status(404).json({ message: "Could not update data" });
        }
        res.json({ message: "Updated succesfully", result });
    } catch (error) {
        console.error("Error when updating", error);
        res.status(500).json({ message: "Error when updating", error: error.message });
    }
});

// starta server
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});