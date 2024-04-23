const express = require("express");
const cors = require("cors");

// init express
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// routes
app.get("/cv", async (req, res) => {
    res.json({message: "API för arbetserfarenheter"});
});

// starta server
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});