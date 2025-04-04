const express = require('express')
const app = express()

app.use(express.json())

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

const generateRandomId = (max) => {
   return String(Math.floor(Math.random() * max))
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body.name) {
        return response.status(400).json({
            error: 'name  missing'
        })
    }
    const person = {
        id: generateRandomId(1000),
        name: body.name,
        number: body.number,
    }
    persons = persons.concat(person)
        return response.status(200).json({
            message: 'added to phonebook'
        })
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
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})