const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0-ozmaa.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model('Person', personSchema)


if (process.argv.length == 3) {
    Person.find({}).then(res => {
        res.forEach(p => {
            console.log(p)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length == 5) {
    const name = process.argv[3]
    const number = process.argv[4]


    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(response => {
        console.log('person saved!');
        mongoose.connection.close();
    })
}

