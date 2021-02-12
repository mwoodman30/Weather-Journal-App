const button = document.querySelector("#generate")
const inputValue = document.querySelector(".inputValue")
const feeling = document.querySelector('#feeling').value;
const name = document.querySelector("#name");
const desc = document.querySelector("#content");
const temp = document.querySelector("#temp");
const date = document.querySelector('#date');
const Kelvin = 273;
//let d = new Date();
//let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

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


//let d = new Date();
//let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

button.addEventListener('click',function () {
    fetch('http://worldclockapi.com/api/json/est/now')
    .then(response => response.json())
    .then(data => {
        const dateValue = data['currentDateTime'];
       
        date.innerHTML = dateValue;
        document.getElementById('feeling').innerHTML = feeling;
    })
})

/*button.addEventListener('click',function(){
    //const feeling = d
    docum*/