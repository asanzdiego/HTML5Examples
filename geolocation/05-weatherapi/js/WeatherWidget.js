/*
 * Weather widget using GeoLocation API and OpenWeather API
 * @author Arindam Chattopadhya
 * @2/20/2015
 * @author Jorge Arevalo
 * @7/12/2016
 */
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

// Patrón módulo. Le pasamos a la IIFE lo que pueda necesitar, para que no lo
// tenga que resolver como variable global
var module = (function(navigator, document) {

    //Estas son las urls a llamar. Requieren una api key

    //current weather URL
    var BASE_URL = "http://api.openweathermap.org/data/2.5/weather?";
    var UrlParams = "&units=imperial&type=accurate&mode=json&APPID=ccfa245032d4a3d406ccf9c1249aed85";
    // forecast URL
    var Forecast_URL = "http://api.openweathermap.org/data/2.5/forecast/daily?";
    var ForeCast_Params = "&cnt=5&units=imperial&type=accurate&mode=json&APPID=ccfa245032d4a3d406ccf9c1249aed85";
    // Image base URL
    var IMG_URL = "http://openweathermap.org/img/w/";

    // Funcion principal de geolocalización. Si está presente, se llamará a 
    // getCurrentPosition con 3 argumentos:
    //  * Función de ok (getCurrentWeatherData)
    //  * Función de error (displayError)
    //  * Opciones. Activa enableHighAccuracy y define un timeout a tu elección. En
    //    cuanto a maximumAge, puedes usar 0
    function getLocation() {
        if (navigator.geolocation) {
            var timeoutVal = 10 * 1000 * 1000;
            navigator.geolocation.getCurrentPosition(getCurrentWeatherData,
                                                     displayError, {
                enableHighAccuracy : true,
                timeout : timeoutVal,
                maximumAge : 0
            });
        } else {
            alert("Geolocation is not supported by this browser");
        }
    }


    // Esta es la función de ok
    function getCurrentWeatherData(position) {

        // URLs para obtener el tiempo ahora y la previsión de los próximos días
        var WeatherNowAPIurl = BASE_URL + "lat=" + position.coords.latitude
        + "&lon=" + position.coords.longitude + UrlParams;
        var WeatherForecast_url = Forecast_URL + "lat=" + position.coords.latitude
        + "&lon=" + position.coords.longitude + ForeCast_Params;


        // Hacemos una llamada a la API de OpenWeather API para obtener el tiempo actual
        // Será una llamada AJAX a WeatherNowAPIurl, que en caso de éxito llama a
        // Parse, usando como argumento el JSON.parse de la respuesta obtenida
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var JSONobj = JSON.parse(xmlhttp.responseText);
                Parse(JSONobj);
            }
        }
        xmlhttp.open("GET", WeatherNowAPIurl, true);
        xmlhttp.send();

        // Hacemos otra llamada a la API de OpenWeather API para obtener la previsión
        // de los próximos días. 
        // Será una llamada AJAX a WeatherForecast_url, que en caso de éxito llama a
        // Forecast, usando como argumento el JSON.parse de la respuesta obtenida
        var xmlhr = new XMLHttpRequest();
        xmlhr.onreadystatechange = function() {
            if (xmlhr.readyState == 4 && xmlhr.status == 200) {
                var JSobj = JSON.parse(xmlhr.responseText);
                Forecast(JSobj);
            }
        }
        xmlhr.open("GET", WeatherForecast_url, true);
        xmlhr.send();

    }
    // Función de error de la llamada a geolocation.getCurrentPosition. Debe mostrar
    // en un alert el error concreto que ha pasado
    function displayError(error) {
        var errors = {
            1 : 'Permission denied',
            2 : 'Position unavailable',
            3 : 'Request timeout'
        };
        alert("Error: " + errors[error.code]);
    }


    // Función que construye el div donde se mostrará el tiempo actual
    function Parse(obj) {
        // current Location
        document.getElementById("location").innerHTML = "Country :"
            + obj.sys.country + "<br>" + "City :" + obj.name + "<br>"
            + "Latitude:" + obj.coord.lat + "<br>" + "Longitude:"
            + obj.coord.lon + "<br>";

        // current weather
        document.getElementById("weatherNow").innerHTML = "<img src='" + IMG_URL
            + obj.weather[0].icon + ".png'> " + "<br> Condition:"
            + obj.weather[0].description + "<br>" + "Temp:" + obj.main.temp
            + " F<br>" + "Humidity:" + obj.main.humidity + " hPa <br>"
            + "Cloudiness:" + obj.clouds.all + "% <br>" + "Wind:"
            + obj.wind.speed + " mps <br>";

    }

    // Función que construye el div donde se mostrará la previsión para los próximos días
    function Forecast(obj) {
        document.getElementById("day1div").innerHTML = "<img src='" + IMG_URL
            + obj.list[0].weather[0].icon + ".png'> " + "<br>Min Temp:"
            + obj.list[0].temp.min + " F<br>" + "Max Temp:"
            + obj.list[0].temp.max + " F<br>" + "Weather :"
            + obj.list[0].weather[0].description + "<br>" + "Cloudiness:"
            + obj.list[0].clouds + " %<br>" + "Wind:" + obj.list[0].speed
            + " mps <br>";

        document.getElementById("day2div").innerHTML = "<img src='" + IMG_URL
            + obj.list[1].weather[0].icon + ".png'> " + "<br> Min Temp:"
            + obj.list[1].temp.min + " F<br>" + "Max Temp:"
            + obj.list[1].temp.max + " F<br>" + "Weather :"
            + obj.list[1].weather[0].description + "<br>" + "Cloudiness:"
            + obj.list[1].clouds + " %<br>" + "Wind:" + obj.list[1].speed
            + " mps <br>";
        document.getElementById("day3div").innerHTML = "<img src='" + IMG_URL
            + obj.list[2].weather[0].icon + ".png'> " + "<br>Min Temp:"
            + obj.list[2].temp.min + " F<br>" + "Max Temp:"
            + obj.list[2].temp.max + " F<br>" + "Weather :"
            + obj.list[2].weather[0].description + "<br>" + "Cloudiness:"
            + obj.list[2].clouds + " %<br>" + "Wind:" + obj.list[2].speed
            + " mps <br>";
        document.getElementById("day4div").innerHTML = "<img src='" + IMG_URL
            + obj.list[3].weather[0].icon + ".png'> " + "<br>Min Temp:"
            + obj.list[3].temp.min + " F<br>" + "Max Temp:"
            + obj.list[3].temp.max + " F<br>" + "Weather :"
            + obj.list[3].weather[0].description + "<br>" + "Cloudiness:"
            + obj.list[3].clouds + " %<br>" + "Wind:" + obj.list[3].speed
            + " mps <br>";
        document.getElementById("day5div").innerHTML = "<img src='" + IMG_URL
            + obj.list[4].weather[0].icon + ".png'> " + "<br> Min Temp:"
            + obj.list[4].temp.min + " F<br>" + "Max Temp:"
            + obj.list[4].temp.max + " F<br>" + "Weather :"
            + obj.list[4].weather[0].description + "<br>" + "Cloudiness:"
            + obj.list[4].clouds + " %<br>" + "Wind:" + obj.list[4].speed
            + " mps <br>";
    }
    
    // Esta es la interfaz publica de mi modulo
    return {
        getLocation: getLocation
    };

})(navigator, document);




