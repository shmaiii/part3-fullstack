import { useState } from 'react';

const Person = (props) => {
  return (
    <div>
      {props.person.name} {props.person.number}
    </div>
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'}
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addName = (event) => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {name: newName, number: newNumber};
      setPersons(persons.concat(personObject));
    }
    setNewName('');
    setNewNumber('');
  }

  const handleChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2> Phonebook </h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={persons.indexOf(person)} person={person} />
          )}
      </ul>
      
    </div>
  );
}

export default App;
