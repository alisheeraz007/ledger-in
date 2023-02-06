/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useEffect } from "react";
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import SVG from "react-inlinesvg";
import { useHtmlClassService } from "../../../layout";
import { toAbsoluteUrl } from "../../../_helpers";
import { connect } from "react-redux";
import { totalCashBank } from "../../../../components/redux/constants";
import CountUp from 'react-countup';


function StatsWidget12({ className, ...props }) {

  return (
    <div className={`card card-custom ${className} cashStats`}>
      <div className="card-body d-flex flex-column p-0">
        <div className="d-flex statwid align-items-center justify-content-between flex-grow-1">
          <div style={{
            width: "100%"

          }} className="d-flex innerStateHead flex-column mr-2">
            <div className="Bankstat">
              <div>
                <i class="fas fa-university"></i>
              </div>
            </div>
            <div style={{
              flexDirection: "column",
              display: "flex"
            }}>
              <a
                href="#"
                className="text-dark-75 text-hover-primary font-weight-bolder font-size-h5"
              >
                Total Bank Balance
        </a>
              <span className="text-muted font-weight-bold mt-2">
                Your Total Bank Balance
        </span>
            </div>
          </div>
          <CountUp
            start={0}
            delay={0}
            end={totalCashBank(
              props.AccountReducer.All_entries,
              props.AccountReducer.Account_entries,
              props.AccountReducer.entities,
              props.SupplyProductReducer.entities,
              "bank"
            )}
            duration={3}
            separator=","
            suffix=" /-"
          >
            {({ countUpRef }) => (
              <div style={{
                fontWeight: "400",
                fontSize: "39px"
              }} style={{
                width: "100%",
                height: "60%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <h2 class="AmountDash" style={{ fontWeight: "200", textAlign: "center", fontSize: "32px" }}>
                  RS <span ref={countUpRef} />
                </h2>
              </div>
            )}
          </CountUp>
        </div>


      </div>
    </div >
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
    SupplyProductReducer: state.SupplyProductReducer,
    SuppliersReducer: state.SupplierReducer,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsWidget12);
