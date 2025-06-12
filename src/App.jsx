import { useState } from 'react'

import './App.css'
import EmployeeValidationForm from './EmployeeValidationForm';

function App() {
  const title = "Employee Validation";
  return (
    <>
      <div className="App">
        <h8k-navbar header={title}></h8k-navbar>
        <EmployeeValidationForm />
      </div>
    </>
  );
}

export default App
