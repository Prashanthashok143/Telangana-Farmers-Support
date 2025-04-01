import React, { useContext, useEffect, useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import {  Link } from "react-router-dom";
import * as Yup from "yup";
import { Button, Modal } from "antd";
import axios from "axios";
import moment from "moment";
import Card from 'react-bootstrap/Card';
import {  Container } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';

import "../css/Schemes.css";
import { AuthProvider } from "../App";

const Schemes = () => {
  const {authenticate}=useContext(AuthProvider)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schemeData,setSchemeData]=useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const initialValues = {
    name: "",
    department: "",
    description: "",
    eligibility: "",
    financialSupport: "",
    frequency: "",
    applicationProcess:"",
    officialWebsite:"",
    file: null,
    date:"", 
  };
  const validateSchema = Yup.object({
  name: Yup.string().required("Required"),
    department: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    eligibility: Yup.string().required("Required"),
    financialSupport: Yup.string().required("Required"),
    frequency: Yup.string().required("Required"),
    applicationProcess: Yup.string().required("Required"),
    officialWebsite: Yup.string().required("Required"),
    file: Yup.mixed().required("Required"),
    date:Yup.date().required("Required")
  });
  const onSubmit=async(values,form)=>{
      // console.log(values)
    const formValues=new FormData();
    formValues.append("name",values.name)
    formValues.append("department",values.department)
    formValues.append("description",values.description)
    formValues.append("eligibility",values.eligibility)
    formValues.append("financialSupport",values.financialSupport)
    formValues.append("applicationProcess",values.applicationProcess)
    formValues.append("frequency",values.frequency)
    formValues.append("officialWebsite",values.officialWebsite)
    formValues.append("file",values.file)
    formValues.append("date",values.date)

    // console.log([...formValues]); to see the data append in FormData

    try{
   const data= await axios.post("https://telangana-farmers-support-backend.onrender.com/addSchemes",formValues);
   console.log(data);
  
   form.resetForm();
    }catch(err){
      console.log(err)
    }
  }
  const getSchemes=async()=>{
   try{
    const res=await axios.get("https://telangana-farmers-support-backend.onrender.com/getSchemes");
    setSchemeData(res.data);

   }catch(err){
    console.log(err)
   }

  }
  useEffect(()=>{
    getSchemes();
  },[schemeData])
  
  return (
    <div>
      {
        authenticate &&       <Button type="primary" className="Addmp-btn" onClick={showModal}>
        Add Scheme
      </Button>
      }

      <Modal
        title="Add Scheme"
        open={isModalOpen}
        // onOk={handleOk}
        //This function that will be triggered when a user clicks the OK button.
        onCancel={handleCancel}
        footer={false}
        //onCancel: This function that will be triggered when a user clicks mask, close or cancel button
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={onSubmit}

        >
          {({ setFieldValue }) => (
            <Form className="SchemeForm">
              <div className="FormFeild d-flex flex-column">
                <label htmlFor="name">Scheme Name</label>
                <Field
                  className="Field m-0 w-100"
                  type="text"
                  name="name"
                  id="name"
                />
                <ErrorMessage name="name" component={ShowError} />
              </div>
              <div className="FormFeild d-flex flex-column">
                <label htmlFor="department">Department</label>
                <Field
                  className="Field m-0 w-100"
                  type="text"
                  name="department"
                  id="department"
                />
                <ErrorMessage name="department" component={ShowError} />
              </div>
              <div className="FormFeild d-flex flex-column">
                <label htmlFor="description">Description</label>
                <Field
                  className="Field m-0 w-100"
                  component="textarea"
                  name="description"
                  rows="3"
                  id="description"
                />
                <ErrorMessage name="description" component={ShowError} />
              </div>

              <div className="FormFeild d-flex flex-column">
                <label htmlFor="eligibility">Eligibility</label>
                <Field
                  className="Field m-0 w-100"
                  type="text"
                  name="eligibility"
                  id="eligibility"
                />
                <ErrorMessage name="eligibility" component={ShowError} />
              </div>

              <div className="FormFeild d-flex flex-column">
                <label htmlFor="financialSupport">Financial Support</label>
                <Field
                  className="Field m-0 w-100"
                  type="text"
                  name="financialSupport"
                  id="financialSupport"
                />
                <ErrorMessage name="financialSupport" component={ShowError} />
              </div>
              <div className="FormFeild d-flex flex-column">
                <label htmlFor="frequency">Frequency</label>
                <Field
                  className="Field m-0 w-100"
                  type="text"
                  name="frequency"
                  id="frequency"
                />
                <ErrorMessage name="frequency" component={ShowError} />
              </div>
              <div className="FormFeild d-flex flex-column">
                <label htmlFor="applicationProcess">Application Process</label>
                <Field
                  className="Field m-0 w-100"
                  component="textarea"
                  name="applicationProcess"
                  id="applicationProcess"
                />
                <ErrorMessage name="applicationProcess" component={ShowError} />
              </div>
              <div className="FormFeild d-flex flex-column">
                <label htmlFor="officialWebsite">Official Website</label>
                <Field
                  className="Field m-0 w-100"
                  type="text"
                  name="officialWebsite"
                  id="officialWebsite"
                />
                <ErrorMessage name="officialWebsite" component={ShowError} />
              </div>

              <div className="FormFeild d-flex flex-column">
                <label htmlFor="file">file</label>
                <input
                  name="file"
                  id="file"
                  type="file"
                  className="Field"
                  onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage name="file" component={ShowError} />
              </div>
              <div className="FormFeild d-flex flex-column">
              <label htmlFor="cropName">Date</label>
                <Field className="Field" type="date" name="date" id="date" />
                <ErrorMessage name="date" component={ShowError} />
              </div>
              <button type="submit" className="btn btn-danger">
                submit
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    <div>

<div className="schemes">
      {schemeData.length > 0 &&
        schemeData.map(
          ({
            _id,
            name,
            department,
            description,
            eligibility,
            financialSupport,
            applicationProcess,
            frequency,
            officialWebsite,
            date,
            file,
          }) => (
            <Container key={_id} className="mt-4">
              <Card className="scroll-card">
                <Card.Img variant="top" src={file} height="300px" />
                <Card.Body>
                  <Card.Title>{name}</Card.Title>
                  <div className="scroll-content">
                    <ListGroup variant="flush">
                      <ListGroup.Item><strong>Department:</strong> {department}</ListGroup.Item>
                      <ListGroup.Item><strong>Description:</strong> {description}</ListGroup.Item>
                      <ListGroup.Item><strong>Eligibility:</strong> {eligibility}</ListGroup.Item>
                      <ListGroup.Item><strong>Financial Support:</strong> {financialSupport}</ListGroup.Item>
                      <ListGroup.Item><strong>Application Process:</strong> {applicationProcess}</ListGroup.Item>
                      <ListGroup.Item><strong>Frequency:</strong> {frequency}</ListGroup.Item>
                      <ListGroup.Item><strong>Date:</strong> {moment(date).format("DD-MM-YYYY")}</ListGroup.Item>
                    </ListGroup>
                    <Button variant="primary">
                      <Link to={officialWebsite} className="link-style">Visit Official Website</Link>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Container>
          )
        )}
    </div>
    </div>
   
    </div>
  );
};

export default Schemes;

const ShowError = (props) => {
  return (
    <div>
      <p className="ms-2 text-danger">{props.children}</p>
    </div>
  );
};
