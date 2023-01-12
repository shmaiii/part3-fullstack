import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]);
  const [newName, setNewName] = useState('');

  const addName = (event) => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = {name: newName};
      setPersons(persons.concat(nameObject));
    }
    setNewName('');
  }

  const handleChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2> Phonebook </h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
    </div>
  );
}

export default App;