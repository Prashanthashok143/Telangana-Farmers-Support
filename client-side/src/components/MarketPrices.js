import React, { useContext, useEffect } from "react";
import { Modal } from "antd";
import { useState } from "react";
import { Button,DatePicker } from "antd";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Table from "react-bootstrap/Table";
import moment from "moment";
import "../css/MarketPrices.css";
import { AuthProvider } from "../App";
const {RangePicker}=DatePicker;

const MarketPrices = () => {
  const {authenticate}=useContext(AuthProvider)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pricesData, setPricesData] = useState([]);
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("All");
  const [frequency, setFrequency] = useState("365");
  const [selectData,setSelectData]=useState([]);
  const [editData, setEditData] = useState(null);
  const [updateId,setUppdateId]=useState(-1);


  const showModal = () => {
    setIsModalOpen(true);
  };

    // const handleOk = () => {
    //   setIsModalOpen(false);
    // };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const initialValues = {
    cropName: "",
    marketName: "",
    pricePerQuintal: 0,
    date: "",
    location: [],
  };
  const validate = (value) => {
    let error;
    if (value <= 0) {
      error = "price greater than 0";
    }
    return error;
  };
  const validateSchema = Yup.object({
    cropName: Yup.string().required("Required"),
    marketName: Yup.string().required("Required"),
    pricePerQuintal: Yup.number().positive("Price must be greater than 0").required("Required"),
    date: Yup.date().required("Required"),
  });
  const onSubmit = async (values, form) => {

    try {
      if(updateId!==-1){
        await axios.put(`http://localhost:5000/updatePrice/${updateId}`, values);
       setUppdateId(-1);
       setEditData(null);
      }else{
        await axios.post(
          "http://localhost:5000/addMarketPrice",
          values
        );
      }
      
     setIsModalOpen(false);
      form.resetForm();
      
      getPrices(search,district,frequency);
    } catch (err) {
      console.log(err);
    }
  };
  const getPrices = async (search,district,frequency,selectData) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/marketPrices?search=${search}&district=${district}&frequency=${frequency}&range=${selectData}`
      );
      // console.log(response.data);
      setPricesData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPrices(search,district,frequency,selectData);

  }, [search,district,frequency,selectData]);

const handleEdit=async(_id)=>{
const response=  await axios.get(`http://localhost:5000/marketPrices/${_id}`);
const date=moment(response.data.date).format('YYYY-MM-DD')
const {cropName,marketName,pricePerQuintal}=response.data;
setEditData({ cropName, marketName, pricePerQuintal,date });
setIsModalOpen(true);
setUppdateId(_id)
console.log(response)
console.log(response.data.cropName)
}
const handleDelete = async (_id) => {
  try {
    await axios.delete(`http://localhost:5000/deletePrice/${_id}`);
    getPrices(search, district, frequency, selectData); 
  } catch (err) {
    console.error("Error deleting price:", err);
  }
};





  return (
    <div>
      <div className="MarketRates-nav">
        <h6>Market Rates</h6>
        <div className="fliters">
        <input
            type="search"
            placeholder="Search Crop name here ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="filter-child"
          />
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="filter-child"
          >
            <option value="All">All Districts</option>
            <option value="Adilabad">Adilabad</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Karimnagar">Karimnagar</option>
            <option value="Khammam">Khammam</option>
            <option value="Mahabubnagar">Mahabubnagar</option>
            <option value="Medak">Medak</option>
            <option value="Nalgonda">Nalgonda</option>
            <option value="Nizamabad">Nizamabad</option>
            <option value="Ranga Reddy">Ranga Reddy</option>
            <option value="Warangal">Warangal</option>
          </select>
          <select value={frequency} onChange={(e)=>setFrequency(e.target.value)} className="filter-child">
            <option value="7">Last week</option>
            <option value="30">Last Month</option>
            <option value="365">Year</option>
            <option value="custom">custom</option>
          </select>

          
          
        </div>
        {frequency ==="custom" && <RangePicker className="range" value={selectData} onChange={(values)=>setSelectData(values)}/>}
        {
          authenticate &&   <Button type="primary" className="Addmp-btn" onClick={showModal}>Add Price</Button>
        }
      
        
      </div>
      

       <Modal
        title="Market Prices"
        open={isModalOpen}
        // onOk={handleOk}
        //This function that will be triggered when a user clicks the OK button.
        onCancel={handleCancel}
        footer={false}
        //onCancel: This function that will be triggered when a user clicks mask, close or cancel button
      >
        <Formik
        enableReinitialize={true}
          initialValues={editData || initialValues}  
          validationSchema={validateSchema}
          onSubmit={onSubmit}
        >
          <Form className="Form d-flex flex-column">
            <div className="FormFeilds d-flex flex-column">
              <label htmlFor="cropName">cropName</label>
              <Field
                className="Field"
                type="text"
                name="cropName"
                id="cropName"
              />
              <ErrorMessage name="cropName" component={ShowError} />
            </div>
            <div className="FormFeilds d-flex flex-column">
              <label htmlFor="marketName">marketName</label>
              <Field
                className="Field"
                type="text"
                name="marketName"
                id="marketName"
              />
              <ErrorMessage name="marketName" component={ShowError} />
            </div>
            <div className="FormFeilds d-flex flex-column">
              <label htmlFor="pricePerQuintal">pricePerQuintal</label>
              <Field
                className="Field"
                type="text"
                name="pricePerQuintal"
                id="pricePerQuintal"
                validate={validate}
              />
              <ErrorMessage name="pricePerQuintal" component={ShowError} />
              <div className="FormFeilds d-flex flex-column">
                <label htmlFor="cropName">Date</label>
                <Field className="Field" type="date" name="date" id="date" />
                <ErrorMessage name="date" component={ShowError} />
              </div>
            </div>
            <div>
            
               <button className="btn btn-danger mt-2" type="submit">
              Add
            </button>
  
            
             
      
            </div>
          </Form>
        </Formik>
      </Modal> 

      <Table striped bordered hover responsive="lg" className=" text-center text-nowrap">
        <thead>
          <tr>
            <th>cropName</th>
            <th>marketName</th>
            <th>pricePerQuintal</th>
            <th>Date</th>
            {
              authenticate &&  <th colSpan="2">Actions</th>
            }
           
          </tr>
        </thead>
        <tbody>
          { 
          pricesData.length > 0 ? (
            pricesData.map(
              ({ _id, cropName, marketName, pricePerQuintal, date }) => (
                <tr key={_id}>
                  <td>{cropName}</td>
                  <td>{marketName}</td>
                  <td>{pricePerQuintal}</td>
                  <td>{moment(date).format('DD-MM-YYYY')}</td>
                  {
                    authenticate && (
                      <>
                      <td><button className="btn btn-success m-0" onClick={()=>handleEdit(_id)}>Edit</button></td>
                      <td><button className="btn btn-danger m-0" onClick={() => handleDelete(_id)}>Delete</button></td>
                      </>
                    )
                  }
                
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={"5"}>No Records Found</td>
            </tr>
          )}
          
        </tbody>
      </Table>
    </div>
  );
};

export default MarketPrices;

const ShowError = (props) => {
  return (
    <div>
      <p className="ms-2 text-danger">{props.children}</p>
    </div>
  );
};
