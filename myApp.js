require('dotenv').config();

/** # MONGOOSE SETUP #
/*  ================== */

/** 1) Install & Set up mongoose */

// Add `mongodb` and `mongoose` to the project's `package.json`. Then require 
// `mongoose`. Store your **mLab** database URI in the private `.env` file 
// as `MONGO_URI`. Connect to the database using `mongoose.connect(<Your URI>)`
const mongoose = require('mongoose')
//mongoose.connect(process.env.MONGO_URI)
mongoose.mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });



/** 2) Create a 'Person' Model */

// First of all we need a **Schema**. Each schema maps to a MongoDB collection
// and defines the shape of the documents within that collection. Schemas are
// building block for Models. They can be nested to create complex models,
// but in this case we'll keep things simple. A model allows you to create
// instances of your objects, called **documents**.

// Create a person having this prototype :

// - Person Prototype -
// --------------------
// name : string [required]
// age :  number
// favoriteFoods : array of strings (*)

// Use the mongoose basic *schema types*. If you want you can also add more
// fields, use simple validators like `required` or `unique`, and set
// `default` values. See the [mongoose docs](http://mongoosejs.com/docs/guide.html).

// <Your code here >
const Schema = mongoose.Schema
const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})
let Person = mongoose.model('Person', personSchema)

// **Note**: GoMix is a real server, and in real servers interactions with
// the db are placed in handler functions, to be called when some event happens
// (e.g. someone hits an endpoint on your API). We'll follow the same approach
// in these exercises. The `done()` function is a callback that tells us that
// we can proceed after completing an asynchronous operation such as inserting,
// searching, updating or deleting. It's following the Node convention and
// should be called as `done(null, data)` on success, or `done(err)` on error.
// **Warning** - When interacting with remote services, **errors may occur** !

// - Example -
// var someFunc = function(done) {
//   ... do something (risky) ...
//   if(error) return done(error);
//   done(null, result);
// };


//let Person;

//test-3
const createAndSavePerson = (done) => {
  const human = new Person({name: 'Harrison', age: 25, favouriteFoods: ['pizza', 'indian']})
  human.save(function(err, data){
    if (err) {
      return done(err)
    }
    else {
      done(null, data)
    }
  })
};

//test-4
const createManyPeople = (arrayOfPeople, done) => {
 
  Person.create(arrayOfPeople, (err, people)=>{
    if(err) return console.log(err);
    done(null, people)
  })
};


//test-5
const findPeopleByName = (personName, done) => {
  const person = Person.find({name: personName}, function(err, data){
    if (err) {
      return done(err)
    }
    else {
      return done(null, data)
    }
  })
};

//test-6
const findOneByFood = (food, done) => {
  const person = Person.findOne({favoriteFoods: food}, function(err, data){
    if (err) {
      return done(err)
    }
    else {
      return done(null, data)
    }
  })
};


//test-7
const findPersonById = (personId, done) => {
  const person = Person.findById({_id: personId}, function(err, data){
    if (err) {
      return done(err)
    }
    else {
      return done(null, data)
    }
  })
};


//test - 8
const findEditThenSave = (personId, done) => {
  const itemToAdd = 'hamburger'
  const person = Person.findById({_id: personId}, function(err, data){
    if (err) {
      return done(err)
    }
    data.favoriteFoods.push(itemToAdd)
    data.save(function(err, data){
      if (err) {
        return done(err)
      }
      else {
        return done(null, data)
      }
    })
  })
};

//test-9
const findAndUpdate = (personName, done) => {
  var ageToSet = 20
  const person = Person.findOneAndUpdate({name: personName}, {age: 20}, {new: true}, function(err, data){
    if (err) {
      return done(err)
    }
    else {
      return done(null, data)
    }
  })
};


//test-10
const removeById = (personId, done) => {
  const person = Person.findByIdAndRemove({_id: personId}, function(err, data){
    if (err) {
      return done(err)
    }
    else {
      return done(null, data)
    }
  })
};


//test-11
const removeManyPeople = (done) => {
  var nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (error, removeValInfo)=>{
    if(err) return console.log(error);
    done(null, removeValInfo);
  })
};


//test-12
const queryChain = (done) => {
  var foodToSearch = "burrito";
  const people = Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({age: 0})
  .exec(function(err, data){
    if (err) {
      done(err)
    }
    else {
      done(null, data)
    }
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
