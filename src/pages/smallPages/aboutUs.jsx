import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Alert, Button} from "react-bootstrap"
import TopNavbar from "../reusable/topNavbar";
import BottomNavbar from "../reusable/bottomNavbar";
import Footer from "../reusable/Footer";
import stickArrow from "../../graphics/stickArrow.svg";
import info from "../../graphics/info.svg";
import tick from "../../graphics/tick.svg";
import place from "../../graphics/placeDark.png";
import calendar from "../../graphics/calendar.svg";
import accountDark from "../../graphics/accountDark.png";

class AboutUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    };


    this.updateSection = this.updateSection.bind(this);
    
    
  }
  componentDidMount(){
    window.scrollTo(0, 0);

  }


  

  updateSection = (newSec) => {


    switch(newSec){
      case(1):{this.props.history.push("/home/damskie");break;}
      case(2):{this.props.history.push("/home/meskie");break;}
      case(3):{this.props.history.push("/home/dzieciece");break;}
      case(4):{this.props.history.push("/home/promocje");break;}
    }


  };

  render() {
  
    return (
      <div>
        

        <div  className="bg-light"   style={{minHeight:"100vh"}}>
        <TopNavbar 
        {...this.props}
        setMojaSzafaSection={this.props.setMojaSzafaSection}
        setViewReservationId={this.props.setViewReservationId}
        MarkAsRead={this.props.MarkAsRead}
        token={this.props.token}
        chosenBranchIndex={this.props.chosenBranchIndex}
        changeBranch={this.props.changeBranch}
        chosenBranch={this.props.chosenBranch}
        shops={this.props.availableShops} 
        newNotifications={this.props.newNotifications}  
        email={this.props.email}
        status={this.props.status}></TopNavbar>
        <BottomNavbar
        {...this.props}
          chosenBranchIndex={this.props.chosenBranchIndex}
          changeBranch={this.props.changeBranch}
          chosenBranch={this.props.chosenBranch}
          shops={this.props.availableShops}
          status={this.props.status}
          section={0}
          update={this.updateSection}
          conditional={true}
        ></BottomNavbar>
     
     <div className="col-lg-6 mt-lg-5 p-4"style={{margin: "auto", maxWidth:"800px"}}>
         <div className=" shadow bg-white rounded mt-5 p-5 mb-5">
 <h1>O nas</h1>
     <p style={{paddingTop: "23px",fontSize:"20px"}}>
         Stara Szafa Ewa Witt to mała firma rodzinna, zajmująca się sortowaniem i sprzedażą odzieży używanej. 
         Jesteśmy na rynku od 2015 roku. Posiadamy 3 sklepy – 2 w Lubawie i 1 w Ostródzie. 
         Obecnie staramy się poszerzyć naszą działalność o możliwość rezerwowania ubrań online.</p>
         <p style={{paddingTop:"70px",margin:"4px"}}>Stara Szafa Ewa Witt</p>
         <p style={{margin:"4px"}}>Rynek 11</p>
         <p style={{margin:"4px"}}>14-260 Lubawa</p>
         <p style={{margin:"4px"}}>NIP: 7440006536</p>
         <p style={{margin:"4px"}}>REGON: 510423013</p>
         
            
     </div>
    </div>
    </div>
    <Footer></Footer>
      </div>
    );
  }
}


export default AboutUs;
