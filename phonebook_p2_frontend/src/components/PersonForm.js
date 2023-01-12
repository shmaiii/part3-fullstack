import { useState } from 'react';
import axios from 'axios';

const PersonForm = (props) => {

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
  
    const addName = (event) => {
      event.preventDefault();
      if (props.persons.find(person => person.name === newName)){
        alert(`${newName} is already added to phonebook`);
      } else {

        const personObject = {name: newName, number: newNumber};
        axios
        .post(`/api/persons`, personObject)
        .then(response => {
          console.log(response);
          props.setPersons(props.persons.concat(personObject));
        });
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
            <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
        </div>
    )
}

export default PersonForm;