import React, { useEffect, useMemo } from "react";
import { Field, Formik } from "formik";
import { isEqual } from "lodash";
import { useSaleUIContext } from "../AccountUIContext";
import { DatePickerField } from "../../../../../_metronic/_partials/controls";

const prepareFilter = (queryParams, values) => {
  const { status, type, searchText, from, to } = values;
  const newQueryParams = { ...queryParams };
  const filter = { type: type };
  // Filter by status
  // Filter by type
  // Filter by all fields
  if (type == "date") {
    filter.from = from ? from : "";
    filter.to = to ? to : "";
  } else if (searchText && type !== "date") {
    filter[type] = searchText;
    // filter.phoneNumber = searchText;
    // filter.email = searchText;
    // filter.Address = searchText;
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};
let arr = [
  // { key: "date", value: "Date wise" },
  { key: "CustomerName", value: "Customer Name" },
  { key: "amount", value: "amount" },
];
export function SaleFilter({ listLoading, ShowFilter }) {
  // Customers UI Context
  const customersUIContext = useSaleUIContext();
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
        from: new Date(),
        to: new Date(),
        amount: "",
      });
  }, [ShowFilter]);
  return (
    <>
      {ShowFilter ? (
        <Formik
          initialValues={{
            type: "CustomerName",
            searchText: "",
            from: new Date(),
            to: new Date(),
            amount: "",
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
            <form
              onSubmit={handleSubmit}
              className="form form-label-right col-md-12"
            >
              <div className="row" style={{ marginTop: "11px" }}>
                <div className="col-md-3">
                  <DatePickerField
                    name="from"
                    onChange={(e) => {
                      setFieldValue("from", e);
                      setFieldValue("type", "date");
                      handleSubmit();
                    }}
                  />
                </div>
                <div className="col-md-3">
                  <DatePickerField
                    name="to"
                    onChange={(e) => {
                      setFieldValue("to", e);
                      setFieldValue("type", "date");
                      handleSubmit();
                    }}
                  />
                </div>
                <div className="col-md-3">
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
                <div className="col-md-3">
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
