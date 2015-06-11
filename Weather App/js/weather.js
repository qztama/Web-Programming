var callbackFunction2 = function(data) {
    var cond = data.query.results.channel.item.condition;
    var curWeather = cond.text;
	var temp = cond.temp;
	var location = data.query.results.channel.location;
	
	document.getElementById("weather/temp").innerHTML = "<b>Weather for Today: </b>" + curWeather
		+ "</br><b>Temperature: </b>" + temp + "&degF";
	
	var code = Number(cond.code);
	var weather_img = document.getElementById("weather_img");
	console.log(code);
	
	switch(code){
		case 1:
		case 3:
		case 4:
		case 37:
		case 38:
		case 39:
		case 45:
			var image = "img/thunderStorms.png";
			break;
		case 8:
		case 9:
		case 10:
		case 11:
		case 12:
		case 40:
			var image = "img/showers.png";
			break;
		case 13:
		case 14:
		case 15:
		case 16:
		case 41:
		case 42:
		case 43:
		case 46:
			var image = "img/snow.png";
			break;
		case 26:
		case 27:
		case 28:
			var image = "img/cloudy.png";
			break;
		case 29:
		case 30:
		case 44:
			var image = "img/partlyCloudy.png";
			break;
		case 32:
		case 34:
		case 36:
			var image = "img/sun.png";
			break;
		case 31:
		case 33:
			var image = "img/moon.png";
			break;
		default:
			var image = "";
	}
	
	weather_img.setAttribute("src", image);

	document.getElementById("location-today").innerHTML = "<b>Location: </b>" + location.city + ", " + location.country + "<br>";
}

var callbackFunction = function(data){
	var location = data.query.results.channel.location;
	var fc_query = data.query.results.channel.item.forecast;
	var date_1 = fc_query[0].date;
	var weather_1 = fc_query[0].text;
	var date_2 = fc_query[1].date;
	console.log(date_2);
	var weather_2 = fc_query[1].text;
	
	var fc_innerHTML = "<b>Forecast:</b> <br>" + date_1 + ": " + weather_1 
		+ "<br>" + "High: " + fc_query[0].high + "&degF<br>" + "Low: " + fc_query[0].low + "&degF <br>" +
		date_2 + ": " + weather_2 
		+ "<br>" + "High: " + fc_query[1].high + "&degF<br>" + "Low: " + fc_query[1].low + "&degF<br>";
	
	var fc = document.getElementById("forecast");
	
	fc.innerHTML = fc_innerHTML;
	
	document.getElementById("location-forecast").innerHTML = "<b>Location: </b>" + location.city + ", " + location.country + "<br>";
}

var process = function(){
	var zipCode = document.getElementById("zipCode").value;
	console.log(zipCode);

	var script = document.createElement("script");
	script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from   geo.places(1) where text='"+zipCode+", United States')    &format=json &callback=callbackFunction2";
	document.getElementsByTagName('body')[0].appendChild(script);
}

var showForecast = function(){
	var zipCode = document.getElementById("zipCode").value;
	console.log(zipCode);

	var script = document.createElement("script");
	script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from   geo.places(1) where text='"+zipCode+", United States')    &format=json &callback=callbackFunction";
	document.getElementsByTagName('body')[0].appendChild(script);
}