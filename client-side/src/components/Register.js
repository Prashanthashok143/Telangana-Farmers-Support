import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../css/Signin.css";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";

const Register = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    const { name, email, password } = formData;
    if(email && password && name){
      try{
        const res= await axios.post("http://localhost:5000/register", { name, email, password });
        console.log(name,email,password)
        setFormData({name:"",email:"",password:""})
        console.log(res)
      }
catch(err){
  alert(err.response.data.message)
  console.log(err.response.data.message)
}
    }
    
    setValidated(true);
  };
  return (
    <div className="loginPage">
      <Form
        className="Login"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <h1>Sign Up</h1>
        <div className="w-100 m-1">
          <Form.Label>Name</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChanges}
              placeholder="Enter name"
              aria-describedby="inputGroupPrepend"
              required
            />

            <Form.Control.Feedback type="invalid">
              Please provide name
            </Form.Control.Feedback>
          </InputGroup>
        </div>
        <div className="w-100 m-1">
          <Form.Label>Email Address</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChanges}
              placeholder="Enter Email"
              aria-describedby="inputGroupPrepend"
              required
            />

            <Form.Control.Feedback type="invalid">
              Please provide email address
            </Form.Control.Feedback>
          </InputGroup>
        </div>

        <div className="w-100 m-1">
          <Form.Label>Password</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChanges}
              placeholder="Enter Password"
              aria-describedby="inputGroupPrepend"
              required
            />

            <Form.Control.Feedback type="invalid">
              Please provide password
            </Form.Control.Feedback>
          </InputGroup>
        </div>

        <Form.Group className="ms-2 gap-2 d-flex">
          <Form.Check
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <Form.Label>Check Password</Form.Label>
        </Form.Group>

        <div className="w-100 mt-3 ms-1">
          <Button variant="success" type="submit" className="w-100">
            Sign Up
          </Button>
        </div>
      </Form>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Register;
