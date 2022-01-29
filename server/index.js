const express = require("express");
const app = express();
const path = require("path");
const db = require("../db.js");
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const PORT = process.env.PORT || 3001;

let currentPage = 1;
const numberPerPage = 10;

const paginate = (currentPage, numberPerPage, dataBeforePagination) => {
    const trimStart = (currentPage - 1) * numberPerPage;
    const trimEnd = trimStart + numberPerPage;
    return dataBeforePagination.slice(trimStart, trimEnd);
};

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
    const lastProvider = "";
    const lastFilterBy = "";
    let dataBeforePagination;
    let subscriptions;

    try {
        const [subs] = await db
            .promise()
            .query(`SELECT * FROM EMAILS ORDER BY DATE ASC`);
        dataBeforePagination = subs;
        const [providers] = await db
            .promise()
            .query(`SELECT DISTINCT PROVIDER FROM EMAILS`);

        // PAGINATION
        const numberOfPages = Math.ceil(
            dataBeforePagination.length / numberPerPage
        );
        subscriptions = paginate(
            currentPage,
            numberPerPage,
            dataBeforePagination
        );

        res.render("index", {
            subscriptions,
            providers,
            lastProvider,
            lastFilterBy,
            currentPage,
            numberOfPages,
            numberPerPage,
        });
    } catch (e) {
        console.log(e);
    }
});

app.post("/subscriptions", async (req, res) => {
    const emailSearch = req.body.search;
    const clearEmail = req.body.clear;

    // query
    let lastFilterBy = "id";
    let lastProvider = "all";
    // data
    let dataBeforePagination;
    let subscriptions;
    let providers;

    try {
        if (req.query.filterBy) lastFilterBy = req.query.filterBy;
        if (req.query.provider) lastProvider = req.query.provider;

        if (req.query.deleteEmail) {
            const { deleteEmail } = req.query;
            await db
                .promise()
                .query(`DELETE FROM EMAILS WHERE EMAIL='${deleteEmail}'`);
        }

        if (!emailSearch) {
            const [subs] = await db
                .promise()
                .query(
                    `SELECT * FROM EMAILS ${
                        lastProvider && lastProvider !== "all"
                            ? "WHERE " +
                              "PROVIDER = " +
                              "'" +
                              lastProvider +
                              "'"
                            : ""
                    } ${
                        lastFilterBy && lastFilterBy !== "id"
                            ? "ORDER BY " + lastFilterBy
                            : ""
                    } ${lastFilterBy && lastFilterBy === "date" ? "DESC" : ""}`
                );
            dataBeforePagination = subs;
        } else if (clearEmail) {
            const [subs] = await db.promise().query(`SELECT * FROM EMAILS`);
            dataBeforePagination = subs;
        } else {
            const [subs] = await db
                .promise()
                .query(`SELECT * FROM EMAILS WHERE EMAIL='${emailSearch}'`);
            dataBeforePagination = subs;
        }

        const [prov] = await db
            .promise()
            .query(`SELECT DISTINCT PROVIDER FROM EMAILS`);
        providers = prov;

        const numberOfPages = Math.ceil(
            dataBeforePagination.length / numberPerPage
        );

        if (req.query.go === "forward") {
            if (currentPage < numberOfPages) currentPage++;
        }
        if (req.query.go === "back") {
            if (currentPage >= 2) currentPage--;
        }

        // PAGINATION
        subscriptions = paginate(
            currentPage,
            numberPerPage,
            dataBeforePagination
        );

        res.render("index", {
            subscriptions,
            providers,
            lastProvider,
            lastFilterBy,
            currentPage,
            numberOfPages,
            numberPerPage,
        });
    } catch (e) {
        console.log(e);
    }
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
