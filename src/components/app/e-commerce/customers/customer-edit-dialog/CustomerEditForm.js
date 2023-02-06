// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../_metronic/_partials/controls";

// Validation schema
const CustomerEditSchema = Yup.object().shape({
  CustomerName: Yup.string()
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
        initialValues={{ ...customer, dateOfBbirth: new Date() }}
        validationSchema={CustomerEditSchema}
        onSubmit={(values) => {
          if (customer.db_id) {
            saveCustomer({...values,previousBalance:values.previousBalance ? values.previousBalance : 0}, customer.db_id);
          } else {
            saveCustomer({...values,previousBalance:values.previousBalance ? values.previousBalance : 0});
          }
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body
              style={{ backgroundColor: "aliceblue" }}
              className="overlay overlay-block cursor-default"
            >
              <Form className="form form-label-right">
                <div className="form-group ">
                  <div className="col-lg-12">
                    <Field
                      name="CustomerName"
                      component={Input}
                      placeholder="Customer Name"
                      label="Customer Name"
                    />
                  </div>
                  <div className="col-lg-12">
                    <Select name="CustomerType" label="Customer Type">
                      <option value="Retailer">Retailer</option>
                      <option value="WholeSealer">Whole Sealer</option>
                    </Select>
                  </div>
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
                      placeholder="Address"
                      label="Address"
                    />
                  </div>
                  <div className="col-lg-12">
                    <Field
                      name="previousBalance"
                      component={Input}
                      placeholder="previous Balance"
                      label="previous Balance"
                    />
                  </div>
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
