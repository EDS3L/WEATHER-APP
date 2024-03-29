const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weatherInfo');
const temperature = document.querySelector('.temperature');
const warning = document.querySelector('.warning');
const humidity = document.querySelector('.humidityInfo');
const feelsLikeTemp = document.querySelector('.feelsLikeTemp')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=85575f139f919428d72f7c9dcb7a03e7';
const API_UNITS = '&units=metric';

const getWeather = () => {
  const city = input.value;
  const URL = API_LINK + city + API_KEY + API_UNITS;

  axios
    .get(URL)
    .then((response) => {
      const temp = response.data.main.temp;
      const hum = response.data.main.humidity;
      const weatherInfo = response.data.weather[0].main;
      const nameCity = response.data.name;
      const feelsLike = response.data.main.feels_like

      const idForIcon = response.data.weather[0].id;

      

      cityName.textContent = nameCity;
      temperature.textContent = Math.ceil(temp) + ' °';
      humidity.textContent = hum + ' %';
      weather.textContent = weatherInfo;
      feelsLikeTemp.textContent = Math.ceil(feelsLike) + ' °';

      

      if (idForIcon >= 200 && idForIcon <= 232) {
        photo.setAttribute('src', 'img/thunderstorm.png');
      } else if (idForIcon >= 300 && idForIcon <= 321) {
        photo.setAttribute('src', 'img/drizzle.png');
      } else if (idForIcon >= 500 && idForIcon <= 531) {
        photo.setAttribute('src', 'img/rain.png');
      } else if (idForIcon >= 600 && idForIcon <= 622) {
        photo.setAttribute('src', 'img/ice.png');
      } else if (idForIcon === 800) {
        photo.setAttribute('src', 'img/sun.png');
      } else if (idForIcon >= 801 && idForIcon <= 804) {
        photo.setAttribute('src', 'img/clouds.png');
      } else if (idForIcon >= 701 && idForIcon <= 781) {
        photo.setAttribute('src', 'img/fog.png');
      }
      warning.textContent = '';
      input.value = '';
      input.focus();
    })
    .catch(() => {
      warning.textContent = 'type correct city name';
      input.value = '';
      input.focus();
    });
};

const enter = (e) => {
  if (e.key === 'Enter') {
    getWeather();
    input.value = '';
    input.focus();
  }
};
input.addEventListener('keyup', enter);
button.addEventListener('click', getWeather);
