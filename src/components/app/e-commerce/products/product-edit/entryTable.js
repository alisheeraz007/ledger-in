// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import * as actions from "../../../_redux/customers/customersActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../_metronic/_helpers";
import * as uiHelpers from "../ProductsUIHelpers";
import { Pagination } from "../../../../../_metronic/_partials/controls";
import { connect } from "react-redux";
import CustomerMiddileware from "../../../../redux/middleWare/CustomerMIddileWare";
import { ActionsColumnFormatter } from "./../products-table/column-formatters/ActionsColumnFormatter";
import { useCustomersUIContext } from "../../../e-commerce/customers/CustomersUIContext";
import { ProductsUIProvider, useProductsUIContext } from "../ProductsUIContext";
import { toast } from "react-toastify";

import {
  returnQuantity,
  AvaliableProductQuantity,
} from "./../../../../redux/constants";
import { Formik, Form, Field } from "formik";
import {
  DatePickerField,
  Input,
  Select,
} from "../../../../../_metronic/_partials/controls";
import { Table } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";


const EntryTable = (props) => {
  // const customersUIContext = useProductsUIContext();
  // const customersUIProps = useMemo(() => {
  //   return {
  //     setIds: customersUIContext.setIds,
  //     queryParams: customersUIContext.queryParams,
  //     setQueryParams: customersUIContext.setQueryParams,
  //     openEditSalePage: customersUIContext.openEditSalePage,
  //     openDeleteSaleDialog: customersUIContext.openDeleteSaleDialog,
  //   };
  // }, [customersUIContext]);
  // // useEffect(() => {
  // //   props.GetAlluser();
  // // }, []);
  // const [entities, SetEntities] = useState([]);
  // // const { totalCount, listLoading } = p;
  // function paginationFn({ pageSize, pageNumber }) {
  //   var perPage = pageSize;

  //   var showFrom = perPage * (pageNumber - 1);
  //   var showTo = showFrom + perPage;
  //   SetEntities(props.Entries.slice(showFrom, showTo));
  // }
  // // Customers Redux state
  // const dispatch = useDispatch();
  // // useEffect(() => {
  // //   props.GetAlluser();
  // // }, []);
  // useEffect(() => {
  //   // clear selections list
  //   customersUIProps.setIds([]);
  //   SetEntities([]);
  //   if (props.Entries) {
  //     paginationFn(customersUIProps.queryParams);
  //   }
  // }, [props, props.Entries, props.changeprops]);
  // // function check(entry) {
  // //   setEntryArr({
  // //     ...props.Entries,
  // //   });
  // // }
  // // Table columns
  // useEffect(() => {
  // }, [props.Entries]);

  // const columnsR = [
  //   {
  //     dataField: "product.product_name",
  //     text: "Product",
  //   },
  //   {
  //     dataField: "bar_code",
  //     text: "BarCode",
  //   },
  //   {
  //     dataField: "price",
  //     text: "price",
  //   },
  //   {
  //     dataField: "returnQty",
  //     text: "Return Qty",

  //   },
  //   {
  //     dataField: "action",
  //     text: "Actions",
  //     formatter: ActionsColumnFormatter,
  //     formatExtraData: {
  //       openEditCustomerDialog: customersUIProps.openEditSalePage,
  //       openDeleteCustomerDialog: customersUIProps.openDeleteSaleDialog,
  //     },
  //     classes: "text-right pr-0",
  //     headerClasses: "text-right pr-3",
  //     style: {
  //       minWidth: "100px",
  //     },
  //   },
  // ];

  // const columns = [
  //   {
  //     dataField: "product_name",
  //     text: "Product",
  //   },
  //   {
  //     dataField: "bar_code",
  //     text: "BarCode",
  //   },
  //   {
  //     dataField: "price",
  //     text: "price",
  //   },
  //   {
  //     dataField: "quantity",
  //     text: "Quantity",
  //     headerFormatter: () => (
  //       <p>
  //         quantity
  //       </p>

  //     ),
  //     // formatter: (cellContent, row, rowIndex) => (
  //     //   <>
  //     //     <input
  //     //       style={{ width: "71px", border: "none" }}
  //     //       defaultValue={row.quantity}
  //     //       onClick={() => {
  //     //         props.setAutoFocus(false);

  //     //       }}
  //     //       type="number"
  //     //       // value={(ev)=>!ev.target.value >= 0 ? 0 : ev.target.value }
  //     //       autoFocus={!props.autoFocus ? true : false}
  //     //       onChange={(ev) => {
  //     //         let obj = props.ProductReducer.entities.filter(
  //     //           (obj) => obj.bar_code == row.bar_code
  //     //         )[0];
  //     //         if (AvaliableProductQuantity(
  //     //           [...props.AccountReducer.All_entries, ...props.Entries],
  //     //           obj.quantity,
  //     //           row
  //     //         ) >= Number(ev.target.value)) {
  //     //           props.update(props.Entries, Number(ev.target.value), rowIndex);
  //     //         } else if (AvaliableProductQuantity(
  //     //           [...props.AccountReducer.All_entries, ...props.Entries],
  //     //           obj.quantity,
  //     //           row
  //     //         ) < Number(ev.target.value)) {
  //     //           toast.error(`You Have ${obj.quantity} Quantity Left`, {
  //     //             position: "top-right",
  //     //             autoClose: 5000,
  //     //             hideProgressBar: false,
  //     //             closeOnClick: true,
  //     //             pauseOnHover: true,
  //     //             draggable: true,
  //     //             progress: undefined,
  //     //           })

  //     //         }
  //     //       }
  //     //       }
  //     //     />
  //     //   </>
  //     // ),
  //   },
  //   {
  //     dataField: "action",
  //     text: "Actions",
  //     formatter: ActionsColumnFormatter,
  //     formatExtraData: {
  //       openEditCustomerDialog: customersUIProps.openEditSalePage,
  //       openDeleteCustomerDialog: customersUIProps.openDeleteSaleDialog,
  //     },
  //     classes: "text-right pr-0",
  //     headerClasses: "text-right pr-3",
  //     style: {
  //       minWidth: "100px",
  //     },
  //   },
  // ];
  // const Printcolumns = [
  //   {
  //     dataField: "product.product_name",
  //     text: "Product",

  //     // footer: (ev) => {
  //     //   return (
  //     //     <div style={{ fontSize: "12px" }}>
  //     //       Items:(
  //     //       {props.Entries.length ||
  //     //         props.returnEntries.retrunInvoiceArr.length}
  //     //       )
  //     //     </div>
  //     //   );
  //     // },
  //   },
  //   {
  //     dataField: "returnQty",
  //     text: "Qty",
  //     formatter: (cellcContent, row, rowIndex) => (
  //       <>
  //         {row.returnQty ? row.returnQty : row.quantity}
  //         {/* </p> */}
  //       </>
  //     ),
  //     // footer: (ev) => {
  //     //   return props.returnQty || props.returnEntries ? (
  //     //     <div style={{ fontSize: "12px" }}>
  //     //       Qty :({returnQuantity(props.returnEntries.retrunInvoiceArr)})
  //     //     </div>
  //     //   ) : (
  //     //       <div style={{ fontSize: "12px" }}>Qty :({props.TotalQuantity})</div>
  //     //     );
  //     // },
  //   },
  //   {
  //     dataField: "price",
  //     text: "Rate",

  //     // footer: (ev) => {
  //     //   return;
  //     // },
  //   },
  //   {
  //     dataField: "TotalAmount",
  //     text: "Total",
  //     formatter: (cellcContent, row, rowIndex) => (
  //       <>
  //         <p>
  //           {row.returnQty
  //             ? row.price * row.returnQty
  //             : row.price * row.quantity}
  //         </p>
  //       </>
  //     ),
  //     // footer: (ev) => {
  //     //   return props.returnEntries ? (
  //     //     <div style={{ fontSize: "12px" }}>
  //     //       Total({props.returnEntries.ReturnTotalAmount})
  //     //     </div>
  //     //   ) : (
  //     //       <div style={{ fontSize: "12px" }}>Total({props.TotalAmount})</div>
  //     //     );
  //     // },
  //   },
  // ];
  // // Table pagination properties
  // const paginationOptions = {
  //   custom: true,
  //   totalSize: props.Entries.length,
  //   sizePerPageList: uiHelpers.sizePerPageList,
  //   sizePerPage: customersUIProps.queryParams.pageSize,
  //   page: customersUIProps.queryParams.pageNumber,
  // };
  // let [quantity, setQuantity] = useState()

  function addQuant(a, quantity) {
    // console.log(props.Entries.indexOf(a))
    // console.log({ ...a, quantity: quantity })
    // props.setProductArr(props.productsArr.purchasedItems.splice(props.Entries.indexOf(a), 0, { ...a, quantity: quantity }))
    // props.productsArr.splice(props.Entries.indexOf(a), 1, { ...a, quantity: quantity })
    let arr = props.Entries.splice(props.Entries.indexOf(a), 1, { ...a, quantity: quantity })
    // console.log(arr)
    props.setProductArr(props.Entries)
    // console.log(props.productsArr)
  }
  return (
    <>

      <Table className="purchaseTable" striped bordered hover size="sm" style={{ fontSize: "11px" }}>
        <thead>
          <tr className="tableTr">
            <th className="tableTh">Barcode</th>
            <th className="tableTh">Product Name</th>
            <th className="tableTh">Price</th>
            <th className="tableTh">Quantity</th>
            <th className="tableTh">Total Amount</th>
            {props.from === "formTable" ?
              <th className="tableTh">Action</th>
              : null}
          </tr>
        </thead>
        <tbody>
          {props.from === "formTable" && props.Entries.length ?
            props.Entries.map((a, i) => {
              return (
                <tr className="tableTr">
                  <td className="tableTd" >{a.bar_code}</td>
                  <td className="tableTd">{a.product_name}</td>
                  <td className="tableTd">{a.price}</td>
                  <td className="tableTd">
                    {/* {a.quantity} */}
                    <input style={{ border: 'none', width: '60px', outline: 'none' }} type="number" defaultValue={a.quantity}
                      onChange={(ev) => {
                        addQuant(a, ev.target.value);
                        props.setFieldValue('quantitiy',ev.target.value)
                        // setQuantity(ev.target.value)
                      }} />
                  </td>
                  <td  className="tableTd">{Number(a.quantity) * Number(a.price)}</td>
                  <td className="tableTd">   <span className="svg-icon svg-icon-md svg-icon-danger" >
                    <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} onClick={() => props.removePro(a)} />
                    {/* <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")} onClick={() => props.editPro(a,props.setFieldValue,props.values)} /> */}
                  </span></td>
                </tr>
              )
            })
            :
            props.from === "modal" && props.Entries.purchasedItems.length ?
              props.Entries.purchasedItems.map((a, i) => {
                return (
                  <tr className="tableTR">
                    <td className="tableTd">{a.bar_code}</td>
                    <td className="tableTd">{a.product_name}</td>
                    <td className="tableTd">{a.price}</td>
                    <td className="tableTd">{a.quantity}</td>
                    <td className="tableTd">{Number(a.quantity) * Number(a.price)}</td>
                  </tr>
                )
              }) : null}
          {/* <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr> */}
        </tbody>
      </Table>





      {/* {props.returnEntries ? (
        <>
          <h3 style={{ fontWeight: "200", textAlign: "center" }}>
            Return Items
          </h3>


          <BootstrapTable
            wrapperClasses="table-responsive table-hover table-sm"
            bordered={true}
            classes="table table-head-custom table-vertical-center overflow-auto"
            bootstrap4
            bodyClasses="invoiceTableBody"

            keyField="product.db_id"
            data={props.returnEntries.retrunInvoiceArr}
            columns={columnsR}
            onTableChange={getHandlerTableChange(
              customersUIProps.setQueryParams
            )}
         >
            <PleaseWaitMessage entities={entities} />
            <NoRecordsFoundMessage entities={entities} />
          </BootstrapTable>
          <h3 style={{ fontWeight: "200", textAlign: "center" }}>
            Exchange Items
          </h3>
        </>
      ) : null}
      {props.ShowPagination ? (

        <BootstrapTable
          wrapperClasses="table-responsive table-hover table-sm"
          bordered={true}
          classes="table table-head-custom table-vertical-center overflow-auto"
          bootstrap4
          bodyClasses="invoiceTableBody"
          keyField="product.db_id"
          data={props.Entries}
          columns={columns}
          onTableChange={getHandlerTableChange(customersUIProps.setQueryParams)}

        >
          <PleaseWaitMessage entities={entities} />
          <NoRecordsFoundMessage entities={entities} />
        </BootstrapTable>
      ) : (
        
          <BootstrapTable
            wrapperClasses="table-responsive table-hover table-sm"
            bordered={false}
            classes="table table-head-custom table-vertical-center overflow-auto table-th-padding tableCustomize"
            style={{
              maxHeight: "89%",
            }}
            bootstrap4
            // remote
            keyField="product.db_id"
            data={props.Entries}
            columns={Printcolumns}
            footer={(ev) => console.log(ev)}
            // defaultSorted={uiHelpers.defaultSorted}
            onTableChange={getHandlerTableChange(customersUIProps.setQueryParams)}
          >
            <PleaseWaitMessage entities={props.Entries} />
            <NoRecordsFoundMessage entities={props.Entries} />
          </BootstrapTable>
        )} */}


    </>
  );
};
function mapDispatchToProps(dispatch) {
  return {
    GetAlluser: (data) => dispatch(CustomerMiddileware.GetAllUser()),
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
export default connect(mapStateToProps, mapDispatchToProps)(EntryTable);
