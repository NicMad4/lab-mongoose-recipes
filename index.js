const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then((response) => {
    return Recipe.create({title:"arroz con pollo",
    level:"Easy Peasy",
    ingredients:['arroz','pollo'],
    cuisine:'global',
    dishType:"main_course",
    image:'',
    duration:1,
    creator:'desconocido',
  })
    })
    .then((response) => {
      
      return Recipe.insertMany(data);
    })
    .then((response) => {
         return Recipe.findOneAndUpdate(
        {title: "Rigatoni alla Genovese" },
        { duration: 100 });
    })
    .then((response) => {
      console.log('borrado')
      return Recipe.deleteOne(
     {title:"Carrot Cake" }
     )
 })
 .then((response) => { mongoose.connection.close()})
 
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
