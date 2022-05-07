
  
const mongoose = require('mongoose')

const contact_msgSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    }
})

const Contact_Message = new mongoose.model('contact_message', contact_msgSchema)

module.exports = Contact_Message;