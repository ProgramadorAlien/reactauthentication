import React from 'react';
import './Register.css'; // Your CSS file for custom styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

function App() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form>
            <div className="form-group row">
              <label htmlFor="username" className="col-sm-3 col-form-label text-left">UserName:</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="username" placeholder="Enter username" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="email" className="col-sm-3 col-form-label text-left">Email:</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" id="email" placeholder="Enter email" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="password" className="col-sm-3 col-form-label text-left">Password:</label>
              <div className="col-sm-9">
                <input type="password" className="form-control" id="password" placeholder="Enter password" />
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

export default App;
