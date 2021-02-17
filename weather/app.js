const button = document.querySelector("#generate")
const inputValue = document.querySelector(".inputValue")

const name = document.querySelector("#name");
const desc = document.querySelector("#content");
const temp = document.querySelector("#temp");
const date = document.querySelector('#date');
const Kelvin = 273;

button.addEventListener('click',function () {
  Promise.all([
    fetch('http://worldclockapi.com/api/json/est/now'),
    fetch('https://api.openweathermap.org/data/2.5/weather?zip=' +inputValue.value + '&appid=3e0ab282071ecddd139e033e5fb77b61')])
    .then(function (responses) {
  // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
          return response.json();
      }))})
      
// I KNOW THAT THIS NEEDS TO BE DELETED, 
          //I DO NOT KNOW WHAT CODE REPLACES IT

      .then(data => 
          console.log(data)
          // I KNOW THAT THIS NEEDS TO BE DELETED, 
          //I DO NOT KNOW WHAT CODE REPLACES IT

           // Add custom code here
        .then(response => response.json())
        .then(data => {
          const nameValue = data['name'];
          const tempValue = Math.floor(data.main.temp - Kelvin);
          const descValue = data['weather'][0]['description'];
          const feeling = document.querySelector('#feeling').value;
          const dateValue = data['currentDateTime'];

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

      }))
    })
      .catch(err => alert("wrong zip code"))
    


// POST function to server
const postData = async ( url = '', data = {})=>{
    
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  
      try {
        const newData = await response.json();
        console.log(newData);
        return newData
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }
