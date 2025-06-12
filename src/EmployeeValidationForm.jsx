import React, { useState, useEffect } from "react";

const initialState = {
  name: "",
  email: "",
  employeeId: "",
  joiningDate: "",
};

const initialErrors = {
  name: "Name must be at least 4 characters long and only contain letters and spaces.",
  email: "Email must be a valid email address.",
  employeeId: "Employee ID must be exactly 6 digits.",
  joiningDate: "Joining Date cannot be in the future.",
};

const EmployeeValidationForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const noErrors = Object.values(errors).every((e) => e === "");
    const allFieldsFilled = Object.values(formData).every((val) => val !== "");
    setIsFormValid(noErrors && allFieldsFilled);
  }, [errors, formData]);

  const validate = (name, value) => {
    switch (name) {
      case "name":
        return /^[A-Za-z\s]{4,}$/.test(value) ? "" : initialErrors.name;
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : initialErrors.email;
      case "employeeId":
        return /^\d{6}$/.test(value) ? "" : initialErrors.employeeId;
      case "joiningDate":
        return new Date(value) <= new Date() ? "" : initialErrors.joiningDate;
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const errorMsg = validate(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      alert("Form submitted successfully!");
      setFormData(initialState);
      setErrors(initialErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>

      <div>
        <label>Email:</label>
        <br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div>
        <label>Employee ID:</label>
        <br />
        <input
          type="text"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
        />
        {errors.employeeId && (
          <p style={{ color: "red" }}>{errors.employeeId}</p>
        )}
      </div>

      <div>
        <label>Joining Date:</label>
        <br />
        <input
          type="date"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleChange}
        />
        {errors.joiningDate && (
          <p style={{ color: "red" }}>{errors.joiningDate}</p>
        )}
      </div>

      <button type="submit" disabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
};

export default EmployeeValidationForm;
