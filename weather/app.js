const button = document.querySelector("#generate")
const inputValue = document.querySelector("#zip").value;
const feeling = document.querySelector('#feeling').value;
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const api = '&appid=3e0ab282071ecddd139e033e5fb77b61';
const dateApi = 'http://worldclockapi.com/api/json/est/now';

const name = document.querySelector("#name");
const desc = document.querySelector("#content");
const temp = document.querySelector("#temp");
const date = document.querySelector('#date');
const Kelvin = 273;

button.addEventListener('click',function () {
    fetch(dateApi, api, url)
    .then(function (responses) {
  // Get a JSON object from each of the responses
       // return Promise.all(responses.map(function (response) {
          return response.json();
      })
      .then(data => {
        const nameValue = data[1]['name'];
        const tempValue = Math.floor(data[1].main.temp - Kelvin);
        const descValue = data[1]['weather'][0]['description'];
        
        const dateValue = data[0]['currentDateTime'];
        postData("/add",{name: nameValue, temp: tempValue, desc: descValue, feeling: feeling, date: dateValue} )
        .then(() => {
          fetch("/retrieve")
          .then(data => data.json())
          .then(data => {
              name.innerHTML = data.name;
              temp.innerHTML = data.temp;
              desc.innerHTML = data.desc;
              date.innerHTML = data.date;
          })
        })
    })
    .catch(err => alert("wrong zip code"))
})
// POST function to server

    const data = async (url, zip, dataApi) => {

      const response = await fetch(url + zip + dataApi)
      try {
          const newData = await response.json();
          console.log(newData)
          return newData;
      } 
      catch(error) {
          console.log("error", error);
      }
  };
  
  // POST function to server
  async function postData(url, data) {
      await fetch(url, {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(data),
      });
  }