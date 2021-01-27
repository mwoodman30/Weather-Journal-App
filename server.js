let project = {};

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO-Cors for cross origin allowance
const cors = require('cors');
const { request } = require('http');
const { response } = require('express');
app.use(cors());
/* Initializing the main project folder */
app.use(express.static('weather journal'));

const port = 3000;
const server = app.listen(port, listening);
 function listening(){
   console.log('server running');
   console.log(`running on localhost: ${port}`);
 };

 // GET 
app.get("/return", getData);
  function getData( request, response) {
  response.send(project);
  }
//POST
app.post('/add', postData);

function postData(request, response) {
    project = request.body;
    response.send({ message: 'Post received' });
    console.log(project);
}