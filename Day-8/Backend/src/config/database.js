const mongoose = require("mongoose")

function connectDatabase(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to Database");
        
    })
}

module.exports = connectDatabase