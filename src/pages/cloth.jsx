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

class Cloth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cloth: null,
      notFound: false,
      error2:false,
      error3:false,
    };

    this.updateSection = this.updateSection.bind(this);
    this.HandleSubmit = this.HandleSubmit.bind(this);
    this.postSubmit = this.postSubmit.bind(this);
    this.setErrors = this.setErrors.bind(this);
  }

  setErrors(n, newState){
      if(n==2)this.setState({error2:newState})
      else if(n==3)this.setState({error3:newState})
  }

  postSubmit(data){

    switch(data.response){
        case(1):{
            this.props.setReserveData(data, this.state.cloth);
            this.props.history.push("/rezerwuj/"+data.id);
            break;}
        case(2):{
            this.setState({error2:true});
            break;}
        case(3):{
            this.setState({error3:true});

            break;}
        case(4):{
            this.props.setLoginModifiers({
                redirectAfterSuccess:"/ubranie/"+data.id,
                 newHeader:"Zaloguj się, aby kontynuować.",
                 data:data,
                 cloth:this.state.cloth
            })
            this.props.history.push("/logowanie_/"+data.id);
            break;}
        default:{}
    }
  }


  HandleSubmit(){
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: ("b " + this.props.token)
        },
        body: JSON.stringify({ _id: this.state.cloth._id }),
      };
      fetch("http://staraszafa.info/api/reservationquerry", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.postSubmit(data);
        })
        .catch((error) => {
          console.log(error);
        });


  }


  componentDidMount() {
    window.scrollTo(0, 0);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: ("b " + this.props.token)
      },
      body: JSON.stringify({ _id: this.props.match.params.id }),
    };
    fetch("http://staraszafa.info/api/cloth", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if(data.success)
        this.setState({ cloth: data });
        else
        this.setState({ notFound: true });
      })
      .catch((error) => {
        console.log(error);
      });
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
        <div>
          <div className="col-lg-1 d-inline-block"></div>
          <div className=" d-inline-block col-lg-10 ">
            <div className="d-lg-flex align-content-start">
              <div className="col-lg-6 d-inline-block p-lg-5 mb-5 ">


                {this.state.cloth == null ? (
                    <div>
                        {this.state.notFound?(
                            <div>
                                <h1>404</h1>
                                <p>Ubranie, którego szukasz nie istnieje lub zostało usunięte.</p>
                            </div>
                        ):null}
                    </div>
                ) : ( <ResolvePrimary arrayPhotos={this.state.cloth.photos}></ResolvePrimary>)}
              </div>
              <div className="col-lg-6 d-inline-block p-lg-5 ml-lg-5 mt-lg-4">
                {this.state.cloth == null ? null : (
                  <div style={{ marginBottom: "100px", fontSize: "35px" }}>
                    <div style={{ marginBottom: "10px" }}>
                      {this.state.cloth.name}
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <Price cloth={this.state.cloth}></Price>
                    </div>
                    <AlertDismissible
                    message={"Osiągnąłeś limit rezerwacji. Sprawdź zakłądkę 'Rezerwacje' w sekcji 'Moja Szafa' po więcej informacji."} 
                    error ={this.state.error2}
                    setError ={this.setErrors}
                    id="2"
                    ></AlertDismissible>

                    <AlertDismissible
                    message={"Przepraszamy - ktoś właśnie zarezerwował ten przedmiot!"} 
                    error ={this.state.error3}
                    setError ={this.setErrors}
                    id="3"
                    ></AlertDismissible>

                    <ResolveStatus submit={this.HandleSubmit} status={this.state.cloth.status}  you={this.state.cloth.you} ></ResolveStatus>
                    
                    

                    <Details cloth={this.state.cloth} shops={this.props.availableShops}></Details>
                        
                    <React.Fragment>
                      {this.state.cloth.tags.map((g, ii) => (
                        <div className="d-inline">
                          <div key={g.name} className="d-inline">
                            <button
                              className="d-inline"
                              style={{
                                padding: "8px 16px 8px 16px",
                                margin: "5px",
                                marginLeft: "0px",
                                borderRadius: "16px",
                                borderColor: "#d1d1d1",
                                borderStyle: "solid",
                                borderWidth: "0.2px",
                                fontSize: "15px",
                              }}
                            >
                              {g.name=="Tagi Specjalne"?("Promocje"):g.name}
                            </button>
                          </div>
                          <React.Fragment>
                            {g.children.map((c, ii) => (
                              <div key={c} className="d-inline">
                                <button
                                  className="d-inline"
                                  style={{
                                    padding: "8px 16px 8px 16px",
                                    margin: "5px",
                                    marginLeft: "0px",
                                    borderRadius: "16px",
                                    borderColor: "#d1d1d1",
                                    borderStyle: "solid",
                                    borderWidth: "0.2px",
                                    fontSize: "15px",
                                  }}
                                >
                                  {c}
                                </button>
                              </div>
                            ))}
                          </React.Fragment>
                        </div>
                      ))}
                    </React.Fragment>
                  </div>
                )}


              </div>
            </div>
          </div>
          <div className="col-lg-1 d-inline-block"></div>
        </div>
        {this.state.cloth == null ? null : (<OtherPhotos arrayPhotos={this.state.cloth.photos}></OtherPhotos>)} 
        </div>   
        <Footer></Footer>
      </div>
    );
  }
}

function AlertDismissible({ message, error, setError, id }) {
    
    if (error) {
      return (
        <Alert
          className=""
          variant="danger"
          onClose={()=>setError(id, false)}
          dismissible
        >
          <p style={{fontSize:"17px"}}>{message}</p>
        </Alert>
      );
    }
    return null;
  }

function Details({cloth, shops}) {
    var d1 = new Date(cloth.dateAdded);
    var month = "stycznia";
    switch(d1.getMonth()+1){
        case(1):{month="stycznia";break;}
        case(2):{month="lutego";break;}
        case(3):{month="marca";break;}
        case(4):{month="kwietnia";break;}
        case(5):{month="maja";break;}
        case(6):{month="czerwca";break;}
        case(7):{month="lipca";break;}
        case(8):{month="sierpnia";break;}
        case(9):{month="września";break;}
        case(10):{month="października";break;}
        case(11):{month="listopada";break;}
        case(12):{month="grudnia";break;}
    }
    var date = (d1.getDate()+" "+month+" "+d1.getFullYear());
    var shop=""
    shops.map(x=>{
        if(cloth.shopId==x._id){
            shop=x.address;
        }

    })
    return(
        <div >
                <div style={{ fontSize: "22px", marginBottom: "10px"}}>

                    {cloth.size==""?null:(
                        <div>
                        <span className="clothtag" >
                          Rozmiar:{" "}
                        </span>
                        {cloth.size}
                      </div>
                    )}
                      

                      {cloth.brand==""?null:(
                          <div style={{ marginTop: "20px" }}>
                          <span className="clothtag"
                          >
                            Marka:{" "}
                          </span>
                          {cloth.brand}
                        </div>
                      )}
                      

                      {cloth.fabric==""?null:(
                          <div style={{ marginTop: "20px" }}>
                          <span className="clothtag"
                          >
                            Materiał:{" "}
                          </span>
                          {cloth.fabric}
                        </div>
                      )}
                      
                      
                        
                </div>

                <div style={{ marginTop: "20px", fontSize:"22px"}}>
                        <span>
                        <img style={{ marginBottom: "9px"}}
                        width="26px"
                        src={place}
                        ></img>
                        </span><span style={{marginLeft:"4px"}}>{shop}</span>
                </div>

                <div style={{ marginTop: "10px", fontSize:"22px"}}>
                        <span>
                        <img style={{ marginBottom: "9px"}}
                        width="26px"
                        src={calendar}
                        ></img>
                        </span><span style={{marginLeft:"4px"}}>{"Dodano: "+date}</span>
                </div>
        </div>
    );
}

function ResolveStatus({ status,  you, submit }) {
    switch(status){
        case("1"):{return(
            <div>
                <span style={{marginBottom: "40px"}} className="ClothStatus badge badge-secondary mr-1">Nie Opublikowano</span>
            </div>
        );}
        case("2"):{return(

             <div>
                    <button
                      style={{
                        marginBottom: "40px",
                        fontSize: "22px",
                        padding: "10px",
                      }}
                      id="login"
                      onClick={submit}
                      className="active"
                    >
                      <span>Rezerwuj</span>
                      <img height="40px" src={stickArrow}></img>
                    </button>
            </div>
        );}
        case("3"):{return(
            <div>
                <span  style={{marginBottom: "40px"}} className="ClothStatus badge badge-secondary mr-1">{you?("Zarezerwowane przez Ciebie!"):("Ktoś inny był szybszy!")}</span>
            </div>
        );}
        case("4"):{return(
            <div>
                <span  style={{marginBottom: "40px"}} className="ClothStatus badge badge-secondary mr-1">Archiwizowane</span>
            </div>
        );}
        default:{return null;}
    }
  }

function ResolvePrimary({ arrayPhotos }) {
    var file=""
    arrayPhotos.map(p=>{
        if(p.primary)file=p.file;
    })
    return (
      <div>
                <img

                    width="100%"
                    src={"http://staraszafa.info/" + file }>

                </img>
        
        
      </div>
    );
  }

  function OtherPhotos({ arrayPhotos }) {
    return (
      <div>
            <React.Fragment>
            {arrayPhotos.map((c, ii) => (
                <div key={c.file}>
                <img

                    width="100%"
                    src={"http://staraszafa.info/" + c.file }>

                    </img>
                </div>
            ))}
            </React.Fragment>
        
        
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
                <div style={{paddingRight: "6px",}} className="d-inline-block" >
                {Math.round(
                  parseInt(cloth.price) *
                    ((100 - discountPercentageVAlue) / 100)
                ) + ",00 PLN"}
              </div>
              <div
              className="d-inline-block" 
                style={{
                  fontSize:"22px",
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

export default Cloth;
