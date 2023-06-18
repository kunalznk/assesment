const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 9000;
const DB =  {
    taskList1: [],
    taskList2: []
}

app.use(cors({
    origin:"*"
}))

app.use(express.json())

app.get("/", async function (req, res) {
    res.status(200).json(
        "Server Successfully Running !!"
    )
})

app.get("/notes", async function (req, res) {
   
    res.status(200).json(DB)
})

app.post("/notes", async function (req, res) {
    const { list, data: {title} } = req.body
    DB["taskList1"].push({
        name: title,
        id: DB[list].length+ 1
    });
    DB["taskList2"].push({
        name: title,
        id: DB[list].length+ 1
    });
    const dataToReturn = DB[list]
    res.status(200).json(dataToReturn)
})

app.listen(PORT,() => {
console.log("Server listening on port:", PORT)
})
