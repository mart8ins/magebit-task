const express = require("express");
const app = express();
const path = require("path");
const db = require("../db.js");
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

app.post("/", async (req, res) => {
    const { email } = req.body;
    try {
        if (email) {
            res.json({ message: "Successful subscription" });
        } else {
            res.json({ error: "Server is down, please try again later!" });
        }
    } catch (e) {
        console.log(e);
    }
});

app.get("/subscriptions", async (req, res) => {
    const resp = await db.promise().query(`SELECT * FROM EMAILS`);
    // console.log(resp[0]);
    // res.sendFile(__dirname + "/subscriptions.html");
    res.send(resp[0]);
});

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log("App started on port " + PORT);
});
