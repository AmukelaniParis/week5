let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//app.set('views','public');

//Resources for the app
//Telling express that css files will be in the css folder and images will be in the img folder
app.use(express.static('css'));
app.use(express.static('img'));
app.use(morgan('short')); //Ignore this. It is not a requirement for the lab

//This receicves the post request first then take in the data and put it in a object format
//urlencoded is the datatype of the object
//This is just a middleware. It receives the requests before the actual callback function for the request
app.use(bodyParser.urlencoded({
    extended: false
}));

//Get request for home ,responds with index.html file
app.get('/', function(request,response){
    console.log('hello from home page');
    response.render('index.html');
});

//Get request for go to add task then respond with add.html file
app.get('/add', function(request,response){
    console.log('hello from addtask page');
    response.render('add.html');
});

//This is where I am creating the database
let db = [];

//Writing to the database
//The db has 3 attributes which is taskName,taskDue and taskDesc
db.push({
    taskName: 'Read 12 books',
    taskDue: '2019/12/10',
    taskDesc: 'Feeding myself'
});

//listens to the post request the pass user input to server as a JSON
app.post('/data', function(request,response){
    console.log('hello from add'); 
    console.log(request.body);

    //This line adds the data I fill in the form to the data base
    db.push(request.body);
});

//Get request for go to list task then respond with list.html
app.get('/list', function(request,response){
    console.log('hello from list page');
    //Here I am saying that the db declared in the html file is equal to the db created in this file
    //And I am also saying the the template declaared in the html file will be  filled with the data from the form
    response.render('list.html', {taskDb: db});
});

app.listen(8080);