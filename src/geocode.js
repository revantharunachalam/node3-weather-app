const request = require('postman-request');

//MAPBOX API
const geocode = (loaction, callbackgc) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ loaction +'.json?access_token=pk.eyJ1IjoicmV2YW50aGFydW5hY2hhbGFtIiwiYSI6ImNrOXUwbDdqbzFqaDQzZHFoM213c3I2bXIifQ.B5MCmLUk1FMPO2dt-79mNg&limit=1';

    request({url, json: true}, (error, {body}) => {
        if(error){
            callbackgc("Connection error... check you are properly connected");
        }
        else if(body.features.length === 0){
            callbackgc("Invalid data");
        }
        else if(body.message === "Not Found")
        {
            callbackgc("No query argument");
        }
        else{
            callbackgc(null, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0], 
                location: body.features[0].text  
            });
        }
    })
}

module.exports = geocode;