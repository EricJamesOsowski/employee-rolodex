import React, { useState, useEffect } from "react";
import "../App.css";
import API from "../utils/API";

function Table() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const handleChange = event => {
     setSearchTerm(event.target.value);
   };


   // This is where teh employee data is being populated
  const loadData = () => {
    API.getEmployees()
      .then(response => response.json())
      .then(receivedData => {
        setEmployees(receivedData.results)
        setSearchResults(receivedData.results);
      })
  }

  const isInitialMount = React.useRef(true);
  useEffect(() => {
    if (isInitialMount.current){
      loadData();
      isInitialMount.current = false;
    }
    const results = employees.filter(person =>
      person.name.first.toLowerCase().includes(searchTerm) || person.name.last.toLowerCase().includes(searchTerm) || person.email.toLowerCase().includes(searchTerm)

    );
    setSearchResults(results);
  }, [searchTerm]);

  let sortedEmployees = [...employees];
  sortedEmployees.sort((a, b) => {
    if (a.name.first < b.name.first) {
      return -1;
    }
    if (a.name.first > b.name.first) {
      return 1;
    }
    return 0;
  });

  return (
    <div>
          <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Photo</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
        </tr>
      </thead>
      <tbody>
        {searchResults ? searchResults.map((result, index) => {
          return (
            <tr key={index}>
              <td><img src={result.picture.medium} alt="Employee" /></td>
              <td>{result.name.first} {result.name.last}</td>
              <td>{result.email}</td>
              <td>{result.cell}</td>
            </tr>
          )
        }): null}
      </tbody>
    </table>
    </div>
  )
}

export default Table;


