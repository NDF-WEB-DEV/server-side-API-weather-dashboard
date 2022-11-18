var cityResultFiveDays = document.getElementById("city-result-five-days");
var userForm = document.getElementById("user-form");
var cityButtonResults = document.getAttribute("city-info");
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
    if(!searchCity) {
        console.error('You need to input a City Name!');
        return;
    }
    apiSearchByInput(searchCity);
};

userFormElement.addEventListener('submit', function(event) {
    var searchCity = document.getElementById('searchCityName').value;
    localStorage.setItem("searchCity", searchCity);
    event.preventDefault();
    searchHandlingEvent();
});

// ============================== INPUT - function search on OpenWeather One Call API
function apiSearchByInput(city) {
    console.log("hi, I am searching by input");

    var cityTitle = document.getElementById("city-title");
    cityTitle.innerHTML = city.value;
    console.log(city);
    console.log(cityTitle);
    const cityLimits = 5;
    const cityButton_ApiKey = "8d7e2d7b64a9b790b3ae603f52ea3086";

    var requestOptions;
    var myHeaders = new Headers();
    myHeaders.append("apiKeys", "8d7e2d7b64a9b790b3ae603f52ea3086");
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        Headers: 'myHeaders'
    };
    console.log(myHeaders);
    console.log(requestOptions);
    console.log(city);

    // City Search Input
    var citySearchValue = document.getElementById("searchCityName").value.trim();
    console.log(citySearchValue);

    //example raw call: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&limit=" + cityLimits + "&appid=" + cityButton_ApiKey, requestOptions + "&units=imperial")
        .then(response => response.json())
        .then(result => {
            queryCity.textContent = result;
            console.log(queryCity);
            result = cityResultFiveDays.innerHTML;
            cityResultFiveDays.textContent;
            console.log(cityResultFiveDays);
        })
        .catch(error => console.log('error', error));

        console.log(result);
        console.log(myHeaders);
        console.log(requestOptions);
        console.log(city);

        //displaying results on page for 1 city
        cityTitle.textContent = city;
        theTemperature.textContent = theTemperature;
        theWind.textContent = wind;
        theHumidity.textContent = humidity;
        theUvindex.textContent = uvindex;

        console.log(citySearchValue);
        console.log(temperature);
        console.log(wind);
        console.log(humidity);
        console.log(uvindex);
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

buttonCitySelectionElement.addEventListener('click', function(event){
    event.preventDefault();
    buttonHandlingEvent();
});

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
        })
        .catch(error => console.log('error', error));
        console.log(result);
};
