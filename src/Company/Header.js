import React from "react";
import Popup from "./Popup";
import logo from "../assets/images/crud_logo.png";

export default function Header(props) {
  return (
    <>
      <header>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <img src={logo} alt="Logo" />
            </div>
            <div className="col-md-3" align="right">
              {" "}
              <Popup getalldata={props.getalldata} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
