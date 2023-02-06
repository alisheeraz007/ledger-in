import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import ProductMiddileware from "./../../../redux/middleWare/ProductMIddileWare";
import BarCodeModal from "./BarcodeModal";
import SearchIcon from "@material-ui/icons/Search";
import { Input } from "@material-ui/core";
// import { DatePicker } from "@material-ui/pickers";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

import {
  TodayFilter,
  SaleRegexFilter,
  AvaliableProductQuantity,
  BarcodeFilter
} from "./../../../redux/constants";
import Barcode from "react-barcode";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 400,
    // height: 380,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function ProductBarcode(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  let [searchDrop, setSearchDrop] = useState(false);
  // let [count, setCount] = useState(0);

  let [quantity, setQuantity] = useState("");

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  let [barCodesArr, setBarCodesArr] = useState("");
  useEffect(() => {
    // let arr = []
    // if(props.ProductReducer.entities){
    //     for(let i = 0; i < (props.ProductReducer.entities.length); i++ ){
    //         // setBarCodesArr([props.ProductReducer.entities[i].bar_code])
    //         arr.push(props.ProductReducer.entities[i].bar_code)
    //     }
    // }
    if (props.ProductReducer.entities) {
      setBarCodesArr(props.ProductReducer.entities);
    }
  }, [props.ProductReducer.entities]);

  useEffect(() => {
    // let sort = Object.values(barCodesArr).sort(
    if (barCodesArr) {
      let sort = barCodesArr.sort(
        (a, b) => Number(a.bar_code.slice(6)) - Number(b.bar_code.slice(6))
      );
      setLeft(TodayFilter(sort));
    }

    // );
  }, [barCodesArr]);
  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  let [filterBarcode, setFilterBarcode] = useState("");
  let [filterProName, setFilterProName] = useState("");
  let [filterColor, setFilterColor] = useState("");
  let [date, setDate] = useState("");

  // function filterBar(value,name) {
  //   let arr2 = left.length ? [...left]:[...barCodesArr];
  //   if(name === 'barcode'){
  //     arr2 = barCodesArr.filter(
  //       (b) => b.bar_code.toLowerCase().match(value.toLowerCase())
  //       );
  //     }else if (name==='productname'){
  //       arr2 = barCodesArr.filter(
  //         (b) => b.product_name.toLowerCase().match(value.toLowerCase())
  //         );
  //     }else if (name==='color'){
  //       arr2 = barCodesArr.filter(
  //         (b) => b.color.toLowerCase().match(value.toLowerCase())
  //         );
  //     }

  //   setLeft(arr2);
  // }
  let [fromDate, setFromDate] = useState(new Date());
  let [toDate, setToDate] = useState(new Date());
  let [barCode, setBarCode] = useState("");
  function ClearFilter() {
    // setLeft(left.length ? left : props.ProductReducer.entities);
    setFromDate(new Date());
    setToDate(new Date());
    if (barCodesArr) {
      let sort = barCodesArr.sort(
        (a, b) => Number(a.bar_code.slice(6)) - Number(b.bar_code.slice(6))
      );
      setLeft(TodayFilter(sort));
    }

    setSearchDrop(false);
  }

  useEffect(() => {
    if (searchDrop) {
      let date = new Date(fromDate);
      let yesterday = date;
      // yesterday.setDate(yesterday.getDate() - 1);
      setLeft(
        SaleRegexFilter(
          props.ProductReducer.entities,
          "",
          "",
          { from: fromDate, to: toDate, bar_code: barCode },
          true
        )
      );
    }
  }, [fromDate, toDate, barCode, props.ProductReducer.entities, searchDrop]);



  const customList = (title, items, filter) => (
    <Card className="ListBars">
      <div className="headerBar">
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Checkbox
              onClick={handleToggleAll(items)}
              checked={
                numberOfChecked(items) === items.length && items.length !== 0
              }
              indeterminate={
                numberOfChecked(items) !== items.length &&
                numberOfChecked(items) !== 0
              }
              disabled={items.length === 0}
              inputProps={{ "aria-label": "all items selected" }}
            />
          }
          title={title}
          subheader={`${numberOfChecked(items)}/${items.length} selected`}
        />
        {filter ? (
          <div>
            <Button
              variant="dark"
              onClick={() =>
                searchDrop ? setSearchDrop(false) : setSearchDrop(true)
              }
            >
              <SearchIcon />
            </Button>
            {searchDrop ? (
              <Button variant="dark" onClick={() => ClearFilter()}>
                <CancelIcon />
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
      <Divider />
      {searchDrop && filter ? (
        <>
          <div className="filterDrop">
            <div className="filterField">
              <DatePicker
                name="fromDate"
                label="Date"
                placeholderText="From Date"
                className="form-control"
                style={{ width: "40%" }}
                selected={fromDate}
                autoComplete="off"
                onChange={(ev) => {
                  // getvalue(e, "from");
                  // setFieldValue("date", ev);
                  setFromDate(new Date(ev));
                }}
              />
              <DatePicker
                name="toDate"
                label="Date"
                placeholderText="To Date"
                className="form-control"
                style={{ width: "40%" }}
                selected={toDate}
                autoComplete="off"
                onChange={(ev) => {
                  // getvalue(e, "from");
                  // setFieldValue("date", ev);
                  setToDate(new Date(ev));
                }}
              />
              <Input
                className="input"
                onChange={(ev) => setBarCode(ev.target.value, "barcode")}
                placeholder="barcode"
              />
            </div>
          </div>
          <Divider />
        </>
      ) : null}
      <List
        className={classes.list}
        style={searchDrop && filter ? { height: "250px" } : { height: "380px" }}
        dense
        component="div"
        role="list"
      >
        {items.length
          ? items.map((value, i) => {
              const labelId = `transfer-list-all-item-${value}-label`;

              return (
                <ListItem key={i} role="listitem" button>
                  <ListItemIcon>
                    <Checkbox
                      onClick={handleToggle(value)}
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={`${value.bar_code} (${value.product_name}) (${value.color}) (${value.quantity}) `}
            
                  />
                  {!filter ? (
                    <div className="counter addQuan">
                      {/* <button
                        type="button"
                        onClick={() => incrementCount(value, i)}
                      >
                        +
                      </button> */}
                      <input
                        type="number"
                        defaultValue={value.quantity}
                        // value={}
                        onChange={(ev) => {
                      
                          setQuantity(
                            ev.target.value >
                              AvaliableProductQuantity(
                                props.AccountReducer.All_entries,
                                value.quantity,
                                value
                              )
                              ? toast.error(
                                  `There is only ${AvaliableProductQuantity(
                                    props.AccountReducer.All_entries,
                                    value.quantity,
                                    value
                                  )} quantity availble For this product`,
                                  {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                  }
                                )
                              : ev.target.value
                          );
                        }}
                      />
                      {/* <button type="button" onClick={() => DecrementCount()}>
                        -
                      </button> */}
                    </div>
                  ) : null}
                </ListItem>
              );
            })
          : null}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={(classes.root, "GridDiv")}
    >
      <Grid item className="itemsdiv">
        {customList("Choices", left, true)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <BarCodeModal rightChecked={rightChecked} quantity={quantity} />
        </Grid>
      </Grid>
      <Grid item className="itemsdiv">
        <div> {customList("Chosen", right)}</div>
      </Grid>
    </Grid>
  );
}
function mapDispatchToProps(dispatch) {
  return {};
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
    ProductReducer: state.ProductReducer,
    AccountReducer: state.AccountReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductBarcode);

// export default withRouter(ProductBarcode)
