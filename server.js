const express = require('express')
const app = express()
const port = 3000;
let projectData = {};

app.get('/all', (req, res) => {
  res.send(projectData)
})


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json() );

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/', (req, res) => {
  // appData.push(req.body);
  Object.keys(projectData).length === 0 ? 
  projectData['id'] = 1: 
  projectData['id'] = projectData.id +1;
  projectData['temp'] = req.body.temp;
  projectData['date'] = req.body.date;
  projectData['feelings'] = req.body.feelings;

  console.log(projectData)

  res.send(projectData);
})


