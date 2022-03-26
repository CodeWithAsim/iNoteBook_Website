const connectToMongo = require('./db');

var cors = require('cors');

const express = require('express')

connectToMongo();

const app = express()
const port = 5000

app.use(cors());

// app.get('/', (req, res) => {
//     res.send('Hello Asim!')
// })

// app.get('/api/v1/signup', (req, res) => {
//     res.send('SignUp!')
// })

// app.get('/api/v1/login', (req, res) => {
//     res.send('LogIn!')
// })

app.use(express.json());  // middleware use for sending req in json through req.body

app.use('/api/auth', require('./routes/auth'));
app.use("/api/notes", require("./routes/notes"));


app.listen(port, () => {
    console.log(`iNotebook backend listening on port 5000 and at  http://localhost:${port}`)
})



