require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));
//app.use(morgan('tiny'))

app.use(express.json())

app.get('/api/persons', (req, resp) => {
    let results = []
    Person.find({}).then(res => {
        res.forEach(p => {
            results = results.concat(p.toJSON())
        })
        resp.json(results)
    })
    
})


app.get('/info', (req, resp) => {
    const amnt = persons.length
    const time = new Date()
    resp.send(`<div>Phonebook has info for ${amnt} people</div><div>${time.toUTCString()}</div`)
})

app.get('/api/persons/:id', (req, resp) => {
    const id = Number(req.params.id)
    Person.findById(id).then(person => {
        resp.json(person.toJSON())
    })

})

app.post('/api/persons', (req, resp) => {
    const body = req.body
    if (!body) {
        return response.status(400).json({
            error: 'all data missing'
        })
    }

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        resp.json(savedPerson.toJSON())
    })
})


app.delete('/api/persons/:id', (req, resp) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    resp.status(204).end()
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})