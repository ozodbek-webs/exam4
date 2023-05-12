const express = require("express");
require("dotenv").config()
const app = express();
const {department} = require("../router/advert.routes.js")
const {stats} = require("../router/stats.routes.js")

const PORT = process.env.PORT || 9362

app.use(express.json())
app.use(department)
app.use(stats)



app.listen(PORT , console.log("http://localhost:"+PORT))