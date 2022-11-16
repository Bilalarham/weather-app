const request=require('request')
const forcast=(longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=5c4be371ea46fb35b7527a44244e6fc8&query=' + latitude + ',' + longitude + '&units=f'
    request({url,json: true}, (error,{body}={})=>{
    if(error){
      callback(undefined,'Unable to connect server!')
    } else if(body.error){
      callback(undefined,'plz enter the right location')
    }
    else{
      callback(undefined,
        body.current.weather_descriptions +' and its currently ' + body.current.temperature +' degrees and feel likes '+body.current.feelslike
)}
    })}
    
module.exports=forcast
      