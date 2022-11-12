var cityResultFiveDays = document.getElementById("#city-result-five-days");
var userForm = document.getElementById("#user-form");
var cityButtonResults = document.getAttribute("city-info");
var userFormElement = document.getElementById("#user-form");
var cityTitle = document.getElementById("city-title");
var theTemperature = document.getElementById("temperature");
var theWind = document.getElementById("wind");
var theHumidity = document.getElementById("humidity");
var theUvindex = document.getElementById("uvindex");

// ============================== INPUT - function search on OpenWeather One Call API
function apiSearchByInput() {
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

    // City Search Input
    var citySearchValue = document.querySelector("searchCityName").value.trim();
    console.log(citySearchValue);

    //example raw call: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=citySearchValue&limit=5&appid=8d7e2d7b64a9b790b3ae603f52ea3086")
        .then(response => response.json())
        .then(result => {
            result.result = cityResultFiveDays.innerHTML;
            cityResultFiveDays.textContent = result.result;
        })
        .catch(error => console.log('error', error));
        console.log(result);

        //displaying results on page
        cityTitle.textContent = citySearchValue;
        theTemperature.textContent = temperature;
        theWind.textContent = wind;
        theHumidity.textContent = humidity;
        theUvindex.textContent = uvindex;

        console.log(citySearchValue);
        console.log(citySearchValue);
        console.log(citySearchValue);
        console.log(citySearchValue);
        console.log(citySearchValue);
}

// ============================== BUTTON - function search on OpenWeather One Call API
function apiSearchByBtn(citySearchButton) {
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
    var citySearchButton = document.getAttribute("city-info").value;
    console.log(citySearchButton);

    //example raw call: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=citySearchButton&limit=5&appid=c542be447bb6ea8c00c93c8f4bd63050")
        .then(response => response.json())
        .then(result => {
            result.result = cityResultFiveDays.innerHTML;
            cityResultFiveDays.textContent = result.result;
        })
        .catch(error => console.log('error', error));
        console.log(result);
}

// ============================== HANDLER (INPUT) - function handles submit search for city and city buttons
function searchHandlingEvent(event) {
    event.preventDefault();

    var searchCity = document.querySelector('#searchCityName').value;
    if(!searchCity) {
        console.error('You need to input a City Name!');
        return;
    }
};

// ============================== HANDLER (BUTTON) - function handles submit search for city and city buttons
function buttonHandlingEvent(event) {
    event.preventDefault();

    var citySearchButton = event.target.getAttribute('city-info');
    if(citySearchButton) {
        apiSearchByBtn(citySearchButton);
        cityResultFiveDays.textContent = '';
    }
};

userFormElement.addEventListener('submit', searchHandlingEvent);
buttonCitySelectionElement.addEventListener('click', searchHandlingEvent);
