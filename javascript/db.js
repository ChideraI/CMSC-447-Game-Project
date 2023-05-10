//const fs = require('fs');

const sqlite3 = require('sqlite3').verbose();

const filename = './user.db';

//connect to database and make tables if not done already
function connect(){

	//get db object
	db = new sqlite3.Database(filename, (err) =>{
	
		if(err){
			return console.error(err.message);
		}
	});
	
	//user table
	db.run('CREATE TABLE IF NOT EXISTS user(name TEXT PRIMARY KEY, password TEXT NOT NULL, hair TEXT DEFAULT "original", skin TEXT DEFAULT "original", outfit TEXT DEFAULT "original");', (err) => {
														 
		if(err){
			return console.error(err.message);
		}
	});
					
	//high_score table		
	db.run('CREATE TABLE IF NOT EXISTS high_score(name TEXT PRIMARY KEY, score INTEGER DEFAULT 0);', (err) => {
						
		if(err){
			return console.error(err.message);
		}
	});
					
	//save table
	db.run('CREATE TABLE IF NOT EXISTS save(name TEXT PRIMARY KEY, last_level_completed INTEGER DEFAULT 0, current_score INTEGER DEFAULT 0);', (err) => {
						
		if(err){
			return console.error(err.message);
		}
	});
	
	console.log("Connected to database");
	return db;
}

//for new user or new save or new high_score
//insert
//also create empty save to be updated later
//returns 0 if name for user is already taken
function insert_user(name, password){
	
	db = connect();
	
	//checks if name is taken, row is undefined if not entries in table for supplied name
	db.get('SELECT * FROM user WHERE name = $name', [name], function(err, row){
		
		if(err){
			return console.error(err.message);
		}
		
		//name not taken
		if(row === undefined){
		
			//insert info into user table
			db.run('INSERT INTO user (name, password) VALUES ($name, $password)', [name, password], (err) =>{
			
				if(err){
					return console.error(err.message);
				}
			});
		
			//insert empty save
			db.run('INSERT INTO save (name, last_level_completed, current_score) VALUES (?, ?, ?)', [name, 0, 0], (err) =>{
		
				if(err){
					return console.error(err.message);
				}
			});
	
			//insert empty high score to be updated later
			db.run('INSERT INTO high_score (name, score) VALUES (?, ?)', [name, 0], (err) =>{
	
				if(err){
					return console.error(err.message);
				}
			});
		}
		
		//name taken
		else{
			console.log("Name already used");
			return 0;
		}
	});
}


//TOOK THESE FUNCTIONS OUT AND ADDED TO INITIAL USER INSERT
//changed to an update function as an empty save is made when user account is created 
/*
function insert_save(name, level, score){

	db = connect();

	db.run('INSERT INTO save (name, last_level_completed, current_score) VALUES ($name, $level, $score)', [name, level, score], (err) =>{
	
		if(err){
			return console.error(err.message);
		}
	});
}


//primary key consists of name and score
//will only fail if a specific user tries to post the same score
function insert_high_score(name, score){

	db = connect();

	db.run('INSERT INTO high_score (name, score) VALUES ($name, $score)', [name, score], (err) =>{
	
		if(err){
			return console.error(err.message);
		}
	});
}
*/



//update customization or save
// or high score if only one high score stored per user (primary key composed of only name)
//CURRENTLY NO DUPLICATES SCORES FOR USERS
//update

function update_customization(name, hair, skin, outfit){

	db = connect();

	db.run('UPDATE user SET hair = $hair, skin = $skin, outfit = $outfit WHERE name = $name', [hair, skin, outfit, name], (err) =>{
		
		if(err){
			return console.error(err.message);
		}
	});
}

//level is last one completed
//EXAMPLE: just finished level 2 so level should be 2
function update_save(name, level, score){

	db = connect();
	
	db.run('UPDATE save SET last_level_completed = $level, current_score = $score WHERE name = $name', [level, score, name], (err) =>{
		
		if(err){
			return console.error(err.message);
		}
	});
}


function update_high_score(name, score){

	db = connect();
	
	db.get('SELECT score FROM high_score WHERE name = $name', [name], function (err, row){
		
		if(err){
			return console.error(err.message);
		}
		
		//needs tested
		//check if score is higher
		if(row.score < score){
		
			db.run('UPDATE high_score SET score = $score WHERE name = $name', [score, name], (err) =>{
		
				if(err){
					return console.error(err.message);
				}
			});
		}
	});
	
	

}
//get top 5 high scores or current score or customization or progress
//query
//rows that are returned are in form of array of objects
function query_top5(){

	db = connect();

	db.all("SELECT * FROM high_score ORDER BY score DESC LIMIT 5;", function(err, rows){
	
		if(err){
			return console.error(err.message);
		}
		else{
			console.log(rows);
			return rows;
		}
	});

}

function query_score(name){

	db = connect();

	db.get('SELECT current_score FROM save WHERE name = $name', [name], function(err, row) {
	
		if(err){
			return console.error(err.message);
		}
		else{
			console.log(row);
			return row;
		}
	});
		
}

function query_customization(name){

	db = connect();

	db.get('SELECT hair, skin, outfit FROM user WHERE name = $name', [name], function(err, row){
	
		if(err){
			return console.error(err.message);
		}
		else{
			console.log(row);
			return row;
		}
	});
	
}

function query_progress(name){

	db = connect();

	db.get("SELECT last_level_completed FROM save WHERE name = $name", [name], function(err, row){
	
		if(err){
			return console.error(err.message);
		}
		else{
			console.log(row);
			return row;
		}
	});
	
}

//checks to see if password matches that in database
//returns 0 if mismatch and 1 if matches
function check_password(name, password){
	
	db = connect();
	
	db.get('SELECT name, password WHERE name = $name AND password = $password', [name, password], function(err, row){
		
		if(err){
			return console.error(err.message);
		}
		
		//no such password name combination
		if(row === undefined){
			return 0;
		}
		//matches
		else{
			return 1;
		}
	});
}

//delete seems unnecessary so it is omitted

//test functions
//connect();
//insert_user("john", "password");


module.exports = {connect, insert_user, update_customization, update_save, query_top5, query_score, query_customization, query_progress, check_password}
