var bodyParser=require('body-parser');
var mongoose=require('mongoose');

//connect to the database
mongoose.connect('mongodb://atul_k_p:kumar291997@ds113935.mlab.com:13935/todo');
//create a schema
var todoSchema=new mongoose.Schema({
	item: String
});
var Todo=mongoose.model('todo',todoSchema);


//var data=[{item:'get milk'},{item:'dog walk'},{item:'todo some coding competetion'}]
var urlencodedParser=bodyParser.urlencoded({extended: false});
module.exports=function(app){
	app.get('/todo',function(req,res){
		//get data from mongodb and pass to the views
		Todo.find({},function(err,data){
			if(err) throw err;
			res.render('todo',{todos: data});
		});
		
        
	});
	app.post('/todo',urlencodedParser,function(req,res){
		//get data from the view and add it to the mongo db
		var newTodo=Todo(req.body).save(function(err,data){
			if(err) throw err;
			res.json(data);
		});
      
	});
	app.delete('/todo/:item',function(req,res){
		//delete the requested item from mongodb
		Todo.find({item:req.params.item.replace(/\-/," ")}).remove(function(err,data){
			if(err) throw err;
			res.json(data);
		});
   
      });
      
	
};