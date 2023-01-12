import { useState, useEffect } from 'react';
import Persons from './components/Person.js';
import PersonForm from './components/PersonForm.js';
import axios from 'axios';


const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios
      .get('/api/persons')
      .then(response => {
        console.log(response);
        setPersons(response.data);
      })
  }, []);

  return (
    <div>
      <h2> Phonebook </h2>
      <h3>Ass a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} />   
    </div>
  );
}

export default App;
