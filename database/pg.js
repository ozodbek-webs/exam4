const { config } = require('dotenv');
const { Pool } = require('pg');
const pool = new Pool({connectionString : process.env.queryString});

async function fetch(query, ...arg) {
    const client = await pool.connect();
    try {
        const {rows:[datas]} = await client.query(query, arg);
        return datas
    } catch (er) {
        console.log(er);
    }
}
async function fetchAll(query) {
    const client = await pool.connect();
    try {
        const {rows} = await client.query(query);
        return rows
    } catch (er) {
        console.log(er);
    }
}

const fetchData = async (Sql, ...params) => {
    const client = await pool.connect()

    try {
        const { rows } = await client.query(Sql, params.length ? params : null)
        return rows
    } catch(err){
        return err.message
    }finally {
       await client.release()
    }
}

// let a =async()=>{return await fetch("select * from users where user_id=$1",1)}
// console.log(a());
module.exports = { fetch , fetchAll ,fetchData }