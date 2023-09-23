const mongoose = require("mongoose")

const { Schema } = mongoose;



const BlackListTokenSchema = new Schema ({
    token:{
        type: String,
        required : true,
    }
})


module.exports =  mongoose.model('BlackList', BlackListTokenSchema)