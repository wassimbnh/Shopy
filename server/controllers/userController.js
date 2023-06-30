const User = require('../models/userModel')
const validEmail = require('../helpers/validateEmail')
const  {mailSender} = require('../helpers/mailSender')
const createToken = require('../helpers/createToken')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


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
      const url = `http://localhost:3000/auth/reset-password/${ac_token}`;

      mailSender(email, "FORGOT PASSWORD TOKEN ", `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF8" />
          <meta httpequiv="XUACompatible" content="IE=edge" />
          <meta name="viewport" content="width=devicewidth, initialscale=1.0" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
            rel="stylesheet"
          />
          <title>Passioncorners | Account Activation</title>
          <style>
            body {
              background-color: #333333;
              height: 100vh;
              font-family: "Roboto", sans-serif;
              color: #fff;
              position: relative;
              text-align: center;
            }
            .container {
              max-width: 700px;
              width: 100%;
              height: 100%;
              margin: 0 auto;
            }
            .wrapper {
              padding: 0 15px;
            }
            .card {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(50%, 50%);
              width: 100%;
            }
            span {
              color: #008000;
            }
            h1 span {
              color: yellow;
            }
            button {
              padding: 1em 6em;
              border-radius: 5px;
              border: 0;
              background-color: green;
              transition: all 0.3s ease-in;
              cursor: pointer;
            }
            button:hover {
              background-color: hsl(45, 70%, 51%);
              transition: all 0.3s ease-in;
            }
            .spacing {
              margin-top: 5rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="wrapper">
              <div class="card">
                <h1><span>Welcome !</span></h1>
                <p>Please reset your password by clicking on the button below 👇🏻</p>
                <a href=${url}><button>Reset your password</button></a>
                <p class="spacing">
                  If the button above does not work, please navigate to the link
                  provided below 
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
      `);

      // success
      res.status(400).json({ msg: "Resend the password, please check your email." });

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


}
 
module.exports = userController; 