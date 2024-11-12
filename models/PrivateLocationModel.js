const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rent:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true,
        unique:true
    },
    locationImg:{
        type:String,
        required:true,
    },
    locationVideo:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const privateLocations = mongoose.model("privateLocations",locationSchema)
module.exports = privateLocations