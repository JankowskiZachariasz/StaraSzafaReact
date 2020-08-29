import React, { Component, useState   } from "react";
import { Link } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";
import TopNavbar from "./reusable/topNavbar";
import BottomNavbar from "./reusable/bottomNavbar";
import Footer from "./reusable/Footer";
import stickArrow from "../graphics/stickArrow.svg";
import info from "../graphics/info.svg";
import tick from "../graphics/tick.svg";
import place from "../graphics/placeDark.png";
import calendar from "../graphics/calendar.svg";
import profileFull from "../graphics/profileFull.jpg";
import arrow from "../graphics/arrow-down.svg";
import arrowRight from "../graphics/arrow-right.svg";


class Mojaszafa extends Component {
  constructor(props) {
    super(props);

    this.state = {
        activeReservations:[],
        archivedReservations:[],
        cloths:[],
        user:{},

        error:false

    };

    this.updateSection = this.updateSection.bind(this);
    this.setSection = this.setSection.bind(this);
    this.pullActiveReservations = this.pullActiveReservations.bind(this);
    this.gotoReservation = this.gotoReservation.bind(this);

  }

  gotoReservation(id){
    this.props.history.push("/rezerwacja/"+id);
    this.props.setViewReservationId(id);
  }


  pullActiveReservations(){//...and much more

    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: ("b " + this.props.token)
        },
        body: JSON.stringify({request:"reservations"}),
      };
      fetch("http://staraszafa.info/api/getReservations", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if(data.success==true){
              var sortedActive = data.reservations.sort(function(a, b) {
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
              var sortedArchived = data.reservationsArchived.sort(function(a, b) {
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
             this.setState({
                 cloths:data.cloths,
                 activeReservations:sortedActive,
                 archivedReservations:sortedArchived,
                 user:data.user,
                 error:false,
             });
          }
          else{
            this.setState({error: true});
          }
        })
        .catch((error) => {
          this.setState({error: true});
          console.log(error);
        });

  }

  setSection(newSec){
    this.props.setMojaSzafaSection(newSec);
  }



  componentDidMount() {
    window.scrollTo(0, 0);
    this.pullActiveReservations();
   
  }


  updateSection = (newSec) => {
    switch (newSec) {
      case 1: {
        this.props.history.push("/home/damskie");
        break;
      }
      case 2: {
        this.props.history.push("/home/meskie");
        break;
      }
      case 3: {
        this.props.history.push("/home/dzieciece");
        break;
      }
      case 4: {
        this.props.history.push("/home/promocje");
        break;
      }
    }
  };

  render() {
    return (
      <div>
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
          status={this.props.status}
          
        ></TopNavbar>
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
        <div style={{minHeight:"100vh"}}>
        
          
        <Picture></Picture>
          

        <div >
          <div className="d-none d-lg-block">
          <div className="col-lg-1 d-inline-block"></div>
          <div className=" d-inline-block col-lg-10 ">


        <div style={{display:"grid",gridTemplateColumns:"300px 1fr"}}>
            <div>
          <div className="shadow bg-white p-3">
          <div><ButtonMine s={this.props.mojaszafaSection.button1}f={()=>{this.props.setMojaSzafaButton(true,this.props.mojaszafaSection.button1)}}text={"Rezerwacje"}></ButtonMine></div>
          <FrameRezerwacje 
          activeCount={this.state.activeReservations.length} archivedCount={this.state.archivedReservations.length}
          setSection={this.setSection} section={this.props.mojaszafaSection.section} state={this.props.mojaszafaSection.button1}></FrameRezerwacje>
          <div><ButtonMine s={this.props.mojaszafaSection.button2}f={()=>{this.props.setMojaSzafaButton(false,this.props.mojaszafaSection.button2)}}text={"Ustawienia Konta"}></ButtonMine></div>
          <FrameKonto setSection={this.setSection} section={this.props.mojaszafaSection.section} state={this.props.mojaszafaSection.button2}></FrameKonto>
          </div>
            </div>
        <div>
              <Content 
              gotoCloth={(id)=>this.props.history.push("/ubranie/"+id)}
              gotoReservation={this.gotoReservation}
              activeReservations={this.state.activeReservations}
              archivedReservations={this.state.archivedReservations}
              cloths={this.state.cloths}
              user={this.state.user}
              section={this.props.mojaszafaSection.section} ></Content>
        </div>
        </div>


          </div>
          <div className="col-lg-1 d-inline-block"></div>
          </div>

          <div className="d-block d-lg-none">
          
          
          <div style={{width:"100%"}} className="shadow bg-white p-3">
          
          <div><ButtonMine s={this.props.mojaszafaSection.button1}f={()=>{this.props.setMojaSzafaButton(true,this.props.mojaszafaSection.button1)}}text={"Rezerwacje"}></ButtonMine></div>
          <FrameRezerwacje 
          activeCount={this.state.activeReservations.length} archivedCount={this.state.archivedReservations.length}
          setSection={this.setSection} section={this.props.mojaszafaSection.section} state={this.props.mojaszafaSection.button1}></FrameRezerwacje>
          <div><ButtonMine s={this.props.mojaszafaSection.button2}f={()=>{this.props.setMojaSzafaButton(false,this.props.mojaszafaSection.button2)}}text={"Ustawienia Konta"}></ButtonMine></div>
          <FrameKonto setSection={this.setSection} section={this.props.mojaszafaSection.section} state={this.props.mojaszafaSection.button2}></FrameKonto>
          
          </div>
          <Content 
              gotoCloth={(id)=>this.props.history.push("/ubranie/"+id)}
              gotoReservation={this.gotoReservation}
              activeReservations={this.state.activeReservations}
              archivedReservations={this.state.archivedReservations}
              cloths={this.state.cloths}
              user={this.state.user}
              section={this.props.mojaszafaSection.section} ></Content>
          
          </div>

          
      </div>



        
        
        </div>   
        <Footer></Footer>
      </div>
    );
  }
}

function BadgeInfo(n){
    switch(n.status){
        case("1"):{
            return(
              
                    <span style={{padding:"7px", margin: "0px", fontSize:"15px" }} className="ClothStatus badge badge-secondary " > Oczekuje na potwierdzenie  </span>
                    
               
                
            )
            break;}
        case("2"):{
            return(
                <span  style={{padding:"4px", margin: "0px", fontSize:"15px" }} className="ClothStatus badge badge-success " > Gotowe do odbioru!  </span>
            )
            break;}
        case("3"):{
            return(
                <span style={{padding:"4px", margin: "0px", fontSize:"15px" }} className="ClothStatus badge badge-success " > Kupiono!  </span>
            )
            break;}
        case("4"):{
            return(
               
                <span style={{padding:"4px", margin: "0px", fontSize:"15px" }} className="ClothStatus badge badge-warning " > Rezerwacja anulowana!</span>
                
                
            )
            break;}
        case("5"):{
            return(
                <span style={{padding:"4px", margin: "0px", fontSize:"15px" }} className="ClothStatus badge badge-warning " > Nie odebrano na czas </span>
            )
            break;}
        case("7"):{
            return(
                <span style={{padding:"4px", margin: "0px", fontSize:"15px" }} className="ClothStatus badge badge-success " > Nie kupiono  </span>
            )
            break;}
        case("8"):{
            return(
                <span  style={{padding:"4px", margin: "0px", fontSize:"15px" }} className="ClothStatus badge badge-warning " > Nie odebrano na czas  </span>
            )
            break;}
        default:{
            return(
                <span style={{padding:"4px", margin: "0px", fontSize:"15px" }} className="ClothStatus badge badge-danger " > (Błąd)  </span>
            )
            break;}
    }
}

function ActiveReservations(props){
    var d=props.activeReservations.map(a=>{
        var name="";
        var thumbnail="";
        var lastUpdate = convertDate(a.lastEventDate, true);
        props.cloths.map(cc=>{
            if(cc.reservationId==a._id){
                name=cc.name;
                //resolving small photo
                cc.photos.map(p=>{
                    if(p.primary){
                        var o=p.file.length;
                        thumbnail="http://staraszafa.info/"+p.file.slice(0,o-4)+"_sm.jpg";
                    }
                
                
                })
            }
        });
        return {...a,name, thumbnail, lastUpdate};
    })

return(
    <div>
        <h3>Aktywne Rezerwacje</h3>
        <p style={{marginBottom:"50px"}}><img style={{paddingBottom:"2px"}} src={info} alt="info" height="27px" ></img>Twój limit aktywnych rezerwacji to {props.user.limit}. Jak go zwiększyć?</p>
        <React.Fragment>
                    {d.map((n, i) => (
                       <div
                       style={{
                           marginBottom:"15px",
                        maxWidth:"600px",
                         display: "grid",
                         gridTemplateColumns: "100px 1fr 60px",
                         backgroundColor: "#f8f9fa"
                       }}
                       
                     >
                       <div
                       className={"cloth"}
                       onClick={()=>props.gotoCloth(n.cloth)}
                       >
                         <img
                           className="d-inline-block"
                           style={{}}
                           src={n.thumbnail}
                           alt="photo"
                           height="120px"
                         />
                       </div>
       
                       <div
                         style={{
                           fontSize: "15px",
                           padding: "7px",
                           overflow: "hidden",
                           display: "grid",
                           gridTemplateRows: "1fr 2fr 1fr",
                         }}
                       >
                         <div className={"cloth"} onClick={()=>props.gotoCloth(n.cloth)} style={{ fontWeight: "bold" }}>{n.name}</div>
                         <div><BadgeInfo {...n}></BadgeInfo><div>{n.lastUpdate}</div></div>
                         
                         
                         
                       </div>
                       <div onClick={()=>props.gotoReservation(n._id)} style={{width:"60px"}} className="float-right d-flex align-items-center clothButton cloth">
                <img src={arrowRight} alt="arrow"height="40px" className={"arrowCloth"}/>
                </div>
       
                     </div>
                    ))}
                  </React.Fragment>
    </div>
)
}
function ArchivedReservations(props){
    var d=props.archivedReservations.map(a=>{
        var name="";
        var thumbnail="";
        var lastUpdate = convertDate(a.lastEventDate, true);
        props.cloths.map(cc=>{
            if(cc._id==a.cloth){
                name=cc.name;
                //resolving small photo
                cc.photos.map(p=>{
                    if(p.primary){
                        var o=p.file.length;
                        thumbnail="http://staraszafa.info/"+p.file.slice(0,o-4)+"_sm.jpg";
                    }
                
                
                })
            }
        });
        return {...a,name, thumbnail, lastUpdate};
    })

return(
    <div >
        <div style={{marginBottom:"50px"}}><h3 >Historia Rezerwacji</h3></div>
        
        <React.Fragment>
                    {d.map((n, i) => (
                       <div
                       key={n._id}
                       style={{
                           marginBottom:"15px",
                        maxWidth:"600px",
                         display: "grid",
                         gridTemplateColumns: "100px 1fr 60px",
                         backgroundColor: "#f8f9fa"
                       }}
                       
                     >
                       <div
                       className={"cloth"}
                       onClick={()=>props.gotoCloth(n.cloth)}
                       >
                         <img
                           className="d-inline-block"
                           src={n.thumbnail}
                           alt="photo"
                           height="120px"
                         />
                       </div>
       
                       <div
                         style={{
                           fontSize: "15px",
                           padding: "7px",
                           overflow: "hidden",
                           display: "grid",
                           gridTemplateRows: "1fr 2fr 1fr",
                         }}
                       >
                         <div className={"cloth"} onClick={()=>props.gotoCloth(n.cloth)} style={{ fontWeight: "bold" }}>{n.name}</div>
                         <div><BadgeInfo {...n}></BadgeInfo><div>{n.lastUpdate}</div></div>
                         
                         
                         
                       </div>
                       <div onClick={()=>props.gotoReservation(n._id)} style={{width:"60px"}} className="float-right d-flex align-items-center clothButton cloth">
                <img src={arrowRight} alt="arrow"height="40px" className={"arrowCloth"}/>
                </div>
       
                     </div>
                    ))}
                  </React.Fragment>
    </div>
)
}

function Profile(props){
    return(
        <div style={{maxWidth:"600px",}}>
            <div ><h3 >Profil</h3></div>
            <div className="form-group pt-2">
                <label htmlFor="Firstname1">Imię:</label>
                <input
                id="Firstname1"
                type="text"
                name="firstname"
                className="form-control"
                placeholder={props.user.FirstName}
                readonly="true"
                />
            </div>

            <div className="form-group pt-2">
                <label htmlFor="Firstname2">Nazwisko:</label>
                <input
                id="Firstname2"
                type="text"
                name="firstname"
                className="form-control"
                placeholder={props.user.name}
                readonly="true"
                />
            </div>

            <div className="form-group pt-2">
                <label htmlFor="Firstname3">Adres e-mail:</label>
                <input
                id="Firstname3"
                type="text"
                name="firstname"
                className="form-control"
                placeholder={props.user.email}
                readonly="true"
                />
            </div>

            <div className="form-group pt-2">
                <label htmlFor="Firstname4">Limit aktywnych rezerwacji:</label>
                <input
                id="Firstname4"
                type="text"
                name="firstname"
                className="form-control"
                placeholder={props.user.limit}
                readonly="true"
                />
            </div>
        </div>

    );
}

function Content(props){
    var SectionContent=()=>(<div>Błąd</div>);
    switch(props.section){
        case(1):{SectionContent=ActiveReservations;break;}
        case(2):{SectionContent=ArchivedReservations;break;}
        case(3):{SectionContent=Profile;break;}
    }
    //Here's what hides inside the props field
    // activeReservations={this.state.activeReservations}
    // archivedReservations={this.state.archivedReservations}
    // cloths={this.state.cloths}
    // user={this.state.user}
    // section

    return(
        <div>
        <div className="d-none d-lg-block p-3 m-3 ml-5">
            <SectionContent {...props}></SectionContent>
        </div>

        <div className="d-block d-lg-none p-3">
            <SectionContent {...props}></SectionContent>
        </div>
        </div>
    )
}

function Picture({}){
    return(
<div className="d-none d-lg-block">
        <div className="col-lg-1 d-inline-block"></div>
          <div className=" d-inline-block col-lg-10 ">
            <div className="d-flex justify-content-center"
      style={{
        height: "210px",
        backgroundPosition: "50% 12%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${profileFull})`,
        
      }}>

        </div> 
          </div>
          <div className="col-lg-1 d-inline-block"></div>
       
      
          </div>
        
    );
}


function MyLittleButton({text, active, click, n}){
    n=n==null?(""):(" ("+n+")");
    return(
        <div 
        onClick={click}
        className="cloth pt-1 pb-1" style={{fontSize:"18px"}}>
            {active?(
                <div><b style={{color:"#009C6D"}}>{text+" "}</b>{n}</div>
            ):(
                <div>{text+" "+n}</div>
            )}
        </div>
    )
}

function FrameRezerwacje({ state, section, setSection, activeCount, archivedCount }) {
    return (
      <div>
        <div
          className={state ? "d-block pl-3" : "active d-block pl-3"}
          id="mojaSzafaWindowPhone"
        >
            <MyLittleButton n={activeCount} click={()=>{setSection(1)}} text="Aktywne" active={section==1}></MyLittleButton>
            <MyLittleButton n={archivedCount} click={()=>{setSection(2)}} text="Historia" active={section==2}></MyLittleButton>
            

        </div>
      </div>
    );
  }

  function FrameKonto({ state, section, setSection}) {
    return (
      <div>
        <div
          className={state ? "d-block pl-3" : "active d-block pl-3"}
          id="mojaSzafaWindowPhone"
        >
            <MyLittleButton click={()=>{setSection(3)}} text="Profil" active={section==3}></MyLittleButton>
            {/* <MyLittleButton click={()=>{setSection(4)}} text="Twoje Dane" active={section==4}></MyLittleButton>
            <MyLittleButton click={()=>{setSection(5)}} text="Usuń Konto" active={section==5}></MyLittleButton> */}
            
        </div>
      </div>
    );
  }

function ButtonMine({ s,f,text }) {
    
    return (
        <div className="d-inline-block" id="navlink" onClick={f}>
            
        <div
        style={{
            padding: "8px",
            paddingLeft: "15px",
            fontSize: "23px",
            cursor: "pointer",
          }}
        >
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


export default Mojaszafa;
