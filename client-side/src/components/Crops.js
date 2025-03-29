import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "../css/Crops.css"
import { useNavigate } from "react-router-dom";
import {  Container } from "react-bootstrap";
import { Button } from "antd";
const Crops = () => {
  const navigate=useNavigate();
  const [data, setData] = useState([]);
  const [load,setLoad]=useState(true);
  const[errorMsg , setErrorMsg]=useState("");
  const cropsData = async () => {
    setLoad(true);
    try {
      const {data} = await axios.get("http://localhost:5000/getCrop");
      if(data.length>0){
        setLoad(false)
        setData(data)
      }
    } catch (err) {
      setLoad(false)
      setErrorMsg(err.message)
      // console.log(err.message);
      
    }
  };

  useEffect(() => {
    cropsData();
  }, []);
  const AddCrop=()=>{
   navigate("/addCrop")
  }
  return (
    <>
    <div className="d-flex justify-content-end">
      <button className="btn btn-danger" onClick={AddCrop}>ADD</button>
    </div>
    <div className="m-3 Crops">
      {data?.length > 0 &&
        data.map(({_id,name,type,region,pricePerQuintal,season,soilType,waterRequirement,fertilizerTips,demand,imageURL,lastUpdated,additionalNotes}) => (
          <Container key={_id} className="mt-4">
          <Card className="Card">
            <Card.Img variant="top" src={imageURL} height="300px" alt={name} />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>
                {additionalNotes}
              </Card.Text>
            
            <div className="content">
            <ListGroup className="list-group-flush">
              <ListGroup.Item><strong>type : </strong>{type}</ListGroup.Item>
              <ListGroup.Item><strong>region : </strong>{region}</ListGroup.Item>
              <ListGroup.Item><strong>pricePerQuintal : </strong>{pricePerQuintal}</ListGroup.Item>
              <ListGroup.Item><strong>season : </strong>{season}</ListGroup.Item>
              <ListGroup.Item><strong>soilType : </strong>{soilType}</ListGroup.Item>
              <ListGroup.Item><strong>waterRequirement : </strong>{waterRequirement}</ListGroup.Item>
              <ListGroup.Item><strong>fertilizerTips : </strong>{fertilizerTips}</ListGroup.Item>
              <ListGroup.Item><strong>demand : </strong>{demand}</ListGroup.Item>
              {/* <ListGroup.Item><strong>lastUpdated : </strong>{lastUpdated}</ListGroup.Item> */}

            </ListGroup>
            <Button>

            
            <small className="text-muted">Last-updated {lastUpdated}</small>
            </Button>
            
        
        </div>
            </Card.Body>
           
          </Card>
          </Container>
        ))}
       {
        load && <h1>Loading .............</h1> 
       }
       {
          data?.length<=0&& <h1>{errorMsg}</h1>
       }
    </div>
    </>
  );
};

export default Crops;
