const request = require('request')

const forecast = (longitude, latitude, callback) => {
   
    const url = 'http://api.weatherstack.com/current?access_key=e06e8c6ca10582b4c339dccf25193962&query=' + longitude + ',' + latitude 
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to weather services', undefined)
        
        }else if (body.error) {
            callback('unable to find location', undefined)

        }else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees. It feels like ${body.current.feelslike} degrees out`)
        }
    })
}


module.exports = forecast