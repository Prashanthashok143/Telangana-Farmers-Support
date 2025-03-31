import React, {  useContext, useState } from 'react';
import {Button,} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import "../css/Signin.css"
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { AuthProvider } from '../App';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate=useNavigate();
  const {setAuthenticate}=useContext(AuthProvider)
       const [validated, setValidated] = useState(false);
    const[showPassword,setShowPassword] = useState(false);

    const[formData,setFormData]=useState({
    email:"",
    password:"",
    })
    const handleChanges=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }

    const handleSubmit=async(event)=>{
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      const {email,password}=formData;
      try{
        const res=await axios.post("https://telangana-farmers-support-backend.onrender.com/signin",{email,password});
        navigate("/")
       localStorage.setItem("token",res.data.token)
       setAuthenticate(true);
       setFormData({
        email:"",
        password:"",
       })

      
      }
      catch(err){
        console.log(err)
      }
      setValidated(true);
    }
  return (
    <div className="loginPage">
    


      <Form className='Login' noValidate validated={validated} onSubmit={handleSubmit}>
      <h1>Login Page</h1>
      <div className="w-100 m-1">
      <Form.Label>Email Address</Form.Label> 
      <InputGroup hasValidation>
        <Form.Control
          type="email"
          name='email'
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
          type={showPassword ? "text":"password"}
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
        <Form.Check type="checkbox" checked={showPassword} onChange={()=>setShowPassword(!showPassword)} />
        <Form.Label>Check Password</Form.Label> 
      </Form.Group>
      
      

        <div className="w-100 mt-3 ms-1">
        <Button variant="success" type='submit' className='w-100'>Login</Button>
        </div>
   
    </Form>  
    </div>
  )
}

export default Login