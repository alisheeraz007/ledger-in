import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Table } from 'react-bootstrap';
import { GetFormattedDate } from '../../../../redux/constants';

export default function SaleDetDialogue(props) {
    let {
        open,
        setOpen,
        scroll,
        setScroll,
        handleClickOpen,
        handleClose,
        row
    } = props

    function getDate(date) {
        return GetFormattedDate(date)
    }


    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            {/* <Button onClick={handleClickOpen('paper')}>scroll=paper</Button> */}
            {/* <Button onClick={handleClickOpen('body')}>scroll=body</Button> */}
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Details</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <div className="modalSection1">
                            {row.CustomerName ?
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Customer Name:</th>
                                            <td>{row ? row.CustomerName : null}</td>
                                        </tr>
                                        <tr>
                                            <th>Phone Number:</th>
                                            <td>{row ? row.phoneNumber : null}</td>
                                        </tr>
                                        <tr>
                                            <th>Date:</th>
                                            <td>{row ? getDate(row.date) : null}</td>
                                        </tr>
                                        {row.address ?
                                            <tr>
                                                <th>Address :</th>
                                                <td>{row ? row.Address : null}</td>
                                            </tr>
                                            : null}
                                        <tr>
                                            <th>Initial Balance :</th>
                                            <td>{row ? row.previousBalance : null}</td>
                                        </tr>

                                    </tbody>
                                </table>
                                : row.invoiceNumber ?
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Invoice Number:</th>
                                                <td>{row ? row.invoiceNumber : null}</td>
                                            </tr>
                                            <tr>
                                                <th>Date:</th>
                                                <td>{row ? getDate(row.date) : null}</td>
                                            </tr>
                                            <tr>
                                                <th>Customer Name:</th>
                                                <td>{row ? row.SaleItem[0].customer.CustomerName : null}</td>
                                            </tr>
                                            <tr>
                                                <th>Deilivered By:</th>
                                                <td>{row ? row.DeliveredBy.username : null}</td>
                                            </tr>
                                            {row.exchangeRef ?
                                                <tr>
                                                    <th>Exchange with:</th>
                                                    <td>{row ? row.exchangeRef : null}</td>
                                                </tr>
                                                : null}

                                        </tbody>
                                    </table>
                                    : <table>
                                        <tbody>
                                            <tr>
                                                <th>Customer Name:</th>
                                                <td>{row ? row.retrunInvoiceArr ? row.retrunInvoiceArr[0]?.customer.CustomerName : null : null}</td>
                                            </tr>
                                            <tr>
                                                <th>Return Amount:</th>
                                                <td>{row ? row.ReturnNetAmount : null}</td>
                                            </tr>
                                            <tr>
                                                <th>Date:</th>
                                                <td>{row ? getDate(row.date) : null}</td>
                                            </tr>

                                        </tbody>
                                    </table>}
                        </div>
                        {row.invoiceNumber ?
                            <div className="modalSection2" style={{ marginTop: '40px' }}>
                                <Table>
                                    <tr>
                                        <th>Barcode</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total Amount</th>
                                    </tr>
                                    {row && row.SaleItem.map((a, i) => {
                                        return (

                                            <tr>
                                                <td>{a.bar_code}</td>
                                                <td>{a.product.product_name}</td>
                                                <td>{a.price}</td>
                                                <td>{a.quantity}</td>
                                                <td>{Number(a.quantity) * Number(a.price)}</td>
                                            </tr>
                                        )
                                    })}
                                </Table>
                            </div>
                            : row.retrunInvoiceArr ?
                                <div className="modalSection2" style={{ marginTop: '40px' }}>
                                    <Table>
                                        <tr>
                                            <th>Barcode</th>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total Amount</th>
                                        </tr>
                                        {row && row.retrunInvoiceArr.map((a, i) => {
                                            return (

                                                <tr>
                                                    <td>{a.bar_code}</td>
                                                    <td>{a.product.product_name}</td>
                                                    <td>{a.price}</td>
                                                    <td>{a.returnQty}</td>
                                                    <td>{Number(a.returnQty) * Number(a.price)}</td>
                                                </tr>
                                            )
                                        })}
                                    </Table>
                                </div>
                                : null}

                        <div className="modalSection3" style={{ marginTop: '40px' }}>
                            {row.invoiceNumber ?
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Total Amount</th>
                                            <td>{Number(row.TotalAmount) - Number(row.discount)}</td>
                                        </tr>
                                        <tr>
                                            <th>Payment Recieved</th>
                                            <td>{row.receivedPayment}</td>
                                        </tr>
                                        {/* <tr>
                                        <th>Balance At That Time</th>
                                        <td>{row.balance}</td>
                                    </tr> */}
                                        <tr>
                                            <th>Balance </th>
                                            <td>{row.balance}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                : row.retrunInvoiceArr ?
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Total Amount</th>
                                                <td>{row.ReturnNetAmount}</td>
                                            </tr>
                                            <tr>
                                                <th>Payment Recieved</th>
                                                <td>{row.ReturnRecievedPayment}</td>
                                            </tr>
                                            {/* <tr>
                                        <th>Balance At That Time</th>
                                        <td>{row.balance}</td>
                                    </tr> */}
                                            <tr>
                                                <th>Balance </th>
                                                <td>{row.returnBalance}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    : null}
                        </div>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    {/* <Button onClick={handleClose} color="primary">
                        D
          </Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}
