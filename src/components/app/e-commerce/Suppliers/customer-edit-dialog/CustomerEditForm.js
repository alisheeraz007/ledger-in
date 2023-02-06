// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";

import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../_metronic/_partials/controls";

// Validation schema
const CustomerEditSchema = Yup.object().shape({
  SupplierName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Customer Name is required"),
  phoneNumber: Yup.string()
    .min(11, "please enter correct number format")
    .max(11, "please enter correct number format"),
});

export function CustomerEditForm({
  saveCustomer,
  customer,
  // actionsLoading,
  onHide,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...customer, dateOfBbirth: new Date(),date: new Date().getTime() }}
        validationSchema={CustomerEditSchema}
        onSubmit={(values) => {
          if (customer.db_id) {
            saveCustomer(values, customer.db_id);
          } else {
            saveCustomer(values);
          }
        }}
      >
        {({ handleSubmit,setFieldValue,values }) => (
          <>
            <Modal.Body
              style={{ backgroundColor: "aliceblue" }}
              className="overlay overlay-block cursor-default"
            >
              <Form className="form form-label-right">
                <div className="form-group ">
                  <div className="col-lg-12">
                    <Field
                      name="SupplierName"
                      component={Input}
                      placeholder="Supplier Name"
                      label="Supplier Name"
                    />
                  </div>
                  <div className="col-lg-12">
                    <Field
                      name="CompanyName"
                      component={Input}
                      placeholder="Customer Name"
                      label="Supplier Company Name"
                    />
                  </div>
                    {/* <div className="col-lg-12">
                      <Select name="CustomerType" label="Customer Type">
                        <option value="Retailer">Retailer</option>
                        <option value="WholeSealer">Whole Sealer</option>
                      </Select>
                    </div> */}
                  {/* Login */}
                  <div className="col-lg-12">
                    <Field
                      name="phoneNumber"
                      component={Input}
                      placeholder="Phone Number"
                      label="Phone Number"
                      type="text"
                    />
                  </div>
                  <div className="col-lg-12">
                    <Field
                      type="email"
                      name="email"
                      component={Input}
                      placeholder="Email"
                      label="Email"
                    />
                  </div>
                  <div className="col-lg-12">
                    <Field
                      name="Address"
                      component={Input}
                      placeholder="Address"ll
                      label="Address"
                    />
                  </div>
                  <div className="col-lg-12">
                    <Field
                      name="Balance"
                      component={Input}
                      placeholder="Balance"
                      label="Balance"
                    />
                  </div>
                  {/* <div className="col-lg-12">
                    <Field
                      name="date"
                      component={Input}
                      placeholder="Date"
                      label="Date"
                      type='date'
                      value={new Date()}

                  </div> */}
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: "aliceblue" }}>
              <div className="row col-lg-12">
                <button
                  onClick={onHide}
                  type="button"
                  className="btn btn-light btn-elevate col-lg-6"
                >
                  Cancel
                </button>
                <> </>
                <button
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="btn btn-primary btn-elevate col-lg-6"
                >
                  Save
                </button>
              </div>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
