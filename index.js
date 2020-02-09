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

app.get('/api/persons', (req, resp, next) => {
    let results = []
    Person.find({}).then(res => {
        res.forEach(p => {
            results = results.concat(p.toJSON())
        })
        resp.json(results)
    })

})


app.get('/info', (req, resp) => {
    Person.find({}).then(res => {
        const time = new Date()
        resp.send(`<div>Phonebook has info for ${res.length} people</div><div>${time.toUTCString()}</div`)
    })

})

app.get('/api/persons/:id', (req, resp, next) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
            resp.json(person.toJSON())
        } else {
            response.status(404).end()
        }
    })
        .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, resp, next) => {
    const body = req.body
    if (!body) {
        return resp.status(400).json({
            error: 'all data missing'
        })
    }

    if (!body.name) {
        return resp.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return resp.status(400).json({
            error: 'number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        resp.json(savedPerson.toJSON())
    }).catch(error => {
        return resp.status(400).json({
            error: 'could not add person, already exists'
        })
    })
})


app.delete('/api/persons/:id', (req, resp, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            resp.status(204).end()
        })
        .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})