import React, { Component } from "react";
import logo from "../../graphics/logo.svg";
import arrow from "../../graphics/arrow-down.svg";
import whiteArrow from "../../graphics/whiteArrow.svg";
import place from "../../graphics/place.png";
import profile from "../../graphics/profile.jpg";
import account from "../../graphics/account.png";
import help from "../../graphics/help.png";
import powiadomienia from "../../graphics/powiadomienia.png";
import mojaSzafa from "../../graphics/mojaSzafa.png";
import NavLink from "react-bootstrap/NavLink";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Navbar from "react-bootstrap/Navbar";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";

class BottomNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addressFold: false,
    };
  }
  addressFlip = () => {
    this.setState((state) => ({ addressFold: !this.state.addressFold }));
  };

  render() {
    return (
      <div style={{height:"50px"}} className="bg-light shadow">
        <div className="col-lg-1 d-none d-lg-inline-block"></div>


{/* for big screens */}
        <div 
        className="d-none d-lg-inline-block col-lg-10">
          <CustomButton
            text="Kobieta"
            chosen={this.props.section == 1}
            Click={() => this.props.update(1)}
          ></CustomButton>
          <CustomButton
            text="Mężczyzna"
            chosen={this.props.section == 2}
            Click={() => this.props.update(2)}
          ></CustomButton>
          <CustomButton
            text="Dziecko"
            chosen={this.props.section == 3}
            Click={() => this.props.update(3)}
          ></CustomButton>
          <CustomButton
            text="Promocje"
            chosen={this.props.section == 4}
            Click={() => this.props.update(4)}
          ></CustomButton>
          
          

          <div className=" float-right d-none d-lg-block">
            <Address
              changeBranch={this.props.changeBranch}
              chosenBranchIndex={this.props.chosenBranchIndex}
              chosenBranch={this.props.chosenBranch}
              shops={this.props.shops}
              state={this.state.addressFold}
              flip={this.addressFlip}
            ></Address>
          </div>

        </div>
        

{/* phones */}

<div 
        style={{overflow:"auto",whiteSpace: "nowrap",}} 
        className="d-inline-block d-lg-none col-lg-10">
          <CustomButton
            text="Kobieta"
            chosen={this.props.section == 1}
            Click={() => this.props.update(1)}
          ></CustomButton>
          <CustomButton
            text="Mężczyzna"
            chosen={this.props.section == 2}
            Click={() => this.props.update(2)}
          ></CustomButton>
          <CustomButton
            text="Dziecko"
            chosen={this.props.section == 3}
            Click={() => this.props.update(3)}
          ></CustomButton>
          <CustomButton
            text="Promocje"
            chosen={this.props.section == 4}
            Click={() => this.props.update(4)}
          ></CustomButton>
          

        </div>


        <div className="col-lg-1 d-none d-lg-inline-block"></div>
      </div>
    );
  }
}

const CustomButton = ({ text, chosen, Click }) => (
  <div
    onClick={Click}
    className={chosen ? "d-inline-block active " : "d-inline-block"}
    id="CustomButton"
    style={{
      
      backgroundColor: "none",
    }}
    
  >
    <div
      className="d-flex justify-content-center"
      style={{
        padding: "12px",
        paddingLeft: "15px",
        paddingRight: "15px",

        fontSize: "17px",
        cursor: "pointer",
        height:"50px",
      }}
    >
      {text}
    </div>
  </div>
);

const Address = ({ state, flip, chosenBranch, shops, chosenBranchIndex, changeBranch }) => (
  <div>
    <div
      onClick={flip}
      className={state ? "d-inline-block active " : "d-inline-block"}
      id="address"
      style={{
        backgroundColor: "none",
      }}
    >
      <div
        className="d-flex justify-content-center"
        style={{
          height:"50px",
          padding: "12px",
          paddingLeft: "15px",
          paddingRight: "15px",
          fontSize: "17px",
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
        {chosenBranch}
        <img
          src={whiteArrow}
          className={state ? "arrow active" : "arrow"}
          alt="arrow"
          height="15"
          style={{
            marginTop: "6px",
          }}
        />
      </div>
    </div>

    <div
      className={state ? null : "active"}
      id="mojaSzafaWindow"
      style={{ position: "relative" }}
    >
      <div
        className="mojaSzafaWindow shadow p-3 mb-5 bg-white rounded"
        style={{
          position: "absolute",
              left: "-60px",
              top: "2px",
              width: "320px",
        }}
      >


          <React.Fragment>
            {shops.map((sh, i) => (

              <div className="addressButton" style={{
                display: "flex",
                width: "100%",
                justifyContent:"center",
                paddingTop: "8px",
                paddingBottom: "8px",
                
              }}
              onClick={()=>changeBranch(i)}
              >{i==chosenBranchIndex?(
                <small><b>{sh.address}</b></small>

              ):(<small>{sh.address}</small>)}</div>
            ))}
          </React.Fragment>

              <hr/>

        <div  style={{
          display: "flex",
          width: "100%",
          justifyContent:"center",
          paddingTop: "8px",
          paddingBottom: "8px",
          color: "grey"
        }}><small>WKRÓTCE: Lubawa, Rynek 11</small></div>

        
        
        
      </div>
    </div>
  </div>
);

export default BottomNavbar;
