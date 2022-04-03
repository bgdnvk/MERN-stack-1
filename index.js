//we import the express dependency
const express = require('express')
//assign express to a variable so it's easiet to work with
const app = express()
//this is our first route
//we want to get http://localhost:3001/
//the app already knows that we are on localhost
//we just need to indicate that's the entry point with '/'
//req stands for request and res for response
app.get('/', (req, res) => {
    //we reply to the get endpoint by sending a text back
    res.send('hello world!')
})
//define the port where our app is gonna run
const PORT = 3001
//make the server listen to that port
app.listen(PORT, () => {
    //the console.log is for your CLI
    //so you know the server has started
    console.log(`server running on localhost with port ${PORT}`)
})