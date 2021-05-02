const request = require('postman-request')
const forecast = (latitude,longitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=baab2cb37820cdae3dc7b433f16f8489&query='+latitude+','+longitude+'&units=m'


    request({url,json:true},(error, {body} = {}) => {
        if(error){
            callback('Unable to reach the service',undefined);
        }else if(body.error){
            callback('Unable to fetch the weather information. Try another location!',undefined);
        }else{
            callback(undefined,body.current);
        }
    })
}

module.exports = forecast