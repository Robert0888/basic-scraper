const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
var fs = require("fs");


const app = express()


const url = "https://www.london.gov.uk/rogue-landlord-checker";

axios(url)
   .then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    const landLords = []
    const conviction = []
    const address = []
    
    $('.landlord-name',html).each(function() {
     const lD = $(this).text()
     

     landLords.push(lD)
    })

    $('.enforcement-action', html).each(function(){
      const eA = $(this).text()
      // console.log(eA);

       conviction.push(eA)
    })

    console.log(landLords);


    $('.rental-address', html).each(function() {
     const title = $(this).text()
     // const address = $(this).find('dd')
     // console.log(title);
     address.push(title)
     
    })
    
   }).catch((err) => {
    console.log(err);
    
   })

app.listen(PORT, () => console.log(`server listing at ${PORT}`))