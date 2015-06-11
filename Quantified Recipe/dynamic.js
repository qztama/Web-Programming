// module to handle the dynamic Web pages
var http = require("http");
var request = require("request");
var ann = require("./annotater");
var lookupDB = require("./lookupDB")
var isRecipe = false;

ann.openDB();
lookupDB.openDB();

//dynamic handler
function dynamic(response, urlObj) {
	var requestString;
	//console.log(urlObj.query);
	queryParts = urlObj.query.split("=");
	keywords = queryParts[1];
	var f2fJSON;

	//console.log(urlObj);
	if(urlObj.pathname.split("/")[2] == "getDBQuery"){
		//console.log(keywords);
		lookupDB.lookup(keywords, response, finishLookup);

	}
	else {
		//add if else here to change request string
		if(queryParts[0] == "keywords"){
			requestString = "http://food2fork.com/api/search?"
				+ "key=f86ac080b0218120d159a3fa16093c94"
				+ "&q=" + keywords;
			
			isRecipe = false;
		}
		else if(queryParts[0] == "id"){
			requestString = "http://food2fork.com/api/get?" 
				+ "key=f86ac080b0218120d159a3fa16093c94"
				+ "&rId=" + keywords;
			
			isRecipe = true;
		}
		
		request(requestString, function (error, res, body)
		{ 
			if (!error && res.statusCode == 200) {
			// the callback function
			//console.log(body);
			finishListResponse(body,response);
		}});
	}
}

// make this visible when the module is required
exports.dynamic = dynamic;

function finishListResponse(body, response){
	response.writeHead(200, {"Content-Type": "application/JSON"});
	
	if(isRecipe){
		var anotater = new ann.Annotater(body);
		anotater.annotate(function(newRecipeJSON) {
			//console.log("newRecipeJSON");
			//console.log(newRecipeJSON);
			response.write(newRecipeJSON);
			response.end();
		});
	}
	else {
		console.log(body);
		response.write(body);
		response.end();
	}
	console.log("Sent dynamic response.");
}

function finishLookup(response, result) {
	response.writeHead(200, {"Content-Type": "application/JSON"});
	response.write(result);
	response.end();
}