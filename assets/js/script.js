var cityResultFiveDays = document.getElementById("city-result-five-days");
var userForm = document.getElementById("user-form");
// go get the buttons that have the attribute of city-info
// var cityButtonResults = document.getAttribute("city-info");
var userFormElement = document.getElementById("user-form");
var theTemperature = document.getElementById("temperature");
var theWind = document.getElementById("wind");
var theHumidity = document.getElementById("humidity");
var theUvindex = document.getElementById("uvindex");
var queryCity = document.getElementById("queryCity");

// ============================== HANDLER (INPUT) - function handles submit search for city and city buttons
function searchHandlingEvent(event) {
    event.preventDefault();
    var searchCity = document.getElementById('searchCityName').value;
    localStorage.setItem("searchCity", searchCity);

    // var searchCity = document.getElementById('searchCityName').value;
    if(!searchCity) {
        console.error('You need to input a City Name!');
        return;
    }
    apiSearchByInput(searchCity);
};

userFormElement.addEventListener('submit', searchHandlingEvent);

// ============================== INPUT - function search on OpenWeather One Call API
function apiSearchByInput(city) {
    // console.log("hi, I am searching by input");

    var cityTitle = document.getElementById("city-title");
    cityTitle.textContent = city;
    // console.log(city);
    // console.log(cityTitle);
    const cityLimits = 5;
    const cityButton_ApiKey = "8d7e2d7b64a9b790b3ae603f52ea3086";

    // maybe not using
    var requestOptions;
    var myHeaders = new Headers();
    myHeaders.append("apiKeys", "8d7e2d7b64a9b790b3ae603f52ea3086");
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        Headers: 'myHeaders'
    };
    // console.log(myHeaders);
    // console.log(requestOptions);
    // console.log(city);

    // City Search Input
    // already have the value may be dup data
    var citySearchValue = document.getElementById("searchCityName").value.trim();
    console.log(citySearchValue);

    //example raw call: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    // fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&limit=" + cityLimits + "&appid=" + cityButton_ApiKey, requestOptions + "&units=imperial")
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&limit=" + cityLimits + "&appid=" + cityButton_ApiKey + "&units=imperial")
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(result => {
            console.log(result);
                   
            //displaying results on page for 1 city
            cityTitle.textContent = city;
            document.getElementById("temperature").innerHTML = "Main Temp: " + result.main.temp.toFixed(0) + "&deg";
            document.getElementById("minTemp").innerHTML = "Min. Temp: " + result.main.temp_min.toFixed(0) + "&deg";
            document.getElementById("maxTemp").innerHTML = "Max. Temp: " + result.main.temp_max.toFixed(0) + "&deg";
            document.getElementById("wind").innerHTML = "Wind: " + result.wind.speed + " mph";
            document.getElementById("humidity").innerHTML = "Humidity: " + result.main.humidity + "%";
            document.getElementById("description").innerHTML = "Weather Statement: " + result.weather[0].description;
            document.getElementsByClassName("icon").innerHTML = result.weather[0].icon;

            //5 Days results
            var longitude = result.coord.lon;
            console.log(longitude); //checking value is working as expected
            var latitude = result.coord.lat;
            console.log(latitude);  //checking value is working as expected
            var apiKey = "8d7e2d7b64a9b790b3ae603f52ea3086";
            var fiveDayForecast = document.getElementById("city-result-five-days");
            console.log(fiveDayForecast);
            var fivedayurl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";
            console.log(fivedayurl);

                fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial")
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(result => {
                    console.log(result); //checking value is working as expected
                    var eachDay = ""; // stores each day

                    for(var i = 0; i < result.list.length; i+=9 ) {
                            var day = new Date(result.list[i].dt).toLocaleDateString("en", {weekday: "long",}); //printing date to local time zone
                            var icon = result.list[i].weather[0].icon; //Getting Icon
                            var iconUrl = `https://openweathermap.org/img/w/${icon}.png`; 
                            var temp = result.list[i].main.temp.toFixed(0); //Getting temperature
                            var wind = result.list[i].wind.speed;
                            
                            var eachDay = document.createElement("div");
                            var eachDayBody = document.createElement("div");
                            var heading = document.createElement("h3");
                            var weatherIcon = document.createElement("img");
                            var tempEl = document.createElement("p");
                            var windEl = document.createElement("p");
                            
                            eachDay.setAttribute("class", "forecastDays");
                            eachDay.append(eachDayBody);
                            heading.textContent = day;
                            weatherIcon.setAttribute("src", iconUrl);
                            heading.append(weatherIcon);
                            tempEl.textContent = `temp: ${temp} deg F`;
                            windEl.textContent = `wind: ${wind} mph`;
                            eachDayBody.append(heading, tempEl);

                            fiveDayForecast.append(eachDay);
                    }
                });
        })
        .catch(error => console.log('error', error));
}

// ============================== HANDLER (BUTTON) - function handles submit search for city and city buttons
function buttonHandlingEvent(event) {
    event.preventDefault();

    var citySearchButton = event.target.getAttribute('city-info');
    if(citySearchButton) {
        apiSearchByBtn(citySearchButton);
        cityResultFiveDays.textContent = '';
    }
};

// grab the buttons or the area w/ the buttons
// listen for a click
// buttonCitySelectionElement.addEventListener('click', function(event){
//     event.preventDefault();
//     buttonHandlingEvent();
// });

// ============================== BUTTON - function search on OpenWeather One Call API
function apiSearchByBtn(citySearchButton) {
    console.log("hi, I am searching by button");

    const buttonSearch_ApiKey = "c542be447bb6ea8c00c93c8f4bd63050";

    var requestOptions;
    var myHeaders = new Headers();
    myHeaders.append("apiKeys", "c542be447bb6ea8c00c93c8f4bd63050");  // different key from input function
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        Headers: 'myHeaders'
    };
    console.log(myHeaders);
    console.log(requestOptions);

    // City Search by Button
    var citySearchButton = document.getAttribute("city-info").value;  //
    console.log(citySearchButton);

    //example raw call: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + citySearchButton + "&appid=" + buttonSearch_ApiKey, requestOptions)
        .then(response => response.json())
        .then(result => {
            result = cityResultFiveDays.innerHTML;
            cityResultFiveDays.textContent;
            // need to make calls by latitude and longitude
        })
        .catch(error => console.log('error', error));
        console.log(result);
};
