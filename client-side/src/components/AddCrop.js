import React from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../css/AddCrop.css";
import axios from "axios";

const AddCrop = () => {
  const initialValues = {
    name: "",
    type: "",
    region: "",
    pricePerQuintal: 0,
    season: "",
    soilType: "",
    waterRequirement: "",
    fertilizerTips: "",
    demand: 0,
    file: null,
  };
  const validate = (value) => {
    let error;
    if (value <= 0) {
      error = "price greater than 0";
    }
    return error;
  };
  const validateSchema = Yup.object({
    name: Yup.string().required("Required"),
    type: Yup.string().required("Required"),
    region: Yup.string().required("Required"),
    // pricePerQuintal:Yup.number().required("Required"),
    season: Yup.string().required("Required"),
    soilType: Yup.string().required("Required"),
    waterRequirement: Yup.string().required("Required"),
    fertilizerTips: Yup.string().required("Required"),
    // demand:Yup.number().required("Required"),
    file: Yup.mixed().required("Required"),
  });
  const onSubmit = async (values, form) => {
    // console.log("Data ", values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("type", values.type);
    formData.append("region", values.region);
    formData.append("pricePerQuintal", values.pricePerQuintal);
    formData.append("soilType", values.soilType);
    formData.append("waterRequirement", values.waterRequirement);
    formData.append("season", values.season);
    formData.append("fertilizerTips", values.fertilizerTips);
    formData.append("demand", values.demand);
    formData.append("imageURL", values.file);
    // We use the FormData object when uploading files or handling complex form submissions
    //  that include binary data, such as images or documents.
    // 1. Handling Binary Data 2. Content-Type Headers( multipart/form-data)  3. Backend Compatibility
    // 4. Handling Mixed Data

    try {
      const res = await axios.post("https://telangana-farmers-support-backend.onrender.com/addCrop", formData);
      console.log(res);
      console.log(formData);
      form.resetForm();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={onSubmit}
      >
         {({ setFieldValue }) => (
        <Form className="Form">
          <div className="FormFeilds d-flex flex-column">
            <label htmlFor="name">Name</label>
            <Field className="Field" type="text" name="name" id="name" />
            <ErrorMessage name="name" component={ShowError} />
          </div>
          <div className="FormFeilds d-flex flex-column">
            <label htmlFor="type">type</label>
            <Field className="Field" type="text" name="type" id="type" />
            <ErrorMessage name="type" component={ShowError} />
          </div>
          <div className="FormFeilds d-flex flex-column">
            <label htmlFor="region">Region</label>
            <Field className="Field" type="text" name="region" id="region" />
            <ErrorMessage name="region" component={ShowError} />
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
          </div>
          <div className="FormFeilds d-flex flex-column">
            <label htmlFor="season">season</label>
            <Field className="Field" type="text" name="season" id="season" />
            <ErrorMessage name="season" component={ShowError} />
          </div>
          <div className="FormFeilds d-flex flex-column">
            <label htmlFor="soilType">soilType</label>
            <Field
              className="Field"
              type="text"
              name="soilType"
              id="soilType"
            />
            <ErrorMessage name="soilType" component={ShowError} />
          </div>

          <div className="FormFeilds d-flex flex-column">
            <label htmlFor="waterRequirement">waterRequirement</label>
            <Field
              className="Field"
              type="text"
              name="waterRequirement"
              id="waterRequirement"
            />
            <ErrorMessage name="waterRequirement" component={ShowError} />
          </div>
          <div className="FormFeilds d-flex flex-column">
            <label htmlFor="fertilizerTips">fertilizerTips</label>
            <Field
              className="Field"
              type="text"
              name="fertilizerTips"
              id="fertilizerTips"
            />
            <ErrorMessage name="fertilizerTips" component={ShowError} />
          </div>
          <div className="FormFeilds d-flex flex-column">
            <label htmlFor="demand">demand</label>
            <Field
              className="Field"
              type="text"
              name="demand"
              id="demand"
              validate={validate}
            />
            <ErrorMessage name="demand" component={ShowError} />
          </div>

          <div className="FormFeilds d-flex flex-column">
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

          <button type="submit" className="btn btn-danger">
            submit
          </button>
        </Form>
         )}
      </Formik>
    </div>
  );
};

export default AddCrop;

const ShowError = (props) => {
  return (
    <div>
      <p className="ms-2 text-danger">{props.children}</p>
    </div>
  );
};
