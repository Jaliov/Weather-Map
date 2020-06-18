var cities = ['London'];
var cValue;

city === '';

var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
var api_key = '&appid=585cb6280f44e153d597d105c67d1278&units=imperial';
var api_key1 = '585cb6280f44e153d597d105c67d1278';
var api_forecast = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var api_uvi = 'https://api.openweathermap.org/data/2.5/uvi?';
var api_lat = 'lat=';
var api_lon = '&lon=';

var icon;
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
var humidStorage;
var windspd;
var windspdStorage;

var tempStorageArr = [];
var city;
var humid;
var tRow;
var tBody;
var reSubmit;
var tempNum;
var temper;
var weatherTd;
var tTitle;
var coordLat;
var coordLong;
var buttonContent;

function submitForm(city) {
  city = document.getElementById('searchCity').value;

  cities.push(city);
  console.log(cities);
  console.log('index ' + cities.indexOf(city));

  var currentTime = moment().format('MM-DD-YYYY');
  var nextDayTime1 = moment(currentTime, 'MM-DD-YYYY')
    .add(1, 'days')
    .format('MM-DD-YYYY');
  var nextDayTime2 = moment(currentTime, 'MM-DD-YYYY')
    .add(2, 'days')
    .format('MM-DD-YYYY');
  var nextDayTime3 = moment(currentTime, 'MM-DD-YYYY')
    .add(3, 'days')
    .format('MM-DD-YYYY');
  var nextDayTime4 = moment(currentTime, 'MM-DD-YYYY')
    .add(4, 'days')
    .format('MM-DD-YYYY');
  var nextDayTime5 = moment(currentTime, 'MM-DD-YYYY')
    .add(5, 'days')
    .format('MM-DD-YYYY');

  console.log('Tomorrow date ' + nextDayTime1);

  $.ajax({
    url: api + city + api_key,
    method: 'GET',
  }).then(function (response) {
    tBody = $('tbody');
    tRow = $(
      "<div class='alert alert-info searchbtn' style='margin-bottom:0px;'><button type='button' id ='btnContent' class='btn btn-light' onclick= 'reSubmit()'></button></div>"
    );

    tTitle = $('<h3>');

    weatherTd = $('#displayWeather').text(city + ' (' + currentTime + ')');

    temper = $('#temperature').text('Temperature: ' + response.main.temp + '℉');

    tempNum = $('#onlyTemp').text(response.main.temp + '℉');
    var tempStorage = response.main.temp + '℉';
    let forecastStorage1; //= response.list[0].main.temp + "℉";
    //tempStorageArr.push(tempStorage)

    console.log('tempStorage : ' + tempStorage);
    humid = $('#humid').text('Humidity: ' + response.main.humidity + '%');
    humidStorage = response.main.humidity + '%';
    windspd = $('#windspeed').text(
      'Wind Speed: ' + response.wind.speed + ' MPH'
    );
    windspdStorage = response.wind.speed + ' MPH';
    console.log(response);
    icon = response.weather[0].icon;
    icon_img = 'https://openweathermap.org/img/w/' + icon + '.png';
    document.getElementById('iconDisplay').src = icon_img;

    tRow.append(city);
    tBody.append(tRow);

    document.getElementById('searchCity').value = '';

    // console.log('icon' + icon);

    let skyType = document.querySelector('.container');
    let fontColor = document.getElementById('wrapper');
    let forecastColor = document.getElementById('forecast');

    switch (icon) {
      case '01d':
      case '01n':
      case '02d':
      case '02n':
        alert('clear');
        Object.assign(skyType.style, {
          backgroundImage: "url('sunny.jpg')",
        });
        fontColor.style.color = 'black';
        break;
      case '10d':
      case '10n':
      case '9d':
      case '9n':
        alert('rainy');
        Object.assign(skyType.style, {
          backgroundImage: "url('rainy.jpg')",
        });
        fontColor.style.color = 'white';
        break;
      case '04d':
      case '04n':
      case '03d':
      case '03n':
      case '02d':
      case '02n':
        alert('cloudy');
        Object.assign(skyType.style, {
          backgroundImage: "url('cloudy.jpg')",
        });
        forecastColor.style.color = 'white';
        break;
      default:
        Object.assign(skyType.style, {
          backgroundImage: "url('defltBckgrnd.jpg')",
        });
    }

    if (typeof Storage !== 'undefined') {
      localStorage.setItem('cityArr', cities);
      localStorage.setItem('city', city);
      // localStorage.setItem("currenttemp", tempStorage);
      // localStorage.setItem("humidity", humidStorage)
      // localStorage.setItem("windspd", windspdStorage)

      console.log('This is city : ' + city);
    } else {
      document.getElementById('temperature').innerHTML =
        'Sorry, your browser does not support Web Storage...';
    }

    cValue = localStorage.getItem('cityArr');
    console.log('cValue ' + cValue);

    //console.log(response.coord.lat)
    coordLat = response.coord.lat;
    coordLong = response.coord.lon;
    var uviUrl =
      'https://api.openweathermap.org/data/2.5/uvi?appid=' +
      api_key1 +
      '&lat=' +
      coordLat +
      '&lon=' +
      coordLong;
    console.log(uviUrl);
    $.ajax({
      url: uviUrl,
      method: 'GET',
    }).then(function (response) {
      console.log('uvi: ' + uviUrl);
      //console.log(response.value)

      document.querySelector('#UVIndex').innerHTML =
        "UVIndex: <span> <button type='button' class='btn btn-danger' id ='UVIndexBtn'>" +
        UVIndex +
        '</button></span>';
      var UVIindex = $('#UVIndexBtn').text(response.value);

      var btnDsply = document.getElementById('UVIndexBtn').textContent;

      if (btnDsply < 5) {
        UVIndexBtn.style.backgroundColor = 'yellow';
        UVIndexBtn.style.borderColor = 'yellow';
        UVIndexBtn.style.color = 'black';
      } else if (btnDsply > 5 && btnDsply < 7) {
        UVIndexBtn.style.backgroundColor = 'orange';
      } else if (btnDsply > 7) {
        UVIndexBtn.style.backgroundColor = 'purple';
      }

      console.log('btnDsply ' + btnDsply);
    });

    //Forecast
    $.ajax({
      url: api_forecast + city + api_key,
      method: 'GET',
    }).then(function (response) {
      console.log(response);

      forecastStorage1 = response.list[0].main.temp + '℉';
      forecastStorage2 = response.list[8].main.temp + '℉';
      forecastStorage3 = response.list[16].main.temp + '℉';
      forecastStorage4 = response.list[24].main.temp + '℉';
      forecastStorage5 = response.list[32].main.temp + '℉';

      $('#field1').text('temp: ' + forecastStorage1);
      $('#field2').text('temp: ' + forecastStorage2);
      $('#field3').text('temp: ' + forecastStorage3);
      $('#field4').text('temp: ' + forecastStorage4);
      $('#field5').text('temp: ' + forecastStorage5);

      icon1 = response.list[0].weather[0].icon;
      icon2 = response.list[8].weather[0].icon;
      icon3 = response.list[16].weather[0].icon;
      icon4 = response.list[24].weather[0].icon;
      icon5 = response.list[32].weather[0].icon;

      icon1_img = 'https://openweathermap.org/img/w/' + icon1 + '.png';
      icon2_img = 'https://openweathermap.org/img/w/' + icon2 + '.png';
      icon3_img = 'https://openweathermap.org/img/w/' + icon3 + '.png';
      icon4_img = 'https://openweathermap.org/img/w/' + icon4 + '.png';
      icon5_img = 'https://openweathermap.org/img/w/' + icon5 + '.png';

      hu1 = $('#humid1').text(
        'humidity: ' + response.list[0].main.humidity + '%'
      );
      hu2 = $('#humid2').text(
        'humidity: ' + response.list[8].main.humidity + '%'
      );
      hu3 = $('#humid3').text(
        'humidity: ' + response.list[16].main.humidity + '%'
      );
      hu4 = $('#humid4').text(
        'humidity: ' + response.list[24].main.humidity + '%'
      );
      hu5 = $('#humid5').text(
        'humidity: ' + response.list[32].main.humidity + '%'
      );

      document.getElementById('iconDisplay1').src = icon1_img;
      document.getElementById('iconDisplay2').src = icon2_img;
      document.getElementById('iconDisplay3').src = icon3_img;
      document.getElementById('iconDisplay4').src = icon4_img;
      document.getElementById('iconDisplay5').src = icon5_img;

      //Five Day Forecast
      //Day 1
      document.getElementById('dateDisplay1').innerHTML = nextDayTime1;
      //document.getElementById("humid1").innerHTML = hu1;

      //Day 2
      document.getElementById('dateDisplay2').innerHTML = nextDayTime2;
      //document.getElementById("iconDisplay2").innerHTML = icon2;

      //Day 3
      document.getElementById('dateDisplay3').innerHTML = nextDayTime3;

      //Day 4
      document.getElementById('dateDisplay4').innerHTML = nextDayTime4;

      //Day 5
      document.getElementById('dateDisplay5').innerHTML = nextDayTime5;
    });
  });
}

function reSubmit(buttonContent) {
  $('.searchbtn').click(function (e) {
    e.preventDefault();

    var buttonContent = $(this).text();

    var currentTime = moment().format('MM-DD-YYYY');
    var nextDayTime1 = moment(currentTime, 'MM-DD-YYYY')
      .add(1, 'days')
      .format('MM-DD-YYYY');
    var nextDayTime2 = moment(currentTime, 'MM-DD-YYYY')
      .add(2, 'days')
      .format('MM-DD-YYYY');
    var nextDayTime3 = moment(currentTime, 'MM-DD-YYYY')
      .add(3, 'days')
      .format('MM-DD-YYYY');
    var nextDayTime4 = moment(currentTime, 'MM-DD-YYYY')
      .add(4, 'days')
      .format('MM-DD-YYYY');
    var nextDayTime5 = moment(currentTime, 'MM-DD-YYYY')
      .add(5, 'days')
      .format('MM-DD-YYYY');

    console.log('Tomorrow date ' + nextDayTime1);

    $.ajax({
      url: api + buttonContent + api_key,
      method: 'GET',
    }).then(function (response) {
      tBody = $('tbody');

      tTitle = $('<h3>');

      weatherTd = $('#displayWeather').text(
        buttonContent + ' (' + currentTime + ')'
      );

      temper = $('#temperature').text(
        'Temperature: ' + response.main.temp + '℉'
      );

      tempNum = $('#onlyTemp').text(response.main.temp + '℉');
      humid = $('#humid').text('Humidity: ' + response.main.humidity + '%');
      humidStorage = response.main.humidity + '%';
      windspd = $('#windspeed').text(
        'Wind Speed: ' + response.wind.speed + ' MPH'
      );

      icon = response.weather[0].icon;
      icon_img = 'https://openweathermap.org/img/w/' + icon + '.png';
      document.getElementById('iconDisplay').src = icon_img;

      // console.log('icon' + icon);

      let skyType = document.querySelector('.container');
      let fontColor = document.getElementById('wrapper');
      let forecastColor = document.getElementById('forecast');

      switch (icon) {
        case '01d':
        case '01n':
        case '02d':
        case '02n':
          // alert('clear');
          Object.assign(skyType.style, {
            backgroundImage: "url('sunny.jpg')",
          });
          fontColor.style.color = 'black';
          break;
        case '10d':
        case '10n':
        case '9d':
        case '9n':
          // alert('rainy');
          Object.assign(skyType.style, {
            backgroundImage: "url('rainy.jpg')",
          });
          fontColor.style.color = 'white';
          break;
        case '04d':
        case '04n':
        case '03d':
        case '03n':
        case '02d':
        case '02n':
          // alert('cloudy');
          Object.assign(skyType.style, {
            backgroundImage: "url('cloudy.jpg')",
          });
          forecastColor.style.color = 'white';
          break;
        default:
          Object.assign(skyType.style, {
            backgroundImage: "url('defltBckgrnd.jpg')",
          });
      }

      //console.log(response.coord.lat)
      coordLat = response.coord.lat;
      coordLong = response.coord.lon;
      var uviUrl =
        'https://api.openweathermap.org/data/2.5/uvi?appid=' +
        api_key1 +
        '&lat=' +
        coordLat +
        '&lon=' +
        coordLong;
      console.log(uviUrl);
      $.ajax({
        url: uviUrl,
        method: 'GET',
      }).then(function (response) {
        console.log('uvi: ' + uviUrl);

        document.querySelector('#UVIndex').innerHTML =
          "UVIndex: <span> <button type='button' class='btn btn-danger' id ='UVIndexBtn'>" +
          UVIndex +
          '</button></span>';
        var UVIindex = $('#UVIndexBtn').text(response.value);
        var btnDsply = document.getElementById('UVIndexBtn').textContent;

        if (btnDsply < 5) {
          UVIndexBtn.style.backgroundColor = 'yellow';
          UVIndexBtn.style.borderColor = 'yellow';
          UVIndexBtn.style.color = 'black';
        } else if (btnDsply > 5 && btnDsply < 7) {
          UVIndexBtn.style.backgroundColor = 'orange';
        } else if (btnDsply > 7) {
          UVIndexBtn.style.backgroundColor = 'purple';
        }
      });

      //Forecast
      $.ajax({
        url: api_forecast + buttonContent + api_key,
        method: 'GET',
      }).then(function (response) {
        console.log(response);

        forecastStorage1 = response.list[0].main.temp + '℉';
        forecastStorage2 = response.list[8].main.temp + '℉';
        forecastStorage3 = response.list[16].main.temp + '℉';
        forecastStorage4 = response.list[24].main.temp + '℉';
        forecastStorage5 = response.list[32].main.temp + '℉';

        $('#field1').text('temp: ' + forecastStorage1);
        $('#field2').text('temp: ' + forecastStorage2);
        $('#field3').text('temp: ' + forecastStorage3);
        $('#field4').text('temp: ' + forecastStorage4);
        $('#field5').text('temp: ' + forecastStorage5);

        icon1 = response.list[0].weather[0].icon;
        icon2 = response.list[8].weather[0].icon;
        icon3 = response.list[16].weather[0].icon;
        icon4 = response.list[24].weather[0].icon;
        icon5 = response.list[32].weather[0].icon;

        icon1_img = 'https://openweathermap.org/img/w/' + icon1 + '.png';
        icon2_img = 'https://openweathermap.org/img/w/' + icon2 + '.png';
        icon3_img = 'https://openweathermap.org/img/w/' + icon3 + '.png';
        icon4_img = 'https://openweathermap.org/img/w/' + icon4 + '.png';
        icon5_img = 'https://openweathermap.org/img/w/' + icon5 + '.png';

        hu1 = $('#humid1').text(
          'humidity: ' + response.list[0].main.humidity + '%'
        );
        hu2 = $('#humid2').text(
          'humidity: ' + response.list[8].main.humidity + '%'
        );
        hu3 = $('#humid3').text(
          'humidity: ' + response.list[16].main.humidity + '%'
        );
        hu4 = $('#humid4').text(
          'humidity: ' + response.list[24].main.humidity + '%'
        );
        hu5 = $('#humid5').text(
          'humidity: ' + response.list[32].main.humidity + '%'
        );

        document.getElementById('iconDisplay1').src = icon1_img;
        document.getElementById('iconDisplay2').src = icon2_img;
        document.getElementById('iconDisplay3').src = icon3_img;
        document.getElementById('iconDisplay4').src = icon4_img;
        document.getElementById('iconDisplay5').src = icon5_img;

        //Five Day Forecast
        //Day 1
        document.getElementById('dateDisplay1').innerHTML = nextDayTime1;
        //document.getElementById("humid1").innerHTML = hu1;

        //Day 2
        document.getElementById('dateDisplay2').innerHTML = nextDayTime2;
        //document.getElementById("iconDisplay2").innerHTML = icon2;

        //Day 3
        document.getElementById('dateDisplay3').innerHTML = nextDayTime3;

        //Day 4
        document.getElementById('dateDisplay4').innerHTML = nextDayTime4;

        //Day 5
        document.getElementById('dateDisplay5').innerHTML = nextDayTime5;
        // document.getElementById('searchbtn').value = '';
      });
    });
  });
}
