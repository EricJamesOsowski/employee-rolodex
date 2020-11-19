import React, { useState, useEffect } from "react";
import "../App.css";
function Table() {

  const [ data, setdata ] = useState([]);

  useEffect( ()=> {
     loadData();
  }, []);

  const loadData = () => {
    fetch("https://randomuser.me/api/?results=200&nat=us")
    .then(response => response.json())
    .then(receivedData => setdata(receivedData.results));
  }

  return (
<table className="table table-striped">
<thead>
  <tr>
  <th scope="col">Image URL</th>
    <th scope="col">First Name</th>
    <th scope="col">Last Name</th>
    <th scope="col">Phone</th>
  </tr>
</thead>
<tbody>
    {data.map((result, index) => {
     return  (
      <tr key={index}>
        <td><img src={result.picture.medium} /></td>
        <td>{result.name.first}</td>
        <td>{result.name.last}</td>
        <td>{result.cell}</td>
      </tr>
    )})}
    </tbody>
    </table>
  )
}

export default Table;


