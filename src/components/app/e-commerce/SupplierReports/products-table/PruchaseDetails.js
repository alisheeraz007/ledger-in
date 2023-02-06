import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Table } from 'react-bootstrap';

export default function PurchaseDialogue(props) {
    let {
        open,
        setOpen,
        scroll,
        setScroll,
        handleClickOpen,
        handleClose,
        row
    } = props


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
                <DialogTitle onClick={() => console.log(row)} id="scroll-dialog-title">Details</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <div className="modalSection1">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Purchase Invoice:</th>
                                        <td>{row ? row.purchaseInvoice : null}</td>
                                    </tr>
                                    <tr>
                                        <th>Date:</th>
                                        <td>{row ? row.date : null}</td>
                                    </tr>
                                    <tr>
                                        <th>Supplier Name:</th>
                                        <td>{row ? row.supplier.SupplierName : null}({row ? row.supplier.CompanyName : null})</td>
                                    </tr>
                                    <tr>
                                        <th>Purchased By:</th>
                                        <td>{row ? row.purchasedBy.username : null}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div className="modalSection2" style={{ marginTop: '40px' }}>
                            <Table>
                                <tr>
                                    <th>Barcode</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Amount</th>
                                </tr>
                                {row && row.purchasedItems.map((a, i) => {
                                    return (

                                        <tr>
                                            <td>{a.bar_code}</td>
                                            <td>{a.product_name}</td>
                                            <td>{a.price}</td>
                                            <td>{a.quantity}</td>
                                            <td>{Number(a.quantity) * Number(a.price)}</td>
                                        </tr>
                                    )
                                })}
                            </Table>
                        </div>
                        <div className="modalSection3" style={{ marginTop: '40px' }}>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Total Amount</th>
                                        <td>{row.TotalAmount}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Paid</th>
                                        <td>{row.PaymentPaid}</td>
                                    </tr>
                                    <tr>
                                        <th>Balance At That Time</th>
                                        <td>{row.balance}</td>
                                    </tr>
                                    <tr>
                                        <th>Total Balance Of Supplier</th>
                                        <td>{row.TotalBalance}</td>
                                    </tr>
                                </tbody>
                            </table>
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
