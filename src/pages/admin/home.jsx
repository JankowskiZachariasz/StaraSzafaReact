import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import { Alert, Button, ThemeProvider } from "react-bootstrap";
import AdminNavbar from "./adminNavbar";
import SearchBar from "./searchBar";
import MainNavigation from "./mainNavigation";
import Content from "./content";
import axios from 'axios';
import stickArrow from "../../graphics/stickArrow.svg";
import info from "../../graphics/info.svg";
import tick from "../../graphics/tick.svg";
import arrowR from "../../graphics/arrow-right.svg";


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adminData:{},
      status: "",
      section: 1,
      button1Flip: false,
      button2Flip: false,

      requests:[],
      reserved:[],
      history:[],

      forSale:[],
      reservedCloths:[],
      archieve:[],
      beingAdded:[],
      

    };
    this.collapse=this.collapse.bind(this);
    this.handleFlip1 = this.handleFlip1.bind(this);
    this.handleFlip2 = this.handleFlip2.bind(this);
    this.updateSection=this.updateSection.bind(this);
    this.resolveAdminData=this.resolveAdminData.bind(this);
    this.resolveUrl=this.resolveUrl.bind(this);
    this.findUser=this.findUser.bind(this);
    this.findCloth=this.findCloth.bind(this);
    this.resolveStatus=this.resolveStatus.bind(this);
    

  }

resolveStatus(s){
  var text="niewiadomo";
switch(s){
  case("3"):{text="Klient Kupił";break}
  case("4"):{text="Anulowaliśmy";break}
  case("5"):{text="Nie odebrano na czas";break}
  case("7"):{text="Klient nie kupił";break}
  case("8"):{text="Nie odebrano";break}
  
}
return(text);
}

 findUser(users, _id){
   var user = {name: "notFound", firstName:"notFound"};
  users.map(u=>{
    if(u._id==_id)
    user = (u.FirstName+" "+u.name)
  })
  return user;
}

findCloth(cloths, _id){
  var cloth = {_id:"",thumbnail:"",code:""};
 cloths.map(u=>{
   if(u._id==_id)
   {
    var thumbnail="";
    u.photos.map(p=>{
      if(p.primary){
          var o=p.file.length;
          thumbnail="http://staraszafa.info/"+p.file.slice(0,o-4)+"_sm.jpg";
    }})
    cloth = {_id:u._id,thumbnail:thumbnail,code:u.code};

   }
 })
 return cloth;
}

   resolveAdminData(section){
    

    switch(section){
      case(1):{//requests
        const requestOptions = {method: "GET", headers: {"Content-Type": "application/json",Accept: "application/json",authorization: ("b " + this.props.token)}};
        fetch("http://staraszafa.info/admin/requests", requestOptions)
          .then((res) => res.json()).then((data) => {

            console.log(data);
            if(data.success){
              var reservtionsCompiled=data.reservations.map(r=>{
                return({
                  user:this.findUser(data.usersFiltered,r.reserver),
                  cloth:this.findCloth(data.cloths,r.cloth),
                  lastEventDate:HoursAgo(r.lastEventDate),
                  _id:r._id,
                })
              })
            }
            // data.beingAdded.map((e, i)=>{e.dateAdded=convertDate(e.dateAdded, true)})
            this.setState({requests:reservtionsCompiled})
          }).catch((error) => {console.log(error);});
        
        break;}
      case(2):{
        const requestOptions = {method: "GET", headers: {"Content-Type": "application/json",Accept: "application/json",authorization: ("b " + this.props.token)}};
        fetch("http://staraszafa.info/admin/reserved", requestOptions)
          .then((res) => res.json()).then((data) => {

            console.log(data);
            if(data.success){
              var reservtionsCompiled=data.reservations.map(r=>{
                return({
                  user:this.findUser(data.usersFiltered,r.reserver),
                  cloth:this.findCloth(data.cloths,r.cloth),
                  lastEventDate:convertDate(r.ExpiryDate),
                  _id:r._id,
                })
              })
            }
            // data.beingAdded.map((e, i)=>{e.dateAdded=convertDate(e.dateAdded, true)})
            this.setState({reserved:reservtionsCompiled})
          }).catch((error) => {console.log(error);});
        break;}//reserved
      case(3):{
        const requestOptions = {method: "GET", headers: {"Content-Type": "application/json",Accept: "application/json",authorization: ("b " + this.props.token)}};
        fetch("http://staraszafa.info/admin/history", requestOptions)
          .then((res) => res.json()).then((data) => {

            console.log(data);
            if(data.success){
              var sorted = data.reservations.sort(function(a, b) {
                var dA = new Date(a.lastEventDate);
                var dB = new Date(b.lastEventDate);
                if (dA>dB) {
                  return -1;
                }
                if (dA<dB) {
                  return 1;
                }
                return 0;
              });
              var reservtionsCompiled=sorted.map(r=>{
                return({
                  user:this.findUser(data.usersFiltered,r.reserver),
                  cloth:this.findCloth(data.cloths,r.cloth),
                  lastEventDate:convertDate(r.lastEventDate, true),
                  status:this.resolveStatus(r.status),
                  _id:r._id,
                })
              })
            }
            // data.beingAdded.map((e, i)=>{e.dateAdded=convertDate(e.dateAdded, true)})
            this.setState({history:reservtionsCompiled})
          }).catch((error) => {console.log(error);});
        break;}//history
      case(4):{//forSale
        const requestOptions = {method: "GET", headers: {"Content-Type": "application/json",Accept: "application/json",authorization: ("b " + this.props.token)}};
        fetch("http://staraszafa.info/admin/forSale", requestOptions)
          .then((res) => res.json()).then((data) => {

            data.beingAdded.map((e, i)=>{e.dateAdded=convertDate(e.dateAdded, true)})

            this.setState({forSale:data.beingAdded})
          }).catch((error) => {console.log(error);});
        break;}
      case(5):{break;}//reservedCloths
      case(6):{break;}//archieved
      case(7):{//beingAdded
        
      
      const requestOptions = {method: "GET", headers: {"Content-Type": "application/json",Accept: "application/json",authorization: ("b " + this.props.token)}};
      fetch("http://staraszafa.info/admin/beingAdded", requestOptions)
        .then((res) => res.json()).then((data) => {
          data.beingAdded.map((e, i)=>{e.dateAdded=convertDate(e.dateAdded, true)})
          this.setState({beingAdded:data.beingAdded})
        }).catch((error) => {console.log(error);});
  

        break;}
    }

    

  }

  resolveUrl(){
    switch(this.props.match.params.section){
      case("1"):{this.setState({section:1});this.resolveAdminData(1);break;}//requests
      case("2"):{this.setState({section:2});this.resolveAdminData(2);break;}//reserved
      case("3"):{this.setState({section:3});this.resolveAdminData(3);break;}//history
      case("4"):{this.setState({section:4});this.resolveAdminData(4);break;}//forSale
      case("5"):{this.setState({section:5});this.resolveAdminData(5);break;}//reservedCloths
      case("6"):{this.setState({section:6});this.resolveAdminData(6);break;}//archieved
      case("7"):{this.setState({section:7});this.resolveAdminData(7);break;}//beingAdded
      case("8"):{this.setState({section:8});this.resolveAdminData(8);break;}//add
      default:{this.setState({section:1});this.resolveAdminData(1);}
        
    }
    
  }

  componentDidMount() {
    this.resolveUrl();
    window.scrollTo(0, 0);
  }

  updateSection = (newSec)=>{
    this.resolveAdminData(newSec);
      this.setState({section: newSec});
      this.props.history.push("/admin/"+newSec);

  }

  handleFlip1() {
    if(!this.state.button1Flip&&this.state.button2Flip)
    this.setState({ button2Flip: false });
  this.setState({ button1Flip: !this.state.button1Flip });
}

handleFlip2() {
  if(this.state.button1Flip&&!this.state.button2Flip)
  this.setState({ button1Flip: false });
  this.setState({ button2Flip: !this.state.button2Flip });
}
collapse() {
    if(true)
    this.setState({ button1Flip: false, button2Flip: false  });
  }

  render() {
    return (
      <div>
         {this.props.status == 2 ? null : ( <Redirect to="/home" />)}
        <AdminNavbar></AdminNavbar>
        <SearchBar></SearchBar>
        <MainNavigation 
        adminCounts={this.props.adminCounts}
        handleFlip1={this.handleFlip1}
        handleFlip2={this.handleFlip2}
        button1Flip={this.state.button1Flip} 
        button2Flip={this.state.button2Flip} 
        section={this.state.section} 
        update={this.updateSection}></MainNavigation>
        
        <Content 
        historyArray={this.state.history}
        reserved={this.state.reserved}
        requests={this.state.requests}
        forSale={this.state.forSale}
        beingAdded={this.state.beingAdded}
        token={this.props.token} 
        collapse={this.collapse} 
        section={this.state.section} 
        update={this.updateSection}
        checkStatus={this.props.checkStatus}
        {...this.props}>
        </Content>
        
          {/* <div className="col-xs-0 col-lg-1 d-inline-block"></div> */}
          {/* <div className=" d-inline-block col-12 col-lg-10 "> */}
          
            {/* <div className="d-lg-flex align-content-start">
              <div className="col-lg-6 d-inline-block ">lewa</div>
              <div className="col-lg-6 d-inline-block">prawa</div>
            </div> */}
          {/* </div> */}
          {/* <div className="col-xs-0 col-lg-1 d-inline-block"></div> */}
       


        
      </div>
    );
  }
}

function HoursLeft(date){
  var willhappen = new Date(date+ " " + "17:00:00");
  var today = new Date();
  var dif = new Date(willhappen.getTime()-today.getTime());
  let hours = dif.getHours()-1;
  let minutes = dif.getMinutes();
  let days =  Math.floor(Math.abs((dif.getTime()) /86400000));
  return(days+" dni, "+hours+" godz, "+minutes+" min")
  
}

function HoursAgo(date){
  var happened = new Date(date);
  var today = new Date();
  var dif = new Date(today.getTime()-happened.getTime());
  let hours = dif.getHours()-1;
  let minutes = dif.getMinutes();
  return(hours+" godz, "+minutes+" min")
  
}


function convertDate(ValidTill, withHours){
  var Expiry = new Date(ValidTill);
  var month = "stycznia";
  switch (Expiry.getMonth() + 1) {
    case 1: {
      month = "stycznia";
      break;
    }
    case 2: {
      month = "lutego";
      break;
    }
    case 3: {
      month = "marca";
      break;
    }
    case 4: {
      month = "kwietnia";
      break;
    }
    case 5: {
      month = "maja";
      break;
    }
    case 6: {
      month = "czerwca";
      break;
    }
    case 7: {
      month = "lipca";
      break;
    }
    case 8: {
      month = "sierpnia";
      break;
    }
    case 9: {
      month = "września";
      break;
    }
    case 10: {
      month = "października";
      break;
    }
    case 11: {
      month = "listopada";
      break;
    }
    case 12: {
      month = "grudnia";
      break;
    }
  }
  let hours = Expiry.getHours();
  let minutes = ("0" + Expiry.getMinutes()).slice(-2);
  if(withHours)
  return Expiry.getDate() + " " + month +", "+hours+":"+minutes;
  else
  return Expiry.getDate() + " " + month + " " + Expiry.getFullYear();
}

export default Home;
