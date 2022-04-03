//we import the express dependency
const express = require('express')
//assign express to a variable so it's easiet to work with
const app = express()
//middleware so the server can parse json data
app.use(express.json())
//let's define an example of a database so we can interact with it
let infoDB = [
    {
        id: 1,
        info: "example of information",
        date: "2022-02-10T17:30:31.098Z"
    },
    {
        id: 2,
        info: "example of information2, put anything here",
        date: "2022-03-10T17:30:31.098Z"
    }
]
//a helper function to generate an id
//if you want to make it simpler just return infoDB.length + 1
const generateId = () => {
    const maxId = infoDB.length > 0
        ? Math.max(...infoDB.map(i => i.id))
        : 0
    return maxId + 1
}
//this is our first route
//we want to get http://localhost:3001/
//the app already knows that we are on localhost
//we just need to indicate that's the entry point with '/'
//req stands for request and res for response
app.get('/', (req, res) => {
    //we reply to the get endpoint by sending a text back
    res.send('hello world!')
})
//an endpoint to return all our infor back
app.get('/api/info', (req, res) => {
    //we send the information back in JSON format
    res.json(infoDB)
})
//an endpoint to add a note
app.post('/api/info', (req, res) => {
    //without the middleware express.json() on L6 we wouldn't be able to read this data
    //extract the body from the request
    const body = req.body
    //check if the body doesn't contain any info
    if(!body.info) {
        //return an error status and a json response
        return res.status(400).json({
            error: 'you need to type the information'
        })
    }
    //we make an object from the request to add it to our database
    //in order to generate the id and the date we use helper functions
    //read more about how to use Date: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    const infoObject = {
        id: generateId(),
        info: body.info,
        date: new Date()
    }
    //we modify our database by adding our object to it
    //first we copy the data (so we don't modify existing data), add our object and finally store everything back
    //feel free to read about ACID: Atomicity, Consistency, Isolation, and Durability
    infoDB = infoDB.concat(infoObject)
    //we send a response with the stored object
    //and a status of 201 which means created
    res.status(201).json(infoObject)
})
//an endpoint to delete information from our db
//the ":id" at the end means we will be using that as a parameter
//we get the id from params.id in the request
app.delete('/api/info/:id', (req, res) => {
    //parse the data as a number since req.params.id is a string
    const id = Number(req.params.id)
    //filer back all the data that doesn't contain the requested id
    infoDB = infoDB.filter(i => i.id !== id)
    //return a code with no content and close the operation
    res.status(204).end()
})
//an endpoint to update info
app.put('/api/info/:id', (req, res) => {
    //get the data from the body
    const body = req.body
    //check what you are getting(feel free to add console logs everywhere)
    console.log(body)
    //parse the date into a number
    const id = Number(req.params.id)

    let infoToModify = {}
    let indexOfInfo = 0

    for(let i = 0; i < infoDB.length; i++){
        if(id === infoDB[i].id) {
            infoToModify = infoDB[i]
            indexOfInfo = i
        } 
    }

    console.log(infoToModify)
    const modifiedInfo = {
        id: infoToModify.id,
        info: body.info,
        date: infoToModify.date
    }

    // infoDB.splice(indexOfInfo, 0, modifiedInfo)
    infoDB[indexOfInfo] = modifiedInfo
    res.status(200).json(modifiedInfo).end()
})
//define the port where our app is gonna run
const PORT = 3001
//make the server listen to that port
app.listen(PORT, () => {
    //the console.log is for your CLI
    //so you know the server has started
    console.log(`server running on localhost with port ${PORT}`)
})