// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", function (req, res) {
  let date = new Date();
  let parsedDate = -1;
  let generatedObject = {"error" : "Invalid Date"};

  if(req.params.date_string !== undefined && req.params.date_string.trim() !== ""){
    parsedDate = Date.parse(req.params.date_string);
  }

  

  if(!isNaN(parsedDate)){
    if(parsedDate > 0){
      date = new Date(req.params.date_string);
    }

    generatedObject = {"unix" : date.getTime(), "utc" : date.toUTCString()};
  }

  //res.send("THE INPUT TIMESTAMP IS \n" + JSON.stringify(generatedObject));
  res.json(generatedObject);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});