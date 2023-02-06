import React, { useMemo, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { UsersFilter } from "./User-filter/UsersFilter";
// import { UsersFilter } from "./Users-filter/UsersFilter";
import UsersTable from "./Users-table/UsersTable";
// import { UsersGrouping } from "./Users-grouping/UsersGrouping";
import { useUsersUIContext } from "./UsersUIContext";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
export function UsersCard() {
  const [ResetFilter, setResetFilter] = useState(false);
  const [ShowButton, setShowButton] = useState(false);
  const UsersUIContext = useUsersUIContext();
  const UsersUIProps = useMemo(() => {
    return {
      ids: UsersUIContext.ids,
      newaddUsersButtonClick: UsersUIContext.newUsersButtonClick,
    };
  }, [UsersUIContext]);

  return (
    <Card>
      <CardHeader title="Users list">
        {/* <UsersFilter ShowFilter={ShowFilter} />
        <CardHeaderToolbar>
          <div
            className="topbar-item"
            onClick={() => setShowFilter(!ShowFilter)}
          >
            <div
              className="btn btn-icon btn-clean btn-lg mr-1"
              id="kt_quick_search_toggle"
            >
              <span className="svg-icon svg-icon-xl svg-icon-primary">
                <SVG
                  src={
                    ShowFilter
                      ? toAbsoluteUrl("/media/svg/icons/Navigation/Close.svg")
                      : toAbsoluteUrl("/media/svg/icons/General/Search.svg")
                  }
                />
              </span>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={UsersUIProps.newaddUsersButtonClick}
          >
            New User
          </button>
        </CardHeaderToolbar> */}
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
            onClick={UsersUIProps.newaddUsersButtonClick}
          >
            New User
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <UsersTable
          ResetFilter={ResetFilter}
          setResetFilter={setResetFilter}
          ShowButton={ShowButton}
          setShowButton={setShowButton}
        />
      </CardBody>
    </Card>
  );
}
