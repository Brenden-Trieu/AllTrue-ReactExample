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
      console.log("Entry made");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSubmit = async (updatedEmployeeData) => {
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
      console.log("Update complete");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (employee) => {
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
                <button onClick={() => handleEditClick(employee)}>
                  Update
                </button>
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
      <EmployeeForm onSubmit={handleCreate} />
      {selectedEmployee && (
        <EmployeeForm
          initialData={selectedEmployee}
          onSubmit={handleUpdateSubmit}
          onCancel={handleEditCancel}
        />
      )}
    </div>
  );
};

const EmployeeForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="employee_name"
        value={formData.employee_name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="employee_salary"
        value={formData.employee_salary}
        onChange={handleChange}
        placeholder="Salary"
      />
      <input
        type="text"
        name="employee_age"
        value={formData.employee_age}
        onChange={handleChange}
        placeholder="Age"
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default App;
