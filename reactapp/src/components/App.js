import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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
        `https://dummy.restapiexample.com/api/v1/delete/${id}`
      );
      setData((prevData) => prevData.filter((employee) => employee.id !== id));
      console.log("Entry deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async (newEmployee) => {
    try {
      const response = await axios.post(
        "https://dummy.restapiexample.com/api/v1/create",
        newEmployee
      );
      setData((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (updatedEmployeeData) => {
    try {
      const response = await axios.put(
        "https://dummy.restapiexample.com/api/v1/update/${id}",
        updatedEmployeeData
      );
      setData((prevData) =>
        prevData.map((employee) =>
          employee.id == updatedEmployeeData.id ? response.data : employee
        )
      );
      setSelectedEmployee(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditConfirm = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleEditCancel = (employee) => {
    setSelectedEmployee(null);
  };

  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Salary</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.employee_name}</td>
              <td>{employee.employee_salary}</td>
              <td>{employee.employee_age}</td>
              <td>
                <button onClick={() => handleUpdate(employee)}>Update</button>
              </td>
              <td>
                <button onClick={() => handleDelete(employee.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
