const express = require('express');
const app = express();

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
];

app.get(`/api/persons`, (request, response) => {
    response.json(persons);
})

app.get(`/info/`, (request, response) => {
    
    const weekday = ["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let date = new Date();
    let day = weekday[date.getDay()];
    response.send(`<div>
        <p>Phonebook has info for ${persons.length} people. </p>
        <p>${day} ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</p>
        </div>`);
    
})

app.get(`/api/persons/:id`, (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
})

const PORT = 3001;
app.listen(PORT);
