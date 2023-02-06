// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import * as actions from "../../../_redux/Users/UsersActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../_metronic/_helpers";
import * as uiHelpers from "../UsersUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../_metronic/_partials/controls";
import { UsersUIProvider, useUsersUIContext } from "../UsersUIContext";
// import { UsersLoadingDialog } from "../../../../../app/modules/ECommerce/pages/Users/Users-loading-dialog/UsersLoadingDialog";
// import UsersTableMock from "../../../../../app/modules/ECommerce/__mocks__/UsersTableMock";
import { connect } from "react-redux";
import UsersMiddileware from "../../../../redux/middleWare/UsersMIddileWare";
import { Regexfilter, Regexfilter_New } from "../../../../redux/constants";

const UsersTable = (props) => {
  // Users UI Context
  let { ShowButton } = props;
  const UsersUIContext = useUsersUIContext();
  const UsersUIProps = useMemo(() => {
    return {
      ids: UsersUIContext.ids,
      setIds: UsersUIContext.setIds,
      queryParams: UsersUIContext.queryParams,
      setQueryParams: UsersUIContext.setQueryParams,
      openEditUsersDialog: UsersUIContext.openEditUsersDialog,
      openDeleteUsersDialog: UsersUIContext.openDeleteUsersDialog,
    };
  }, [UsersUIContext]);

  const [entities, SetEntities] = useState([]);
  const [TotalLength, setTotalLEngth] = useState(0);
  const [filterVal, setfilterVal] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
  });
  const { totalCount, listLoading } = props.UsersReducer;
  function paginationFn(
    { pageSize, pageNumber },
    UserArr = props.UsersReducer.entities
  ) {
    var perPage = pageSize;

    var showFrom = perPage * (pageNumber - 1);
    var showTo = showFrom + perPage;
    let obj = props.authReducer.user;
    let arr = UserArr;
    setTotalLEngth(arr.length);
    props.setResetFilter(false);
    SetEntities(arr.slice(showFrom, showTo));
    // }
  }
  useEffect(() => {
    UsersUIProps.setIds([]);
    if (props.UsersReducer.entities) {
      paginationFn(UsersUIProps.queryParams);
    }
  }, [UsersUIProps.queryParams, props]);
  const getvalue = (ev) => {
    props.setShowButton(true);
    setfilterVal({
      ...filterVal,
      [ev.target.name]: ev.target.value,
    });
    paginationFn(
      UsersUIProps.queryParams,
      Regexfilter_New(props.UsersReducer.entities, {
        ...filterVal,
        [ev.target.name]: ev.target.value,
      })
    );
  };
  useEffect(() => {
    if (props.ResetFilter) {
      setfilterVal({
        fullname: "",
        email: "",
        phoneNumber: "",
      });
      props.setShowButton(false);
    }
  }, [props.ResetFilter]);

  const columns = [
    {
      dataField: "fullname",
      text: "User Name",
      headerFormatter: () => {
        return (
          <div>
            <p>User Name</p>
            {ShowButton && (
              <input
                name="fullname"
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.fullname}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "email",
      text: "Email",
      headerFormatter: () => {
        return (
          <div>
            <p>Email</p>
            {ShowButton && (
              <input
                name="email"
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.email}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "phoneNumber",
      text: "Phone Number",
      headerFormatter: () => {
        return (
          <div>
            <p>PhoneNumber</p>
            {ShowButton && (
              <input
                name="phoneNumber"
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.phoneNumber}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditUsersDialog: UsersUIProps.openEditUsersDialog,
        openDeleteUsersDialog: UsersUIProps.openDeleteUsersDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: TotalLength,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: UsersUIProps.queryParams.pageSize,
    page: UsersUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={props.UsersReducer.entities.length ? false : true}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive table-hover table-sm"
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                bordered={false}
                remote
                keyField="db_id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  UsersUIProps.setQueryParams
                )}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
};
function mapDispatchToProps(dispatch) {
  return {
    // GetAlluser: (data) => dispatch(CustomerMiddileware.GetAllUser()),
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
    UsersReducer: state.UsersReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
