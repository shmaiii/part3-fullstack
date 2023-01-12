import React from "react";

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