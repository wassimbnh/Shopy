const User = require('../models/userModel')
const validEmail = require('../helpers/validateEmail')
const  {mailSender} = require('../helpers/mailSender')
const createToken = require('../helpers/createToken')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;


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

        // check user
        const user = await User.findOne({ email });
        if (user)
            return res.status(400).json({ msg: "This email is already registered in our system." });
        
        // check password
        if (password.length < 8)
            return res.status(400).json({ msg: "Password must be at least 8 characters." });

        // hash password
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        // create token
        const newUser = { name, email, password: hashPassword };
        const activation_token = createToken.activation(newUser);

        // send emailconst
         const url = `http://localhost:3000/activate/${activation_token}`;///////////////////////////////////////////////////////////////////////////////////////
        mailSender(email,"ECOFIT ACTIVATION EMAIL",url);

        // registration success
         res.status(200).json({ msg: "Welcome! Please check your email." });

        }catch(err){
            res.status(500).json({ msg: err.message});
        }
    },  
    
    activate: async(req,res) =>{
        try{

        //get token
        const { activation_token } = req.body;

        //verify token
        const user = jwt.verify(activation_token, process.env.activation_token);
        const { name, email, password} = user;

        //check user 
        const checkUser = await User.findOne({ email });
        if(checkUser)
            return res.status(400).json({ msg: "This email is already registered." });

        //add user
        const newUser = new User({
            name,
            email,
            password,
          });
          await newUser.save();

        // activation success
        res.status(200).json({ msg: "Your account has been activated, you can now sign in." });

        }catch(err){
            res.status(500).json({ msg: err.message });
        }
    },

    signin: async(req,res) =>{
        try{
        // get credits
        const { email, password } = req.body;

        // check email
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ msg: "This email is not registered in our system." });
        
        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "This password is incorrect." });

        // refresh token
        const rf_token = createToken.refresh({ id: user._id });
        res.cookie("_apprftoken", rf_token, {
            httpOnly: true,
            path: "/api/auth/access",
            maxAge: 24 * 60 * 60 * 1000, // 24h
        }); 

          
      // signing success
      res.status(200).json({ msg: "Signing success", token: rf_token });        

        }catch(err){
            res.status(500).json({ msg: err.message });
        }
    },

    access: async(req,res) =>{
         try{

        // check the cookie 
        const rf_token = req.cookies._apprftoken;
        if (!rf_token)
            return res.status(400).json({ msg: "Please sign in." });
        
        // validate
        jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
            if (err) return res.status(400).json({ msg: "Please sign in again." });
            // create access token
            const ac_token = createToken.access({ id: user.id });
            // access success
             return res.status(200).json({ ac_token });
      });

    }catch(err){
            return res.status(500).json({ msg: err.message})
    }
    },

    forgetPassword: async(req,res) =>{
        try{

          // get email
      const { email } = req.body;

      // check email if exits in db
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email is not registered in our system." });
      
      // create ac token
      const ac_token = createToken.access({ id: user.id });

        // send email
      const url = `http://localhost:3000/reset-password/${ac_token}`;

      mailSender(email,"ECOFIT RESET PASSWORD ",url);

      // success
      res.status(200).json({ msg: "Resend the password, please check your email." });

        }catch(err){
            res.status(400).json({msg: err.message});
        }
    },
 
      resetPassword: async(req,res) =>{

        try {
          // get password
          const { password } = req.body;
    
          // hash password
          const salt = await bcrypt.genSalt();
          const hashPassword = await bcrypt.hash(password, salt);
    
          // update password
          await User.findOneAndUpdate(
            { _id: req.user.id },
            { password: hashPassword }
          );
    
          // reset success
          res.status(200).json({ msg: "Password was updated successfully." });
        } catch (err) {
          res.status(500).json({ msg: err.message });
        }
      },

    getUserInfo: async(req,res) =>{

      try{
      //get user info except pwd
      const user = await User.findById(req.user.id);
        res.status(200).json( user );

      }catch(err){
        res.status(500).json({ msg: err.message})
      }
    },

    updateUserInfo: async(req,res) =>{
      try{
        const { name } = req.body;

        //update
        await User.findOneAndUpdate(
          { _id: req.user.id},
          {name}
        );

        //success
        res.status(200).json({ msg: "Updated success"})

      }catch(err){
        res.status(500).json({ msg: err.message });
      }
    },

    signOut: async(req,res) =>{
      try{
        //clear cookie used in sign in
        res.clearCookie("_apprftoken",{path : "api/auth/access"})

        //success
        return res.status(200).json({msg : "Signout success ! " })
      }catch(err){
         res.status(500).json({msg : err.message})
        }
    },

    google: async (req, res) => {
      try {
        // get Token Id
        const { tokenId } = req.body; 
  
        // verify Token Id
        const client = new OAuth2(G_CLIENT_ID);
        const verify = await client.verifyIdToken({
          idToken: tokenId,
          audience: G_CLIENT_ID,
        });
  
        // get data
        const { email_verified, email, name, picture } = verify.payload;
  
        // failed verification
        if (!email_verified)
          return res.status(400).json({ msg: "Email verification failed." });
  
        // passed verification
        const user = await User.findOne({ email });
        // 1. If user exist / sign in
        if (user) {        
          // refresh token
          const rf_token = createToken.refresh({ id: user._id });
          // store cookie
          res.cookie("_apprftoken", rf_token, {
            httpOnly: true,
            path: "/api/auth/access",
            maxAge: 24 * 60 * 60 * 1000, // 24hrs
          });
          res.status(200).json({ msg: "Signing with Google success." });
        } else {
          // new user / create user
          const password = email + process.env.G_CLIENT_ID;
          const salt = await bcrypt.genSalt();
          const hashPassword = await bcrypt.hash(password, salt);
          const newUser = new User({
            name,
            email,
            password: hashPassword,
            avatar: picture,
          });
          await newUser.save();
          // sign in the user
          // refresh token
          const rf_token = createToken.refresh({ id: user._id });
          // store cookie
          res.cookie("_apprftoken", rf_token, {
            httpOnly: true,
            path: "/api/auth/access-user",
            maxAge: 24 * 60 * 60 * 1000, // 24hrs
          });
          // success
          res.status(200).json({ msg: "Signing with Google success.", token: rf_token  });
        }
      } catch (err) {
        res.status(500).json({ msg: err.message });
      }
    },


}
 
module.exports = userController; 