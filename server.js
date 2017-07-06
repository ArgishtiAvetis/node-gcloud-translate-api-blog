// required modules
const express 		= 	require('express');
const bodyParser 	= 	require('body-parser');
const mongoose 		= 	require('mongoose');
const join 			=   require('path').join;

// initializing our app
const app = express();

// models
const Post = require('./app/models/post.js');


// configuration 
const configDB = require('./config/database.js');
var Schema = mongoose.Schema;
mongoose.connect(configDB.url, {
  useMongoClient: true,
}); // connect to our database

// PORT
const PORT = process.env.PORT || 8080;

// USE, SET
app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, 'public')));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// load our routes
require('./app/routes.js')(app, Post);


app.listen(PORT, () => console.log(`App is running on port ${PORT} :)`));