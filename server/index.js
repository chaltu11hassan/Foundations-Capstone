require('dotenv').config();

const express = require("express");
const cors = require("cors");
const path = require('path')

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../client')))

app.get('/login',(req, res)=>{
    res.sendFile(path.join(__dirname, '../client/login.html'))
})

app.get('/home',(req, res)=>{
    res.sendFile(path.join(__dirname, '../client/travelHome.html'))
})

app.get('/future-destination',(req, res)=>{
    res.sendFile(path.join(__dirname, '../client/futureDestination.html'))
})

app.get('/resources',(req, res)=>{
    res.sendFile(path.join(__dirname, '../client/resources.html'))
})

const {getDestinations,createDestination,updateDestination, deleteDestination} = require('./controller');

const {addToWishlist, getCountries, deleteCountry} = require('./controller');

const {login, register} = require('./controller');

app.get('/api/destinations', getDestinations);
app.post('/api/destinations', createDestination);
app.put('/api/destinations/:id', updateDestination);
app.delete('/api/destinations/:id', deleteDestination);

app.post('/api/countries', addToWishlist);
app.get('/api/countries',getCountries);
app.delete('/api/countries/:id', deleteCountry);

app.post('/api/login', login)
app.post('/api/register', register)

app.use((req,res) =>{
    res.redirect('/home')
})

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})







