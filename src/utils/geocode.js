const request = require('postman-request')
const geocode = (address, callback) => {

    if (address) {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3RhbmxleXZhcmdoZXNlIiwiYSI6ImNrbng4a3BpczE0NnkydnBzbnBlajM3aDEifQ.4jVRG-RtZ9uAlPatwphlNA&limit=1'
        request({ url: url, json: true }, (error, {body} = {}) => {
            if (error) {
                callback('Unable to connect to location service!', undefined)
            } else if (body.features.length === 0) {
                callback('Unable to find location. Try another location', undefined)
            } else {
                debugger
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        })
    } else {
        console.log('Please enter a location')
    }


}

module.exports = geocode