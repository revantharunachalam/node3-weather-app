const request = require('postman-request');

//WEATHERSTACK API
const weather = (latitude, longitude, callbackwet) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=1a1cae02446e99a775a8374264ef55be&query='+ latitude + ',' + longitude +'&units=f';

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callbackwet("Connection error... check you are properly connected", null);
        }
        else if(body.error){
            callbackwet("Undefined location... Try again", null);
        }
        else{
            callbackwet(null, {
                temperature: body.current.temperature,
                feellike: body.current.feelslike,
                climate: body.current.weather_descriptions[0]
            });
        }
    })
}

module.exports = weather;