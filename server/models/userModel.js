const { Schema, model} = require('mongoose')

const userSchema = new Schema(
    {
        name:{
            type: String
        },

        email: {
            type: String
        },

        password: {
            type: String
        }

    }, {timestamp: true}
)

const User = model("User", userSchema);

module.exports = User;