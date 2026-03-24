// const mongoose = require("mongoose");
// mongoose.connect("/mongodb://localhost:27017/project-user")
// .then(()=> console.log("database connected"));
const mongoose = require("mongoose");

const connectdb = async ()=>{
    try{
      
   await mongoose.connect("mongodb://localhost:27017/project-user")
.then(()=> console.log("database connected"));
    }
    catch(err){
        console.log("database error",err);
    }
}

module.exports = connectdb;