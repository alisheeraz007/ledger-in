import React, { useMemo, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { CustomersFilter } from "./customers-filter/CustomersFilter";
import CustomersTable from "./customers-table/customerTable";
import { useCustomersUIContext } from "./CustomersUIContext";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
export function CustomersCard() {
  const customersUIContext = useCustomersUIContext();
  const [ResetFilter, setResetFilter] = useState(false);
  const [ShowButton, setShowButton] = useState(false);

  const customersUIProps = useMemo(() => {
    return {
      ids: customersUIContext.ids,
      newCustomerButtonClick: customersUIContext.newCustomerButtonClick,
    };
  }, [customersUIContext]);

  return (
    <Card>
      <CardHeader title={"Suppliers"}>
        <CardHeaderToolbar>
          {ShowButton && (
            <button
              onClick={() => setResetFilter(true)}
              className="btn btn-light ml-2"
              style={{
                padding: "8px",
              }}
            >
              <i
                className="fa fa-redo"
                style={{
                  fontSize: "1.1rem",
                }}
              ></i>
              Reset
            </button>
          )}
          <button
            onClick={() => {
              setShowButton(!ShowButton);
              if (ShowButton) {
                setResetFilter(true);
              }
            }}
            className={`btn ${ShowButton ? "btn-dark" : "btn-light"} ml-2`}
            style={{
              padding: "8px",
            }}
          >
            <i
              className="fa fa-filter"
              style={{
                fontSize: "1.1rem",
              }}
            ></i>
            filter
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={customersUIProps.newCustomerButtonClick}
          >
            New Supplier
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* <CustomersFilter /> */}
        <CustomersTable
          ResetFilter={ResetFilter}
          setResetFilter={setResetFilter}
          ShowButton={ShowButton}
          setShowButton={setShowButton}
        />
      </CardBody>
    </Card>
  );
}
