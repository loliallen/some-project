const express = require("express");
const bodyParser = require("body-parser")
// 
const app = express();
const port = process.env.PORT || 8080

require('./database');



app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
    console.log('Server listening port*',port)
})