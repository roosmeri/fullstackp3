const express = require('express')
const app = express()
var morgan = require('morgan')
app.use(morgan('tiny'))

app.use(express.json())

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "Marie Laurie",
        "number": "332563542",
        "id": 5
    }
]


app.get('/', (req, resp) => {
    resp.writeHead(200, { 'Content-Type': 'application/json' })
    resp.end(JSON.stringify(persons))
})


app.get('/info', (req, resp) => {
    const amnt = persons.length
    const time = new Date()
    resp.send(`<div>Phonebook has info for ${amnt} people</div><div>${time.toUTCString()}</div`)
})

app.get('/api/persons/:id', (req, resp) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    console.log(person)
    if (person) {
        resp.json(person)
    } else {
        resp.status(404).end()
    }
})

app.post('/api/persons', (req, resp) => {
  //  console.log(req.headers)
    const person = req.body
    if (!person) {
        return response.status(400).json({
            error: 'all data missing'
        })
    }

    if (!person.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (!person.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if (persons.includes(person.name)) {
        return response.status(400).json({
            error: 'name already in phonebook'
        })
    }

    person.id = Math.floor(Math.random() * 100)
    persons = persons.concat(person)

    resp.json(person)
})


app.delete('/api/persons/:id', (req, resp) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    resp.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})