import React from "react";
import axios from 'axios';
import { useEffect } from "react";

const Person = (props) => {
    return (
      <div>
        {props.person.name} {props.person.number}
      </div>
    );
  }

const Persons = (props) => {

    return(
        <React.Fragment>
            <ul>
            {props.persons.map(person =>
          <Person key={props.persons.indexOf(person)} person={person} />
          )}
            </ul>
        </React.Fragment>
    )
}

export default Persons;