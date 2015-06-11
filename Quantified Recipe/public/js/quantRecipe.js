// BUTTON FUNCTION
function ajaxCall(callStr, callback) {
	if(callStr == "keywordsQuery")
	{
		var query;
		// get the input 
		var keywords = document.getElementById("keywords").value;

		// construct the url we want to send
		// url has a pathname (/dyn/getKeywords) and a
		// query part (?keywords=..., where ... are the keywords)
		query = "/dyn/getKeywords?keywords="+keywords;
	}
	else 
		query = "/dyn/getRecipes?id="+callStr;
	
    // make an object to use for communication
    var xmlhttp = new XMLHttpRequest();
    
    // set up callback function
    // trick to pass data when callback will be called 
    // with no arguments: have one function call another. 
    xmlhttp.onreadystatechange = function() {

	// check to see if http exchange was successful
	if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	    // if so, call the real callback function
	    // xmlhttp.response is the body of the response
	    // xmlhttp.response is the body of the response
	    // xmlhttp.response is the body of the response
	    // we're hoping it will be the JSON we want
			callback(xmlhttp.response);			
	    }
	}

    // tell the object the url
    xmlhttp.open("GET",query,true); // true = asynch
    
    // actually send the http request
    xmlhttp.send();
}

// Adds stuff to some element of the DOM
function addToDOM(element, someHTML) {
  var div = document.createElement('div');
  div.id = "b";
  div.innerHTML = someHTML;
  element.appendChild(div);
}

function removeFromDOM(parent){
	if(document.getElementById("b") != null)
		parent.removeChild(document.getElementById("b"));
}

function backToRecipeList(HTMLString){
	document.getElementById("b").innerHTML = HTMLString;
}

//BROWSER CALLBACK FUNCTION
function useAJAXdata(responseJSON) {
	removeFromDOM(document.body);
	
	f2fObj = JSON.parse(responseJSON);
	var listString = '<div class="row text-center">' 
	listString+="<h1>Here are some possible recipes</h1>" + "<ul>";
	
	for(i = 0; i < f2fObj.count; i++){	
		curRecipeId = f2fObj.recipes[i].recipe_id;
		listString+='<li class="text" onclick="ajaxCall(' + curRecipeId + ', useAJAXdataRId)" >' + f2fObj.recipes[i].title + "</li>";
	}
	
	listString+="</ul></div>";
	
	addToDOM(document.body, listString);
    // for now, just write input to console
    //console.log(responseJSON);
   }
   
function useAJAXdataRId(responseJSON) {
	backString = document.getElementById("b").innerHTML;
	removeFromDOM(document.body);
	
	f2fObj = JSON.parse(responseJSON);
	ingredients = f2fObj.recipe.ingredients;
	var listString = '<div class="container">';
	listString = '<div class="row"><div class="text-center"><h1>'+ f2fObj.recipe.title +'</h1></div></div>';  

	listString+='<div class="row text-center"><img src="' + f2fObj.recipe.image_url
		+ '"></div>';

	listString+='<div class="row"><div class="col-sm-3 col-sm-offset-4 recipeText">Ingredients</div>';
	listString+='<div class="col-sm-offset-7 recipeText">Water Density</div></div>';
	
	for(i = 0; i < ingredients["length"]; i++){
		var ingredArr = ingredients[i].split("~~~");
		var waterAmt = ingredArr[1];
		
		if(waterAmt == undefined)
			waterAmt = "N/A";

		listString+='<div class="row">';
		listString+='<div class="col-sm-3 col-sm-offset-4 recipeText">' + ingredArr[0] + '</div>';
		listString+='<div class="col-sm-offset-7 recipeText">' + waterAmt + '</div>';
		listString+='</div>';
	}

	//button
	listString+='<div class="row text-center"><button type="button" onclick="backToRecipeList(backString)">Back to Recipes List</button></div>';
	
	listString+="</div>";

	addToDOM(document.body, listString);
    // for now, just write input to console
    console.log(JSON.parse(responseJSON));
   }   

var backString;