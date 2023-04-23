
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB Atlas database using URI from env
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

// Create a person Schema
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Create a person model
const Person = mongoose.model('Person', personSchema);

// Create a person record
const person = new Person({
  name: 'Fatima Zahra',
  age: 20,
  favoriteFoods: ['pizza', 'tacos'],
});

// Save a person record to database
person
  .save()
  .then(() => console.log('Person created successfully....'))
  .catch((err) => console.log(err));

// Create an array of people
const users = [
  { name: 'Ali', age: 45, favoriteFoods: ['Tajine', 'Rfissa'] },
  { name: 'Insaf', age: 16, favoriteFoods: ['sushi', 'Tacos'] },
  { name: 'yassine', age: 25, favoriteFoods: ['Couscous', 'pizza'] },
];

Person.create(users)
  .then(() => {
    console.log('People are saved');
  })
  .catch((error) => {
    console.log(error);
  });

// Find all people with the given name
Person.find({
  name: 'Hajar',
})
  .then((res) => {
    console.log('All are founded', res);
  })
  .catch((err) => {
    console.error(err);
  });

// Find a specific person with the given favoriteFood
Person.findOne({
  favoriteFoods: 'pizza',
})
  .then((res) => {
    console.log('The data is founded', res);
  })
  .catch((err) => {
    console.error(err);
  });

// Find by Id
const personId = '643e79535d6b0b33ca4c2851';

Person.findById(personId)
  .then((res) => {
    console.log('Person is founded', res);
  })
  .catch((error) => {
    console.log(error);
  });

// Update the person with a specific Id
const personIdToUpdate = '643e79535d6b0b33ca4c2853';

Person.findById(personIdToUpdate)
  .then((res) => {
    res.favoriteFoods.push('Humburger');
    res
      .save()
      .then((resultat) =>
        console.log('Person updated successfully....', resultat)
      )
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

// Update a person by name
const personNameToUpdate = 'Fatima Zahra';

Person.findOneAndUpdate({ name: personNameToUpdate }, { age: 20 })
  .then((res) => console.log('User is updated', res))
  .catch((err) => console.log(err));

// delete all people with given name

Person.deleteMany({ name: 'Hajar' })
.then(() => console.log('all the users with the given name are removed'))
.catch(err => console.log(err))


// find all the people with the given favoriteFoods using Query Building chain

Person.find({favoriteFoods:"pizza"})   // find all user               
         .limit(2)                // limit to 2 documents
         .sort({name: 1})     // sort by name
         .select({age: false}) // skip age
         .exec()                   // execute the query
         .then(docs => {
            console.log(docs)
          })
         .catch(err => {
            console.error(err)
          })