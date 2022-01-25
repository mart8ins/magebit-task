const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/", (req, res) => {
    res.send("Helloooo!");
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log("App started on port " + PORT);
});
