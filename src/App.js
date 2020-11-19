import React, { useState, useEffect } from "react";
import API from "./utils/API";




function App() {
  const [developerState, setDeveloperState] = useState({
    firstName: "",
    lastName: "",
    imageURL: "",
    phoneNumber: ""
  });

  useEffect(() => {
    // For demonstration purposes, we mock an API call.
    API.getEmployees().then((res) => {
      setDeveloperState(res.data);
      console.log("RES DOT DATA DOT RESULTS");
      console.log(res.data.results[1]);
      console.log("Developer State:");
      console.log(developerState);
    });
  }, []);

  return (
    <div className="card">
      <div>
        Name:
      </div>
      <div>
        Status:
      </div>
      <div>
        Lifelong learner:
      </div>
      <div>
        Excitement Level: 
      </div>
    </div>
  );
}


export default App;