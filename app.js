const  express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({extended: true}))

app.get("/",function (req,res) {
res.sendFile(__dirname + "/index.html");
})



app.post("/" , function (req , res) {
  console.log(req.body.cityName);
  console.log("post request");
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+"&units=metric&appid=343304ff1591b26cfaa6f4bca1babab3";

    https.get(url,  function (response) {
      console.log(response.statusCode);

    response.on("data",function (data) {
      console.log(data);

       const weatherData = JSON.parse(data);
       const temp = weatherData.main.temp;
       const weatherdiscription = weatherData.weather[0].description;
       const icon = weatherData.weather[0].icon;
       const iconUrl = " http://openweathermap.org/img/wn/"+ icon +"@2x.png";
       console.log(temp);
       console.log(weatherData);
  // sendind data to the the html


  res.write("<p> "+ query +"Todays weather is "+weatherdiscription+"</p>");
  res.write("<h1> "+ query +"'s  temprature is " + temp + " celcius</h1>");
  res.write("<img src=" + iconUrl + ">");
       res.send();
    }) })

})







app.listen(3000,function (req,res) {
  console.log("server started at 3000");

})
