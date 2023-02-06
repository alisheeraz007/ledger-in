import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

export function CustomerEditDialogHeader({ id, customerForEdit }) {
  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Customer";
    if (customerForEdit && id) {
      _title = `Edit customer '${customerForEdit.firstName} ${customerForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [customerForEdit]);

  return (
    <>
      {/* {actionsLoading && <ModalProgressBar />} */}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
