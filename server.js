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

// routes
app.get("/cv", async (req, res) => {
    res.json({ message: "API för arbetserfarenheter" });
});

// starta server
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});