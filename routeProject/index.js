const express = require('express');

const app = express();
//const bodyParser = require("body-parser");

const calculatorAPI = require("./route/calculatorAPI");

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

app.use(calculatorAPI);

app.listen(7000, () => {
    console.log("Chal gaya !!");
});

