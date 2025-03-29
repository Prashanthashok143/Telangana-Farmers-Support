import React, {  useState } from 'react';
import {Button,} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import "../css/Signin.css"
import InputGroup from 'react-bootstrap/InputGroup';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useLocation, useNavigate } from 'react-router-dom';
// import { UsernameProvider } from '../App';


const Login = () => {
  // const {setAuthenticate} =useContext(UsernameProvider)
  //   const [validated, setValidated] = useState(false);
    const[showPassword,setShowPassword] = useState(false);
  //   const navigate=useNavigate();
  //   const {pathname}=useLocation();
  //   useEffect(() => {
  //     window.scrollTo(0, 0);
  //   }, [pathname]);
  
   
    const[formData,setFormData]=useState({
    email:"User123@gmail.com",
    password:"User123#@password",
    })
    const handleChanges=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }
    // const handleSubmit=(e)=>{
    //     e.preventDefault();
    //     const{email,password}=formData;
    //     if(email !== "User123@gmail.com"  || password !== "User123#@password"){
    //       toast.error("Provide Correct Email and Password");
    //       setValidated(true);
    //     }else{
    //       navigate("/movies")
    //       localStorage.setItem("Username",email)
    //       setAuthenticate(true)
    //       setFormData({
    //         email:"",
    //         password:"",
            
    //       })
    //       setValidated(false)
    //     }
      
    //     const form = e.currentTarget;
    //     if (form.checkValidity() === false) {
    //       e.preventDefault();
    //       e.stopPropagation();
    //     }
    
       
      
    // }
  return (
    <div className="loginPage">
    


      <Form className='Login' noValidate >
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
        <div className='text-start mt-1'>
        <p>Email Address : User123@gmail.com 😎</p>
        <p>Password :User123#@password</p>
        </div>
    </Form>  
    {/* <ToastContainer /> */}
    </div>
  )
}

export default Login