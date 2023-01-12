import { useState } from 'react';
import Persons from './components/Person.js';
import PersonForm from './components/PersonForm.js';


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'}
  ]);

  return (
    <div>
      <h2> Phonebook </h2>
      <h3>Ass a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} />   
    </div>
  );
}

export default App;
