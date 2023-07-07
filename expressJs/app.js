const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());

// Start the server
app.listen(port, () => {
  console.log(`hello there Server is listening on port ${port}`);
});

app.get('/', (req, res)=>{
  res.send("Hello there i responded!!");
});

// Addition  
app.get('/add/:num1/:num2', (req, res) => {
  let num1 = parseInt(req.params.num1);
  let num2 = parseInt(req.params.num2);
  let result = num1 + num2;
  res.send(`The result of addition is: ${result}`);
});

app.post('/add', (req, res) => {
  let {num1,  num2} = req.body;
  let result = Number(num1) + Number(num2);
  res.send(`The result of addition is: ${result}`);
});

// Subtraction 
app.get('/subtract/:num1/:num2', (req, res) => {
  let num1 = parseInt(req.params.num1);
  let num2 = parseInt(req.params.num2);
  let result = num1 - num2;
  res.send(`The result of subtraction is: ${result}`);
});

app.post('/subtract', (req, res) => {
  let {num1,  num2} = req.body;
  let result = Number(num1) - Number(num2);
  res.send(`The result of subtraction is: ${result}`);
});

// Multiplication 
app.get('/multiply/:num1/:num2', (req, res) => {
  let num1 = parseInt(req.params.num1);
  let num2 = parseInt(req.params.num2);
  let result = num1 * num2;
  res.send(`The result of multiplication is: ${result}`);
});

app.post('/multiply', (req, res) => {
  let {num1,  num2} = req.body;
  let result = Number(num1) * Number(num2);
  res.send(`The result of multiplication is: ${result}`);
});

// Division 
app.get('/divide/:num1/:num2', (req, res) => {
  let num1 = parseInt(req.params.num1);
  let num2 = parseInt(req.params.num2);
  if (num2 === 0) {
    res.send('Error: Cannot divide by zero');
  } else {
    let result = num1 / num2;
    res.send(`The result of division is: ${result}`);
  }
});

app.post('/divide', (req, res) => {
  let {num1,  num2} = req.body;
  if (num2 === 0) {
    res.send('Error: Cannot divide by zero');
  } else {
    let result = num1 / num2;
    res.send(`The result of division is: ${result}`);
  }
});