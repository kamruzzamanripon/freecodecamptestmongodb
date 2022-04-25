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
  var arrayOfPeople = [
    {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
    {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
    {name: "Robert", age: 78, favoriteFoods: ["wine"]}
  ];
  Person.create(arrayOfPeople, function(err, data) {
    if (err) {
      done(err)
    }
    else {
      done(null, data)
    }
  })
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
