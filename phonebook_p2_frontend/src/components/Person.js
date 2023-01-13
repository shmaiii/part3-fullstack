import React from "react";
import axios from 'axios';
import { useEffect } from "react";

const Person = (props) => {

  const deleteEntry = () => {
    var id = props.person._id;
    console.log(id);
    axios
      .delete(`/api/persons/${id}`)
      .then( response => {
        props.setPersons(props.persons.filter(person => person._id !== id));
      })
  }
    return (
      <div>
        {props.person.id} {props.person.name} {props.person.number}
        <button onClick={deleteEntry}>Delete</button>
      </div>
    );
  }

const Persons = (props) => {

    return(
        <React.Fragment>
            <ul>
            {props.persons.map(person =>
          <Person key={person.id} person={person} persons={props.persons} setPersons={props.setPersons}/>
          )}
            </ul>
        </React.Fragment>
    )
}
export default Persons;