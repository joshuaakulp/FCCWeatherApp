/*
Note this example will not work in Chrome due to the .geolocation call not being over HTTPS.
*/

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric" + "&appid=50f21b461677bd524fd89a75266eccf6", function(json) {
        var tempUnit = Math.round(json.main.temp) + " &#8451";
        var tempDisplay = "C";
        var html = json.name + ", " + json.sys.country + "<br>" + tempUnit + "<br>" + "<img src=http://openweathermap.org/img/w/" + (json.weather[0].icon) + ".png>" + json.weather[0].description;

        $(".currentLocation").html(html)

        $("#changeTempUnit").on("click", function() {
          console.log(tempDisplay);
          if (tempDisplay === "C") {
            $(".currentLocation").html(json.name + ", " + json.sys.country + "<br>" + Math.round((json.main.temp * 9) / 5 + 32) + " &#8457" + "<br>" + "<img src=http://openweathermap.org/img/w/" + (json.weather[0].icon) + ".png>" + json.weather[0].description)
            tempDisplay = "F";
            console.log(tempDisplay);
          } else {
            $(".currentLocation").html(json.name + ", " + json.sys.country + "<br>" + tempUnit + "<br>" + "<img src=http://openweathermap.org/img/w/" + (json.weather[0].icon) + ".png>" + json.weather[0].description)
            tempDisplay = "C";
            console.log(tempDisplay);
          }
        });
      });
    })
  }
});