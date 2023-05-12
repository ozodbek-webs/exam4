const { Router } = require("express");
const { fetch, fetchAll, fetchData } = require('../database/pg.js');
const department = Router();


department.get("/advert", async (req, res) => {
    let d = await fetchAll("select * from advert")
    res.send({
        directions: d
    })
})

department.get("/advert/:id", async (req, res) => {
    id = req.params.id
    let d = await fetch("select * from advert where advert_id = $1", id)
    res.send({
        groups: d
    })
})


department.post("/advert", async (req, res) => {
    const l = req.body


    if (l.advert_sell && l.advert_buy && l.advert_url) {
        let a = await fetch(`INSERT INTO advert (advert_sell ,advert_buy , advert_url , advert_picture)
        VALUES($1 , $2 , $3 , $4) RETURNING *` , l.advert_sell, l.advert_buy, l.advert_url, "./photo")
        res.send(a)
    } else {
        res.send("malumot xato")
    }
})



const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.queryString });



department.put('/advert/:id', (req, res) => {
    const id = req.params.id;
    const { advert_sell, advert_buy, advert_url } = req.body;

    console.log(req.body);
    if (advert_sell && advert_buy && advert_url) {
        pool.query(
            'UPDATE advert SET advert_sell = $1, advert_buy = $2,advert_url=$3,advert_picture=$5 WHERE advert_id = $4',
            [advert_sell, advert_buy, advert_url, id , "./photo"], (err, result) => {
                if (err) throw err;
                res.send(`advert with ID:${id} updated successfully.`);
            }
        );
    } else {
        res.send("Malumot to'liq emas")
    }
});



department.delete('/advert/:id', (req, res) => {
    const id = req.params.id;

    pool.query(
        'DELETE FROM advert WHERE advert_id = $1',
        [id],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send(`advert deleted with ID: ${id}`);
        }
    );
});



module.exports = { department };