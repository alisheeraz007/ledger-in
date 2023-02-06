// auth action
export const ROUT_GUARD = "ROUT_GUARD";
export const SIGNUP = "SIGNUP";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";

export const SIGNIN = "SIGNIN";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILURE";

export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
const makingLength_2 = (value, miliseconds) => {
  if (miliseconds === "miliseconds") {
    value = value.toString();
    let correctValue =
      value.length === 1
        ? "00" + value
        : value.length === 2
          ? "0" + value
          : value;
    return correctValue;
  } else {
    value = value.toString();
    let correctValue = value.length === 1 ? "0" + value : value;
    return correctValue;
  }
};

export const entryNo = () => {
  let d = new Date();
  let year = d.getFullYear();
  let month = this.makingLength_2(d.getMonth() + 1);
  let date = this.makingLength_2(d.getDate());
  let hours = this.makingLength_2(d.getHours());
  let mintues = this.makingLength_2(d.getMinutes());
  let seconds = this.makingLength_2(d.getSeconds());
  let miliSeconds = this.makingLength_2(d.getMilliseconds(), "miliseconds");
  let entryNo =
    year.toString() +
    month.toString() +
    date.toString() +
    hours.toString() +
    mintues.toString() +
    seconds.toString() +
    miliSeconds.toString();
  return entryNo;
};

export const Regexfilter = (arr, value, Property) => {
  return arr.filter((obj) => {
    var regex = new RegExp(value, "gi");
    if (obj[Property]) {
      return obj[Property].match(regex);
    }
  });
};

export const Regexfilter_New = (arr, Valueobj) => {
  let keys = Object.keys(Valueobj);
  let array = arr;
  for (var i = 0; i < keys.length; i++) {
    let Property = keys[i];
    let value = Valueobj[keys[i]].toString();
    if (value) {
      array = array.filter((obj) => {
        var regex = new RegExp(value, "gi");
        if (obj[Property]) {
          return obj[Property].toString().match(regex);
        }
      });
    }
  }
  return array;
};
export const SaleRegexFilter = (
  arr,
  value,
  Property,
  All_filter,
  accEntries
) => {
  if (arr) {
    let keys = Object.keys(All_filter);
    let data = arr;
    for (var i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (key === "from" || key === "to") {
        data = data.filter((obj) => {
          let Today = new Date().setHours(0, 0, 0, 0);
          let from = All_filter.from
            ? All_filter.from.setHours(0, 0, 0, 0)
            : Today;

          let to = All_filter.to ? All_filter.to.setHours(0, 0, 0, 0) : Today;
          let objDate = new Date(obj.date).setHours(0, 0, 0, 0);
          let fromDateStr = All_filter.from
            ? All_filter.from.toLocaleDateString()
            : new Date().toLocaleDateString();
          let toDateStr = All_filter.to
            ? All_filter.to.toLocaleDateString()
            : new Date().toLocaleDateString();
          let objDateStr = new Date(obj.date).toLocaleDateString();
          if (
            Number(objDate) >= Number(from) &&
            Number(objDate) <= Number(to)
          ) {
            return obj;
          } else if (
            Number(objDate) === Number(from) ||
            Number(objDate) === Number(to)
          ) {
            return obj;
          } else if (fromDateStr === objDateStr && toDateStr === objDateStr) {
            return obj;
          }
        });
      }
      if (key === "CustomerName") {
        data = data.filter((obj) => {
          var regex = new RegExp(All_filter[key], "gi");
          // var regex = All_filter[key];
          if (obj.SaleItem && obj.SaleItem[0].customer[key]) {
            return obj.SaleItem[0].customer[key].match(regex);
          }
        });
      }
      if (key === "TotalAmount") {
        data = data.filter((obj) => {
          var regex = new RegExp(All_filter[key], "gi");
          // var regex = All_filter[key];
          if (obj.TotalAmount) {
            return obj.TotalAmount.toString().match(regex);
          }
        });
      }
      if (key === "TotalSaleItem") {
        data = data.filter((obj) => {
          var regex = new RegExp(All_filter[key], "gi");
          // var regex = All_filter[key];
          if (obj.TotalSaleItem) {
            return obj.TotalSaleItem.toString().match(regex);
          }
        });
      }
      if (key === "invoiceNumber") {
        data = data.filter((obj) => {
          var regex = new RegExp(All_filter[key], "gi");
          // var regex = All_filter[key];
          if (obj.invoiceNumber) {
            return obj.invoiceNumber.toString().match(regex);
          }
        });
      }
      if (key === "discount") {
        data = data.filter((obj) => {
          var regex = new RegExp(All_filter[key], "gi");
          // var regex = All_filter[key];
          if (obj.discount) {
            return obj.discount.toString().match(regex);
          }
        });
      }
      if (key === "main_Heads") {
        data = data.filter((obj) => {
          var regex = new RegExp(All_filter[key], "gi");
          // var regex = All_filter[key];
          if (obj.main_Heads) {
            return obj.main_Heads.toString().match(regex);
          }
        });
      }
      // if (key === "main_heads") {
      //   data = data.filter((obj) => {
      //     // var regex = new RegExp(All_filter[key], "gi");
      //     var regex = All_filter[key];
      //     if (obj.main_heads) {
      //       return obj.main_heads.toString().match(regex);
      //     }
      //   });
      // }
      // if (key === "ReturnNetAmount") {
      //   data = data.filter((obj) => {
      //     // var regex = new RegExp(All_filter[key], "gi");
      //     var regex = All_filter[key];
      //     if (obj.ReturnNetAmount) {
      //       return obj.ReturnNetAmount.toString().match(regex);
      //     }
      //   });
      // }
      // if (key === "payment_Type") {
      //   data = data.filter((obj) => {
      //     // var regex = new RegExp(All_filter[key], "gi");
      //     var regex = All_filter[key];
      //     if (obj.payment_Type) {
      //       return obj.payment_Type.toString().match(regex);
      //     }
      //   });
      // }
      if (accEntries && !(key === "from" || key === "to")) {
        data = data.filter((obj) => {
          var regex = new RegExp(All_filter[key], "gi");
          // var regex = All_filter[key];
          if (obj[key]) {
            return obj[key].toString().match(regex);
          }
        });
      }
      // if (key === "HeadType") {
      //   data = data.filter((obj) => {
      //     // var regex = new RegExp(All_filter[key], "gi");
      //     var regex = All_filter[key];
      //     if (obj.HeadType) {
      //       return obj.discount.toString().match(regex);
      //     }
      //   });
      // }
      // if (key === "type") {
      //   data = data.filter((obj) => {
      //     // var regex = new RegExp(All_filter[key], "gi");
      //     var regex = All_filter[key];
      //     if (obj.type) {
      //       return obj.discount.toString().match(regex);
      //     }
      //   });
      // }
      // if (key === "payment_mode") {
      //   data = data.filter((obj) => {
      //     // var regex = new RegExp(All_filter[key], "gi");
      //     var regex = All_filter[key];
      //     if (obj.payment_mode) {
      //       return obj.discount.toString().match(regex);
      //     }
      //   });
      // }
      // if (key === "description") {
      //   data = data.filter((obj) => {
      //     // var regex = new RegExp(All_filter[key], "gi");
      //     var regex = All_filter[key];
      //     if (obj.description) {
      //       return obj.discount.toString().match(regex);
      //     }
      //   });
      // }
      // if (key === "price") {
      //   data = data.filter((obj) => {
      //     // var regex = new RegExp(All_filter[key], "gi");
      //     var regex = All_filter[key];
      //     if (obj.price) {
      //       return obj.discount.toString().match(regex);
      //     }
      //   });
      // }
      // if (key === "price") {
      //   data = data.filter((obj) => {
      //     // var regex = new RegExp(All_filter[key], "gi");
      //     var regex = All_filter[key];
      //     if (obj.price) {
      //       return obj.discount.toString().match(regex);
      //     }
      //   });
      // }
    }

    return data;
  }
};
export const TodayFilter = (arr) => {
  return arr.filter((obj) => {
    var date = new Date().toLocaleDateString();
    var ObjDate = new Date(obj.date).toLocaleDateString();
    if (date == ObjDate) {
      return obj;
    }
  });
};
export const TodayReturnsFilter = (arr) => {
  return arr.filter((obj) => {
    var date = new Date().toLocaleDateString();
    var ObjDate = obj.returnInvoice
      ? new Date(obj.returnInvoice.date).toLocaleDateString()
      : null;
    if (date == ObjDate) {
      return obj.returnInvoice;
    }
  });
};
// export const OpeningBalance = (
//   arr,
//   accArr,
//   todayTotal,
//   entry,
//   type,
//   balance,
//   supPro
// ) => {
//   let totalamount = 0;
//   let totalExpensAamount = 0;
//   let totalReturn = 0;
//   let opening = 0;
//   let supAmount = 0;
//   arr.filter((obj) => {
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);
//     const date = yesterday.getTime();
//     var ObjDate = new Date(obj.date).getTime();
//     if (
//       date >= ObjDate &&
//       (obj.payment_Type || obj.assettype).toLowerCase() === type 
//       // &&
//       // !todayTotal
//     ) {
//       totalamount += Number(obj.netAmount);
//     } else if (
//       (obj.payment_Type || obj.assettype).toLowerCase() === type 
//       // &&
//       // todayTotal
//     ) {
//       totalExpensAamount += Number(obj.price);
//     }
//   });

//   supPro.filter((obj) => {
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);
//     const date = yesterday.getTime();
//     var ObjDate = new Date(obj.date).getTime();
//     if (
//       date >= ObjDate &&
//       (obj.payment_Type || obj.assettype).toLowerCase() === type &&
//       !todayTotal
//     ) {
//       supAmount += Number(obj.PaymentPaid);
//     }
//   });

//   // opening += Number(
//   //   entry.filter((obj) => obj.HeadType === type)[0]
//   //     ? entry
//   //         .filter((obj) => obj.HeadType === type)[0]
//   //         .types.filter((obj) => obj.type === balance)[0]
//   //       ? entry
//   //           .filter((obj) => obj.HeadType === type)[0]
//   //           .types.filter((obj) => obj.type === balance)[0].openingBalance
//   //       : null
//   //     : null
//   // );

//   if (accArr) {
//     accArr.filter((obj) => {
//       const today = new Date();
//       const yesterday = new Date(today);
//       yesterday.setDate(yesterday.getDate() - 1);
//       const date = yesterday.getTime();
//       var ObjDate = new Date(obj.date).getTime();
//       if (
//         date >= ObjDate &&
//         obj.main_Heads === "Expenses" &&
//         obj.payment_mode.toLowerCase() === type &&
//         !todayTotal
//       ) {
//         totalExpensAamount += Number(obj.price);
//       } else if (
//         obj.main_Heads === "Expenses" &&
//         obj.payment_mode.toLowerCase() === type &&
//         todayTotal
//       ) {
//         // totalExpensAamount += Number(obj.price);
//       }
//     });
//   }
//   return Number(totalamount) - Number(totalExpensAamount) + opening;
// };
export const OpeningBalance = (
  Total, Today
) => {


  return Number(Total) - Number(Today)
};
export const TotalSaleAmount = (arr, property) => {
  if (property) {
    var TotalAmount = 0;
    arr.filter((obj) => {
      if (obj.payment_Type === "Cash") {
        TotalAmount += Number(obj[property]);
      }
    });
    return TotalAmount;
  } else {
    var TotalAmount = 0;
    arr.filter((obj) => {
      TotalAmount += Number(obj.TotalAmount) - Number(obj.discount);
    });
    return TotalAmount;
  }
};

export const cashInHand = (arr, AccArr, retArr, opening, type, supArr) => {
  let TotalSales = 0;
  let expense = 0;
  let TotalReturn = 0;
  var TotalAmount = 0;
  let paid = 0;
  let supAmount = 0;
  arr
    .filter((obj) => obj.assettype.toLowerCase() === type)
    .map((value, i) => {
      TotalSales += Number(value.TotalAmount) - Number(value.discount);
    });
  for (let i = 0; i < retArr.length; i++) {
    if (
      retArr[i].returnInvoice &&
      retArr[i].returnInvoice.assettype.toLowerCase() === type
    ) {
      TotalReturn =
        TotalReturn + Number(retArr[i].returnInvoice.ReturnNetAmount);
    }
  }
  supArr
    .filter((obj) => obj.assettype.toLowerCase() === type)
    .map((value, i) => {
      supAmount += Number(value.PaymentPaid);
    });
  AccArr.filter(
    (obj) =>
      obj.assettype.toLowerCase() === type ||
      obj.payment_mode.toLowerCase() === type
  ).map((value, i) => {
    expense = expense + Number(value.price);
  });
  // AccArr.filter(obj)
  return (TotalAmount =
    TotalSales - expense - TotalReturn + opening - supAmount);
};

export const AvaliableProductQuantity = (
  AllSaleArr,
  productQunatity,
  productObj,
  paramsID
) => {
  let avaliableQuantity = Number(productQunatity);
  for (var j = 0; j < AllSaleArr.length; j++) {
    let sale = AllSaleArr[j].SaleItem;
    if (AllSaleArr[j].SaleItem) {
      for (var i = 0; i < sale.length; i++) {
        if (productObj.db_id === sale[i].product_name) {
          avaliableQuantity -= Number(sale[i].quantity);
        }
      }
    } else {
      if (productObj.db_id === AllSaleArr[j].product_name) {
        avaliableQuantity -= Number(AllSaleArr[j].quantity);
      }
    }
    if (AllSaleArr[j].returnInvoice) {
      let retrunInvoiceArr = AllSaleArr[j].returnInvoice.retrunInvoiceArr;
      for (var i = 0; i < retrunInvoiceArr?.length; i++) {
        // if(retrunInvoiceArr)
        if (productObj.db_id === retrunInvoiceArr[i]?.product_name) {
          avaliableQuantity += Number(retrunInvoiceArr[i]?.returnQty);
        }
      }
    }
  }
  if (paramsID) {
    for (let i = 0; i < AllSaleArr.length; i++) {
      let sale = AllSaleArr[i];
      if (sale.db_id === paramsID) {
        for (let j = 0; j < sale.SaleItem.length; j++) {
          if (productObj.bar_code === sale.SaleItem[j].bar_code) {
            avaliableQuantity += sale.SaleItem[j].quantity
            // console.log(sale.SaleItem[j].quantity)
          }
        }
      }
    }
  }
  return avaliableQuantity;
};

export const TotalSaleProductQuantity = (
  AllSaleArr,
  productQunatity,
  productObj
) => {
  let avaliableQuantity = 0;
  for (var j = 0; j < AllSaleArr.length; j++) {
    let sale = AllSaleArr[j].SaleItem;
    for (var i = 0; i < sale.length; i++) {
      if (sale[i].product.db_id === productObj.db_id) {
        avaliableQuantity += Number(sale[i].quantity);
      }
    }
    if (AllSaleArr[j].returnInvoice) {
      let retrunInvoiceArr = AllSaleArr[j].returnInvoice.retrunInvoiceArr;
      for (var i = 0; i < retrunInvoiceArr?.length; i++) {
        if (productObj.db_id === retrunInvoiceArr[i]?.product_name) {
          avaliableQuantity -= Number(retrunInvoiceArr[i]?.returnQty);
        }
      }
    }
  }
  return avaliableQuantity;
};

export const CustomerReportTotal = (CustomerArr, SaleArr) => {
  return CustomerArr.map((customerObj, i) => {
    let TotalBilled = 0;
    let TotalRecieve = 0;
    let TotalDiscount = 0;
    SaleArr.filter((SaleObj) => {
      if (customerObj.db_id == SaleObj.SaleItem[0].customer.db_id) {
        TotalBilled += Number(SaleObj.TotalAmount);
        TotalRecieve += Number(SaleObj.receivedPayment);
        if (SaleObj.discount) {
          TotalDiscount += Number(SaleObj.discount);
        }
      }
      if (SaleObj.returnInvoice && SaleObj.returnInvoice.retrunInvoiceArr) {
        if (
          SaleObj.returnInvoice.retrunInvoiceArr && customerObj.db_id ==
          SaleObj.returnInvoice.retrunInvoiceArr[0]?.customer.db_id
        ) {
          TotalBilled -= Number(SaleObj.returnInvoice.ReturnTotalAmount);
          TotalRecieve += Number(SaleObj.returnInvoice.ReturnRecievedPayment);
          // if (SaleObj.discount) {
          //   TotalDiscount += Number(SaleObj.discount);
          // }
        }
      }
    });
    return {
      ...customerObj,
      TotalBilled,
      TotalRecieve,
      TotalBalance:
        TotalRecieve > TotalBilled
          ? 0
          : TotalRecieve - TotalBilled - TotalDiscount,
      TotalDiscount,
    };
  });
};

export const printElm = (id) => {
  var sTable = document.getElementById(id).innerHTML;
  var win = window.open();

  var style = "<style>";
  style += `
  * {
      margin: 0;
      padding: 0;
      text-align: left;
  }
  body {
    -webkit-print-color-adjust: exact !important;
  }
  table{
      border-collapse: collapse;
      border-spacing: 10px;
      width: 100%;
  }
  .table-th-padding  th {
    text-align: left;
    padding-top: 2px !important;
    padding-bottom: 2px !important;
  }
  .table-th-padding  thead {
    border-top: 1px solid rgba(0, 0, 0, 0.1) !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
  }
  .width70{
    width:70%
  }
  .table-th-padding tfoot{
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  p{
    text-align: center ;

  }
  .PrintModalHeader {
    text-align: center !important;
    
  }
  h3 {
    background-color: black !important;
    color: #fff;
    text-align: center !important;
  }
  h6{
    background-color: black !important;
    color: #fff;
    text-align: center !important;
  }
  


  
      .tableCustomize  tr {
        font-size: 13px;
      }
      .detailShop{
        font-size: 11px;
        margin-bottom: 5px;
      }
          .points{
            font-size: 11px;
            margin: 2px;
            text-align:left;
          }
      #salePrint{
        overflow-y: scroll;
        height: 80vh;
      }
      .tableTR{
        padding:10px
      }
    
      

  
  `;
  style += "</style>";
  win.document.write("<html><head>");
  win.document.write("<title>Profile</title>");
  win.document.write(style);
  // win.document.write('<link href="../../index.scss" rel="stylesheet" ><link>');
  // win.document.write('<script src="JsBarcode.all.min.js"></script>');

  win.document.write("</head>");
  win.document.write("<body>");
  win.document.write('<div id="main">');
  win.document.write(sTable);
  win.document.write("</div>");
  win.document.write(`</body></html>`);

  win.document.close();
  setTimeout(() => {
    win.print();
  }, 700);
};

export const printElmPurchase = (id) => {
  var sTable = document.getElementById(id).innerHTML;
  var win = window.open();

  var style = "<style>";
  style += `
  * {
      margin: 0;
      padding: 0;
      text-align: left;
  }
  body {
    -webkit-print-color-adjust: exact !important;
  }
  table{
      border-collapse: collapse;
      border-spacing: 10px;
      width: 100%;
  }
  .table-th-padding  th {
    text-align: left;
    padding-top: 2px !important;
    padding-bottom: 2px !important;
  }
  .table-th-padding  thead {
    border-top: 1px solid rgba(0, 0, 0, 0.1) !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
  }
  .width70{
    width:70%
  }
  .table-th-padding tfoot{
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  p{
    text-align: center ;

  }
  .PrintModalHeader {
    text-align: center !important;
    
  }
  h3 {
    background-color: black !important;
    color: #fff;
    text-align: center !important;
  }
  h6{
    background-color: black !important;
    color: #fff;
    text-align: center !important;
  }
  


  
      .tableCustomize  tr {
        font-size: 13px;
      }
      .detailShop{
        font-size: 11px;
        margin-bottom: 5px;
      }
          .points{
            font-size: 11px;
            margin: 2px;
            text-align:left;
          }
      #salePrint{
        overflow-y: scroll;
        height: 80vh;
      }
    
      

  
  `;
  style += "</style>";
  win.document.write("<html><head>");
  win.document.write("<title>Profile</title>");
  win.document.write(style);
  // win.document.write('<link href="../../index.scss" rel="stylesheet" ><link>');
  // win.document.write('<script src="JsBarcode.all.min.js"></script>');

  win.document.write("</head>");
  win.document.write("<body>");
  win.document.write('<div id="main">');
  win.document.write(sTable);
  win.document.write("</div>");
  win.document.write(`</body></html>`);

  win.document.close();
  setTimeout(() => {
    win.print();
  }, 700);
};


export const BarPrint = (id) => {
  var sTable = document.getElementById(id).innerHTML;
  var win = window.open();

  var style = "<style>";
  style += `
  body{
    margin:0px;
    padding:0px;
  }
  .BarModal{
    display: flex;
    align-items: center;
    justify-content: center;
  }
      .printPaper{
        width: 4.1in;
      }
        .right{
          float: right;
        }
        .barCode{
          width: 2in;
          height: 1in;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          // background-color: blue;
        }
        .barCode svg{
          margin: -8px;
          width: 170px !important;
        }
        .proDet,.price{
z-index: 9
        }
          .proDet{
            display: flex;
            justify-content: space-between;
            width: 70%;
            margin-top: 30px;
          font-weight:bold;

          }
            p{
              font-size: 10px;
              margin: 0px;
            }
          .price{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-size: 10px;
          font-weight:bold;

          }
          // .barCodeClass{
          //   width: 170px !important;
          // }
    
  
  `;
  style += "</style>";
  win.document.write("<html><head>");
  win.document.write("<title>Profile</title>");
  win.document.write(style);
  // win.document.write('<link href="../../index.scss" rel="stylesheet" ><link>');
  // win.document.write('<script src="JsBarcode.all.min.js"></script>');

  win.document.write("</head>");
  win.document.write("<body>");
  win.document.write('<div id="main">');
  win.document.write(sTable);
  win.document.write("</div>");
  win.document.write(`</body></html>`);

  win.document.close();
  setTimeout(() => {
    win.print();
  }, 700);
};

export function indivisualReport(id, entry, entryAcc, entryCust) {
  let indArr = [];
  let AccArr = [];
  let custArr = [];
  let retArr = [];
  for (let i = 0; i < entry.length; i++) {
    // for (let j = 0; j < entry[i].SaleItem.length; j++)
    if (entry[i].SaleItem[0].Customer_name === id) {
      indArr.push(entry[i]);
      if (entry[i].returnInvoice) {
        retArr.push({ ...entry[i].returnInvoice, db_id: entry[i].db_id, RinvoiceNumber: entry[i].invoiceNumber })
      }
    }
  }
  for (let i = 0; i < entryAcc.length; i++) {
    // console.log(entryAcc[i].Customer ? entryAcc[i].Customer.db_id : null)
    // console.log(id)
    if (entryAcc[i].Customer ? entryAcc[i].Customer.db_id === id : null) {
      AccArr.push(entryAcc[i]);
    }
  }
  for (let i = 0; i < entryCust.length; i++) {
    // console.log(entryCust[i].db_id)
    // console.log(id)
    if (entryCust[i].db_id === id) {
      custArr.push(entryCust[i]);
    }
  }
  // console.log([...indArr, ...AccArr, ...custArr, ...retArr])
  return [...indArr, ...AccArr, ...custArr, ...retArr].sort(
    (a, b) =>
      Number(String(a.date).slice(0)) - Number(String(b.date).slice(0))
  );
}
export function totalReturnAmount(data) {
  let totalAmount = 0;
  for (let i = 0; i < data.length; i++) {
    totalAmount += data[i].TotalAmount;
  }
  return totalAmount;
}
export function FindInvoice(value, entries) {
  // if(value)
  let data = [];
  if (entries) {
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].invoiceNumber === value) {
        data = entries[i];
      }
      // else if (entries[i].invoiceNumber != value) {
      //   return;
      // }
    }
    return data;
  } else {
    return [];
  }
}
const makingLength_3 = (value, length) => {
  if (length && length !== 2) {
    value = value.toString();
    let correctValue =
      value.length === 1
        ? "000" + value
        : value.length === 2
          ? "00" + value
          : value.length === 3
            ? "0" + value
            : value;
    return correctValue;
  } else if (length === 2) {
    value = value.toString();
    let correctValue = value.slice(value.length - 2);
    return correctValue;
  }
  // else if (length === 2) {
  //   value = value.toString();
  //   let correctValue = value.slice(value.length - 2);
  //   return correctValue;
  // }
  else {
    value = value.toString();
    let correctValue = value.length === 1 ? "0" + value : value;
    return correctValue;
  }
};
export function GetFormattedDate(date) {
  var todayTime = new Date(date);
  var month = makingLength_3(todayTime.getMonth() + 1);
  var day = makingLength_3(todayTime.getDate());
  var year = makingLength_3(todayTime.getFullYear());
  return day + "/" + month + "/" + year;
}
export function FormattedDate(date) {
  var todayTime = new Date(date);
  var month = todayTime.getMonth();
  var day = todayTime.getDate();
  var year = todayTime.getFullYear();
  return day + "/" + month + "/" + year;
}
export function BarcodeFilter(data, from, to) {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].date >= from && data[i].date <= to) {
      arr.push(data[i]);
    }
  }
  return arr;
}
export function returnTotal(arr, discount, paid) {
  let ReturnTotalAmount = 0;
  // let dis = 0;
  let ReturnNetAmount = 0;
  let ReturnRecievedPayment = 0;
  let returnBalance = 0;
  for (let i = 0; i < arr.length; i++) {
    ReturnTotalAmount = Number(ReturnTotalAmount) + Number(arr[i].ReturnAmount);
  }
  ReturnNetAmount =
    ReturnNetAmount + (Number(ReturnTotalAmount) - Number(discount));
  ReturnRecievedPayment =
    ReturnRecievedPayment + (Number(paid) - ReturnTotalAmount);
  if (ReturnRecievedPayment < 0) {
    returnBalance = returnBalance + (Number(paid) - ReturnTotalAmount);
  }
  return {
    ReturnTotalAmount,
    ReturnNetAmount,
    ReturnRecievedPayment,
    returnBalance,
  };
}
export function exchange(id, data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].invoiceNumber === id) {
      return data[i].returnInvoice;
    }
    // let balance = data.filter((obj)=>obj.invoiceNumber === id)
    // return balance
  }
}
export function returnQuantity(data) {
  let qty = 0;
  for (let i = 0; i < data.length; i++) {
    qty = qty + data[i].returnQty;
  }
  return qty;
}
export function TotalBankCash(arr, accArr, entry, type, balance, supplierPro) {
  let Total = 0;
  let opening = 0;
  let expense = 0;
  let supAmount = 0;

  [...arr, ...accArr]
    .filter((obj) =>
      obj.assettype
        ? obj.assettype.toLowerCase() === type
        : obj.payment_type
          ? obj.payment_type.toLowerCase() === type
          : obj.payment_mode
            ? obj.payment_mode.toLowerCase() === type
            : null
    )
    .map((a, i) => {
      if (a.netAmount) {
        Total += Number(a.netAmount);
      } else if (a.price) {
        Total -= Number(a.price);
      }
    });
  // accArr.filter((obj) => obj.assettype === type || obj.payment_mode === type ).map((value, i) => {
  //   expense = expense + Number(value.price);
  // });
  if (entry.filter((obj) => obj.HeadType.toLowerCase() === type)[0]) {
    if (entry.filter((obj) => obj.HeadType.toLowerCase() === type)[0].types) {

      entry
        .filter((obj) => obj.HeadType.toLowerCase() === type)[0]
        .types.map((a, i) => {
          opening += Number(a.openingBalance);
        });
      // ? entry
      // .filter((obj) => obj.HeadType === type)[0]
      // .types.filter((obj) => obj.type === balance)[0].openingBalance
    }
    // );
  }
  arr
    .filter(
      (obj) =>
        obj.returnInvoice && obj.returnInvoice.assettype.toLowerCase() === type
    )
    .map((a, i) => {
      Total -= Number(a.returnInvoice.ReturnNetAmount);
    });
  supplierPro
    .filter(
      (obj) =>
        obj.assettype.toLowerCase() === type ||
        obj.assettype.toLowerCase() === "cheque"
    )
    .map((a, i) => {
      supAmount += Number(a.paymentPaid);
    });

  return Total + opening - supAmount;
}

export function Balance(acc, initBal, id, account) {
  let balance = Number(initBal) ? Number(initBal) : 0;
  acc
    .filter((obj) => obj.SaleItem[0].Customer_name === id)
    .map((a, i) => {
      balance += Number(Number(a.balance) < 0 ? Number(a.ReturnAmount) + Number(a.balance) : Number(a.balance));
    });
  account
    .filter((obj) => (obj.Customer ? obj.Customer.db_id === id : null))
    .map((a, i) => {
      balance -= Number(a.price);
    });

  return balance;
}
export function remainBal(suppliers, products, account) {
  let balance = 0;
  let Total = 0;
  let paid = 0;
  let paidBal = 0;
  let recieved = 0;

  if (products) {
    products
      .filter((obj) => obj.supplier.db_id === suppliers.db_id)
      .map((a, i) => {
        balance += a.balance ? a.balance : 0;
        Total += a.TotalAmount ? a.TotalAmount : 0;
        paid += a.paymentPaid ? a.paymentPaid : 0;
      });
  }

  if (account) {
    account
      .filter((obj) =>
        obj.supplier && obj.main_Heads === "Liabilities"
          ? obj.supplier.db_id === suppliers.db_id
          : null
      )
      .map((a, i) => {
        paidBal += Number(a.price);
      });
  }
  if (account) {
    account
      .filter((obj) =>
        obj.supplier && obj.main_Heads === "Assets"
          ? obj.supplier.db_id === suppliers.db_id
          : null
      )
      .map((a, i) => {
        recieved += Number(a.price);
      });
  }
  return {
    balance:
      Number(suppliers.Balance) +
      Number(balance) -
      Number(paidBal) +
      Number(recieved),
    Total: Number(Total),
    paid: Number(paid),
  };
}

export function SupplierAcc(suppliers, products, accounts) {
  let balance = 0;
  let Total = 0;
  let paid = 0;
  let paid2 = 0;

  if (products) {
    products
      .filter((obj) =>
        obj.supplier ? obj.supplier.db_id : obj.db_id === suppliers.db_id
      )
      .map((a, i) => {
        balance += a.balance ? a.balance : 0;
        Total += a.TotalAmount ? a.TotalAmount : 0;
        paid += a.paymentPaid
          ? Number(a.paymentPaid)
          : a.PaymentPaid
            ? Number(a.PaymentPaid)
            : 0;
      });
  }
  if (accounts) {
    accounts
      .filter((obj) =>
        obj.supplier && obj.main_Heads === "Liabilities"
          ? obj.supplier.db_id === suppliers.db_id
          : obj.db_id === suppliers.db_id
      )
      .map((a, i) => {
        paid2 += Number(a.price);
      });
  }
  return {
    balance: Number(suppliers.Balance) + Number(balance),
    Total: Number(Total),
    paid: Number(paid) + Number(paid2),
  };
}
export function currentBalance(products, supplier, account, suppPro) {
  let totalBalance = 0;
  let paid = 0;
  let recieved = 0;
  // console.log(products,supplier,account)
  if (products) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].supplier.db_id === supplier.db_id) {
        totalBalance +=
          Number(products[i].quantity) * Number(products[i].price) -
          Number(products[i].paymentPaid || products[i].PaymentPaid);
      }
    }
  }
  if (suppPro) {
    suppPro.filter(obj => obj.supplier.db_id === supplier.db_id).map((a, i) => {
      totalBalance += Number(a.balance)
    })
  }
  if (account) {
    for (let i = 0; i < account.length; i++) {
      if (
        account[i].supplier &&
          account[i].main_Heads === "Liabilities" &&
          account[i].HeadType.toLowerCase() === "account payable"
          ? account[i].supplier.db_id === supplier.db_id
          : null
      ) {
        paid += Number(account[i].price);
      }
    }
  }
  if (account) {
    for (let i = 0; i < account.length; i++) {
      if (
        account[i].supplier &&
          account[i].main_Heads === "Assets" &&
          account[i].HeadType.toLowerCase() === "account recievable"
          ? account[i].supplier.db_id === supplier.db_id
          : null
      ) {
        recieved += Number(account[i].price);
      }
    }
  }

  return (
    Number(totalBalance) +
    (Number(supplier.Balance) || Number(supplier.balance)) -
    Number(paid) +
    Number(recieved)
  );
}
export function matchSupProduct(id, supPro, products, accEntry) {
  let rowId = id;
  let proId = "";
  let entryId = "";
  let supObj = {};
  let proObj = {};

  if (supPro) {
    supObj = supPro.filter((obj) => obj.db_id === id)[0];

  }

  if (products && supObj) {
    proObj = products.filter((obj) => supObj.bar_code === obj.bar_code)[0];
  }
  if (supObj && proObj) {
    if (supObj.bar_code === proObj.bar_code) {
      proId = proObj.db_id;
    }
  }
  return {
    rowId: rowId,
    proId: proId,
  };
}
export function totalCashBank(entries, accounts, entities, supPro, type) {
  let Total = 0;
  if (entries) {
    entries
      .filter((obj) => obj.assettype.toLowerCase() === type)
      .map((a, i) => {
        if (a.paidPayment != 0) {
          // Total -= Number(a.paidPayment) < 0 ? 0 : Number(a.paidPayment) + Number(a.TotalAmount) - Number(a.discount);
          Total -= Number(a.paidPayment) < 0 ? 0 : Number(a.paidPayment);

        } else {
          Total += Number(a.receivedPayment) < 0 ? 0 : Number(a.receivedPayment);
        }
        if (a.returnInvoice) {
          if (a.returnInvoice.assettype.toLowerCase() === type) {
            // console.log(Total)
            // console.log((Number(a.returnInvoice.ReturnNetAmount) + Number(a.returnInvoice.returnBalance)))
            Total += -(Number(a.returnInvoice.ReturnNetAmount) + Number(a.returnInvoice.returnBalance))



            // Total += -(Number(a.returnInvoice.ReturnNetAmount) + Number(a.returnInvoice.returnBalance))

            // console.log(Total - (Number(a.returnInvoice.ReturnTotalAmount) - (Number(a.returnInvoice.ReturnNetAmount) + Number(a.returnInvoice.returnBalance))))
            // Total =
            //   // Number(a.returnInvoice.ReturnNetAmount)7000 -   3000
            //   Number(a.returnInvoice.ReturnTotalAmount) - (Number(a.returnInvoice.ReturnNetAmount) + Number(a.returnInvoice.returnBalance))
            // +
            // Number(a.returnInvoice.ReturnTotalAmount) - (Number(a.returnInvoice.ReturnNetAmount) + Number(a.returnInvoice.returnBalance))

            // Number(a.returnInvoice.returnBalance);
            // console.log(Number(a.returnInvoice.ReturnNetAmount) , ' +' , Number(a.returnInvoice.returnBalance) , (Number(a.returnInvoice.ReturnNetAmount) +
            // Number(a.returnInvoice.returnBalance))   )
          }
        }
      });
  }
  if (accounts) {
    accounts
      .filter((obj) => obj.payment_mode && obj.payment_mode.toLowerCase() === type)
      .map((a, i) => {
        if (a.main_Heads && a.main_Heads.toLowerCase() === "liabilities") {
          Total -= Number(a.price);
        } else if (a.main_Heads && a.main_Heads.toLowerCase() === "expenses") {
          Total -= Number(a.price);
        } else if (a.main_Heads && a.main_Heads.toLowerCase() === "assets") {
          // console.log(a)
          Total += Number(a.price);
        } else if (a.main_Heads && a.main_Heads.toLowerCase() === "income") {
          Total += Number(a.price);
        }
      });
  }
  if (entities) {
    entities
      .filter((obj) => obj.HeadType.toLowerCase() === type)
      .map((a, i) => {
        if (a.main_Heads && a.main_Heads.toLowerCase() === "assets") {
          // console.log(a)
          a.types
            ? a.types.map((b, i) => {
              Total += Number(b.openingBalance);
            })
            : (Total += 0);
        } else if (a.main_Heads && a.main_Heads.toLowerCase() === "income") {
          a.types
            ? a.types.map((b, i) => {
              Total += Number(b.openingBalance);
            })
            : (Total += 0);
        } else if (a.main_Heads && a.main_Heads.toLowerCase() === "expenses") {
          a.types
            ? a.types.map((b, i) => {
              Total -= Number(b.openingBalance);
            })
            : (Total += 0);
        } else if (a.main_Heads && a.main_Heads.toLowerCase() === "liabilities") {
          a.types
            ? a.types.map((b, i) => {
              Total -= Number(b.openingBalance);
            })
            : (Total += 0);
        }
      });
  }
  if (supPro) {
    supPro
      .filter((obj) => obj.assettype.toLowerCase() === type)
      .map((a, i) => {
        Total -= Number(a.paymentPaid) || Number(a.PaymentPaid);
      });
  }
  return Total;
}
export function AmountTotal(id, entryArr, AccArr, custArr) {
  let TotalPurchase = 0;
  let TotalRecieved = 0;
  let TotalReturnAmount = 0;
  let TotalBalance = 0;
  if (entryArr) {
    entryArr.filter(obj => obj.SaleItem[0] ? obj.SaleItem[0].Customer_name === id : null).map((a, i) => {
      TotalPurchase += Number(a.netAmount)
      TotalRecieved += Number(a.receivedPayment)
      TotalBalance += a.exchangeRef ?
        Number(a.paidPayment) + Number(a.TotalAmount) : Number(Number(a.balance) < 0 ? Number(a.ReturnAmount) + Number(a.balance) : Number(a.balance))

      if (a.returnInvoice) {
        TotalPurchase -= Number(a.returnInvoice.ReturnNetAmount)
        TotalPurchase += Number(a.returnInvoice.ReturnRecievedPayment)
        TotalBalance += Number(a.returnInvoice.returnBalance)
      }

    })
  }
  if (AccArr) {
    AccArr.filter(obj => obj.Customer && obj.Customer.db_id === id && obj.HeadType && obj.HeadType.toLowerCase() === 'account recievable').map((a, i) => {
      TotalRecieved += Number(a.price)
      TotalBalance -= Number(a.price)
    })

  }
  if (custArr) {
    custArr.filter(obj => obj.db_id === id).map((a, i) => {
      TotalBalance += Number(a.previousBalance)
    })

  }
  return ({
    TotalPurchase: TotalPurchase,
    TotalRecieved: TotalRecieved,
    TotalBalance: TotalBalance
  })
}

export const paymentMode = ["Cash"]

export function paymentModeTypes(entities, paymentType) {
  if (entities) {
    let arr = entities.filter(obj => obj.main_Heads.toLowerCase() === 'assets')
    console.log(arr)
    let arr2 = (arr.filter(obj => obj.HeadType === paymentType)[0].types)
    console.log(arr2,"asdjslad")
    return arr2
  }
}

export const chequeType = ["Gross Cheque", "Cash Cheque"]

// export function totalSaleReturn(row){
// if(row.)
// } 
