import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import './Register.css';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (!/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}/.test(formData.password)) {
      newErrors.password = 'Password must be 8 characters, at least one number, and one symbol';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  useEffect(() => {
    const registerUser = async () => {
      if (formSubmitted) {
        try {
          const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            console.log('User registered successfully');
            // Optionally, you can redirect the user to another page
            // window.location.href = '/login'; // Example redirection
          } else {
            const data = await response.json();
            console.error('Failed to register user:', data.message);
          }
        } catch (error) {
          console.error('Error registering user:', error);
        }

        // Reset form fields after submission if needed
        setFormData({
          username: '',
          email: '',
          password: ''
        });

        // Reset form submission state
        setFormSubmitted(false);
      }
    };

    registerUser();
  }, [formSubmitted, formData]); // Dependency array includes formSubmitted

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      setFormSubmitted(true);
    } else {
      console.log('Form validation failed');
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              <label htmlFor="username" className="col-sm-3 col-form-label text-left">UserName:</label>
              <div className="col-sm-9">
                <input 
                  type="text" 
                  className={`form-control ${errors.username && 'is-invalid'}`} 
                  id="username" 
                  name="username" 
                  value={formData.username} 
                  onChange={handleInputChange} 
                  placeholder="Enter username" 
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="email" className="col-sm-3 col-form-label text-left">Email:</label>
              <div className="col-sm-9">
                <input 
                  type="email" 
                  className={`form-control ${errors.email && 'is-invalid'}`} 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  placeholder="Enter email" 
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="password" className="col-sm-3 col-form-label text-left">Password:</label>
              <div className="col-sm-9">
                <input 
                  type="password" 
                  className={`form-control ${errors.password && 'is-invalid'}`} 
                  id="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleInputChange} 
                  placeholder="Enter password" 
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12">
                <button type="submit" className="btn btn-primary btn-block">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
