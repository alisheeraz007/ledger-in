import React, { useEffect, useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useProductsUIContext } from "../ProductsUIContext";

const prepareFilter = (queryParams, values) => {
  const { type, searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = { type: type };
  if (searchText) {
    filter[type] = searchText;
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};
let arr = [
  { key: "bar_code", value: "Bar Code" },
  { key: "product_name", value: "Product Name" },
];
export function ProductsFilter({ listLoading, ShowFilter }) {
  // Products UI Context
  const productsUIContext = useProductsUIContext();
  const productsUIProps = useMemo(() => {
    return {
      setQueryParams: productsUIContext.setQueryParams,
      queryParams: productsUIContext.queryParams,
    };
  }, [productsUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(productsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, productsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      productsUIProps.setQueryParams(newQueryParams);
    }
  };
  useEffect(() => {
    if (!ShowFilter)
      applyFilter({
        type: "bar_code",
        searchText: "",
      });
  }, [ShowFilter]);
  return (
    <>
      {ShowFilter ? (
        <Formik
          initialValues={{
            type: "bar_code",
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
