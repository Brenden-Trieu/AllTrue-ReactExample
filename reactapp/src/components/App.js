import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const response = await axios
        .get("https://dummy.restapiexample.com/api/v1/employees")
        .setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // if (!data) {
  //   return <div>loading</div>;
  // }

  return (
    <div className="App">
      {data.map((employee) => (
        <div key={employee.id}>
          <p>{employee.name}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
