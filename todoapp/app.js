var express=require('express');
var todoControllers=require('./controllers/todoControllers');
var app=express();

//set up template engines
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));

todoControllers(app);

//listen to port
app.listen(3000);
console.log('You are listening to port 3000');

