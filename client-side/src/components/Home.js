import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import Telangana from "./Telangana"
import "../css/Home.css";
const Home = () => {
  return (
<div className="Home">
<Carousel>
      <Carousel.Item>
      <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/India_Farming.jpg" className="d-block w-100" style={{height:"350px"}} alt="..."/>
      <Carousel.Caption>
      "వ్యవసాయం అభివృద్ధే దేశ అభివృద్ధి."
      (Agricultural progress is national progress.)
          </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="https://media.istockphoto.com/id/1161414177/photo/group-of-indian-village-farmers-working-in-a-paddy-field.jpg?s=612x612&w=0&k=20&c=DEezknm6lPEacKIW-JywanMIp9_AGxncm4bhLBpSILI=" className="d-block w-100" style={{height:"350px"}} alt="..."/>
         
       <Carousel.Caption>
       "మట్టిలో స్ఫూర్తి ఉంది, రైతులో జీవన శక్తి ఉంది."
       (There is inspiration in the soil, and vitality in the farmer.)
       </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEho9JsDsqE9pDtIP9CjU6BbRVRHRzIUTzgq_ZfslDmMDYFBQWclaI7UW6NRp7rT7fa_D28C_Lg9a4DkoJQEEtPRV-_DL0-D0d0KxZlJFf0NXXGWQeeoDKTSETOL4mA2BHBxSB7w8OuHvLmy/s1600/punjab+farmer.jpg" className="d-block w-100" style={{height:"350px"}} alt="..."/>
      
        <Carousel.Caption>
        "రైతు బాగుంటే దేశం బాగుంటుంది."
        (If the farmer is happy, the nation prospers.)
        </Carousel.Caption>
      </Carousel.Item>
      
    </Carousel>
    <Telangana/>
    </div>
  );
};

export default Home;
