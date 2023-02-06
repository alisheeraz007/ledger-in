// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  {
    openEditCustomerDialog,
    openDeleteCustomerDialog,
    openEditjounalEntire,
    openSaleListDialog,
    checkUser,
    history
  }
) {
  return (
    row.CustomerName ? <p style={{ textAlign: "center" }}>No Action</p> :
      <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
        {/*         
{/*         
        {/*         
{/*         
        {/*         
{/*         
        {/*         
          <a
            title={ row.HeadType && row.HeadType.toLowerCase() === "account recievable" ? `No Action` : `Show Sale List`}
            className="btn btn-icon btn-light btn-hover-success btn-sm "
            onClick={() => row.HeadType && row.HeadType.toLowerCase() === "account recievable" ? null : openSaleListDialog(rowIndex)}
          >
            <span className="svg-icon svg-icon-md svg-icon-primary">
              <ListAltIcon className="success svg-icon-primary label-light-success" />
            </span>
          </a> */}
        {checkUser() ? (

          <>
            {row.RinvoiceNumber ? null :
              <a
                title="Edit customer"
                className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                onClick={() =>
                  // console.log(row)
                  openEditCustomerDialog(row)
                }
              >
                <span className="svg-icon svg-icon-md svg-icon-primary">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
                  />
                </span>
              </a>
            }

            <> </>
            <a
              style={row.RinvoiceNumber ? { width: "80%" } : null}
              title="Delete customer"
              className="btn btn-icon btn-light btn-hover-danger btn-sm "
              onClick={() => { openDeleteCustomerDialog(row) }}
            >
              <span className="svg-icon svg-icon-md svg-icon-danger">
                <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
              </span>
            </a>

          </>
        ) : null}
      </div>
  );
}
export default (ActionsColumnFormatter);
