import React, { useEffect, useMemo, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import { Divider } from "@material-ui/core";
function TypesModal(props) {
  // Customers UI Context
  let { Types, show, onHide } = props;
  return (
    <Modal
      size="sm"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">All Types</Modal.Title>
      </Modal.Header>
      {Types ? (
        <Modal.Body>
          <Table borderless className="col-md-12">
            <tr>
              <th>S.NO</th>
              <th>Type</th>
              {/* <th>Action</th> */}
            </tr>
            {Types.map((value, i) => {
              return (
                <tr>
                  <th>{i + 1}</th>
                  <td>{value}</td>
                </tr>
              );
            })}
          </Table>
        </Modal.Body>
      ) : null}
    </Modal>
  );
}
function mapDispatchToProps(dispatch) {
  return {};
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TypesModal);
