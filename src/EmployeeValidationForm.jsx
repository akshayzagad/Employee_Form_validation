import React, { useEffect, useState } from "react";

function EmployeeValidationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});

  // ✅ Use correct state values to validate initially
  useEffect(() => {
    const initialErrors = validate({
      name: "",
      email: "",
      employeeId: "",
      date: "",
    });
    setErrors(initialErrors);
  }, []);

  function validate({ name, email, employeeId, date }) {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[A-Za-z\s]{4,}$/.test(name)) {
      errors.name =
        "Name must be at least 4 characters and contain only letters/spaces";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email must be a valid email address";
    }

    if (!employeeId.trim()) {
      errors.employeeId = "Employee ID is required";
    } else if (!/^\d{6}$/.test(employeeId)) {
      errors.employeeId = "Employee ID must be exactly 6 digits";
    }

    const today = new Date().toISOString().split("T")[0];
    if (!date) {
      errors.date = "Joining Date is required";
    } else if (date > today) {
      errors.date = "Joining Date cannot be in the future";
    }

    return errors;
  }

  function handleData() {
    const currentValues = { name, email, employeeId, date };
    const validationErrors = validate(currentValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newEmployee = {
      name,
      email,
      employeeId,
      date,
    };
    setData([...data, newEmployee]);

    setName("");
    setEmail("");
    setEmployeeId("");
    setDate("");
    setErrors(validate({ name: "", email: "", employeeId: "", date: "" }));
  }

  return (
    <div className="layout-column align-items-center mt-20">
      <div className="layout-column align-items-start mb-10 w-50">
        <input
          className="w-100"
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: undefined }));
          }}
        />
        {errors.name && <p className="error mt-2">{errors.name}</p>}
      </div>

      <div className="layout-column align-items-start mb-10 w-50">
        <input
          className="w-100"
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: undefined }));
          }}
        />
        {errors.email && <p className="error mt-2">{errors.email}</p>}
      </div>

      <div className="layout-column align-items-start mb-10 w-50">
        <input
          className="w-100"
          type="text"
          value={employeeId}
          placeholder="Employee ID"
          onChange={(e) => {
            setEmployeeId(e.target.value);
            setErrors((prev) => ({ ...prev, employeeId: undefined }));
          }}
        />
        {errors.employeeId && <p className="error mt-2">{errors.employeeId}</p>}
      </div>

      <div className="layout-column align-items-start mb-10 w-50">
        <input
          className="w-100"
          type="date"
          value={date}
          placeholder="Joining Date"
          onChange={(e) => {
            setDate(e.target.value);
            setErrors((prev) => ({ ...prev, date: undefined }));
          }}
        />
        {errors.date && <p className="error mt-2">{errors.date}</p>}
      </div>

      <button type="submit" onClick={handleData}>
        Submit
      </button>
    </div>
  );
}

export default EmployeeValidationForm;
