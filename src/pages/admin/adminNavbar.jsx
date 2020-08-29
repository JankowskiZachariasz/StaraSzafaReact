import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../graphics/logo.svg";
import place from "../../graphics/placeDark.png";
import dots from "../../graphics/dots.svg";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Navbar from "react-bootstrap/Navbar";


class AdminNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mojaSzafaFold: false,
    };
  }

  mojaSzafaFlip = () => {
    this.setState((state) => ({ mojaSzafaFold: !state.mojaSzafaFold }));
  };

  render() {
    return (
      <div>
        <Navbar bg="white" expand="lg">
          
          <NavbarBrand className="LogoText" href="/admin">
            <img src={logo} className="App-logo" alt="logo" height="40" />
            Sprzedawca
          </NavbarBrand>

          <div className="ml-auto">
            <Dots
              flip={this.mojaSzafaFlip}
              state={this.state.mojaSzafaFold}
            ></Dots>
            <div>
              <DotsPhone
                flip={this.mojaSzafaFlip}
                state={this.state.mojaSzafaFold}
              ></DotsPhone>
            </div>
          </div>
         
        </Navbar>

        <DotsPhoneFrame
          state={this.state.mojaSzafaFold}
        ></DotsPhoneFrame>
      </div>
    );
  }
}

function Dots({ state, flip}) {
  return (
    <div>
      <div className="d-none d-lg-block" id="navlink" onClick={flip}>
        <DotsPartial state={state}></DotsPartial>
      </div>

      <div
        className={state ? "d-none d-lg-block" : "active d-none d-lg-block"}
        id="mojaSzafaWindow"
        style={{ position: "relative" }}
      >
        <div
          className="mojaSzafaWindow shadow p-3 mb-5 bg-white rounded"
          style={{
            position: "absolute",
            left: "-270px",
            top: "2px",
            width: "320px",
          }}
        >
          <CustomButton text="Widok Klienta" link={"/home"}></CustomButton>
          <CustomButton text="Zarządzaj Stroną" link={"/#"}></CustomButton>
          <CustomButton text="Wyloguj" link={"/logout"}></CustomButton>
          <Place text="Ostróda" link={"/#"}></Place>
        </div>
      </div>
    </div>
  );
}
function DotsPhone({ state, flip}) {
  return (
    <div>
      <div
        className="d-flex justify-content-center d-block d-lg-none p-3"
        id="navlink"
        onClick={flip}
      >
        <DotsPartialPhone state={state}></DotsPartialPhone>
      </div>

    </div>
  );
}

function DotsPhoneFrame({ state }) {
  return (
    <div>
      <div
        className={state ? "d-block d-lg-none" : "active d-block d-lg-none"}
        id="mojaSzafaWindowPhone"
      >
        <CustomButton text="Widok Klienta" link={"/home"}></CustomButton>
          <CustomButton text="Zarządzaj Stroną" link={"/#"}></CustomButton>
          <CustomButton text="Wyloguj" link={"/logout"}></CustomButton>
          <Place text="Ostróda" link={"/#"}></Place>
      </div>
    </div>
  );
}

const CustomButton = ({ text, link }) => (
  <Link style={{ color: "inherit", textDecoration: "none" }} to={link}>
    <div
      id="CustomButton"
      style={{
        backgroundColor: "#E0FEF5",
      }}
    >
      <div
        className="d-flex justify-content-center"
        style={{
          padding: "5px",
          marginTop: "5px",

          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        <div>{text}</div>
      </div>
    </div>
  </Link>
);

const Place = ({ text, link }) => (
    <Link style={{ color: "inherit", textDecoration: "none" }} to={link}>
      <div
        className="mb-2"
        id="CustomButton"
        style={{
          backgroundColor: "#E0FEF5",
        }}
      >
        <div
          className="d-flex justify-content-center"
          style={{
            padding: "5px",
            marginTop: "5px",
  
            fontSize: "20px",
            cursor: "pointer",
          }}
        >

        <img
          src={place}
          alt="arrow"
          height="22"
          style={{
            marginTop: "2px",
            marginRight: "3px",
          }}
        />
          <div>{text}</div>
        </div>
      </div>
    </Link>
  );

const DotsPartial = () => (
  <div>
    <img
      style={{
        paddingLeft: "17px",
        paddingRight: "1px",
        paddingBottom: "2px",
      }}
      src={dots}
      className="mojaszafa"
      alt="logo"
      height="33"
    />
  </div>
);

const DotsPartialPhone = () => (
  <div className="d-flex justify-content-center">
    <div>
      <img src={dots} className="mojaszafa" alt="logo" height="30" />
    </div>
  </div>
);

export default AdminNavbar;
