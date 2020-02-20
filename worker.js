const express = require("express");
const bodyParser = require("body-parser")
const config = require("config");
// 
const app = express();
const port = config.get("port") || 8080

require('./database');



app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use('/api/auth', require('./routes/auth'))

const server = app.listen(port, () => {
    console.log('Server listening port*',port)
})

require('./socket.handler')(server)
