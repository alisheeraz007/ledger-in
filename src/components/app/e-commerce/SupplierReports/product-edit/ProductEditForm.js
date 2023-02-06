// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../_metronic/_partials/controls";
import { Dropdown, Segment } from "semantic-ui-react";

import {
  AVAILABLE_COLORS,
  AVAILABLE_MANUFACTURES,
  ProductStatusTitles,
  ProductConditionTitles,
} from "../ProductsUIHelpers";

// Validation schema
const ProductEditSchema = Yup.object().shape({
  product_name: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("product Name is required"),
  quantity: Yup.number()
    .min(0, "0 is minimum")
    .max(1000000, "1000000 is maximum")
    .required("quanity is required"),
  color: Yup.string().required("Color is required"),
  price: Yup.number()
    .min(1, "$1 is minimum")
    .max(1000000, "$1000000 is maximum")
    .required("Price is required"),
  bar_code: Yup.string().required("Bar code is required"),
});

export function ProductEditForm({ product, btnRef, saveProduct, Code }) {
  const [OptionList, setOptionList] = useState([]);

  useEffect(() => {
    let arr = AVAILABLE_COLORS;
    let arr2 = [];
    for (var i = 0; i < arr.length; i++) {
      arr2.push({
        name: arr[i],
        value: arr[i],
        text: arr[i],
      });
    }
    setOptionList(arr2);
  }, []);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={product}
        validationSchema={ProductEditSchema}
        onSubmit={(values) => {
          saveProduct(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="bar_code"
                    component={Input}
                    disabled={true}
                    onChange={(ev) => {
                      setFieldValue("bar_code", Code(ev.target.value));
                    }}
                    placeholder="Bar code"
                    label="Bar code"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="product_name"
                    component={Input}
                    placeholder="Product Name"
                    label="Product Name"
                  />
                </div>
                <div className="col-lg-4">
                    <label>Color</label>
                    <br />
                    <Dropdown
                      placeholder="Color"
                      fluid
                      search
                      value={values.color}
                      // defaultValue=""
                      selection
                      scrolling
                      allowAdditions
                      options={OptionList}
                      name="color"
                      onChange={(e, { value }) => {
                        setFieldValue("color", value);
                      }}
                    />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    type="number"
                    name="quantity"
                    component={Input}
                    placeholder="Quantity"
                    label="Quantity"
                    customFeedbackLabel="Please enter Quantity"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    type="number"
                    name="price"
                    component={Input}
                    placeholder="Price"
                    label="Price "
                    customFeedbackLabel="Please enter Price"
                  />
                </div>
                <div className="col-lg-4">
                  <label>Date</label>
                  <Field
                    type="date"
                    name="price"
                    component={Input}
                    placeholder="Price"
                    label="Price "
                    customFeedbackLabel="Please enter Price"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <Field
                  name="description"
                  as="textarea"
                  className="form-control"
                />
              </div>
              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
