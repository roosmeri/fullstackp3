const express = require('express')
const app = express()

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


app.get('/',(req, resp) => {
    resp.writeHead(200, { 'Content-Type': 'application/json' })
    resp.end(JSON.stringify(persons))
})


app.get('/info', (req, resp) => {
    const amnt = persons.length
    const time = new Date()
    resp.send(`<div>Phonebook has info for ${amnt} people</div><div>${time.toUTCString()}</div`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})