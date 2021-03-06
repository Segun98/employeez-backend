const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SEND_GRID_KEY);

//bulk and direct email to employees , "to" is the org email
router.post("/sendmails", async (req, res) => {
   const {
      to,
      email,
      body,
      subject
   } = req.body

   const content = {
      to,
      from: email,
      subject,
      html: body
   }

   try {
      await sgMail.send(content)
      return res.status(200).send('Message sent successfully.')
   } catch (error) {
      console.log('ERROR', error)
      return res.status(400).send('Message not sent.')
   }

})

router.post("/acknowledge", async (req, res) => {
   const {
      email,
      user
   } = req.body

   const content = {
      to: email,
      from: "shegunolanitori@gmail.com",
      subject: "Successful Sign Up on Employeez",
      html: `<div style="color: rgb(51, 62, 99)">
      <h3>Hello ${user},</h3>
      <h3>You Have Successfully Signed Up On <strong style="color:purple">Employeez!</strong></h3>
      <h3>You Can Now Spend Less Time Managing Your Employees and Customers and Spend More Time Running Your Business.</h3>
      <br>
      <h3>Please Read Our Privacy Policy <a href="https://employeez.vercel.app/about#privacy">Click Here</a></h3>
      <h3>If You Need Help Setting Up, Reply Under This Email.</h3>
      <br>
      <p>Regards,</p>
      <h3>Segun Olanitori.</h3>
      </div>`
   }

   try {
      await sgMail.send(content)
      res.status(200).send('Message sent successfully.')
   } catch (error) {
      console.log('ERROR', error)
      res.status(400).send('Message not sent.')
   }

})

router.post("/contact", async (req, res) => {

   const {
      email,
      body,
      subject
   } = req.body

   const content = {
      to: "shegunolanitori@gmail.com",
      from: email,
      subject,
      text: body
   }

   try {
      await sgMail.send(content)
      res.status(200).send('Message sent successfully.')
   } catch (error) {
      console.log('ERROR', error)
      res.status(400).send('Message not sent.')
   }
});

module.exports = router