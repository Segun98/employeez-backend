const express = require("express")
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./db')
const cloudinary = require('cloudinary').v2


dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
connectDB()
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}));
app.use(cors({
    origin: 'https://employeez.vercel.app',
    credentials: true
}))
// 'http://localhost:3000'
// 'https://employeez.vercel.app'


PORT = process.env.PORT || 8080

const customers = require("./routes/customers")
const employees = require("./routes/employees")
const auth = require("./routes/auth")
const sendmail = require("./routes/sendmail")

// app.post('/upload', multerUploads, (req, res) => {  

//     const file = dataUri(req).content;

//       const data = {
//         image: file,
//       }
//       cloudinary.uploader.upload(data.image)
//         .then(result => {
//           res.send(result.url)
//         })
//         .catch(err => res.send(err))
//     });

app.use("/api", customers)
app.use("/api", employees)
app.use("/api", auth)
app.use("/api", sendmail)

app.listen(PORT, () => console.log('server running on ' + PORT))