var http = require("http");
var url = require("url");
var dynamic = require("./dynamic");
var statix = require("./static");
//var statix = require('node-static');

//var fileServer = new statix.Server('./public');

//dynamic handler
function handler(request,response) {
    var urlReceived = request.url; // maybe complex string
    var urlObj = url.parse(urlReceived);
    var pathname = urlObj.pathname; // maybe simpler string
    var parts = pathname.split("/"); // array of strings

    if (parts[1] == "dyn") {  // parts[0] is ""
		dynamic.dynamic(response,urlObj);
	}
    else {
		//request.addListener('end',function () {
    //fileServer.serve(request, response)}).resume();
		statix.handler(request, response);
	}
}

var server = http.createServer(handler);
server.listen(20047);