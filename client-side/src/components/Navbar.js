import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../css/Navbar.css";
import { AuthProvider } from "../App";
import { useContext } from "react";
// import { useNavigate } from "react-router-dom";

function NavScroll() {
  // const navigate=useNavigate();
  const {authenticate,setAuthenticate}=useContext(AuthProvider);
  const handleSignout=()=>{
    localStorage.removeItem("token");
    setAuthenticate(false)
  
    
  }
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          
        <img
              className="nav-logo"
              src="https://nlcbharat.org/wp-content/uploads/2024/02/Telangana.png"
              alt="ts-logo"
            />
        
         
          <h6 className="mt-2 p-1">Telangana Farmers Support</h6>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/schemes">Schemes</Nav.Link>
              <Nav.Link href="/crops">Crops</Nav.Link>
              <Nav.Link href="/marketPrices">Market Prices</Nav.Link>
            </Nav>
          
            <span className="d-flex justify-content-between">
              {
                authenticate ? <button className="btn btn-dark" onClick={handleSignout}>Sign out</button> : <><Nav.Link href="/signup" className="me-2">Signup</Nav.Link>
            <Nav.Link href="/signin" className="me-2">Sign in</Nav.Link></>
              }
            
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavScroll;
