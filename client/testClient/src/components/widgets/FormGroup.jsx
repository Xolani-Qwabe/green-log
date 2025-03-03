import React from "react";
import '../css/Signup.css'

const FormGroup = ({ label, type, name, value, onChange, onBlur, error }) => {
  return (
    <div className="form-group">
      {/* <label htmlFor={name} className="form-label">
        {label}
      </label> */}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
        className="form-input"
        aria-describedby={`${name}-error`}
        placeholder={label}
      />
      {error && <p id={`${name}-error`} className="error-message">{error}</p>}
    </div>
  );
};

export default FormGroup;
