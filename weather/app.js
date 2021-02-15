const button = document.querySelector("#generate")
const inputValue = document.querySelector(".inputValue")

const name = document.querySelector("#name");
const desc = document.querySelector("#content");
const temp = document.querySelector("#temp");
const date = document.querySelector('#date');
const Kelvin = 273;
//let d = new Date();
//let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//WEATHER FUNCTION
button.addEventListener('click',function () {
        fetch('https://api.openweathermap.org/data/2.5/weather?zip=' +inputValue.value + '&appid=3e0ab282071ecddd139e033e5fb77b61')
            .then(response => response.json())
            .then(data => {
                const nameValue = data['name'];
                const tempValue = Math.floor(data.main.temp - Kelvin);
                const descValue = data['weather'][0]['description'];
              

                name.innerHTML = nameValue;
                temp.innerHTML = tempValue;
                desc.innerHTML = descValue;
                
            })
            .catch(err => alert("wrong zip code"))
    })

// DATE AND TIME FUNCTION
button.addEventListener('click',function () {
    fetch('http://worldclockapi.com/api/json/est/now')
    .then(response => response.json())
    .then(data => {
        const dateValue = data['currentDateTime'];
       
      date.innerHTML = dateValue;
    })  
})

// FEELING FUNCTION
button.addEventListener('click',function(){
    const feeling = document.querySelector('#feeling').value;
    document.getElementById('feeling');
    feeling.innerHTML = feeling;
  
})

// POST function to server
const postData = async ( url = '', data = {})=>{
    console.log(data)
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
        // console.log(newData);
        return newData
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }
 