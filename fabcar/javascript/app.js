const express = require('express')
const app = express()
const port = 3000
var query = require('./query.js');
var invoke = require('./invoke.js');

app.get('/', (req, res) => {
  res.send('welcome');
})

app.get('/cars', async (req, res) => {
    let message = await query.queryChaincode('queryAllCars','');
    console.log(message);
 	res.send(message);
  })

  app.get('/cars/:carnumber', async (req, res) => {
    let args = req.params;
    console.log(args[0]);
    console.log(JSON.stringify(args));
    let message = await query.queryChaincode('queryCar',JSON.stringify(args));
    console.log(message);
 	res.send(message);
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})