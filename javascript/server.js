//npm install cors
//npm install express
var express = require("express")
var cors = require("cors")
var app = express()
var database = require("./db.js")

var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var PORT = 8000;

app.listen(PORT, () =>{
	console.log("Server running");
});

app.use(cors())

app.get("/", (req,res,next) =>{
	res.json({"message": "Ok"})
});

//insert user
//return 0 on failure because of name being taken
app.post("/api/user", (req, res, next) =>{
	
	db = database.connect();
	
	//checks if name is taken, row is undefined if not entries in table for supplied name
	db.get('SELECT name FROM user WHERE name = $name', [req.body.name], function(err, row){
		
		if(err){
			return console.error(err.message);
		}
		
		//name not taken
		if(row === undefined){
		
			console.log("name not taken");
		
			//insert info into user table
			db.run('INSERT INTO user (name, password) VALUES ($name, $password)', [req.body.name, req.body.password], (err) =>{
			
				if(err){
					return console.error(err.message);
				}
			});
		
			//insert empty save
			db.run('INSERT INTO save (name, last_level_completed, current_score) VALUES (?, ?, ?)', [req.body.name, 0, 0], (err) =>{
		
				if(err){
					return console.error(err.message);
				}
			});
	
			//insert empty high score to be updated later
			db.run('INSERT INTO high_score (name, score) VALUES (?, ?)', [req.body.name, 0], (err) =>{
	
				if(err){
					return console.error(err.message);
				}
			});
			
			res.json({"message" : "success"})
			
		}
		
		//name taken
		else{
			console.log("Name already used");
			console.log(row);
			//return row;
			res.json({"message" : "failure","data": row})
		}
	});
	
});

//update customization
app.post("/api/update_customization", (req, res, next) =>{
	
	db = database.connect();

	db.run('UPDATE user SET hat = $hat, skin = $skin, shirt = $shirt, pants = $pants, shoes = $shoes WHERE name = $name', [req.body.hat, req.body.skin, req.body.shirt, req.body.pants, req.body.shoes, req.body.name], (err) =>{
		
		if(err){
			return console.error(err.message);
		}
		else{
			res.json({"message": "success"})
		}
	});	
});

//update_save
app.post("/api/update_save", (req, res, next) =>{
	
	db = database.connect();
	
	db.run('UPDATE save SET last_level_completed = $level, current_score = $score WHERE name = $name', [req.body.level, req.body.score, req.body.name], (err) =>{
		
		if(err){
			return console.error(err.message);
		}
		else{
			res.json({"message": "success"})
		}
	});
});

//update_high_score
app.post("/api/update_high", (req, res, next) =>{
	
	db = database.connect();
	
	db.get('SELECT score FROM high_score WHERE name = $name', [req.body.name], function (err, row){
		
		if(err){
			return console.error(err.message);
		}
		
		//needs tested
		//check if score is higher
		if(row.score < req.body.score){
		
			db.run('UPDATE high_score SET score = $score WHERE name = $name', [req.body.score, req.body.name], (err) =>{
		
				if(err){
					return console.error(err.message);
				}
				
				else{
					res.json({"message": "success"})
				}
			});
		}
		
		else{
			res.json({"message": "Score was lower than best"})
		}
	});
});

//query_top5
app.get("/api/top5", (req, res, next) =>{
	
	db = database.connect();

	db.all("SELECT * FROM high_score ORDER BY score DESC LIMIT 5;", function(err, rows){
	
		if(err){
			return console.error(err.message);
		}
		else{
			console.log(rows);
			res.json({"message": "success", "data": rows})
		}
	});
});

//query_score
app.get("/api/score/:name", (req, res, next) =>{
	
	db = database.connect();

	db.get('SELECT current_score FROM save WHERE name = $name', [req.params.name], function(err, row) {
	
		if(err){
			return console.error(err.message);
		}
		else{
			console.log(row);
			res.json({"message": "success", "data" : row})
		}
	});
});
//query_progress
app.get("/api/progress/:name", (req, res, next) =>{
	
	db = database.connect();

	db.get("SELECT last_level_completed FROM save WHERE name = $name", [req.params.name], function(err, row){
	
		if(err){
			return console.error(err.message);
		}
		else{
			console.log(row);
			res.json({"message": "success", "data": row})
		}
	});
});

//check_password (probably get rid of)
//no real reason to have a password
//password sent in clear 
app.get("/api/password/:name", (req, res, next) =>{
	
	db = database.connect();
	
	db.get('SELECT name, password WHERE name = $name AND password = $password', [req.params.name, req.params.password], function(err, row){
		
		if(err){
			return console.error(err.message);
		}
		
		//no such password name combination
		if(row === undefined){
			res.json({"message": "wrong"})
		}
		//matches
		else{
			res.json({"message": "correct"})
		}
	});
});

//query customization and get character options for name
app.get("/api/customization/:name", (req,res,next) =>{

	db = database.connect();

	db.get('SELECT hat, skin, shirt, pants, shoes FROM user WHERE name = $name', [req.params.name], function(err, row){
	
		if(err){
			return console.error(err.message);
		}
		else{
			console.log(row);
			res.json({"message": "success", "data": row})
		}
	});
});

