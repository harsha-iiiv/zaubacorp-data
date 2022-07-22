const pool = require("./config/db");
const app = express();
const express = require("express");
const cors = require("cors");
const { getCompanyDetails, callZaubacorpApi } = require('./utils/util')

app.use(cors());  //Middleware
app.use(express.json());

// SAVE and RETURN saved companies
app.post("/save", async (req, res) => {
  try {
    const { cin, name } = req.body;
    await pool.query(
      "INSERT INTO companies (cin,name) VALUES($1,$2) RETURNING *",
      [cin, name]
    );
    const list = await pool.query("select * from companies");
    res.json({ error: false, data: list.rows });
  } catch (err) {
    res.json({ error: false, message: err.message });
    console.log(err.message);
  }
});

// SEARCH and extract data from Zaubacorp Api
app.get("/search", async (req, res) => {
  try {
    console.log(req.query)
    const { query } = req.query;
    const htmlText = await callZaubacorpApi(query)
    const resArr = getCompanyDetails(htmlText)
    res.json(resArr);
  }
  catch (e) {
    console.log(e)
  }
});

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});