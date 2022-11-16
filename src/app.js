const path=require('path')
const express=require('express')
const hbs=require('hbs')
const { query } = require('express')
const geocode=require('./utils/geocode')
const forcast= require('./utils/forcast')

const app= express()
//define paths for express
const directory=path.join(__dirname,"../public")
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')


//setup handles engine and views location
app.set("view engine","hbs")
app.set('views', viewPath)
hbs.registerPartials(partialPath)
//setup static directory to serve
app.use(express.static(directory))


app.get('/weather', (req, res)=>{

    if(!req.query.search){
        return res.send({
           error : "plz enter serch address"  
        })
    }
geocode(req.query.search,(error,{latitude,longitude,place}={})=>{
    if(error){
        return res.send(error)
    }
    forcast(latitude, longitude,(error, forecastdata)=>{
        if(error){
          return res.send(error)
        }
        res.send({
      location : place,
       forecastdata ,
        })
})


})})


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Bilal Arham'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name: 'Bilal Arham'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page',
        name: 'Bilal Arham'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Bilal Arham',
        errormsg:'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'Bilal Arham',
        errormsg:'error 404 Page is not found'
    })
})



app.listen(3000, ()=>{
    console.log('server is on port 3000')
})