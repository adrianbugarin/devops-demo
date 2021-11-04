const express = require('express')
const app = express()
const path = require(`path`)

app.use(express.json())

const students = [`Adrian`, `Spencer`, `Norman`]

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
})

app.get(`/api/students`, (req, res) => {
    res.status(200).send(students)
})



const port = process.env.PORT || 5050

app.listen(port, () => console.log(`port runnning on ${port}`))