// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";
// import * as actions from "../../../_redux/Account/AccountActions";
import * as uiHelpers from "../AccountUIHelpers";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../_metronic/_partials/controls";
import { useAccountUIContext } from "../AccountUIContext";
import ProductMiddileware from "../../../../redux/middleWare/ProductMIddileWare";
import TypesModal from "./TypesModal";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { makeStyles } from "@material-ui/core";

const useTreeItemStyles = makeStyles((theme) => ({
  parent: {
    color: "#181c32",
    margin: "3px",
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  parent2: {
    color: "#3699ff",
    margin: "3px",
    backgroundColor: "#e1f0ff",
  },
}));

function AccountTable(props) {
  // Account UI Context
  const classes = useTreeItemStyles();
  const AccountUIContext = useAccountUIContext();
  const AccountUIProps = useMemo(() => {
    return {
      ids: AccountUIContext.ids,
      setIds: AccountUIContext.setIds,
      queryParams: AccountUIContext.queryParams,
      setQueryParams: AccountUIContext.setQueryParams,
      openEditAccountPage: AccountUIContext.openEditAccountPage,
      openDeleteAccountDialog: AccountUIContext.openDeleteAccountDialog,
    };
  }, [AccountUIContext]);

  const [entities, SetEntities] = useState([]);
  const [Types, SetTypes] = useState(false);
  const { totalCount, listLoading } = props.AccountReducer;
  function paginationFn({ pageSize, pageNumber }) {
    var perPage = pageSize;
    var showFrom = perPage * (pageNumber - 1);
    var showTo = showFrom + perPage;
    // SetEntities(props.AccountReducer.entities.slice(showFrom, showTo));
    SetEntities(props.AccountReducer.entities);
  }
  useEffect(() => {
    AccountUIProps.setIds([]);
    if (props.AccountReducer.entities) {
      paginationFn(AccountUIProps.queryParams);
    }
  }, [AccountUIProps.queryParams, props]);
  const columns = [
    {
      dataField: "main_Heads",
      text: "main Head",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "HeadType",
      text: "Account Type",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "typesLength",
      text: "Type",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditAccountPage: AccountUIProps.openEditAccountPage,
        openDeleteAccountDialog: AccountUIProps.openDeleteAccountDialog,
        openAccountsTypesDialog: (val) => SetTypes(val),
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
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: AccountUIProps.queryParams.pageSize,
    page: AccountUIProps.queryParams.pageNumber,
  };
  return (
    <>
      {/* <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination isLoading={false} paginationProps={paginationProps}>
              <BootstrapTable
                wrapperClasses="table-responsive table-hover table-sm"
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                bordered={false}
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  AccountUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: AccountUIProps.ids,
                  setIds: AccountUIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    <TypesModal Types={Types} onHide={() => SetTypes(false)} show={Types} /> */}
      <TreeView
        // className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {uiHelpers.Main_Heads.map((value, index) => {
          return (
            <TreeItem nodeId={index} label={value}>
              {entities.length
                ? entities.map((data, i) => {
                    return (
                      data.main_Heads == value && (
                        <TreeItem
                          nodeId={index + "." + i}
                          label={data.HeadType}
                          classes={{
                            root: classes.parent,
                          }}
                        >
                          {data.types
                            ? data.types.map((type, i2) => {
                                return (
                                  <TreeItem
                                    nodeId={index + "." + i + "." + i2}
                                    label={
                                      typeof type === "string"
                                        ? type
                                        : type.type
                                    }
                                    classes={{
                                      root: classes.parent2,
                                    }}
                                  >
                                  </TreeItem>
                                );
                              })
                            : null}
                        </TreeItem>
                      )
                    );
                  })
                : null}
            </TreeItem>
          );
        })}
      </TreeView>
    </>
  );
}
function mapDispatchToProps(dispatch) {
  return {
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
    AccountReducer: state.AccountReducer,
    ProductReducer: state.ProductReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountTable);
