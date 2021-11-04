const express = require('express')
const app = express()
const path = require(`path`)

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '9f64ede3ca3f4cdd92cee3464b403d98',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')



app.use(express.json())

const students = [`Adrian`, `Spencer`, `Norman`]

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
})

app.get(`/api/students`, (req, res) => {
    res.status(200).send(students)
})


app.post(`/api/students`, (req, res) => {
    let {name} = req.body

    const index = students.findIndex(student => {
        return student === name
    })

    try{
        if (index === -1 && name !== ``){
            students.push(name)
            res.status(200).send(students)
        } else if (name === ``) {
            res.status(400).send(`must enter a student name`)
        } else {
            res.status(400).send(`that student already exists`)
        }
    } catch (err) {
        console.log(err)
    }
})

app.delete(`/api/students/:index`, (req, res) => {
    const targetIndex = +req.params.index

    students.splice(targetIndex, 1)

    res.status(200).send(students)
})


const port = process.env.PORT || 5050

app.listen(port, () => console.log(`port runnning on ${port}`))