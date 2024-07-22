const express = require("express")
const app = express()
const knex = require("knex")
const dbConfig = require("./db/knexfile")
const userRoutes = require("./routes/user.routes")
const paperRoutes = require("./routes/paper.routes")
const path = require("path")
const cors = require("cors")

app.use(express.json())
app.use(cors("*"))

//app.use(express.static(path.join(__dirname, "..", "narusheniam.net", "build")))

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });


app.use("/users", userRoutes)

app.use("/papers", paperRoutes)



const PORT = 8080;

//app.use("*", (req, res) => {
//    res.sendFile(
//        path.join(__dirname, "..", "narusheniam.net", "build", "index.html")
//    )
//})

app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})