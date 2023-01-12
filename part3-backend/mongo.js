const mongoose = require('mongoose');

if (process.argv.length < 5) {
    console.log('params missing');
    process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://phonebook:${password}@cluster0.x5kmk3h.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url);

//schema and model
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});
const Person = mongoose.model('Person', personSchema);

const name = process.argv[3];
const number = process.argv[4];

const person = new Person({
    name: name,
    number: number,
});
person.save();
console.log(`added ${name} number ${number} to phonebook`);

mongoose.connection.close();