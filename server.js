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
        await mongoose.connect("mongodb://localhost:27017/cv");
        console.log("Connected to MongoDB...");
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

// inkludera till databas
const workExperience = mongoose.model("Workexperience", schema);

// routes
app.get("/cv", async (req, res) => {
    res.json({ message: "API för arbetserfarenheter" });
});

app.get("/workexperiences", async (req, res) => {
    try {
        const result = await workExperience.find({});
        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// lägga till data
app.post("/workexperiences", async (req, res) => {
    try {
        const result = await workExperience.create(req.body);
        return res.json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
});

// starta server
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});