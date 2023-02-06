import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import * as actions from "../../../_redux/Users/UsersActions";
import { UsersEditDialogHeader } from "./UsersEditDialogHeader";
import { UsersEditForm } from "./UsersEditForm";
import { useUsersUIContext } from "../UsersUIContext";
import UsersMiddileware from "../../../../redux/middleWare/UsersMIddileWare";
import { connect } from "react-redux";

function UsersEditDialog(props) {
  // Users UI Context
  let { id, show, onHide } = props;
  const UsersUIContext = useUsersUIContext();
  const UsersUIProps = useMemo(() => {
    return {
      initUsers: UsersUIContext.initUsers,
    };
  }, [UsersUIContext]);
  const [UsersForEdit, setUsersForEdit] = useState("");

  useEffect(() => {
    //   // server call for getting Users by id
    if (id && props.UsersReducer.entities) {
      setUsersForEdit(
        props.UsersReducer.entities.filter((obj) => obj.db_id == id)[0]
      );
    }
  }, [id]);

  // server request for saving Users
  const saveUsers = (Users, id, oldPassword) => {
    if (!id) {
      props.AddUsers(Users);
      onHide();
      // server request for creating Users
      // dispatch(actions.createUsers(Users)).then(() => onHide());
    } else {
      onHide();
      // server request for updating Users
      props.EditUsers({ ...Users, oldPassword }, id);
      // dispatch(actions.updateUsers(Users)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <UsersEditDialogHeader id={id} UsersForEdit={UsersForEdit} />
      <UsersEditForm
        saveUsers={saveUsers}
        // actionsLoading={actionsLoading}
        Users={UsersForEdit || UsersUIProps.initUsers}
        onHide={onHide}
      />
    </Modal>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    AddUsers: (data) => dispatch(UsersMiddileware.AddUsers(data)),
    EditUsers: (data, id) => dispatch(UsersMiddileware.EditUsers(data, id)),
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    UsersReducer: state.UsersReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersEditDialog);
