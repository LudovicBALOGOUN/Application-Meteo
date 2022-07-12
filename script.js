const inputSection = document.querySelector("#input-section");
const descriptionSection = document.querySelector("#description-section");
const entete = document.querySelector(".entete");

const backIcon = entete.querySelector(".back-icon");
const cityInput = inputSection.querySelector(".city-input");
const locationInput = inputSection.querySelector(".location-input");
const infoMessage = document.querySelector(".info-message");

const weatherIcon = descriptionSection.querySelector(".weather-icon");
const temperature = descriptionSection.querySelector(".temp");
const desc = descriptionSection.querySelector(".desc");
const cityTown = descriptionSection.querySelector(".city-town");
const humi = descriptionSection.querySelector(".humidity");
const FeedsLike = descriptionSection.querySelector(".feeds-likes");

cityInput.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    // console.log(e.target.value);
    const city = e.target.value;
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=cf6ae83766cf9b629036a15679edf030`;
    // const apikey = "cf6ae83766cf9b629036a15679edf030";
    getWeatherInfo(api);
  }
});

backIcon.addEventListener("click", () => {
  cityInput.value = "";
  inputSection.classList.remove("hidden");
  descriptionSection.classList.add("hidden");
  backIcon.classList.add("hidden");
});

locationInput.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=cf6ae83766cf9b629036a15679edf030`;
        getWeatherInfo(api);
      },
      (error) => {
        infoMessage.innerText = err.message;
        infoMessage.classList.add("text-red-200");
      }
    );
  } else {
    infoMessage.innerText =
      "Votre navigateur ne supporte pas la geolocalisation ";
    infoMessage.classList.add("text-red-200");
  }
});

getWeatherInfo = (api) => {
  infoMessage.innerText = "traitement en cour...";
  infoMessage.classList.add("text-sky-200");
  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      infoMessage.innerText = "";
      infoMessage.parentNode.classList.add("hidden");
      const { feels_like, humidity, temp } = data.main;
      const { description, id } = data.weather[0];
      const country = data.sys.country;
      const city = data.name;

      temperature.innerHTML = `${Math.floor(temp)} <sup>o</sup>C`;
      cityTown.innerHTML = `${city},${country}`;
      desc.innerHTML = description;
      FeedsLike.innerHTML = `${Math.round(feels_like)} <sup>o</sup>C`;
      humi.innerHTML = `${humidity}%`;

      inputSection.classList.add("hidden");
      descriptionSection.classList.remove("hidden");
      backIcon.classList.remove("hidden");
    })
    .then((err) => {
      infoMessage.innerText = err.message;
      infoMessage.classList.add("text-red-200");
      console.log(error);
    });
};
