import React, { useState, useEffect } from "react";

const initialInputState = {
  name: "",
  email: "",
  employeeId: "",
  joiningDate: "",
};

const initialErrorState = {
  name: true,
  email: true,
  employeeId: true,
  joiningDate: true,
};

function EmployeeValidationForm() {
  const [inputs, setInputs] = useState(initialInputState);
  const [errors, setError] = useState(initialErrorState);

  const isNameValid = (name) => {
    const isValid = name.length >= 4 && name.match(/^[A-Za-z ]+$/).length;
    setError((currentErrors) => ({
      ...currentErrors,
      name: !isValid,
    }));
  };

  const isEmailValid = (email) => {
    const isValid = email.includes("@") && email.endsWith(".com");
    setError((currentErrors) => ({
      ...currentErrors,
      email: !isValid,
    }));
  };

  const isEmployeeIdVaild = (employeeId) => {
    const isValid = employeeId.length === 6 && Number.isInteger(+employeeId);
    setError((currentErrors) => ({
      ...currentErrors,
      employeeId: !isValid,
    }));
  };

  const isDateValid = (date) => {
    const today = new Date("2025-04-11");
    const isValid = new Date(date) <= today;
    setError((currentErrors) => ({
      ...currentErrors,
      joiningDate: !isValid,
    }));
  };

  const handleChange = (e) => {
    setInputs((currentInputs) => ({
      ...currentInputs,
      [e.target.name]: e.target.value,
    }));

    switch (e.target.name) {
      case "name":
        isNameValid(e.target.value);
        break;
      case "email":
        isEmailValid(e.target.value);
        break;
      case "employeeId":
        isEmployeeIdVaild(e.target.value);
        break;
      case "joiningDate":
        isDateValid(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputs(initialInputState);
    setError(initialErrorState);
  };

  return (
    <div className="layout-column align-items-center mt-20 ">
      <div
        className="layout-column align-items-start mb-10 w-50"
        data-testid="input-name"
      >
        <input
          className="w-100"
          type="text"
          name="name"
          value={inputs.name}
          placeholder="Name"
          data-testid="input-name-test"
          onChange={handleChange}
        />
        {errors.name && (
          <p className="error mt-2">
            Name must be at least 4 characters long and only contain letters and
            spaces
          </p>
        )}
      </div>
      <div
        className="layout-column align-items-start mb-10 w-50"
        data-testid="input-email"
      >
        <input
          className="w-100"
          type="email"
          name="email"
          value={inputs.email}
          placeholder="Email"
          onChange={handleChange}
        />
        {errors.email && (
          <p className="error mt-2">Email must be a valid email address</p>
        )}
      </div>
      <div
        className="layout-column align-items-start mb-10 w-50"
        data-testid="input-employee-id"
      >
        <input
          className="w-100"
          type="text"
          name="employeeId"
          value={inputs.employeeId}
          placeholder="Employee ID"
          onChange={handleChange}
          minLength={6}
          maxLength={6}
        />
        {errors.employeeId && (
          <p className="error mt-2">Employee ID must be exactly 6 digits</p>
        )}
      </div>
      <div
        className="layout-column align-items-start mb-10 w-50"
        data-testid="input-joining-date"
      >
        <input
          className="w-100"
          type="date"
          name="joiningDate"
          value={inputs.joiningDate}
          placeholder="Joining Date"
          onChange={handleChange}
        />
        {errors.joiningDate && (
          <p className="error mt-2">Joining Date cannot be in the future</p>
        )}
      </div>
      <button
        data-testid="submit-btn"
        type="submit"
        onClick={handleSubmit}
        disabled={
          errors.name && errors.email && errors.employeeId && errors.joiningDate
        }
      >
        Submit
      </button>
    </div>
  );
}
export default EmployeeValidationForm;
