  
import axios from "axios";

// Export an object with a "search" method that searches for random users for the passed query
function API () {
  const getEmployees = () => {
    fetch("https://randomuser.me/api/?results=200&nat=us")
    .then(response => response.json())
    .then(receivedData => setdata(receivedData.results));
  }

    };

export default API;