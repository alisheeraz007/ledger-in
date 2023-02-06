// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";
import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { openEditCustomerDialog, openDeleteCustomerDialog, ReturnItem }
) {
 
  return row.bar_code ? (
    <>
      {/* <a
        title="Return Item"
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={() => {
          ReturnItem(rowIndex,row);
        }}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <AssignmentReturnIcon />
        </span>
      </a> */}
      <> </>
    </>
  ) : null;
}
