
const weatherIcon = document.querySelector('#weather-icon');
const tempFeel = document.querySelector('.fl');
const tempF = document.querySelector('.f');
//const desc = document.querySelector('.desc');
const api = 'put key here';

window.addEventListener('load', () => {
  let long;
  let lat;
  //let forecastEl = document.getElementsByClassName("forecast");
  
      // Storing Longitude and Latitude in variables

      long = -93.557442;
      lat = 41.358047;
      const base = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely,alerts&units=imperial&appid=${api}`;

      // Using fetch to get data
     
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {

          const { temp } = data.current;
          const { description, icon } = data.current.weather[0];
          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const fahrenheit = temp;
          const { feels_like }= data.current;
          const celsius = ((temp-32)*5)/9;
          // Interacting with DOM to show data
          weatherIcon.src = iconUrl;
          //desc.textContent = `${description}`;
          tempF.textContent = `${fahrenheit.toFixed(0)}°F ${description}`;
          tempFeel.textContent = ` Feels Like ${feels_like.toFixed(0)}°F `;

          // loop for the forcast
          //forecastEl[0].classList.add('loaded');
          
          //let fday = "";
          let dw="";
          showdaily = data.daily.slice(0, 3);
            console.log(showdaily);
            showdaily.forEach(seeDaily);   
            console.log(document.getElementById("dailyforcast"));       
            document.getElementById("dailyforcast").innerHTML = dw;


            function degToCard(value) { value = parseFloat(value); if (value <= 11.25) return 'N'; value -= 11.25; 
            let allDirections = ['NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N']; 
            let dIndex = parseInt(value/22.5); 
            return allDirections[dIndex] ? allDirections[dIndex] : 'N'; }
             
            function seeDaily(item, i) {
              const seefore = document.getElementById("dailyforcast");
              

              let dayname = new Date(showdaily[i].dt * 1000).toLocaleDateString("en", {
                weekday: "long",
              });

              let icon = showdaily[i].weather[0].icon;
              let temp = showdaily[i].temp.day.toFixed(0);
              let min = showdaily[i].temp.min.toFixed(0);
              let max = showdaily[i].temp.max.toFixed(0);
              let desc = showdaily[i].weather[0].description;
              let wind = showdaily[i].wind_speed.toFixed(0);
              let winddeg = showdaily[i].wind_deg;
              let winddir = degToCard(winddeg);

              
					    fday = `<div class="forecast-day">
						    <p>${dayname}</p>
						    <p><span class="ico-${icon}" title="${icon}"></span></p>
                <img src="http://openweathermap.org/img/w/${icon}.png" alt="weather">
                <p>${desc}</p>
                <div class="forecast-day--temp">High ${max}<sup>°F</sup>  Low ${min}<sup>°F</sup></div>
						    <div class="forecast-day--wind">Wind ${winddir} ${wind} MPH</div>
					      </div>`;
              seefore.insertAdjacentHTML("beforebegin", fday);
              i++;
            }


        });
  
});


