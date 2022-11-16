//const response  = require("express")



const weatherForm=document.querySelector('form')
const search= document.querySelector('input')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const adress=search.value
    message1.textContent='Loading!!!'
    message2.textContent=''
    fetch('http://localhost:3000/weather?search=' +encodeURIComponent(adress) + '').then((response)=>{
        response.json().then((data)=>{
            if(data.error){
    message1.textContent=data.error
            } else{
    message1.textContent=data.location
    message2.textContent=data.forecastdata
            }
        })
    })

})