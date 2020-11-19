  
import axios from "axios";

// Export an object with a "search" method that searches for random users for the passed query
export default {
  getEmployees: function() {
    return axios.get("https://randomuser.me/api/?results=200&nat=us");
  }
};