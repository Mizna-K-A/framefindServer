const mongoose = require('mongoose')

const dbConnection = process.env.CONNECTION_STRING

mongoose.connect(dbConnection).then(res=>{
    console.log("Mongodb Atlas connection successfully with serverFramefind");
}).catch(err=>{
    console.log("Connection Failed");
    console.log(err);
})