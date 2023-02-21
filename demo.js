data.daily.forEach((value, index) => {
            

    if (index > 0) {
      let dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
        weekday: "long",
      });
      let icon = value.weather[0].icon;
      let temp = value.temp.day.toFixed(0);
      let forecastpop = document.getElementById("location");
      console.log(forecastpop);

      let fday = `<div class="forecast-day">
        <p>${dayname}</p>
        <p><span class="ico-${icon}" title="${icon}"></span></p>
        <div class="forecast-day--temp">${temp}<sup>°C</sup></div>
      </div>`;
      console.log(fday);

      forecast.insertAdjacentHTML("afterend", fday);
    }
  });