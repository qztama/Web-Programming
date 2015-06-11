var fs = require("fs");  // use file system
var prompt = require("prompt");                                     
var sqlite3 = require("sqlite3").verbose();  // use sqlite                      

// global variable will contain database                                        
var db=null;

function openDB() {
    var dbFile = "fnw.db";
    // check filesystem to make sure database exists                            
    var exists = fs.existsSync(dbFile);
    console.log("OPEN DB SUCCESSFUL IN LOOKUP");
    if (!exists) {
        console.log("Missing database "+dbFile);
    } else {
        // construct Javascript database object to represent the                
        // database in our program. db is a global variable                     
        db = new sqlite3.Database(dbFile); // open it if not already there      
    }
}

function getFood() {
    // issues the prompt and specifies the callback function                    
    // that is called when the user finally responds                            
    prompt.get('food',
               // callback function                                             
               function (err, result) {
                   //console.log(result);
		     lookup(result.food);
               } // end callback function                                       
              ); // end prompt.get                                              
}

function lookup(food, response, callback) {
	var SQL_QUERY = 'SELECT * FROM WaterUsage WHERE ingredient = "' + food + '"';
	
	db.get(SQL_QUERY, function(err, result){
      if(result != undefined) {
        var resultJSON = JSON.stringify(result);
        callback(response, resultJSON);
      }
      else {
        var errResponse = {"ingredient" : "N/A", "waterAmount" : "N/A"};
        callback(response, JSON.stringify(errResponse));
      }
		}
	)
}

// exported function to close database
function closeDB() {
  db.close();
}

exports.openDB = openDB;
exports.closeDB = closeDB;
exports.lookup = lookup;