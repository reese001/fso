const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
const Person = require('./models/person')
const note = require('../notes/backend/models/note')

app.use(express.json())
morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
  
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({error: 'malformatted id'
      })
    } else if (error.name === 'ValidationError') {
      return response.status(400).send({error: error.message})
    }
    next(error)
  }


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}</p>
        `)
})

app.delete('/api/persons/:id', (request, response, next) => {
   note.findByIdAndDelete(request.params.id)
   .then(result => {
        response.status(204).end()
   })
   .catch(error => next(error))
})


    
app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "name and number required"
        })
    } 

    Person.findOne({name: body.name})
    .then(existingPerson => {
        if (existingPerson) {
            existingPerson.number = body.number
            return existingPerson.save()
        } else {
            const person = new Person({
                name: body.name,
                number: body.number
            })
            return person.save()
        }
    })
    .then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
})


app.use(unknownEndpoint)
    
app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})