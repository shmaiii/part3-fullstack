require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const Person = require('./models/person');

//middleware
app.use(cors());
app.use(express.json()); // for POST requests
app.use(express.static('build'));

// Comment this part for deployment
// var morgan = require('morgan');
// app.use(morgan('tiny'));



app.get(`/api/persons`, (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons);
    })
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

app.get(`/api/persons/:id`, (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person);
        } else {
            response.status(404).end();
        }
    })
    .catch(error => next(error))
});

app.delete(`/api/persons/:id`, (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end();
    })
    .catch(error => next(error));
});

app.post(`/api/persons`, (request, response) => {
    const body = request.body;
    console.log(body);

    if (!body.name || !body.number){
        return response.status(400).json({
            error: 'either name or number is missing'
        });
    } 

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save().then(savedPerson => {
        console.log(savedPerson);
        response.json(savedPerson);
    })
    
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malfromatted id'});
    }
    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
