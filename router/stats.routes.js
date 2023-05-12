const { Router } = require("express");
const { fetch, fetchAll, fetchData } = require('../database/pg.js');
const stats = Router();

stats.get("/stats", async (req, res) => {
    let d = await fetchAll("select * from stats")
    res.send({
        directions: d
    })
})

stats.get("/stats/:id", async (req, res) => {
    id = req.params.id
    let d = await fetch("select * from stats where stats_id = $1", id)
    res.send({
        groups: d
    })
})
module.exports = {stats}