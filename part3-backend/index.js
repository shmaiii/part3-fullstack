const express = require('express');
const app = express();

var morgan = require('morgan');
app.use(morgan('tiny'));

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
});

app.delete(`/api/persons/:id`, (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
});

const generateId = () => {
    let id = persons.length;

    // as long as this id already exists;
    while(persons.find(person => person.id === id)){
        id = Math.floor(Math.random() * (3 * persons.length));
    }

    return id;
}

app.post(`/api/persons`, (request, response) => {
    const body = request.body;

    if (!body.name || !body.number){
        return response.status(400).json({
            error: 'either name or number is missing'
        });
    } 

    if (persons.filter(person => person.name === body.name).length !== 0){
        return response.status(400).json({
            error: 'name must be unique'
        });
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person);
    response.json(person);
})


const PORT = 3001;
app.listen(PORT);
