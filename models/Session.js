const mongoose = require("mongoose")

const { Schema } = mongoose;



const SessionSchema = new Schema ({
    user_id:{
        type: String,
        required : true
    },
    token:{
        type: String,
        required : true,
    },
    singedAt: {
        type: Date,
        require: true
    },
    updatedAt: {
        type: Date,
        require: true
    }
})


module.exports =  mongoose.model('Sessions', SessionSchema)