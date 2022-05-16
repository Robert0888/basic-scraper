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
    const szovi =[]
    
    $('.landlord-name',html).each(function()  {
     const lName = $(this).children('.element-hidden').text()
     const lD = $(this).children('.node__content').children().text()
    //  const data = JSON.stringify(lD)
    
    landLords.push({
      lName,
      lD
    })
    console.log(landLords);
    })

    $('.enforcement-action', html).each(function() {
      const eA = $(this).children('dl').children('dt').text()
      const plan = $(this).children('dl').children('dt').text()
      // const convic  = JSON.stringify(eA)
      
      
      // console.log(convic);
      
      conviction.push({
        eA,
        plan
      })
      console.log(conviction);
    })

    


    $('.rental-address', html).each(function()  {
     const titleText = $(this).children().children('dd').text()
     const title = $(this).children().children('dt').text()
    //  const addr = JSON.stringify(title)
    //  const titleText = $(element).find('dd')
     
     address.push({
       title,
       titleText
     })
     console.log(address)
     
    })
    $('.node__content', html).each(function() {
      const texi = $(this).children('.node__title').text()
      console.log($(this).find('h2').text());
      szovi.push(texi ,',')
      console.log(szovi);
    })
    
   }).catch((err) => {
    console.log(err);
    
   })
   
app.listen(PORT, () => console.log(`server listing at ${PORT}`))