import React, { Component } from "react";
import banner from "../../../graphics/banner.jpg";


class Banner extends Component {
  constructor(props) {
  super(props);
  this.state = {
  };
  this.handleClick=this.handleClick.bind(this);
}

handleClick(target){
  this.props.bannerDestination(target);
}

  render() {
    return (
      <div>
      <div className="d-none d-lg-flex justify-content-center"
      style={{
        height: "400px",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${banner})`,
        
      }}>


            <div style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0) 100%)", 
            textAlign:"center", 
            width:"100%",
            paddingTop: "60px",
            paddingBottom: "30px",}}>
        <div className="banner-text">
        {this.props.banner.firstLine}
        <br />
        {this.props.banner.SecondLine}
      </div>
      <button id="login" onClick={this.handleClick} className="active mt-3 p-3 pt-2 pb-2">
        <span>Sprawdź</span>
        <svg viewBox="0 0 24 24">
          <path
            d="M5.208,13.209h11.17l-4.88,4.88c-0.39,0.39-0.39,1.03,0,1.42c0.39,0.39,1.02,0.39,1.411,0l6.59-6.59
            c0.39-0.391,0.39-1.02,0-1.41l-6.58-6.6c-0.391-0.391-1.021-0.391-1.411,0c-0.39,0.389-0.39,1.02,0,1.409l4.871,4.89H5.208
            c-0.55,0-1,0.451-1,1C4.208,12.759,4.659,13.209,5.208,13.209z"
          ></path>
        </svg>
      </button>
        </div>

        </div> 
        <div className="d-flex d-lg-none justify-content-center"
        style={{
          
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundImage: `url(${banner})`,
          
        }}>

          <div style={{
            background: "linear-gradient(180deg, rgba(20,20,20,0.7) 0%, rgba(255,255,255,0) 100%)", 
            textAlign:"center", 
            width:"100%",
            paddingTop: "30px",
            paddingBottom: "30px",}}>
        <div className="banner-text-phone">
        {this.props.banner.firstLine}<br/>{this.props.banner.SecondLine}
      </div>
      <button id="login" onClick={this.handleClick}   className="d-inline active p-2 mt-3 pl-3 pr-3">
        <span>Sprawdź</span>
        <svg viewBox="0 0 24 24">
          <path
            d="M5.208,13.209h11.17l-4.88,4.88c-0.39,0.39-0.39,1.03,0,1.42c0.39,0.39,1.02,0.39,1.411,0l6.59-6.59
            c0.39-0.391,0.39-1.02,0-1.41l-6.58-6.6c-0.391-0.391-1.021-0.391-1.411,0c-0.39,0.389-0.39,1.02,0,1.409l4.871,4.89H5.208
            c-0.55,0-1,0.451-1,1C4.208,12.759,4.659,13.209,5.208,13.209z"
          ></path>
        </svg>
      </button>
        </div>



          </div> 
          </div>
     
    );
  }
}

export default Banner;

