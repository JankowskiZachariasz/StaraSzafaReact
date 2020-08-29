import React, { Component, useState } from "react";
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

class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {

    //   notFound: false,
    //   cloth: null,
    //   reservation: null,
    //   surname: "",
    //   address: "",
    };

    this.updateSection = this.updateSection.bind(this);
    this.goToCloth = this.goToCloth.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.setViewReservationId(this.props.match.params.id);
  }

  goToCloth(id){
    this.props.history.push("/ubranie/"+id)
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
        <div style={{ minHeight: "100vh" }}>
          {this.props.viewReservationId.cloth != null ? (
            <div>
              <div className="col-lg-1 d-inline-block"></div>
              <div className=" d-inline-block col-lg-10 ">
                <div className="d-lg-flex align-content-start">
                  <div className="col-lg-2 d-inline-block p-lg-5 mb-5 "></div>
                  <div className="col-lg-8 d-inline-block ">
                    <Advert
                    reservation={this.props.viewReservationId.reservation}
                      goToCloth={this.goToCloth}
                      ValidTill={this.props.viewReservationId.reservation.ExpiryDate}
                      surname={this.props.viewReservationId.surname}
                      cloth={this.props.viewReservationId.cloth}
                      address={this.props.viewReservationId.address}
                    ></Advert>
                  </div>
                </div>
              </div>
              <div className="col-lg-1 d-inline-block"></div>
            </div>
          ) : (
            <div>
              <div className="col-lg-1 d-inline-block"></div>
              <div className=" d-inline-block col-lg-10 ">
                <div className="d-lg-flex align-content-start">
                  <div className="col-lg-6 d-inline-block p-lg-5 mb-5 ">
                  {this.props.viewReservationId.notFound ? (
                      <div>
                        <h1>404</h1>
                        <p>
                          Rezerwacja, której szukasz nie istnieje lub została
                          usunięta. Możliwe również, że należy do innego
                          użytkownika.
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <div className="col-lg-6 d-inline-block ">
                 
                  </div>
                </div>
              </div>
              <div className="col-lg-1 d-inline-block"></div>
            </div>
          )}
        </div>
        <Footer></Footer>
      </div>
    );
  }
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
    return Expiry.getDate() + " " + month + " " + Expiry.getFullYear() +", godz. "+hours+":"+minutes;
    else
    return Expiry.getDate() + " " + month + " " + Expiry.getFullYear();
}

function BadgeInfo({status}){
    switch(status){
        case("1"):{
            return(
                <span style={{ marginBottom: "10px" }} className="ClothStatus badge badge-secondary " > Oczekuje na potwierdzenie  </span>
            )
            break;}
        case("2"):{
            return(
                <span style={{ marginBottom: "10px" }} className="ClothStatus badge badge-success " > Gotowe do odbioru!  </span>
            )
            break;}
        case("3"):{
            return(
                <span style={{ marginBottom: "10px" }} className="ClothStatus badge badge-success " > Kupiono!  </span>
            )
            break;}
        case("4"):{
            return(
                <div>
                <span style={{ marginBottom: "10px" }} className="ClothStatus badge badge-warning " > Rezerwacja anulowana!</span>
                <div><i>Towar został kupiony przez innego klienta w sklepie, zanim zdążyliśmy go odłożyć. Przepraszamy!</i></div>
                </div>
            )
            break;}
        case("5"):{
            return(
                <span style={{ marginBottom: "10px" }} className="ClothStatus badge badge-warning " > Nie odebrano na czas </span>
            )
            break;}
        case("7"):{
            return(
                <span style={{ marginBottom: "10px" }} className="ClothStatus badge badge-success " > Nie kupiono  </span>
            )
            break;}
        case("8"):{
            return(
                <span style={{ marginBottom: "10px" }} className="ClothStatus badge badge-warning " > Nie odebrano na czas  </span>
            )
            break;}
        default:{
            return(
                <span style={{ marginBottom: "10px" }} className="ClothStatus badge badge-danger " > (Błąd)  </span>
            )
            break;}
    }
}

function Advert({ cloth, address, surname, ValidTill, goToCloth, reservation }) {
  
  var Deadline = convertDate(ValidTill, false);
  var lastUpdate = convertDate(reservation.lastEventDate, true);

  var thumbnail = "";
  cloth.photos.map((p) => {
    if (p.primary) {
      var o = p.file.length;
      thumbnail =
        "http://staraszafa.info/" + p.file.slice(0, o - 4) + "_sm.jpg";
    };
    
    


  });

  return (
    <div className="shadow bg-white rounded mt-lg-5 mb-2">
      <div className="d-flex justify-content-center mb-3 pl-3">
        <div>
          <div
            className="d-flex justify-content-center p-4"
            style={{ color: "#777", width: "100%" }}
          >
            SZCZEGÓŁY REZERWACJI
          </div>

          <div
            onClick={()=>goToCloth(cloth._id)}
            style={{
              marginBottom: "30px",
              display: "grid",
              gridTemplateColumns: "70px 1fr 10px",
            }}
            className="ml-3 mr-3 bg-light cloth"
          >
            <div>
              <img
                className="d-inline-block"
                style={{}}
                src={thumbnail}
                alt="photo"
                height="80px"
              />
            </div>

            <div
              style={{
                fontSize: "19px",
                padding: "7px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                display: "grid",
                gridTemplateRows: "2fr 2fr",
              }}
            >
              <div style={{ fontWeight: "bold" }}>{cloth.name}</div>
              <div>
                <Price cloth={cloth}></Price>
              </div>
            </div>

            <div></div>
          </div>

          <div>
            <div className="pl-3 pr-3 pt-2 pb-2">
             <BadgeInfo status={reservation.status}></BadgeInfo>
              <div style={{ paddingLeft: "10px" }}>
            <i>{lastUpdate}</i>
              </div>
            </div>

            <div className="p-3">
              <img
                src={place}
                style={{ paddingBottom: "5px" }}
                alt="tick"
                height="27"
              />{" "}
              <b>{address}</b>
              {
                " — nasz sklep, w którym obejrzysz, przymierzysz i opcjonalnie kupisz rezerwowany przedmiot."
              }
            </div>
            <div className="p-3">
              <img
                src={calendar}
                style={{ paddingBottom: "5px" }}
                alt="tick"
                height="27"
              />{" "}
              <b>{Deadline}</b>
              {" — ostatni dzień na odbiór rezerwacji."}
            </div>
            <div className="p-3 mb-5">
              <img
                src={accountDark}
                style={{ paddingBottom: "5px" }}
                alt="tick"
                height="27"
              />{" "}
              <b>{surname}</b> — na to nazwisko zarezerwowano przedmiot.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
          <div style={{ paddingRight: "6px" }} className="d-inline-block">
            {Math.round(
              parseInt(cloth.price) * ((100 - discountPercentageVAlue) / 100)
            ) + ",00 PLN"}
          </div>
          <div
            className="d-inline-block"
            style={{
              fontSize: "22px",
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

export default Reservation;
