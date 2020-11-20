// Export an object with a "search" method that searches for random users for the passed query
const API = {
  getEmployees: function () {
    return fetch("https://randomuser.me/api/?results=200&nat=us")
  }
};

export default API;