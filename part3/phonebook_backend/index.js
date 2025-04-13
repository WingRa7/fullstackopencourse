require('dotenv').config()
const express = require('express')
const Person = require('./models/person')

const app = express()
const morgan = require('morgan')

let persons = []

morgan.token('body', (request) => { return JSON.stringify(request.body) })
const morganPost = morgan(':method :url :status :res[content-length] - :response-time ms :body')
const morganAll = morgan(':method :url :status :res[content-length] - :response-time ms')

const morganLogger = (request, response, next) => {
  if (request.method === 'POST') {
    morganPost(request, response, next)
  } else {
    morganAll(request,response,next)
  }
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(morganLogger)
app.use(express.json())
app.use(express.static('dist'))

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    const duplicate = persons.find(person => person.name === body.name)

    if(duplicate) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    const person = new Person ({
        name: body.name,
        number: body.number,
    })
    
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
  })

app.get('/info', (request, response) => {
  const now = new Date()
  const FetchPersons = () => {
    Person.find({})
    .then(p => {
    persons = p
    response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
     <p>${now}</p>`)
    })
  }  
  FetchPersons()
  })

app.get('/api/persons', (request, response, next) => {
  Person.find({})
  .then(persons => response.json(persons))
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => response.json(person))
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save()
      .then((updatedPerson) => response.json(updatedPerson))
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(deletedPerson => 
    response.json(deletedPerson).status(204).end()
    )
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})