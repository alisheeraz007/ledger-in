import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";

export function UsersEditDialogHeader({ id, UsersForEdit }) {
  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Users";
    if (UsersForEdit && id) {
      _title = `Edit Users '${
        UsersForEdit.fullname ? UsersForEdit.fullname : ""
      }'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [UsersForEdit]);

  return (
    <>
      {/* {actionsLoading && <ModalProgressBar />} */}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
