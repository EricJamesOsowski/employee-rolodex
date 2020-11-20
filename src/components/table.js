import React, { useState, useEffect } from "react";
import "../App.css";
import API from "../utils/API";

function Table() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchFlags, setSearchFlags] = useState({ "name.first": true, "email": true });

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };


  // This is HOW the employee data is being populated
  const loadData = () => {
    API.getEmployees()
      .then(response => response.json())
      .then(receivedData => {
        setEmployees(receivedData.results)
        setSearchResults(receivedData.results);
      })
  }

  // This is WHERE the employees get populated
  // Re renders the table any time the search term changes, 
  const isInitialMount = React.useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      loadData();
      isInitialMount.current = false;
    }
    const results = employees.filter(person =>
      person.name.first.toLowerCase().includes(searchTerm) || person.name.last.toLowerCase().includes(searchTerm) || person.email.toLowerCase().includes(searchTerm)

    );
    setSearchResults(results);
  }, [searchTerm]);


  // Sorts employees by first name ascending
  let employeesSortedByName = [...employees];
  employeesSortedByName.sort((a, b) => {
    if (a.name.first < b.name.first) {
      return -1;
    }
    if (a.name.first > b.name.first) {
      return 1;
    }
    return 0;
  });

 function sortEmployeesBy(searchParameter){
   let searchValueA;
   let searchValueB;
    let sortedSearchResults = [...searchResults]
    let sortDirection = true;
    sortedSearchResults.sort((a, b) => {

      if (searchParameter == "name.first")
      {
        searchValueA = a.name.first;
        searchValueB = b.name.first;
        setSearchFlags(searchFlags => ({ ...searchFlags, "name.first": !searchFlags["name.first"]}))
        sortDirection = searchFlags["name.first"];
      }
      else if (searchParameter == "email")
      {
        searchValueA = a.email;
        searchValueB = b.email;
        setSearchFlags(searchFlags => ({ ...searchFlags, "email": !searchFlags["email"]}))
        sortDirection = searchFlags["email"];
      }

     if (searchValueA < searchValueB) {
      return -1;
    }
    if (searchValueA > searchValueB) {
      return 1;
    }
    return 0;
  },
  );
  if (sortDirection) {
    setSearchResults(sortedSearchResults);
  }
  else {
     setSearchResults(sortedSearchResults.reverse());
  }
}

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
          <th scope="col" onClick={() => sortEmployeesBy("name.first")}>Name</th>
          <th scope="col" onClick={() => sortEmployeesBy("email")}>Email</th>
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
        }) : null}
      </tbody>
    </table>
  </div>
)
}

export default Table;


