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

class Privacy extends Component {
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
        

        <div className="bg-light"  style={{minHeight:"100vh"}}>
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
         <div className=" shadow bg-white rounded mt-2 p-lg-5 mb-5">
             
             <div class="d-flex justify-content-center"style={{paddingTop: "40px",}} ><h3>Polityka prywatności</h3></div>

 <div class="d-flex justify-content-center"style={{paddingTop: "60px",}} ><h5>§ 1</h5></div>
 <div class="d-flex justify-content-center"><h5><b>Jakie dane są gromadzone</b></h5></div>
 <ul  style={{paddingTop: "23px",fontSize:"17px"}}>
 Dla poprawnego działania strony firma Stara Szafa Ewa Witt gromadzi dane o <i>zarejestrowanych</i> użytkownikach. Obejmuje to następujące informacje:
     </ul>
 
    <ol>
        <li  style={{paddingTop: "13px",fontSize:"17px"}}>
        Indywidualne dane dotyczące kont: Imię, Nazwisko, Kod identyfikacyjny, Adres e-mail, Zaszyfrowane hasło, Data dołączenia, Limit dostępnych Rezerwacji.
        </li>

        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        Dane dotyczące rezerwacji: Kod identyfikacyjny rejestrującego użytkownika, zarezerwowany przedmiot, data rezerwacji, status rezerwacji
        </li>
    </ol>

    <div class="d-flex justify-content-center"style={{paddingTop: "60px",}} ><h5>§ 2</h5></div>
 <div class="d-flex justify-content-center"><h5><b>Zasady gromadzenia danych</b></h5></div>
 
 <ol>
        <li  style={{paddingBottom:"50px", paddingTop: "23px",fontSize:"17px"}}>
        Dane użytkowników są gromadzone i wykorzystywane jedynie w celach technicznych – dla poprawnego działania systemu i wszystkich jego funkcji. Nigdy nie użyjemy ich w celach marketingowych.
        </li>

    </ol>

     </div>
    </div>
    </div>
    <Footer></Footer>
      </div>
    );
  }
}


export default Privacy;
