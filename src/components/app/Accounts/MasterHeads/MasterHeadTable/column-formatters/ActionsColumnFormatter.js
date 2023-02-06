/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";
import ListAltIcon from "@material-ui/icons/ListAlt";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openEditAccountPage, openDeleteAccountDialog, openAccountsTypesDialog }
) => (
  <>
    {row.typesLength ? (
      <OverlayTrigger
        overlay={<Tooltip id="products-edit-tooltip">View All Types</Tooltip>}
      >
        <a
          title="View All Types"
          className="btn btn-icon btn-light btn-hover-success btn-sm mx-3"
          onClick={() => openAccountsTypesDialog(row.types)}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <ListAltIcon className="success svg-icon-primary label-light-success" />
          </span>
        </a>
      </OverlayTrigger>
    ) : null}
    <> </>
    <OverlayTrigger
      overlay={<Tooltip id="products-edit-tooltip">Edit Head</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={() => openEditAccountPage(rowIndex)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
          />
        </span>
      </a>
    </OverlayTrigger>

    <> </>
    <OverlayTrigger
      overlay={<Tooltip id="products-delete-tooltip">Delete Head</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm"
        onClick={() => openDeleteAccountDialog(rowIndex)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
        </span>
      </a>
    </OverlayTrigger>
  </>
);
