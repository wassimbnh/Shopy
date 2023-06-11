const User = require('../models/userModel')
const validEmail = require('../helpers/validateEmail')
const userController = {

    register: async (req,res) =>{

        try{
        //get info
        const { name, email, password} = req.body;

        //check fields
        if(!name, !email, !password)
            return res.status(400).json({msg: "Please fill in all fields"});
        
        //validate email
        if(!validEmail(email))
            return res.status(400).json({msg: "Please enter a valid email"})

        }catch(err){
            res.status(500).json({ msg: err.message});
        }
    },  
    
    activate: async(req,res) =>{

    },

    signin: async(req,res) =>{

    },

    access: async(req,res) =>{

    },

    forgetPassword: async(req,res) =>{

    },

    resetPassword: async(req,res) =>{

    },

    getUserInfo: async(req,res) =>{

    },

    updateUserInfo: async(req,res) =>{

    },

    signOut: async(req,res) =>{

    },


}
 
module.exports = userController; 