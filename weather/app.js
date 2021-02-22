const button = document.querySelector("#generate")
const feelings = document.querySelector('#feelings');
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const api = '&appid=3e0ab282071ecddd139e033e5fb77b61&units=imperial';
const dateApi = 'http://worldclockapi.com/api/json/est/now';

const name = document.querySelector("#name");
const desc = document.querySelector("#content");
const temp = document.querySelector("#temp");
const date = document.querySelector('#date');
const Kelvin = 273;

    button.addEventListener('click',function () {
        const zip = document.querySelector("#zip").value;
        const feeling = document.querySelector('#feeling').value;
        fetch(url + zip + api)
        .then(function (response) {
              return response.json();
        })
        .then(data => {
          const nameValue = data['name'];
          const tempValue = data.main.temp;
          const descValue = data['weather'][0]['description'];
          const dateValue = data['currentDateTime'];
          postData("/add",{name: nameValue, temp: tempValue, desc: descValue, feeling: feeling, date: dateValue } )
          .then(() => {
            fetch("/retrieve")
            .then(data => data.json())
            .then(data => {
                name.innerHTML = data.name;
                temp.innerHTML = data.temp;
                desc.innerHTML = data.desc;
                feelings.innerHTML = data.feeling;
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