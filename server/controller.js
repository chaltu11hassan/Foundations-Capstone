
//////////////////////Home-Page////////////////////////////////////

let destinations = require('./destinationsDB.json');
let destinationGlobalID = 5;

let countries = require('./countriesDB.json');
let countryGlobalID = 2

let users = require('./users.json');
let usersGlobalID = 2;

const bcryptjs = require('bcryptjs')
module.exports = {

    getDestinations: (req,res) => {
        res.status(200).send(destinations)
},

    updateDestination: (req, res)=>{
        const {type} = req.body;
        let index = destinations.findIndex(elem => elem.id === +req.params.id);
        res.status(200).send(destinations);
},
  deleteDestination: (req, res) => {
    let index = destinations.findIndex(elem => elem.id === +req.params.id)
    destinations.splice(index, 1);
    res.status(200).send(destinations);

 },
    createDestination: (req, res)=>{
        console.log(req.body)
        const {title, detail, date, imageURL} = req.body;
        let newDestination={
        id:destinationGlobalID,
        title:title,
        detail: detail,
        date: date,
        imageURL: imageURL
    }
        destinations.push(newDestination);
        destinationGlobalID++;
        res.status(200).send(destinations);
    },
    
/////////////////////////////////Future-Destinations-Page//////////////////////////

    addToWishlist: (req, res) =>{
        console.log(req.body)
        const {country} = req.body;
        let newCountry = {
            id: countryGlobalID,
            title: country
        }
       countries.push(newCountry);
        countryGlobalID++
        res.status(200).send(countries);
    },

    getCountries: (req, res) =>{
        res.status(200).send(countries)
    },
    deleteCountry: (req, res) => {
        let index = countries.findIndex(elem => elem.id === +req.params.id)
       countries.splice(index, 1);
        res.status(200).send(countries);
    },

    /////////////////////////Login-Page///////////////////////////////////////////

    login: (req, res) => {
        const {username, password} = req.body;
        for(let i = 0; i < users.length; i++){
            if(users[i].username === username){
                const authenticated = bcryptjs.compareSync(password, users[i].password);
                if (authenticated === true){
                    
                    let returned = {...users[i]};
                    delete returned.password;

                    res.status(200).send(returned);
                }
            }
        }
    },
    
    register: (req, res) => {
        console.log('hit')
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).send('The username or password entered is incorrect!')
        } else {
            const salt = bcryptjs.genSaltSync(5); //creates a key that will encrypt password
            const hashed = bcryptjs.hashSync(password, salt); //salt is the key
            console.log(hashed);

            let newUser = {
                id: usersGlobalID,
                username,
                email,
                password: hashed, //hashed from above
            }
            users.push(newUser);
            usersGlobalID++;
            res.status(200).send('Account successfully created!')
        }
        console.log(users)
    }

}





