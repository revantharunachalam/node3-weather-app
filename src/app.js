//Libraries
const path = require('path');
const express = require('express');
const hbs = require('hbs');

//Flies
const geocode = require('./geocode');
const weather = require('./weather')

const app = express()

//Including a path another directory
const publicPath = path.join(__dirname, "../public"); 
app.use(express.static(publicPath));

const viewspath = path.join(__dirname, "../template/views");

const partialspath = path.join(__dirname, "../template/partials");

//Overwrite express setting
app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialspath);

//home page
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Revanth"
    })
})

//About
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        age: 22
    })
})

//Help
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        about: "Gives the info about author",
        home: "Home page of App"
    })
})

//API
app.get("/weather", (req, res) => {
    if(!req.query.location){
        return res.send({
            errorfound: "Enter a valid location"})
    }
    
    geocode(req.query.location, (error, geodata = null) => {
        if(error){ 
            return res.send({
                errorfound: "MAPBOX ERROR: " + error});
        }
        // WEATHERSTACK

        weather(geodata.latitude,geodata.longitude, (error, {climate, temperature, feellike}) => {
            if(error){
                return res.send({
                    errorfound: "WEATHERSTACK ERROR: " + error});
            }
            res.send({
                climate: climate,
                temperature: temperature,
                feellike: feellike});
        })
    })
})

//Exception Handlers
app.get('/help/*', (req, res) => {
    res.render('404', {
        name: '404 Error',
        desc: "Page in Help section Not found"
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        name: '404 Error',
        desc: "Page Not Found"
    })
})

app.listen(3000, () => {
    console.log("The server is up");
})


















































































// app.get("", (req, res) => {
//     res.send("<h1>Welcome to homepage</h1>");
// })

// app.get("/help", (req, res) => {
//     res.send([{
//         option: 1,
//         description: "This is first option"
//      }, 
//     {option: 2,
//     description: "This is second option"}]);
// })

// app.get("/about", (req, res) => {
//     res.send("<h1>An About Page:</h1>");
// })