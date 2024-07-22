const express = require("express")
const app = express.Router()
const knex = require("knex")
const dbConfig = require("../db/knexfile")
const db = knex(dbConfig.development)

app.get("/", async (req, res) => {

    const usersList = await db.select('*').from('users')
    res.json(usersList)

})

app.post("/signup", async (req, res) => {
    const { login, password, full_name, email, phone } = req.body;
    const existLogin = await db("users").where("login", login).first();
    if (existLogin) {
        res.json({ error: "Логин уже занят" });
        return;
    } else {
        const newUser = await db('users').insert({ login, password, full_name, email, phone }).returning('id');
        res.json({ id: newUser[0].id });
    }
});


app.post("/signin", async (req, res) => {
    const { login, password } = req.body;
    const user = await db("users").where("login", login).first();
    if (!user || user.password !== password) {
        res.status(401).json({ error: "Неправильный логин или пароль" });
        return;
    }
    res.json({ id: user.id, isAdmin: user.is_admin });
});

module.exports = app;