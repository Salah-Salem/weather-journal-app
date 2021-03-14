/* Global Variables */
const apiKey = '&appid=e19827c0200986b7dd04b02f69152e81&units=imperial';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const ROUTS = {
  post: '/',
  get: '/all'
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+ '/' + (d.getMonth()+1 )+ '/' + d.getFullYear();

// Get Weather Data from External Endpoint 
const getFromWeatherApi = async (zipCode) => {
    const res = await fetch(`${baseUrl}${zipCode}${apiKey}`)
    try{
      const data = await res.json()
      return data;
    }catch {
      console.error();
    }
}

// Post Data To local Server
const postToLocalServer = async (url = '', data = {}) => {
  await fetch(url,{
   'method': 'POST',
    'credentials': 'same-origin',
    'headers': {
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(data),
  });
  try{
    return ;
  }
  catch{console.error()}
}

// Get Data From Local Server 
const getFromLocalServer = async () => {
  const req = await fetch(ROUTS.get)
  try{
    const data = await req.json();
    // render Data Dynamiclly 
    renderElement(data);
  }catch {
    console.error();
  }
}

// render Data Dynamiclly 
const renderElement = (data) =>{
  const Tbody = document.getElementById('tbody');
  const tempCels =((data.temp-32) * 5/9);
  const tempKel =tempCels + 273.15;
  Tbody.insertAdjacentHTML('beforeend',`
        <tr class="text-center">
          <td>${data.id}</td>
          <td>${data.date}</td>
          <td>${data.temp}</td>
          <td>${tempCels.toFixed(2)}</td>
          <td>${tempKel.toFixed(2)}</td>
          <td>${data.feelings}</td>
        </tr>
  `)
}

// Main Function 
const generateBtn = document.getElementById('generate');
generateBtn.addEventListener('click', () => {
  const zipCode = document.getElementById('zipCode').value;
    const feelings = document.getElementById('feelings').value;
    //submit validation 
  (zipCode && feelings !=='') ? 
    getFromWeatherApi(zipCode)
    .then((data) => {
      postToLocalServer(ROUTS.post,{
        date: newDate,
        temp: data.main.temp,
        feelings: feelings
      });
      getFromLocalServer();
    })
    :  alert('please insert Zipcode and Your Status !!')

})