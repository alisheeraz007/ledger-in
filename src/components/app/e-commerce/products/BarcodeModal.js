import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "react-bootstrap";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import PrintIcon from "@material-ui/icons/Print";
import ReactDOM from "react-dom";
import Barcode from "react-barcode";
import { BarPrint } from "./../../../redux/constants";

const useStyles = makeStyles((theme) => ({
  //   modal: {
  //     display: 'flex',
  //     // alignItems: 'center',
  //     // justifyContent: 'center',
  //     // flexDirection: 'column'
  //   },
  //   paper: {
  //     backgroundColor: theme.palette.background.paper,
  //     border: '2px solid #000',
  //     boxShadow: theme.shadows[5],
  //     padding: theme.spacing(2, 4, 3),
  //   },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

export default function BarCodeModal(props) {
  const classes = useStyles();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [barArr, setBarArr] = useState([]);
  const getBar = (quantity) => {
    let quantityArr = [];
    for (let j = 0; j < quantity; j++) {
      quantityArr.push(j);
    }
    return quantityArr;
  };
  const getBarLtd = (quantity) => {
    let quantityArr = [];
    for (let j = 0; j < quantity; j++) {
      quantityArr.push(j);
    }
    return quantityArr;
  };
  useEffect(() => {
  }, [barArr]);
  return (
    <>
      <Button
        variant="outlined"
        size="small"
        className={classes.button}
        onClick={handleShow}
        disabled={props.rightChecked.length === 0}
      >
        {/* &lt; */}
        <PrintIcon />
      </Button>
      {/* <Button variant="primary" onClick={handleShow}> */}
      {/* </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        //   backdrop="static"
        //   keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title >
            Barcode
          </Modal.Title>
        </Modal.Header>
        <Modal.Body id="barPrint" className="BarModal">
          <div className="printPaper">
            {props.rightChecked.length
              ? Object.values(props.rightChecked).map((a, i) => {
                

                  // return i % 2 === 0 || i === 0 ? (
                  return (props.quantity
                    ? getBarLtd(Number(props.quantity))
                    : getBar(Number(a.quantity))
                  ).map((b, j) => {
                    return j % 2 === 0 || j === 0 ? (
                      <div
                        className="barCode right"
                      >
                        <div className="proDet">
                          <p>{a.product_name}</p> <p>{a.color}</p>{" "}
                        </div>
                        <Barcode
                          value={a.bar_code}
                          width="2"
                          format="CODE128A"
                          font="monospace"
                          height="60"
                          fontSize="10"
                          textMargin="5"
                          // margin="10"
                          displayValue="false"
                          className="barCodeClass"
                          // style={{width: "170px"}}
                        />
                        <div  className="price">
                          <p>{a.bar_code}</p>
                          <p> Retail Price: {a.retailPrice}</p>
                        </div>
                        {/* <a href="https://www.barcodesinc.com/generator/"><img src="https://www.barcodesinc.com/generator/image.php?code=20-10-0001&style=197&type=C128B&width=180&height=50&xres=1&font=3" alt="the barcode printer: free barcode generator" border="0"></a> */}
                      </div>
                    ) : (
                      <div className="barCode">
                        <div className="proDet">
                          <p>{a.product_name}</p> <p>{a.color}</p>{" "}
                        </div>
                        <Barcode
                          value={a.bar_code}
                          width="2"
                          format="CODE128A"
                          font="monospace"
                          height="60"
                          fontSize="10"
                          // margin="10"
                          className="barCodeClass"
                          displayValue="false"
                        />
                        <div className="price">
                          <p>{a.bar_code}</p>
                          <p> Retail Price: {a.retailPrice}</p>
                        </div>
                      </div>
                    );
                  });
                })
              : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => BarPrint("barPrint")}>
            {" "}
            <PrintIcon /> Print
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
