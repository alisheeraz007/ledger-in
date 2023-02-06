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
const UsersEditSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("User name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 symbols")
    .required("Password is required"),
  phoneNumber: Yup.string()
    .min(11, "please enter correct number format")
    .max(11, "please enter correct number format")
});

export function UsersEditForm({
  saveUsers,
  Users,
  // actionsLoading,
  onHide,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...Users, dateOfBbirth: new Date() }}
        validationSchema={UsersEditSchema}
        onSubmit={(values) => {
          if (Users.db_id) {
            saveUsers(values, Users.db_id, Users.password);
          } else {
            saveUsers(values);
          }
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="fullname"
                      component={Input}
                      placeholder="User Name"
                      label="User Name"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      type="email"
                      name="email"
                      component={Input}
                      placeholder="Email"
                      label="Email"
                    />
                  </div>
                  {/* Password */}
                  <div className="col-lg-4">
                    <Field
                      type="password"
                      name="password"
                      component={Input}
                      placeholder="Password"
                      label="Password"
                    />
                  </div>
                  {/* Phone Number */}
                  <div className="col-lg-4">
                    <Field
                      name="phoneNumber"
                      type="number"
                      component={Input}
                      placeholder="Phone Number"
                      label="Phone Number"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Type */}
                  <div className="col-lg-4">
                    <Select name="type" label="Type">
                      <option value="0">Blocked</option>
                      <option value="1">Active</option>
                    </Select>
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
