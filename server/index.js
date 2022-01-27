const express = require("express");
const axios = require("axios");
const app = express();
const path = require("path");
const db = require("../db.js");
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const PORT = process.env.PORT || 3001;

app.post("/", async (req, res) => {
    const { email } = req.body;
    let atindex = email.indexOf("@");
    let part = email.slice(atindex);
    let dotindex = part.indexOf(".");
    let provider = part.slice(1, dotindex);

    try {
        if (email) {
            await db
                .promise()
                .query(
                    `INSERT INTO EMAILS (EMAIL, PROVIDER) VALUES('${email}', '${provider}')`
                );
            res.json({ message: "Successful subscription" });
        } else {
            res.json({ error: "Server is down, please try again later!" });
        }
    } catch (e) {
        console.log(e);
    }
});

app.get("/subscriptions", async (req, res) => {
    const [subscriptions] = await db
        .promise()
        .query(`SELECT * FROM EMAILS ORDER BY DATE ASC`);

    const [providers] = await db
        .promise()
        .query(`SELECT DISTINCT PROVIDER FROM EMAILS`);

    res.render("index", { subscriptions, providers });
});

app.post("/subscriptions", async (req, res) => {
    let subscriptions;
    let providers;

    if (req.query.filterBy) {
        const { filterBy } = req.query;
        const [subs] = await db
            .promise()
            .query(
                `SELECT * FROM EMAILS ORDER BY ${filterBy} ${
                    filterBy === "date" ? "DESC" : ""
                }`
            );
        subscriptions = subs;

        const [prov] = await db
            .promise()
            .query(`SELECT DISTINCT PROVIDER FROM EMAILS`);
        providers = prov;
    } else if (req.query.provider && req.query.provider !== "all") {
        const { provider } = req.query;
        const [subs] = await db
            .promise()
            .query(`SELECT * FROM EMAILS WHERE PROVIDER = '${provider}'`);
        subscriptions = subs;
        const [prov] = await db
            .promise()
            .query(`SELECT DISTINCT PROVIDER FROM EMAILS`);
        providers = prov;
    } else {
        const [subs] = await db.promise().query(`SELECT * FROM EMAILS`);
        subscriptions = subs;
        const [prov] = await db
            .promise()
            .query(`SELECT DISTINCT PROVIDER FROM EMAILS`);
        providers = prov;
    }

    res.render("index", { subscriptions, providers });
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
