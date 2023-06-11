const nodemailer = require('nodemailer'); 


 require('dotenv').config(); 
  
 const mailSender = (to, subject, html)  =>{ 
   try { 
     let transporter = nodemailer.createTransport({ 
       host: 'smtp.gmail.com', 
       port: 587, 
       secure: false, 
       auth: { 
         user: process.env.EMAIL_SENDER, 
         pass: process.env.PASS, 
       }, 
     }); 
  
     let info =  transporter.sendMail({ 
       from: process.env.EMAIL_SENDER, 
       to,        
       subject,  
       html,  
     }); 
  
     console.log(`Message sent: ${info.messageId}`); 
     console.log(`Preview Url: ${nodemailer.getTestMessageUrl(info)}`); 
   } catch (err) { 
     console.log(err); 
   } 
 } 
  
 
 module.exports = { mailSender };