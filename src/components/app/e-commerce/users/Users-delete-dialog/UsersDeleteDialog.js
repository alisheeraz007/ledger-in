import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";
import UsersMiddileware from "../../../../redux/middleWare/UsersMIddileWare";
// import * as actions from "../../../_redux/Users/UsersActions";
import { useUsersUIContext } from "../UsersUIContext";

function UsersDeleteDialog(props) {
  // Users UI Context
  let { id, show, onHide } = props;
  const UsersUIContext = useUsersUIContext();
  const UsersUIProps = useMemo(() => {
    return {
      setIds: UsersUIContext.setIds,
      queryParams: UsersUIContext.queryParams,
    };
  }, [UsersUIContext]);

  // Users Redux state
  // const dispatch = useDispatch();
  // const { isLoading } = useSelector(
  //   (state) => ({ isLoading: state.Users.actionsLoading }),
  //   shallowEqual
  // );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  // useEffect(() => {}, [isLoading, dispatch]);

  const deleteUsers = () => {
    // server request for deleting Users by id
    // dispatch(actions.deleteUsers(id)).then(() => {
    // refresh list after deletion
    // dispatch(actions.fetchUsers(UsersUIProps.queryParams));
    // clear selections list
    props.DeleteUsers(id);
    UsersUIProps.setIds([]);
    // closing delete modal
    onHide();
    // });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {/* {isLoading && <ModalProgressBar />} */}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          User Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* {!isLoading && ( */}
        <span>Are you sure to permanently delete this User?</span>
        {/* )} */}
        {/* {isLoading && <span>Users is deleting...</span>} */}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteUsers}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    DeleteUsers: (id) => dispatch(UsersMiddileware.DeleteUsers(id)),
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    UsersReducer: state.UsersReducer,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersDeleteDialog);
