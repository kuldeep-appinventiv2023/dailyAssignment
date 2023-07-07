const express = require('express');
const router = express.Router();

// Addition  
router.get('/add/:num1/:num2', (req, res) => {
    let num1 = parseInt(req.params.num1);
    let num2 = parseInt(req.params.num2);
    let result = num1 + num2;
    res.send(`The result of addition is: ${result}`);
  });
  
  router.post('/add', (req, res) => {
    let {num1,  num2} = req.body;
    let result = Number(num1) + Number(num2);
    res.send(`The result of addition is: ${result}`);
  });
  
  // Subtraction 
  router.get('/subtract/:num1/:num2', (req, res) => {
    let num1 = parseInt(req.params.num1);
    let num2 = parseInt(req.params.num2);
    let result = num1 - num2;
    res.send(`The result of subtraction is: ${result}`);
  });
  
  router.post('/subtract', (req, res) => {
    let {num1,  num2} = req.body;
    let result = Number(num1) - Number(num2);
    res.send(`The result of subtraction is: ${result}`);
  });
  
  // Multiplication 
  router.get('/multiply/:num1/:num2', (req, res) => {
    let num1 = parseInt(req.params.num1);
    let num2 = parseInt(req.params.num2);
    let result = num1 * num2;
    res.send(`The result of multiplication is: ${result}`);
  });
  
  router.post('/multiply', (req, res) => {
    let {num1,  num2} = req.body;
    let result = Number(num1) * Number(num2);
    res.send(`The result of multiplication is: ${result}`);
  });
  
  // Division 
  router.get('/divide/:num1/:num2', (req, res) => {
    let num1 = parseInt(req.params.num1);
    let num2 = parseInt(req.params.num2);
    if (num2 === 0) {
      res.send('Error: Cannot divide by zero');
    } else {
      let result = num1 / num2;
      res.send(`The result of division is: ${result}`);
    }
  });
  
  router.post('/divide', (req, res) => {
    let {num1,  num2} = req.body;
    if (num2 === 0) {
      res.send('Error: Cannot divide by zero');
    } else {
      let result = num1 / num2;
      res.send(`The result of division is: ${result}`);
    }
  });

  module.exports = router;