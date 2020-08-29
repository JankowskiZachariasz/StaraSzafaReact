import React, { Component } from "react";
import { Link } from "react-router-dom";
import stickArrow from "../../graphics/stickArrow.svg";
import fb from "../../graphics/fb.png";

class Footer extends Component {
  render() {
    return <div style={{
      width:"100%",  
      background: "linear-gradient(180deg, rgba(43,187,173,0.4) 100%, rgba(0,105,92,1) 100%)",}}>
        <div style={{margin:"auto", padding:"40px", paddingBottom:"25px"}} className="col-lg-10">
        <Link style={{ color: "inherit", textDecoration: "none" }} to={"/onas"}>
        <div className="footerLink" style={{fontSize:"20px"}}>O NAS<img
          style={{ paddingBottom: "5px", paddingLeft: "3px" }}
          src={stickArrow}
          alt="arrow"
          height="35"
        /></div>
        </Link>
         <Link style={{ color: "inherit", textDecoration: "none" }} to={"/kontakt"}>
        <div className="footerLink" style={{fontSize:"20px", paddingTop:"20px"}}>KONTAKT<img
          style={{ paddingBottom: "5px", paddingLeft: "3px" }}
          src={stickArrow}
          alt="arrow"
          height="35"
        /></div>
        </Link>
        <div className="d-flex justify-content-center" style={{fontSize:"15px", paddingTop:"45px"}}>
          <div className="footerLink">
          <a href="https://www.facebook.com/staraszafalubawa" target="_blank"><img
          style={{ paddingBottom: "5px", paddingLeft: "3px" }}
          src={fb}
          alt="arrow"
          height="35"
        /></a></div>
          </div>
        <div className="d-flex justify-content-center" style={{fontSize:"15px", paddingTop:"15px"}}>
          
        <span className="footerLink" style={{marginRight:"5px"}}>&copy; {new Date().getFullYear()+" Copyright: "}</span><a target="_blank" href="http://zachariaszjankowski.co.uk/aboutme">Zachariasz Jankowski</a>
        </div>
        
        </div>
        </div>;
  }
}




export default Footer;
