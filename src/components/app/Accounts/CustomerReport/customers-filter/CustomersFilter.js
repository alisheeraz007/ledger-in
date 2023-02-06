import React, { useEffect, useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useCustomersUIContext } from "../CustomersUIContext";

const prepareFilter = (queryParams, values) => {
  const { status, type, searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = { type: type };
  // Filter by status
  // Filter by type
  // Filter by all fields
  if (searchText) {
    filter[type] = searchText;
    // filter.phoneNumber = searchText;
    // filter.email = searchText;
    // filter.Address = searchText;
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};
let arr = [
  { key: "CustomerName", value: "Customer Name" },
  { key: "phoneNumber", value: "Phone Number" },
  { key: "email", value: "email" },
  { key: "Address", value: "Address" },
];
export function CustomersFilter({ listLoading, ShowFilter }) {
  // Customers UI Context
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      queryParams: customersUIContext.queryParams,
      setQueryParams: customersUIContext.setQueryParams,
    };
  }, [customersUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(customersUIProps.queryParams, values);
    if (!isEqual(newQueryParams, customersUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      customersUIProps.setQueryParams(newQueryParams);
      // update list by queryParams
    }
  };

  useEffect(() => {
    if (!ShowFilter)
      applyFilter({
        type: "CustomerName",
        searchText: "",
      });
  }, [ShowFilter]);
  return (
    <>
      {ShowFilter ? (
        <Formik
          initialValues={{
            type: "CustomerName",
            searchText: "",
          }}
          onSubmit={(values) => {
            applyFilter(values);
          }}
        >
          {({
            values,
            handleSubmit,
            handleBlur,
            handleChange,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} className="form form-label-right">
              <div className="row" style={{ marginTop: "11px" }}>
                <div className="col-lg-6">
                  {/* <small className="form-text text-muted">
                  <b>Filter</b> by {values.Type}
                </small> */}
                  <select
                    className="form-control"
                    placeholder="Filter by Type"
                    name="type"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue("type", e.target.value);
                    }}
                    value={values.type}
                  >
                    {arr.map((value, i) => (
                      <option key={i} value={value.key}>
                        {value.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-6">
                  {/* <small className="form-text text-muted">
                  <b>Search</b> in all fields
                </small> */}
                  <input
                    type="text"
                    className="form-control"
                    name="searchText"
                    placeholder="Search"
                    onBlur={handleBlur}
                    onKeyDown={(ev) => {
                      if (ev.keyCode == 13) {
                        handleSubmit();
                      }
                    }}
                    value={values.searchText}
                    onChange={(e) => {
                      setFieldValue("searchText", e.target.value);
                    }}
                  />
                </div>
              </div>
            </form>
          )}
        </Formik>
      ) : null}
    </>
  );
}
