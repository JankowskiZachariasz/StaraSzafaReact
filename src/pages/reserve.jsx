import React, { Component, useState  } from "react";
import {Redirect,} from "react-router-dom";
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
import accountDark from "../graphics/accountDark.png";

class Reserve extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cloth: null,
    };

    this.updateSection = this.updateSection.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleSubmit(){

    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: ("b " + this.props.token)
        },
        body: JSON.stringify({ clothId: this.props.reservedCloth._id }),
      };
      fetch("http://staraszafa.info/api/reserve", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if(data.success==1){
              this.props.setMainPageNotification("Reservation successfull");
            this.props.history.push("/home");
          }
        })
        .catch((error) => {
          console.log(error);
        });

  }

  componentDidMount() {
    window.scrollTo(0, 0);

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
          chosenBranchIndex={this.props.chosenBranchIndex}
          changeBranch={this.props.changeBranch}
          chosenBranch={this.props.chosenBranch}
          shops={this.props.availableShops}
          newNotifications={this.props.newNotifications}
          email={this.props.email}
          status={this.props.status}
          token={this.props.token}
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
        <div>
          <div className="col-lg-1 d-inline-block"></div>
          <div className=" d-inline-block col-lg-10 ">


              {this.props.reservedCloth==null?(
                  <Redirect to={"/ubranie/"+this.props.match.params.id} />
              ):(

                  <div className="d-lg-flex align-content-start">
                  <div className="col-lg-6 d-inline-block p-lg-5 mb-5 ">
                    <Ticks
                    handleSubmit={this.handleSubmit}
                    data={this.props.reserveDetails}
                    cloth={this.props.reservedCloth}></Ticks>
                  </div>
                  <div className="col-lg-6 d-inline-block p-lg-5 ml-lg-5 mt-lg-4">
                      <Advert 
                      data={this.props.reserveDetails}
                      cloth={this.props.reservedCloth}></Advert>
                    {/* {this.props.reserveDetails.ValidTill} */}
                  </div>
                </div>
              )}
            



          </div>
          <div className="col-lg-1 d-inline-block"></div>
        </div>
        </div>   
        <Footer></Footer>
      </div>
    );
  }
}

function Ticks({cloth, data, handleSubmit}){
    const t1 = <div>Planuję odwiedzić sklep Stara Szafa (<b>{data.address}</b>), aby obejrzeć zarezerwowany przedmiot i dokonać opcjonalnego zakupu.</div>
    const t2 = <div>Rozumiem, że rezerwacja będzie ważna przez 3 następne dni robocze. Po tym okresie inni klienci będą mogli kupić zarezerwowany przedmiot.</div>
    const t3 = <div>Chcę zarezerwować przedmiot <i>{' "'+cloth.name+'"'}</i> na nazwisko<b>{' '+data.surname}</b>.</div>


    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);

    return(
        <div>
        <h3 className="pt-5 mt-2 mb-3">Podsumowanie</h3>

        <div className="pt-2" >
        <CheckBox
         s={active1}
         f={()=>{setActive1(!active1)}}
         id={"x"} 
         Text={t1} 
        ></CheckBox>

        <CheckBox
        s={active2}
        f={()=>{setActive2(!active2)}}
         id={"y"} 
         Text={t2} 
        ></CheckBox>

        <CheckBox
        s={active3}
        f={()=>{setActive3(!active3)}}
         id={"z"} 
         Text={t3} 
        ></CheckBox>
        </div>

        <div>
                   <ReserveButton
                   handleSubmit={handleSubmit}
                   show={active1&&active2&&active3}
                   ></ReserveButton>
            </div>

        </div>
    )
}

const ReserveButton = ({ show, handleSubmit }) => {
    if (show)
      return (
        <button id="login" onClick={handleSubmit} className="active mt-3 p-2">
          <span>Zarezerwuj</span>
          <svg viewBox="0 0 24 24">
            <path
              d="M5.208,13.209h11.17l-4.88,4.88c-0.39,0.39-0.39,1.03,0,1.42c0.39,0.39,1.02,0.39,1.411,0l6.59-6.59
              c0.39-0.391,0.39-1.02,0-1.41l-6.58-6.6c-0.391-0.391-1.021-0.391-1.411,0c-0.39,0.389-0.39,1.02,0,1.409l4.871,4.89H5.208
              c-0.55,0-1,0.451-1,1C4.208,12.759,4.659,13.209,5.208,13.209z"
            ></path>
          </svg>
        </button>
      );
    else
      return (
        <button id="login" type="submit" className="mt-3 p-2" disabled>
          <span>Zarezerwuj</span>
          <svg viewBox="0 0 24 24">
            <path
              d="M5.208,13.209h11.17l-4.88,4.88c-0.39,0.39-0.39,1.03,0,1.42c0.39,0.39,1.02,0.39,1.411,0l6.59-6.59
              c0.39-0.391,0.39-1.02,0-1.41l-6.58-6.6c-0.391-0.391-1.021-0.391-1.411,0c-0.39,0.389-0.39,1.02,0,1.409l4.871,4.89H5.208
              c-0.55,0-1,0.451-1,1C4.208,12.759,4.659,13.209,5.208,13.209z"
            ></path>
          </svg>
        </button>
      );
  };

function CheckBox({ id, Text, s, f}) {

    

    return (
      <div className="checkBox pt-3">
        <input className={s? "active" : ""} type="custom" id={id} />
        <label onClick={f} for={id}>
          <svg viewBox="134.5 228 334 334">
            <polyline
              className="check"
              fill="none"
              stroke="#6F6F6F"
              stroke-width="30"
              points="195,395.75 275.75,471.75 410.25,310.75 "
            />
  
            <rect
              className="box"
              x="152.59"
              y="246.341"
              fill="none"
              stroke="#6F6F6F"
              stroke-width="30"
              width="300"
              height="300"
            ></rect>
          </svg>
          <span>{Text}</span>
        </label>
      </div>
    );
  }

function Advert({cloth, data}){
    var thumbnail=""
    cloth.photos.map(p=>{
        if(p.primary){
            var o=p.file.length;
            thumbnail="http://staraszafa.info/"+p.file.slice(0,o-4)+"_sm.jpg";
        }
    })
    
    return(
    <div className="shadow bg-white rounded mt-5">
      <div className="d-flex justify-content-center mb-3 pl-3">
          
        <div>
          

        <div className="d-flex justify-content-center p-4" style={{color:"#777", width:"100%"}}>SZCZEGÓŁY REZERWACJI</div>


        <div style={{marginBottom:"30px",display:"grid", gridTemplateColumns:"70px 1fr 10px"}} className="ml-3 mr-3 bg-light">
                

              <div>
              <img
                    className="d-inline-block"
                    style={{}}
                    src={thumbnail}
                    alt="photo"
                    height="80px"/>

              </div>
              

              <div style={{fontSize:"19px", padding: "7px",whiteSpace:"nowrap", overflow:"hidden",display:"grid", gridTemplateRows:"2fr 2fr"}}>

                <div style={{fontWeight:"bold"}}>{cloth.name}</div>
                <div><Price cloth={cloth}></Price></div>
           
                
                                  
              </div>



              <div>
              
              </div>

                
        </div>







          <div>
            <div className="p-3">
              <img
                src={place}
                style={{ paddingBottom: "5px" }}
                alt="tick"
                height="27"
              />{" "}
              <b>{data.address}</b>{" — nasz sklep, w którym obejrzysz, przymierzysz i opcjonalnie kupisz rezerwowany przedmiot."}
            </div>
            <div className="p-3">
              <img
                src={calendar}
                style={{ paddingBottom: "5px" }}
                alt="tick"
                height="27"
              />{" "}
              <b>{data.ValidTill}</b>{" — ostatni dzień na odbiór rezerwacji."}
            </div>
            <div className="p-3 mb-5">
              <img
                src={accountDark}
                style={{ paddingBottom: "5px" }}
                alt="tick"
                height="27"
              />{" "}
              <b>{data.surname}</b> — na to nazwisko rezerwujesz przedmiot.
            </div>
          </div>
        </div>
      </div>
    </div>
  );}


  function Price({ cloth }) {

    
    cloth.price =
    cloth.price.includes(".") || cloth.price.includes(",")
      ? cloth.price
      : cloth.price + ",00";

    var discount = false;
    var discountPercentageVAlue = 0;

    if (cloth.tags.length == 2)
      cloth.tags[1].children.map((x) => {
        if (x == "Lato 2020: -50%") {
          discount = true;
          discountPercentageVAlue = 50;
        } else if (x == "Lato 2020: -30%") {
          discount = true;
          discountPercentageVAlue = 30;
        }
      });

    return (
      <div>

{discount ? (
            <div>
                <div style={{paddingRight: "6px",}} className="d-inline-block" >
                {Math.round(
                  parseInt(cloth.price) *
                    ((100 - discountPercentageVAlue) / 100)
                ) + ",00 PLN"}
              </div>
              <div
              className="d-inline-block" 
                style={{
                  fontSize:"19px",
                  textDecoration: "line-through",
                  color: "#E9131A",
                }}
              >
                {cloth.price + " PLN"}
              </div>
            </div>
          ) : (
            cloth.price + " PLN"
          )}
      
      </div>
    );
  }
export default Reserve;
