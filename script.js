     
     function submitForm(city) {

     var api = 'http://api.openweathermap.org/data/2.5/weather?q='
     var api_key = '&appid=585cb6280f44e153d597d105c67d1278&units=imperial';
     var api_key1 = '585cb6280f44e153d597d105c67d1278';
     var api_forecast = 'http://api.openweathermap.org/data/2.5/forecast?q=';
     var api_uvi = 'http://api.openweathermap.org/data/2.5/uvi?'
     var api_lat = 'lat='
     var api_lon = '&lon='

     var icon
     var icon1;
     var icon2;
     var icon3;
     var icon4;
     var icon5;

     var hu1;
     var hu2;
     var hu3;
     var hu4;
     var hu5;

     var icon_img;
     var icon1_img;
     var icon2_img;
     var icon3_img;
     var icon4_img;
     var icon5_img;

     var tempStorage;
     var forecastStorage1;

     var tempStorageArr = [];

     var humid;
     var tRow;
     var tBody;
     var reSubmit;

     var city = document.getElementById("searchCity").value;

     var currentTime = moment().format('MM-DD-YYYY')
     var nextDayTime1 = moment(currentTime, "MM-DD-YYYY").add(1, 'days').format("MM-DD-YYYY")
     var nextDayTime2 = moment(currentTime, "MM-DD-YYYY").add(2, 'days').format("MM-DD-YYYY")
     var nextDayTime3 = moment(currentTime, "MM-DD-YYYY").add(3, 'days').format("MM-DD-YYYY")
     var nextDayTime4 = moment(currentTime, "MM-DD-YYYY").add(4, 'days').format("MM-DD-YYYY")
     var nextDayTime5 = moment(currentTime, "MM-DD-YYYY").add(5, 'days').format("MM-DD-YYYY")

     console.log("Tomorrow date " + nextDayTime1)


     $.ajax({
             url: api + city + api_key,
             method: "GET"
         }

     ).then(function (response) {
         tBody = $("tbody");
         tRow = $("<button id = 'content' class = btn btn-light btn-lg>");

         var tTitle = $("<h3>")
         var weatherTd = $("#displayWeather").text(city + " (" + currentTime + ")");
         var temper = $("#temperature").text("Temperature: " + response.main.temp + "℉");
         var tempNum = $("#onlyTemp").text(response.main.temp + "℉")
         var tempStorage = response.main.temp + "℉";
         let forecastStorage1 //= response.list[0].main.temp + "℉";
         //tempStorageArr.push(tempStorage)
         console.log(tempStorageArr)

         console.log("tempStorage : " + tempStorage)
         humid = $("#humid").text("Humidity: " + response.main.humidity + "%");
         var humidStorage = response.main.humidity + "%"
         var windspd = $("#windspeed").text("Wind Speed: " + response.wind.speed + " MPH");
         var windspdStorage = response.wind.speed + " MPH"
         console.log(response)
         icon = response.weather[0].icon;
         icon_img = "http://openweathermap.org/img/w/" + icon + ".png";
         document.getElementById("iconDisplay").src = icon_img;


         tRow.append(city)
         tBody.append(tRow)


         // //Store city and current temperature
         if (typeof (Storage) !== "undefined") {
             localStorage.setItem("city", city);
             localStorage.setItem("currenttemp", tempStorage);
             localStorage.setItem("humidity", humidStorage)
             localStorage.setItem("windspd", windspdStorage)

             console.log("This is city : " + city)
             //localStorage.setItem(city, forecastStorage1 );
         } else {
             document.getElementById("temperature").innerHTML =
                 "Sorry, your browser does not support Web Storage...";
         }

         console.log(response.coord.lat)
         var coordLat = response.coord.lat
         var coordLong = response.coord.lon
         var uviUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=" + api_key1 + "&lat=" +
             coordLat +
             "&lon=" + coordLong;
         console.log(uviUrl)
         $.ajax({
             url: uviUrl,
             method: "GET"
         }).then(function (response) {
             console.log("uvi: " + uviUrl)
             //console.log(response.value)

             document.querySelector("#UVIndex").innerHTML =
                 " UVIndex: <span> <button type='button' class='btn btn-danger' id ='UVIndexBtn'>" +
                 UVIndex + "</button></span>";
             var UVIindex = $("#UVIndexBtn").text(response.value)

             var btnDsply = document.getElementById("UVIndexBtn").textContent;

             if (btnDsply < 5) {
                 UVIndexBtn.style.backgroundColor = "yellow"; 
                 UVIndexBtn.style.borderColor = "yellow";
                 UVIndexBtn.style.color = "black"
             } else if (btnDsply > 5 && btnDsply < 7) {

                 UVIndexBtn.style.backgroundColor = "orange";

             } else if (btnDsply > 7) {
                 UVIndexBtn.style.backgroundColor = "purple";
             }

             console.log("btnDsply " + btnDsply);

         });
     });


     //Forecast
     $.ajax({
         url: api_forecast + city + api_key,
         method: "GET"
     }).then(function (response) {
         console.log(response)

         forecastStorage1 = response.list[0].main.temp + "℉";
         forecastStorage2 = response.list[8].main.temp + "℉";
         forecastStorage3 = response.list[16].main.temp + "℉";
         forecastStorage4 = response.list[24].main.temp + "℉";
         forecastStorage5 = response.list[32].main.temp + "℉";

         $("#field1").text("temp: " + forecastStorage1)
         $("#field2").text("temp: " + forecastStorage2)
         $("#field3").text("temp: " + forecastStorage3)
         $("#field4").text("temp: " + forecastStorage4)
         $("#field5").text("temp: " + forecastStorage5)



         if (typeof (Storage) !== "undefined") {
             localStorage.setItem("forecast1", `${city} ${nextDayTime1} ${forecastStorage1}`);
             localStorage.setItem("forecast2", `${city} ${nextDayTime2} ${forecastStorage2}`);
             localStorage.setItem("forecast3", `${city} ${nextDayTime3} ${forecastStorage3}`);
             localStorage.setItem("forecast4", `${city} ${nextDayTime4} ${forecastStorage4}`);
             localStorage.setItem("forecast5", `${city} ${nextDayTime5} ${forecastStorage5}`);

             console.log("This is forecastStorage1 : " + forecastStorage1)
         } else {
             document.getElementById("temperature").innerHTML =
                 "Sorry, your browser does not support Web Storage...";
         }

         icon1 = response.list[0].weather[0].icon
         icon2 = response.list[8].weather[0].icon
         icon3 = response.list[16].weather[0].icon
         icon4 = response.list[24].weather[0].icon
         icon5 = response.list[32].weather[0].icon

         icon1_img = "http://openweathermap.org/img/w/" + icon1 + ".png";
         icon2_img = "http://openweathermap.org/img/w/" + icon2 + ".png";
         icon3_img = "http://openweathermap.org/img/w/" + icon3 + ".png";
         icon4_img = "http://openweathermap.org/img/w/" + icon4 + ".png";
         icon5_img = "http://openweathermap.org/img/w/" + icon5 + ".png";

         hu1 = $("#humid1").text("humidity: " + response.list[0].main.humidity + "%")
         hu2 = $("#humid2").text("humidity: " + response.list[8].main.humidity + "%")
         hu3 = $("#humid3").text("humidity: " + response.list[16].main.humidity + "%")
         hu4 = $("#humid4").text("humidity: " + response.list[24].main.humidity + "%")
         hu5 = $("#humid5").text("humidity: " + response.list[32].main.humidity + "%")


         document.getElementById("iconDisplay1").src = icon1_img;
         document.getElementById("iconDisplay2").src = icon2_img;
         document.getElementById("iconDisplay3").src = icon3_img;
         document.getElementById("iconDisplay4").src = icon4_img;
         document.getElementById("iconDisplay5").src = icon5_img;


     })

     //Five Day Forecast
     //Day 1
     document.getElementById("dateDisplay1").innerHTML = nextDayTime1
     //document.getElementById("humid1").innerHTML = hu1;

     //Day 2
     document.getElementById("dateDisplay2").innerHTML = nextDayTime2
     //document.getElementById("iconDisplay2").innerHTML = icon2;

     //Day 3
     document.getElementById("dateDisplay3").innerHTML = nextDayTime3

     //Day 4
     document.getElementById("dateDisplay4").innerHTML = nextDayTime4

     //Day 5
     document.getElementById("dateDisplay5").innerHTML = nextDayTime5
 }