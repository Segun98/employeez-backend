const express = require("express")
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./db')


dotenv.config()
connectDB()
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
// 'http://localhost:3000'


PORT = process.env.PORT || 8080

const customers = require("./routes/customers")
const employees = require("./routes/employees")
const auth = require("./routes/auth")
const sendmail = require("./routes/sendmail")

app.use("/api", customers)
app.use("/api", employees)
app.use("/api", auth)
app.use("/api", sendmail)

app.listen(PORT, () => console.log('server running on ' + PORT))