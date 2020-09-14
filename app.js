const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/burgers', (req, res) => {
  res.send('We have juicy cheese burgers!');
});

app.get('/pizza/pepperoni', (req, res) => {
  res.send('We have juicy pepperoni!');
});

app.get('/pizza/pineapple', (req, res) => {
  res.send('Great choice, jk!');
});

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
  `;
  res.send(responseText);
});

app.get('/greetings', (req, res) => {
  //1. get values from the request
  const name = req.query.name;
  const race = req.query.race;

  //2. validate the values
  if(!name) {
    //3. name was not provided
    return res.status(400).send('Please provide a name');
  }

  if(!race) {
    //3. race was not provided
    return res.status(400).send('Please provide a race');
  }

  //4. and 5. both name and race are valid so do the processing.
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

  //6. send the response 
  res.send(greeting);
});

app.get('/sum', (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  const numa = parseFloat(a);
  const numb = parseFloat(b);
  if(!a) {
    return res.status(400).send('Please provide a value for a');
  }
  if(!b) {
    return res.status(400).send('Please provide a value for b');
  }
  const sum = numa + numb;
  const string = `The sum of ${numa} and ${numb} is ${sum}`;
  res.send(string);
});

app.get('/cipher', (req, res) => {
  const text = req.query.text;
  const shift = req.query.shift;
  const shifta = parseFloat(shift);
  const startingPoint = text.charCodeAt(0);
  const finder = startingPoint + shifta;
  const hatchling = String.fromCharCode(finder)
  const string = `The secret letter is ${hatchling}`;
  res.send(string);
});

app.get('/lotto', (req, res) => {
  const numbers = req.query.numbers;
  if (numbers.length !== 6) {
    return res.status(400).send('We need 6 numbers');
  }
  const guesses = numbers.map(n => parseInt(n));
  const winners = [];
  for (let i = 0; i <= 5; i++) {
    min = Math.ceil(1);
    max = Math.floor(20);
    winners.push(Math.floor(Math.random() * (max - min) + min));
  };
  let diff = winners.filter(n => guesses.includes(n))
  if(diff.length < 4) {
    res.send(`We have these numbers: ${diff} and the winners are ${winners}, so, Sorry, you lose`)
  };
  if(diff.length = 4) {
    res.send(`We have these numbers: ${diff} and the winners are ${winners}, so, Congratulations, you win a free ticket`)
  };
  if(diff.length = 5) {
    res.send(`We have these numbers: ${diff} and the winners are ${winners}, so, Congratulations, you win $500`)
  };
  if(diff.length = 6) {
    res.send(`We have these numbers: ${diff} and the winners are ${winners}, so, WOW, you win the LOTTO`)
  };
  //const string = `We have these numbers: ${diff}`;
  //res.send(string);
  //res.send('We have 6 numbers');
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});