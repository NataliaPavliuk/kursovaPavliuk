import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    const API_KEY = "b10e79705c099860a980640a091a6fcf";
    const WEEKDAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var weatherNow = {
        city: "New York",
        cloudiness: 50,
        country: "US",
        desc: "scattered clouds",
        humidity: 50,
        sunrise: 1519626034,
        sunset: 1519664697,
        temp: 32,
        type: "03d",
        wind: 10
    };

    var forecast = [];
    var metric = true;

    const UIElements = {
        tempNow: $("#temp-now"),
        iconNow: $("#icon-now"),
        descNow: $("#desc-now"),
        cityNow: $("#city-now"),
        windNow: $("#wind-now"),
        timeNow: $("#time-now"),
        humidityNow: $("#humidity-now"),
        cloudinessNow: $("#cloudiness-now"),
        sunriseNow: $("#sunrise-now"),
        sunsetNow: $("#sunset-now")
    }

    function setCurrentWeather(weather: any, metric: any){
        weatherNow = weather;
        updateWeather(metric);
    }

    function updateWeather(metric: any){
        var temp = metric ? FtoC(weatherNow.temp).toFixed(0) : weatherNow.temp.toFixed(0);
        var wind = metric ? mphToKmh(weatherNow.wind).toFixed(0) + " km/h" : weatherNow.wind.toFixed(0) + " mph";
        var date = new Date();
        var time = WEEKDAY[date.getDay()] + ", " + getTime(date, metric);
        var sunrise = getTime(new Date(weatherNow.sunrise * 1000), metric);
        var sunset = getTime(new Date(weatherNow.sunset * 1000), metric);
        UIElements.tempNow.text(temp);
        UIElements.iconNow.addClass(typeToIcon(weatherNow.type));
        UIElements.descNow.text(weatherNow.desc);
        UIElements.cityNow.text(weatherNow.city);
        UIElements.windNow.text(wind);
        UIElements.timeNow.text(time);
        UIElements.humidityNow.text(weatherNow.humidity);
        UIElements.cloudinessNow.text(weatherNow.cloudiness);
        UIElements.sunriseNow.text(sunrise);
        UIElements.sunsetNow.text(sunset);
    }

    function setForecast(forecast1: any, metric: any){
        forecast = forecast1;
        setForecastDay("#first-day", 0, forecast1, metric);
        setForecastDay("#second-day", 1, forecast, metric);
        setForecastDay("#third-day", 2, forecast1, metric);
        setForecastDay("#forth-day", 3, forecast1, metric);
      }

    function setForecastDay(day: any, num: any, forecast: any, metric: any){
        var min = metric ? FtoC(forecast[num].min).toFixed(0) : forecast[num].min.toFixed(0);
        var max = metric ? FtoC(forecast[num].max).toFixed(0) : forecast[num].max.toFixed(0);
        $(day + " > h3").text(forecast[num].weekday);
        $(day + " span").eq(0).text(max);
        $(day + " span").eq(1).text(min);
    }

    function getTime(date: any, metric: any) {
        var hour, minute, ampm;
        if(metric){
            hour = date.getHours();
            minute = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
            return hour + ":" + minute;
        } else {
            hour = date.getHours();
            ampm = "AM";
            if(hour >= 12){
                if(hour > 12) hour -= 12;
                ampm = "PM";
            }
            minute = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
            return hour + ":" + minute + " " + ampm;
        }
    }

    function FtoC(degree: any) {return (degree - 32) * 5/9;}

    function mphToKmh(val: any) {return val * 1.609344;}

    function typeToIcon(type: any){
      switch(type){
        case "01d": return "wi-day-sunny";
        case "02d": return "wi-night-cloudy";
        case "03d": return "wi-cloudy";
        case "04d": return "wi-cloudy";
        case "09d": return "wi-day-showers";
        case "10d": return "wi-day-rain";
        case "11d": return "wi-thunderstorm";
        case "13d": return "wi-snow";
        case "50d": return "wi-fog";
        case "01n": return "wi-night-clear";
        case "02n": return "wi-day-cloudy";
        case "03n": return "wi-cloudy";
        case "04n": return "wi-cloudy";
        case "09n": return "wi-night-showers"; 
        case "10n": return "wi-night-rain";
        case "11n": return "wi-thunderstorm";
        case "13n": return "wi-snow";
        case "50n": return "wi-fog";
      }
      return "";
    }

    function currentWeatherReq(lat: any, long: any){
      return "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" +
        long + "&units=imperial" + "&APPID=" + API_KEY;
    }

    function forecastReq(lat: any, long: any){
      return "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" +
        long + "&units=imperial" + "&APPID=" + API_KEY;
    }

    function fetchCurrentWeather(lat: any, long: any, metric: any) {
      var weather : any = null;
      $.getJSON(currentWeatherReq(lat, long), function(json: any) {
        weather = {
          city: json.name,
          temp: json.main.temp,
          desc: json.weather[0].description,
          type: json.weather[0].icon,
          wind: json.wind.speed,
          humidity: json.main.humidity,
          cloudiness: json.clouds.all,
          sunrise: json.sys.sunrise,
          sunset: json.sys.sunset,
          country: json.sys.country
        };
      })
      .done(() => setCurrentWeather(weather, metric))
      .fail(() => alert("Error"));
    }

    function fetchForecast(lat: any, long: any, metric: any){
      let forecast: any = [];
      $.getJSON(forecastReq(lat, long), function(json: any){
        var date;
        var weekdayStr = "";
        var tempMin = Number.POSITIVE_INFINITY;
        var tempMax = Number.NEGATIVE_INFINITY;
        var today = new Date().getDay();

        json.list.forEach(function(weather: any){
          date = new Date(weather.dt * 1000);
          if(today != date.getDay()){
            if(weekdayStr != WEEKDAY[date.getDay()] && weekdayStr != ""){
              forecast.push({ weekday: weekdayStr, min: tempMin, max: tempMax});
              tempMin = Number.POSITIVE_INFINITY;
              tempMax = Number.NEGATIVE_INFINITY;
            }
            if(weather.main.temp < tempMin) tempMin = weather.main.temp;
            if(weather.main.temp > tempMax) tempMax = weather.main.temp;
            weekdayStr = WEEKDAY[date.getDay()];
          }
        });
        
        if(forecast.length < 4) forecast.push({ weekday: weekdayStr, min: tempMin, max: tempMax});
      })
      .done(() => setForecast(forecast, metric))
      .fail(() => alert("Error"));
    }

    function handleRequestError(jqXHR: any, exception: any){
      if (jqXHR.status === 0) {
        alert('Network error. Check your connection.');
      } else if (jqXHR.status == 404) {
        alert('Requested page not found [404].');
      } else if (jqXHR.status == 500) {
        alert('Internal Server Error [500].');
      } else {
        alert("Error [" + jqXHR.status + "].");
      }
    }

    const handler = {
      fetchCurrentWeather,
      fetchForecast
    }

    $(document).ready(function(){
      updateWeather(metric);

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        error();
      }

      $("#fahrenheit-now, #celsius-now").on("click", function(){
        if($(WeatherWidgetComponent).hasClass("degree-inactive")){
          $(WeatherWidgetComponent).removeClass("degree-inactive");
          $(".degree-active").removeClass("degree-active").addClass("degree-inactive");
          $(WeatherWidgetComponent).addClass("degree-active");

          if($(WeatherWidgetComponent).is("#fahrenheit-now")) {
            metric = false;
          } else {
            metric = true;
          }

          updateWeather(metric);
        }
      });
    });

    function error() {
      alert("Sorry, no position available.");
    }

    function success(position:any) {
      handleRequest(position.coords.latitude, position.coords.longitude);
    }

    function handleRequest(latitude:any, longitude:any){
      fetchCurrentWeather(latitude, longitude, metric);
      fetchForecast(latitude, longitude, metric);
    }
  }
}