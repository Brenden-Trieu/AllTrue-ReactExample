import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState();

  React.useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://dummy.restapiexample.com/api/v1/employees")
        .then((response) => {
          setData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        "https://dummy.restapiexample.com/api/v1/delete/${id}"
      );
      setData((prevData) => prevData.filter((employee) => employee.id !== id));
      console.log("Entry deleted");
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <div>
      {data.map((employee) => (
        <div key={employee.id}>
          <p>Name: {employee.employee_name}</p>
          <p>Salary: {employee.employee_salary}</p>
          <p>Age: {employee.employee_age}</p>
          <button onClick={() => handleDelete(employee.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
