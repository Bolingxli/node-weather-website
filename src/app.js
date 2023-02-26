const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define Paths for Express Configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views' )
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Frank Mbabie'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You need to put in an address'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} ={})=>{
        if(error){
         return res.send( {error} )  
        }
        forecast(longitude, latitude, (error, forecastData)=>{
            if(error){
              return res.send( {error}) 

            }
            res.send({
                forecast: forecastData,
                location
            
              
            })
        })


    })




    // res.send({
    //     forecast
    //     location: 'Philadelphia',
    //     address: req.query.address

    // })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help Me',
        helpText: 'Fill In your message',
        name: 'Frank Mbabie'
    })
})
 app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About Me',
        name: 'Frank Mbabie'
    })
 })

app.get('/help/*', (req,res)=>{
    res.render('404page', {
        title: '404',
        errorMssg: 'Help Article Not Found.'
    })
})
 app.get('*', (req, res)=>{
    res.render('404page', {
        title: '404',
        errorMssg: 'Page Not Found.'
    })

    })
app.listen(3000, ()=> {
    console.log('Server is up on 3000');
})