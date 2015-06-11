var statix = require('node-static');
var http  = require('http');

var fileServer = new statix.Server('./public');

//dynamic handler
function handler (request,response) {
    request.addListener('end',function () {
    fileServer.serve(request, response)}).resume();
}

exports.handler = handler;