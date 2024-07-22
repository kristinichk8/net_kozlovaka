const express = require("express")
const app = express.Router()
const knex = require("knex")
const dbConfig = require("../db/knexfile")
const db = knex(dbConfig.development)

app.get("/all", async (req, res) => {
    try {
        const papersList = await db.select('*').from('papers');
        const papersWithUserInfo = await Promise.all(papersList.map(async (paper) => {
            const user = await db.select('full_name').from('users').where('id', paper.user_id).first();
            return { ...paper, full_name: user.full_name };
        }));
        res.json(papersWithUserInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await db("users").where("id", userId).first()

        const papersList = await db.select('*').from('papers').where("user_id", userId).then((papers) => res.json(papers))
    }
    catch (error) {
        res.send(error)
    }

})

app.post("/add", async (req, res) => {
    try {
        const { user_id, reg_number, description } = req.body
        await db("papers").insert({ user_id, reg_number, description, status: "Новое" })
        res.status(200).send("Успешно")
    }
    catch (error) {
        res.send(error)
    }


})

app.post("/update", async (req, res) => {
    try {
        const { paper_id, status } = req.body
        const paper = await db("papers").where("id", paper_id).first()
        if (!paper) {
            res.send("Данные введены неправильно")
            return
        }

        await db("papers").where("id", paper_id).update("status", status)
        res.send("Статус обновлен")
    } catch (error) {
        res.send(error)
    }


})
module.exports = app;