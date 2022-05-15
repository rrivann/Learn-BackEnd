const express = require('express');
const app = express();
let {people} = require('./data');

// static assets
app.use(express.static('./methods-public'));
// parse form data
app.use(express.urlencoded({extended: false}));
// parse json
app.use(express.json());

app.post('/login', (req, res) => {
  const {name} = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send('Please credentials');
});

app.get('/api/people', (req, res) => {
  res.status(200).json({success: true, data: people});
});

app.post('/api/people', (req, res) => {
  const {name} = req.body;
  if (!name) {
    return res.status(400).json({success: false, msg: 'provided name value'});
  }
  res.status(201).json({success: true, person: name});
});

app.post('/api/postman/people', (req, res) => {
  const {name} = req.body;
  if (!name) {
    return res.status(400).json({success: false, msg: 'provided name value'});
  }
  res.status(201).json({success: true, data: [...people, name]});
});

app.put('/api/people/:id', ({params, body}, res) => {
  const person = people.find((person) => person.id === Number(params.id));
  if (!person) {
    return res
      .status(404)
      .json({success: false, msg: `no person with this id ${params.id}`});
  }

  const newPeople = people.map((person) => {
    if (person.id === Number(params.id)) {
      person.name = body.name;
    }
    return person;
  });
  res.status(200).json({success: true, data: newPeople});
});

app.delete('/api/people/:id', ({params}, res) => {
  const person = people.find((person) => person.id === Number(params.id));
  if (!person) {
    return res
      .status(404)
      .json({success: false, msg: `no person with this id ${params.id}`});
  }
  const newPeople = people.filter((person) => person.id !== Number(params.id));
  res.status(200).json({success: true, data: newPeople});
});

app.listen(4000);
