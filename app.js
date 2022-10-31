const express = require("express");
const https = require("https");

const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");

});
app.post("/", function(req, res){
  const query = req.body.cityName;
  const apikey = "5d7721e8a4ea4906254a3f1583228104";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=" + apikey;


   https.get(url, function(response){
      // console.log(response.statusCode);

      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<p>the weather is "+ description + "</p>");
        res.write("<h1>temperature in "+query +" is " + temp + "K and the weather is " + description + "</h1>");
        res.write("<img src=" + imageURL + ">");
      });                     //--> gives data in JSON format.

  });


});



app.listen(3000, function(){
  console.log("server started at port 3000");
});
