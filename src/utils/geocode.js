const request=require('request')
const geocode=(adress,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(adress) + '.json?types=address&access_token=pk.eyJ1IjoiYmlsYWwyMCIsImEiOiJjbGFhb2MwcGEwNXoyM3BwbnNndzFmamVmIn0.ErZMwWUALIz9X5hfnXIrVQ'
  request({url,json: true}, (error,{body}={})=>{
  if(error){
    callback('Unable to connect server!',undefined)
  } else if(body.features.length===0){
    callback({ error:'no location found',undefined})
  }
  else{
    callback(undefined,{
      longitude : body.features[0].center[1],
      latitude:body.features[0].center[0],
       place: body.features[0].place_name
  })}
  })
  
  }
  module.exports=geocode