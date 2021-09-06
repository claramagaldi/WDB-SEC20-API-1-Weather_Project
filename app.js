const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const city = weatherData.name;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<br><h1>The temperature in " + city + " is " + temp + " degrees Celcius.</h1>");
      res.write("<p>The weather is currently " + desc + ".</p>");
      res.write("<img src=" + imageURL + ">");
      res.send();
      console.log(weatherData);
      console.log(temp);
      console.log(desc);
      console.log(city);

      const object = {
        name: "Clara",
        surname: "Magaldi Rodrigues"
      };
      console.log(JSON.stringify(object));

    })
  })
  //res.send("Server is running on port 3000.");
})

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
