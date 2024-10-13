// imguplschema.js
const mongoose = require("mongoose");

const imageschema = mongoose.Schema({
    "name":{
        'type': String,
        require: true,
    },
    "webkitRelativePath":{
        'type': String,
        require: true,
    },
    "contentType":{
        'type': String,
        require: true,
    },
    "size":{
        'type': Number,
        require: true,
    },
    "uploadDate": { 
        type: Date,
        default: Date.now(),
        require: false,
        immutable: true,
    }
})

const Images = mongoose.model('Images', imageschema);

module.exports = Images; // Export the Images model