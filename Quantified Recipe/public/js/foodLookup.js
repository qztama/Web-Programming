//BUTTON FUNCTION
function ajaxCall(callStr){
	console.log("inside browser function");
	var keywords = document.getElementById("keywords").value;
	var query = "/dyn/getDBQuery?keywords="+keywords;

	var xmlhttp = new XMLHttpRequest();
    
    	// set up callback function
    	// trick to pass data when callback will be called 
    	// with no arguments: have one function call another. 
    	xmlhttp.onreadystatechange = function() {

	// check to see if http exchange was successful
	if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	    	// if so, call the real callback function
	    	// xmlhttp.response is the body of the response
	    	// we're hoping it will be the JSON we want
	    	//useAJAXdata(xmlhttp.response);
	    	useAJAXdata(xmlhttp.response);
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

function useAJAXdata(responseJSON) {
	removeFromDOM(document.body);
	
	f2fObj = JSON.parse(responseJSON);
	var listString;

	if(f2fObj.ingredient == "N/A")
		listString = '<p>Sorry, the ingredient in you have requested is not in the database.</p>';
	else {
		listString ='<p>Ingredient: ' + f2fObj.ingredient + '</p>';
		listString+='<p>Water Usage: ' + f2fObj.waterAmount + '</p>';
	}

	addToDOM(document.body, listString);
    // for now, just write input to console
    //console.log(responseJSON);
   }