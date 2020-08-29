import React, { Component } from "react";
import { Link } from "react-router-dom";
import place from "../../graphics/place.png";
import logo from "../../graphics/logo.svg";
import search from "../../graphics/search.svg";
import dots from "../../graphics/dots.svg";
import arrow from "../../graphics/arrow-down.svg";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";

class MainNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };


  }





  render() {
    return (
      <div>
        <TwoButtons
          adminCounts={this.props.adminCounts}
          b1={this.props.button1Flip}
          b2={this.props.button2Flip}
          f1={this.props.handleFlip1}
          f2={this.props.handleFlip2}
        ></TwoButtons>
        <FrameRezerwacje adminCounts={this.props.adminCounts} section={this.props.section} goTo={this.props.update} state={this.props.button1Flip}></FrameRezerwacje>
        <FrameUbrania section={this.props.section} goTo={this.props.update} state={this.props.button2Flip}></FrameUbrania>

    </div>
    );
  }
}

function TwoButtons({ b1, b2, f1, f2, adminCounts }) {
  return (
    <div
    style={{overflow:"auto",whiteSpace: "nowrap",}}
    >


      <ButtonMine s={b1}f={f1}text={"Rezerwacje"}n={adminCounts.reqCount}></ButtonMine>
      <ButtonMine s={b2}f={f2}text={"Ubrania"}n={""}></ButtonMine>


    </div>
  );
}

function ButtonMine({ s,f,text,n }) {
    return (
        <div className="d-inline-block" id="navlink" onClick={f}>
            
        <div
        style={{
            padding: "8px",
            paddingLeft: "15px",
            fontSize: "23px",
            cursor: "pointer",
          }}
        ><span className="badge badge-danger mr-1">{n=="0"?(null):(n)}</span>
          {text}
          <img
            src={arrow}
            className={s ? "arrow active" : "arrow"}
            alt="arrow"
            height="20"
          />
        </div>
      </div>
    );
}

function FrameUbrania({ state, goTo, section }) {
    return (
      <div>
        <div
          className={state ? "d-block" : "active d-block"}
          id="mojaSzafaWindowPhone"
        >
          <CustomButton active={section==4} danger={false} n="" text="Na sklepie" link={()=>{goTo(4)}}></CustomButton>
            <CustomButton active={section==5} danger={false} n="" text="Odłożone" link={()=>{goTo(5)}}></CustomButton>
            <CustomButton active={section==6} danger={false} n="" text="Archiwum" link={()=>{goTo(6)}}></CustomButton>
            <CustomButton active={section==7} danger={false} n="" text="Dodawane" link={()=>{goTo(7)}}></CustomButton>
        </div>
      </div>
    );
  }

function FrameRezerwacje({ state, goTo, section, adminCounts }) {
    return (
      <div>
        <div
          className={state ? "d-block" : "active d-block"}
          id="mojaSzafaWindowPhone"
        >
            <CustomButton active={section==1} danger={true} n={adminCounts.reqCount} text="Prośby" link={()=>{goTo(1)}}></CustomButton>
            <CustomButton active={section==2} danger={false} n={adminCounts.reservedCount} text="Zarezerwowane" link={()=>{goTo(2)}}></CustomButton>
            <CustomButton active={section==3} danger={false} n={adminCounts.historyCount} text="Historia" link={()=>{goTo(3)}}></CustomButton>
        </div>
      </div>
    );
  }
  
  const CustomButton = ({ text, link, n, danger,active }) => (
    
      <div
        onClick={link}
        id="CustomButton"
        style={{
          backgroundColor: active ? "#44FFC5" : "#E0FEF5" ,
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
          <div>{text} <span className={danger ? "badge badge-danger ml-1" : "badge badge-dark ml-1"}>{n}</span></div>
        </div>
      </div>
    
  );
  

export default MainNavigation;
