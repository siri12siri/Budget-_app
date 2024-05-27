// creating database
const Datastore = require("nedb");
const database = new Datastore("database.db");
database.loadDatabase();
console.log("server is running....");

// Data handler
const fullDate = Date();

// Database insert
function databaseInsert() {
database.insert({Date: fullDate});
}

// Database find
database.find({}, function (err, output){
   if(err) {
      console.log(err);
   }
   console.log(output[0].Date);
});

