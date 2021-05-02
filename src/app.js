const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for Express Config
const app = express()
const port = process.env.PORT || 3000
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(path.join(publicDirectory)))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Stanley Varghese'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Stanley Varghese'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'You can get weather info here',
        title: 'Help',
        name: 'Stanley Varghese'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'No address passed as input'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({
                error : error
            })
        }else{
            //console.log(response)
            forecast(latitude, longitude, (error, {weather_descriptions,temperature,feelslike} = {}) => {
                if(error){
                    return res.send({
                        error : error
                    })
                }else {
                    const forecast = weather_descriptions[0]+'. It is currently '+temperature+' degrees out. It feels like '+feelslike+ ' degrees out'
                    res.send({
                        location: location,
                        forecast: forecast                        
                    })
                }   
            })
        }
    })

})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: 404,
        message:'Article not found',
        name: 'Stanley Varghese'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: 404,
        message:'Page not found',
        name: 'Stanley Varghese'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})