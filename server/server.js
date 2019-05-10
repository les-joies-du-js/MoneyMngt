// Import modules
var express = require('express') // server side implementation
var path = require('path') // Handle paths
var http = require('http') // http module protocole
var bodyParser = require('body-parser') //get request in json format :) 
var mongoose = require('mongoose') // ORM database

// Init
const app = express() // const javascript.. you know

// Database
var dataBase = mongoose.connect('mongodb://localhost:port/MoneyMngt') // connect to DB
// dataBase.set('debug', true) We are not gods, we debug

// Adding models
require('./models/purchaseModel')
require('./models/reportModel')

// API routes
const api = require('./api/')
app.use('/api', api)

// Body parser configuration 
app.use(bodyParser())
app.use(bodyParser.json({limit : '10mb'}))
app.use(bodyParser.urlencoded({extended : true}))

// CORS 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
})

/**
 * Server settings
 */

// retrieve port from inherit default conf or if does not exist set it to 3000
const port = process.env.PORT || '3000'
app.set('port', port)

// Create this f*uckink server finally..
const server = http.createServer(app)

// Make server listen on correct port 
server.listen(port, ()=> console.log('Running server on: ${port}'))

