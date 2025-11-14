const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
} 
 

const password = process.argv[2]


const url = `mongodb+srv://reeseparsons99_db_user:${password}@cluster0.zw1arpd.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`


mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Persons = mongoose.model('Person', personSchema)

const person = new Persons({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length < 4) {
    Persons.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name, person.number)
        })
        mongoose.connection.close()
      })
} else {
    person.save().then(result => {
    console.log('number saved')
    mongoose.connection.close()
  })
}


