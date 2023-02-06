/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
// import * as actions from "../../../_redux/products/productsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import MasterHeadEditForm from "./MasterHeadEditForm";
// import { Specifications } from "../product-specifications/Specifications";
// import { SpecificationsUIProvider } from "../product-specifications/SpecificationsUIContext";
import { useSubheader } from "../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";
import AccountMiddileWare from "../../../../redux/middleWare/accountMiddileWare";
// import { RemarksUIProvider } from "../product-remarks/RemarksUIContext";
// import { Remarks } from "../product-remarks/Remarks";
import { OverlayTrigger, Tooltip, Table } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
const initProduct = {
  main_Heads: "",
  HeadType: "",
};

function MasterHeadEdit(props) {
  // Subheader
  let {
    history,
    match: {
      params: { id },
    },
  } = props;
  const suhbeader = useSubheader();

  // Tabs
  const [SelectedAccount, setSelectedAccount] = useState("");
  const [table, setTable] = useState("Assets")
  const [table2, setTable2] = useState("")
  const [title, setTitle] = useState("");
  const [TypesArr, setTypesArr] = useState([]);
  const [MasterHeadForEdit, setMasterHeadForEdit] = useState("");
  const [TypeForEdit, setTypeForEdit] = useState("");
  const [TypeIndexForEdit, setTypeIndexForEdit] = useState("");
  useEffect(() => {
    if (id > -1 && props.AccountReducer.entities) {
      setMasterHeadForEdit(
        props.AccountReducer.entities.filter((obj, i) => {
          return i == id ? obj : [];
        })[id]
      );
      let obj = props.AccountReducer.entities.filter((obj, i) => {
        return i == id ? obj : [];
      })[id];
      if (obj) {
        setSelectedAccount(obj.HeadType);
      }
      // console.log(
      //   props.AccountReducer.entities.filter((obj, i) => {
      //     return i == id ? obj : [];
      //   })[id],
      //   "runnnn"
      // );
    }
  }, [id, props]);
  useEffect(() => {
    let arr = props.AccountReducer.entities.filter(
      (obj) => obj.main_Heads == table && obj.HeadType === table2
    )[0];
    if (arr) {
      // console.log(arr);
      setTypesArr(arr);
    }
  }, [SelectedAccount, props]);

  useEffect(() => {
    let _title = id ? "Edit Master Heads" : "New Master Heads";
    setTitle(_title);
    suhbeader.setTitle(_title);
  }, [MasterHeadForEdit, id]);
  // console.log(table2)

  const saveMasterHead = (values, index = null, type) => {
    // let ArrIndex = id ? id : index;
    // console.log(ArrIndex, values)
    // // if(values)
    // props.AddAccountHead({ data: [values] }, values.main_Heads, 'Added Sub Head');

    let ArrIndex = index;
    // console.log(ArrIndex, values)
    // if(values)
    // let arrObj = []

    // .........start
    // if(type === 'Delete'){
    //   let arr = props.AccountReducer.entities
    //   arr.push(values)
    //   props.AddAccountHead({ data: arr.filter(obj => obj.main_Heads === values.main_Heads) }, values.main_Heads, 'Deleted Sub Head');
    // }
    if (type === 'Delete') {
      // console.log('no')

      let arr = props.AccountReducer.entities
      arr.push(values)
      props.AddAccountHead({ data: values }, index, 'Delete Sub Head');
      // console.log(values[index])
      // console.log(arr)
    } else if (ArrIndex && type === 'Update') {
      // let arr = props.AccountReducer.entities
      // console.log('yess')
      // console.log(index)
      // console.log(values)
      props.AddAccountHead({ data: values }, index, 'Update Sub Head');
      
       // console.log(arr)
    }else  if (type !== 'Update') {
      // console.log('no')

      let arr = props.AccountReducer.entities
      arr.push(values)
      props.AddAccountHead({ data: arr.filter(obj => obj.main_Heads === values.main_Heads) }, values.main_Heads, 'Added Sub Head');
      // console.log(values[index])
      // console.log(arr)
    }
    // ...... end 

    // for (let i = 0; i < arr.length; i++)
    // if (values.HeadType === arr[i].HeadType )
    //   let objArr = []
    //   arr.map((a, i) => {
    //     // console.log(a)
    //     objArr.push(a)
    //   })
    // if (props.AccountReducer.entities.length) {
    //   let arr2 = props.AccountReducer.entities.filter(
    //     (obj) => obj.main_Heads == values.main_Heads && obj.HeadType == values.HeadType
    //   );
    //   console.log(values)
    //   arr2.push(values);
    //   console.log(arr2)
    //   props.AddAccountHead({ data: arr2 }, values.main_Heads, 'Added Sub Head')
    // } else {
    //   props.AddAccountHead({ data: [values] }, values.main_Heads, 'Added Sub Head');

    // }



    // if (ArrIndex != null) {
    //   if (props.AccountReducer.entities.length) {
    //     let arr = props.AccountReducer.entities.filter(
    //       (obj) => obj.main_Heads == values.main_Heads
    //     );
    //     arr.push(values);
    //     props.AddAccountHead(
    //       {
    //         data: arr,
    //       },
    //       values.main_Heads,
    //       "Add"
    //     );
    //     console.log('aaa')
    //     console.log(arr)
    //   } else {
    //     props.AddAccountHead({ data: [values] }, values.main_Heads, "Add");
    //     console.log('bb')
    //   }
    //   // BackToMasterHeadList();
    // } else {
    //   // props.EditProduct(values, id);
    //   if (props.AccountReducer.entities.length) {
    //     let oldarr = props.AccountReducer.entities;
    //     oldarr.splice(ArrIndex, 1, values);
    //     let arr = oldarr.filter((obj) => obj.main_Heads == values.main_Heads);
    //     props.AddAccountHead(
    //       {
    //         data: arr,
    //       },
    //       values.main_Heads,
    //       "Update"
    //     );
    //     console.log('cc')
    //   } else {
    //     props.AddAccountHead( { data: [values] }, values.main_Heads,'Added Sub Head');
    //     console.log('dd') 
    //   }
    //   // BackToMasterHeadList();
    // }
  };
  const saveHeadTypes = (values) => {
    // console.log(values)
    let arr = props.AccountReducer.entities
    // console.log(arr)
    let filterArr = arr.filter((obj, i) => obj.HeadType === values.HeadType && obj.main_Heads === values.main_Heads)
    let obj =
    {
      type: values.type,
      openingBalance: values.openingBalance,
    }
    // console.log(arr.indexOf(filterArr[0]))

    let arrOBJ = arr[arr.indexOf(filterArr[0])]
    if (arrOBJ.types) {
      arrOBJ.types.push(obj)
      // arrOBJ.types.push(obj)
    } else {
      arrOBJ.types = [obj]
      // arrOBJ.types = [obj]
    }
    // console.log(arr.filter(obj => obj.main_Heads === values.main_Heads))
    saveMasterHead(arr.filter(obj => obj.main_Heads === values.main_Heads), arrOBJ.main_Heads, "Update");

  };
  const EditHeadTypes = (values) => {
    console.log('runn')
    console.log(values)
    let arr = props.AccountReducer.entities;
    if (props.AccountReducer.entities.length) {
      let obj = props.AccountReducer.entities.filter(
        (obj) => obj.HeadType == values.HeadType && obj.main_Heads === values.main_Heads
      )[0];
      if (obj.types) {
        obj.types.splice(TypeIndexForEdit, 1, {
          type: values.type ? values.type : obj.types[TypeIndexForEdit].type ,
          openingBalance: values.openingBalance ? values.openingBalance : obj.types[TypeIndexForEdit].openingBalance ,
        });
        setTypeForEdit("");
        setTypeIndexForEdit("");
      }
      console.log(obj);
      saveMasterHead(arr.filter(obj => obj.main_Heads === values.main_Heads),obj.main_Heads, "Update");
      // for (var i = 0; i < arr.length; i++) {
      //   if (arr[i].HeadType == obj.HeadType && arr[i].main_Heads === obj.main_Heads) {
      //     console.log(arr)
      //     // console.log(i,"runn",'edit')

      //   }
      // }
    }
  };
  const DeleteHeadTypes = (i,values) => {

    console.log(TypesArr)
    // console.log(obj)
    // let arr = props.AccountReducer.entities;

    let arr = props.AccountReducer.entities;
    if (props.AccountReducer.entities.length) {
      let objF = props.AccountReducer.entities.filter(
        (obj) => obj == TypesArr
      )[0];
      if (objF.types) {
        objF.types.splice(i, 1);
          console.log(objF)
          saveMasterHead(arr.filter(obj => obj.main_Heads === TypesArr.main_Heads), objF.main_Heads,'Delete');
            // saveMasterHead(obj, obj[0].main_Heads,'Delete');
            // saveMasterHead(arr.filter(obj => obj.main_Heads === values.main_Heads), obj.main_Heads,'Delete');
      }
      
      // console.log(obj.types, i);
      // for (var i = 0; i < arr.length; i++) {
      //   if (arr[i].HeadType == obj.HeadType) {

      //   }
      // }
    }
    
  };
  const btnRef = useRef();
  const saveProductClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const BackToMasterHeadList = () => {
    history.push(`/Account/Master-Heads`);
  };

  return (
    <>
      <Card>
        {/* {actionsLoading && <ModalProgressBar />} */}
        <CardHeader title={title}>
          <CardHeaderToolbar>
            <button
              type="button"
              onClick={BackToMasterHeadList}
              className="btn btn-light"
            >
              <i className="fa fa-arrow-left"></i>
              Back To List
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <div className="row">
            <div className="col-lg-6 mt-5">
              <Card style={{ padding: "20px 5px", background: "aliceblue" }}>
                <MasterHeadEditForm
                  // actionsLoading={actionsLoading}

                  setTable={setTable}
                  setTable2={setTable2}
                  id={id}
                  initialValues={MasterHeadForEdit || initProduct}
                  btnRef={btnRef}
                  setSelectedAccount={(e) => setSelectedAccount(e)}
                  saveMasterHead={saveMasterHead}
                  saveHeadTypes={!TypeForEdit ? saveHeadTypes : EditHeadTypes}
                  TypeForEdit={TypeForEdit}
                  TypeButtonText={TypeForEdit ? "Edit Type" : "Add Type"}
                />
              </Card>
            </div>
            <div className="col-lg-6 mt-5">
              <Table className="col-lg-12  table-hover table-sm">
                <thead>
                  <tr>
                    <th >S.NO</th>
                    <th>Type</th>
                    <th>opening Balance</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {SelectedAccount
                    ? TypesArr
                      && TypesArr.main_Heads === table && TypesArr.HeadType === table2 ?
                      TypesArr.types ? TypesArr.types.map((value, i) => {

                        // console.log(value);
                        return (
                          <tr key={i}>
                            <th>{i + 1}</th>
                            <td>
                              {typeof value === "string" ? value : value.type}
                            </td>

                            <td>
                              {typeof value === "string"
                                ? ""
                                : value.openingBalance}
                            </td>
                            <td>
                              <OverlayTrigger
                                overlay={
                                  <Tooltip id="products-edit-tooltip">
                                    Edit Head
                                    </Tooltip>
                                }
                              >
                                <a
                                  className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3 mr-5"
                                  onClick={() => {
                                    // openEditAccountPage(rowIndex);
                                    setTypeForEdit(value);
                                    setTypeIndexForEdit(i);
                                  }}
                                >
                                  <span className="svg-icon svg-icon-md svg-icon-primary">
                                    <SVG
                                      src={toAbsoluteUrl(
                                        "/media/svg/icons/Communication/Write.svg"
                                      )}
                                    />
                                  </span>
                                </a>
                              </OverlayTrigger>

                              <OverlayTrigger
                                overlay={
                                  <Tooltip id="products-delete-tooltip">
                                    Delete Head
                                    </Tooltip>
                                }
                              >
                                <a
                                  className="btn btn-icon btn-light btn-hover-danger btn-sm"
                                  onClick={() => DeleteHeadTypes(i,value)}
                                >
                                  <span className="svg-icon svg-icon-md svg-icon-danger">
                                    <SVG
                                      src={toAbsoluteUrl(
                                        "/media/svg/icons/General/Trash.svg"
                                      )}
                                    />
                                  </span>
                                </a>
                              </OverlayTrigger>
                            </td>
                          </tr>
                        );
                      }) : null
                      : null
                    : null}
                </tbody>
              </Table>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    AddAccountHead: (data, main_Heads, ToastMEs) =>
      dispatch(AccountMiddileWare.AddAccountHead(data, main_Heads, ToastMEs)),
    AddHeadType: (data, main_Heads, ToastMEs) =>
      dispatch(AccountMiddileWare.AddHeadType(data, main_Heads, ToastMEs)),
    // EditProduct: (data, id) =>
    //   dispatch(ProductMiddileware.EditProduct(data, id)),
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
    ProductReducer: state.ProductReducer,
    AccountReducer: state.AccountReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MasterHeadEdit);
