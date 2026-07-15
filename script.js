function displayDateTime(){
    var dateTime = new Date();

    //Gets hours, minutes and seconds 
    var hours = dateTime.getHours();
    var mins  = dateTime.getMinutes();
    var secs  = dateTime.getSeconds();

    //If number is less than 10, display 0x, e.g 01, 02, 03, etc.
    //Else display as is
    if (hours < 10){
        document.getElementById('hours').innerHTML = String(hours).padStart(2, "0"); //padStart() puts 0 in the first character of output String
    } else {
        document.getElementById('hours').innerHTML = String(hours); //Replace text with String
    }

    if (mins < 10){
        document.getElementById('mins').innerHTML = String(mins).padStart(2, "0");
    } else {
        document.getElementById('mins').innerHTML = String(mins);
    }
    
    /* Remove for seconds to display
    if (secs < 10){
        document.getElementById('secs').innerHTML = String(secs).padStart(2, "0");
    } else {
        document.getElementById('secs').innerHTML = String(secs);
    } */

    //Gets day of week, date, month and year
    const dayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]; //Array of weekdays
    const monthsOfYear = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]; //Array of months

    var day = dayOfWeek[dateTime.getDay()]; //Gets the day of the week (0 to 6) and gets the value from that position in dayOfWeek
    var date = dateTime.getDate();
    var month = monthsOfYear[dateTime.getMonth()]; //Gets the month (0 to 11) and gets the value from that position in monthsOfYear
    var year = dateTime.getFullYear();

    document.getElementById('day').innerHTML = String(day);
    if (mins < 10){
        document.getElementById('date').innerHTML = String(date).padStart(2, "0");
    } else {
        document.getElementById('date').innerHTML = String(date);
    }
    
    document.getElementById('month').innerHTML = String(month);
    document.getElementById('year').innerHTML = String(year);
}

setInterval(displayDateTime, 10);

//-------------------------------------------------------------------------------------------------------------------------------------

const apiKey = "[INSERT YOUR OWN KEY HERE]";        // Get your own API Key from OpenWeatherMap (free btw)
                                                    // It tells OpenWeatherMap you are making the request and is used when getting data

const input = document.getElementById('input');
const search = document.getElementById('search');
const locate = document.getElementById('location');
const temp = document.getElementById('temp');
const icon = document.getElementById('icon');

// When button is clicked
search.addEventListener('click', () => {
    const location = input.value;
    if (location) {
        fetchWeather(location);
    }
    
});

function fetchWeather(location) {
    //Get data from URL using Location API Key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Invalid town/city");
            }
            return response.json(); //"fetches" JSON file from URL
        })
        .then(data => {
            locate.textContent = data.name; //Display town/city name
            temp.textContent = String(`${Math.round(data.main.temp)}°C`); //Display temperature in Celcius
            
            const iconCode = data.weather[0].icon; //Get icon code
            icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; //Display icon
            icon.alt = data.weather[0].description;
            
            //Hide search
            search.style.display = 'none';
            input.style.display = 'none';
        })

        //If problem with input
        .catch(error => {
            console.error('Error fetching weather data:', error);
            locate.textContent = "Try with valid city"
            weatherIcon.src = "";
        });
}

