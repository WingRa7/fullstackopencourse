const express = require('express')
const app = express()
const morgan = require('morgan')

let persons = [
        { 
          "id": "1",
          "name": "Arto Hellas", 
          "number": "040-123456"
        },
        { 
          "id": "2",
          "name": "Ada Lovelace", 
          "number": "39-44-5323523"
        },
        { 
          "id": "3",
          "name": "Dan Abramov", 
          "number": "12-43-234345"
        },
        { 
          "id": "4",
          "name": "Mary Poppendieck", 
          "number": "39-23-6423122"
        }
    ]

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

app.use(morganLogger)
app.use(express.json())
app.use(express.static('dist'))


const generateRandomId = (max) => {
   return String(Math.floor(Math.random() * max))
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const duplicate = persons.find(person => person.name === body.name)
    if(!body.name) {
        return response.status(400).json({
            error: 'name  missing'
        })
    }
    if(!body.number) {
        return response.status(400).json({
            error: 'number  missing'
        })
    }
    if(duplicate) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    const person = {
        id: generateRandomId(1000),
        name: body.name,
        number: body.number,
    }
    persons = persons.concat(person)
        return response.status(200).json(person)
  })

app.get('/info', (request, response) => {
    const now = new Date()
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
         <p>${now}</p>`)
  })

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
      response.json(person)
  } else {
      response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const deletedPerson = persons.find((person) => person.id === request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(200).json(deletedPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})