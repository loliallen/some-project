module.exports = (server) => {
    const io = require("socket.io")(server);
    const redisCli = require('./redis.cli')

    /**
     * socketID = user._id
     */

    io.on('connection', socket => {
        console.log('a new user connected')

        /**
         * events:
         *      startBr , data = {loc, userslist[], userId} // begin broadcast user's loc to userslist[]
         *      broadcast, data = {loc,}
         *      stopBr , data = null // stop broadcast
         *      
         * 
         */

        socket.on('startBr', ({user_id, usersList}) => {
            /**
             * data: fields
             *      usersList = array<user._id>
             *      user_id = ObjectId
             */
            usersList.forEach(element => {
                
            });
            
        })
        socket.on('disconnect', ()=> {
            console.log('a user disconnected')
        })
    })
    
}