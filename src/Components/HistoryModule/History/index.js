import React, { useState, useReducer } from "react";
// import check from "../../../assets/Icons/check.png";
import filter from "../../../assets/Icons/Filters.png";
import LeftSideBar from "../../../CommonModules/SideBar/LeftSideBar";
import Datepicker from "../../../CommonModules/sharedComponents/Datepicker";
import reducer from "./reducer";
import MultiSelectDropdown from "../../../CommonModules/sharedComponents/Dropdown/index";
import "./style.css";

const initialState = {
  from: "",
  to: "",
  companies: [
    { name: "Google", id: 1, selected: false },
    { name: "Facebook", id: 2, selected: false },
    { name: "Walmart", id: 3, selected: false },
    { name: "Amazon", id: 4, selected: false },
  ],
  licenses: [
    { name: "BSE", id: 1, selected: false },
    { name: "NEFT", id: 2, selected: false },
    { name: "BDE", id: 3, selected: false },
    { name: "NSE", id: 4, selected: false },
  ],
};
const History = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="history-side-bar">
      <LeftSideBar />
      <div className="history-container">
        <div className="row">
          <div className="col-md-5">
            <h2 className="main-title">
              Compliance History <img src={filter} />
            </h2>

            <span className="SbPara">
              Get your historical compliance task you have completed at one
              place
            </span>
            <div style={{ marginTop: "20px" }}>
              <label htmlFor="from" className="mb-2">
                From:
              </label>
              <Datepicker name="from" />
            </div>

            <div style={{ marginTop: "20px" }}>
              <label htmlFor="to" className="mb-2">
                To:
              </label>
              <Datepicker name="to" />
            </div>
            <MultiSelectDropdown
              options={state.companies}
              lableTitle="Company"
              inputTitle="Select Company"
              dispatchType="SELECT_COMPANY_TOGGLE"
              dispatch={dispatch}
            />
            <MultiSelectDropdown
              options={state.licenses}
              lableTitle="License"
              inputTitle="Select License"
              dispatchType="SELECT_LICENSE_TOGGLE"
              dispatch={dispatch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
