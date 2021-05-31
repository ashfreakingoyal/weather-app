const express= require("express");
const https= require("https");
const bodyParser = require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/",function(req,res){
    //console.log(req.body.cityName);
    //console.log("Post request recieved");
    const query=req.body.cityName;
    const apiKey="1c7502b66c9d26052df927d9691bf577";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" +unit+"&appid="+apiKey;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData= JSON.parse(data);
            const icon=weatherData.weather[0].icon;
            const imageurl="http://openweathermap.org/img/wn/" + icon + "@2x.png";
            const temp= weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            res.write("<h1>The Temperature in " + query+ " is currently :" + temp +"</h1>");
            res.write("<p>The weather is currently :" + weatherDescription +"</p>");
            res.write("<img src=" + imageurl + ">");
            res.send();
            //console.log(weatherDescription);
        })
    })
    //res.send("server is running");

})





app.listen(3000, function(){
    console.log("server is running on port 3000");
})