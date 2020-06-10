const express = require('express')
const router = express.Router()

//gets all employees
router.post("/send", (req, res) => {
    const {name, email} =req.body
    if(name && email){
       return res.status(200).json({
          success: true,
          message: "all data came in",
          data: {
             name,
             email
          }
       })
    }
    if(!name && email){
       return res.status(400).json({
         success: false,
         message: "email recieved but no name",
         data: {
            email
         }
       })
    }
    if(!email && name){
      return res.status(400).json({
         success: false,
         message: "name recieved but no email",
         data: {
            name
         }
      })
   }
   return res.status(404).json({
      success: false,
      message: "an empty body",
      data: {}
   });
})


module.exports = router