import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../graphics/logo.svg";
import arrow from "../../graphics/arrow-down.svg";
import profile from "../../graphics/profile.jpg";
import account from "../../graphics/account.png";
import help from "../../graphics/help.png";
import powiadomienia from "../../graphics/powiadomienia.png";
import mojaSzafa from "../../graphics/mojaSzafa.png";
import Nav from "react-bootstrap/Nav";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Navbar from "react-bootstrap/Navbar";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import place from "../../graphics/placeDark.png";
import loading from "../../graphics/loading.svg";
import info from "../../graphics/info.svg";

class TopNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mojaSzafaFold: false,
      powiadomieniaFold: false,
      status: 43,
      notifications:[],
      loading: false,
    };
    this.BranchOnChange = this.BranchOnChange.bind(this);
    this.pullNotifications = this.pullNotifications.bind(this);
    this.gotoReservation = this.gotoReservation.bind(this);
    this.gotoMojaSzafa = this.gotoMojaSzafa.bind(this);
  }

  gotoMojaSzafa(id){
    this.props.history.push("/mojaszafa/"+id);
    this.props.setMojaSzafaSection(id);
  }

  gotoReservation(id){
    this.props.history.push("/rezerwacja/"+id);
    this.props.setViewReservationId(id);
    this.props.MarkAsRead();
  }

  pullNotifications(){
    this.setState({loading:true});
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: ("b " + this.props.token)
      },
      body: JSON.stringify({props:"noProps"}),
    };
    fetch("http://staraszafa.info/api/getNotifications", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        var nots=data.array;
        //sorting notifcations
        nots.sort(function(a, b) {
          var dA = new Date(a.date);
          var dB = new Date(b.date);
          if (dA>dB) {
            return -1;
          }
          if (dA<dB) {
            return 1;
          }
          return 0;
        }
        );
        //replacing the date with a polish, user-friendly one
        if(nots.length>0){
          nots.map(n=>{
            var d1 = new Date(n.date);
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
          n.date = (d1.getDate()+" "+month+" "+d1.getFullYear()+", "+d1.getHours()+":"+d1.getMinutes());
      
          })
          

        }
        this.setState({
          notifications:nots,
          loading:false
        })
      })
      .catch((error) => {
        this.setState({loading:false});
        console.log(error);
      });
  }

  BranchOnChange(event) {
    this.props.changeBranch(event.target.value);
  }

  mojaSzafaFlip = () => {
    if (!this.state.mojaSzafaFold && this.state.powiadomieniaFold)
      {this.setState((state) => ({ powiadomieniaFold: false }));
      this.props.MarkAsRead();
    }

    this.setState((state) => ({ mojaSzafaFold: !state.mojaSzafaFold }));
  };

  powiadomieniaFlip = () => {
    if (this.state.mojaSzafaFold && !this.state.powiadomieniaFold)
      this.setState((state) => ({ mojaSzafaFold: false }));
      if(!this.state.powiadomieniaFold){
        this.pullNotifications();
      }
      else this.props.MarkAsRead();

    this.setState((state) => ({ powiadomieniaFold: !state.powiadomieniaFold }));
  };

  render() {
    return (
      <Navbar bg="white" expand="lg">
        <div className="col-lg-1"></div>
        <NavbarBrand className="LogoText" href="/home">
          <img src={logo} className="App-logo" alt="logo" height="40" />
          StaraSzafa.info
        </NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Powiadomienia
            gotoReservation={this.gotoReservation}
              loading={this.state.loading}
              notifications={this.state.notifications}
              newNotifications={this.props.newNotifications}
              state={this.state.powiadomieniaFold}
              flip={this.powiadomieniaFlip}
              status={this.props.status}
            ></Powiadomienia>
            <MojaSzafa
              gotoMojaSzafa={this.gotoMojaSzafa}
              state={this.state.mojaSzafaFold}
              flip={this.mojaSzafaFlip}
              status={this.props.status}
              email={this.props.email}
            ></MojaSzafa>

            <div>
              <PowiadomieniaPhone
                gotoReservation={this.gotoReservation}
                loading={this.state.loading}
                notifications={this.state.notifications}
                newNotifications={this.props.newNotifications}
                state={this.state.powiadomieniaFold}
                flip={this.powiadomieniaFlip}
                status={this.props.status}
              ></PowiadomieniaPhone>
              <MojaSzafaPhone
                gotoMojaSzafa={this.gotoMojaSzafa}
                state={this.state.mojaSzafaFold}
                flip={this.mojaSzafaFlip}
                status={this.props.status}
                email={this.props.email}
              ></MojaSzafaPhone>


              <div className="d-flex justify-content-center d-lg-none m-3">
                <img
                  style={{ marginTop: "4px", marginRight: "5px" }}
                  src={place}
                  alt="arrow"
                  height="28"
                />
                <select
                  onChange={this.BranchOnChange}
                  className="browser-default custom-select"
                  id="branch"
                >
                  <React.Fragment>
                    {this.props.shops.map((sh, i) => (
                      <option
                        value={i}
                        selected={
                          this.props.chosenBranchIndex == i ? true : false
                        }
                      >
                        {sh.address}
                      </option>
                    ))}
                  </React.Fragment>
                </select>
              </div>
            </div>
          </Nav>
        </NavbarCollapse>
        <div className="col-lg-1"></div>
      </Navbar>
    );
  }
}

function Powiadomienia({ state, flip, status, newNotifications, notifications, loading, gotoReservation }) {





  if (status == 1 || status == 2)
    return (
      <div>
        <div className="d-none d-lg-block" id="navlink" onClick={flip}>
          {newNotifications == 0 || newNotifications == null ? (
            <div className="d-inline">
              <img
                style={{
                  paddingLeft: "19px",
                  paddingRight: "4px",
                  paddingBottom: "2px",
                }}
                src={powiadomienia}
                className="mojaszafa"
                alt="logo"
                height="31"
              />
            </div>
          ) : (
            <div className="d-inline">
              <span
                style={{
                  position: "relative",
                  left: "28px",
                  top: "-8px",
                  zIndex: "1000",
                  backgroundColor: "#E9131A",
                  padding: "3px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  borderRadius: "140px",
                  color: "#ffffff",
                  fontSize: "15px",
                }}
              >
                {newNotifications}
              </span>
              <img
                style={{
                  paddingLeft: "19px",
                  paddingRight: "4px",
                  paddingBottom: "2px",
                }}
                src={powiadomienia}
                className="mojaszafa"
                alt="logo"
                height="31"
              />
            </div>
          )}
          Powiadomienia
          <img
            src={arrow}
            className={state ? "arrow active" : "arrow"}
            alt="arrow"
            height="15"
          />
        </div>

        <div
          className={state ? "d-none d-lg-block" : "active d-none d-lg-block"}
          id="mojaSzafaWindow"
          style={{ position: "relative" }}
        >
          <div
            className="mojaSzafaWindow shadow p-3 mb-5 bg-white rounded"
            style={{
              position: "absolute",
              left: "-60px",
              top: "2px",
              width: "320px",
              height: "300px",
              overflow: "auto"
            }}
          >
            <div
              style={{
                display: "grid",
                gridAutoRows: "80px",
                gridGap: "0.7em",
              }}>


                <LoadingAnimation
                doit={loading}
                ></LoadingAnimation>



                  <React.Fragment>
                  {notifications.length==0?(
                      <div style={{margin:"auto"}}>
                        <img style={{marginBottom:"8px"}} src={info} height="28px" alt="info"></img>
                        Nie masz jeszcze żadnych powiadomień!
                      </div>
                    ):null}
                    {notifications.map((n, i) => (
                       <div
                       className="cloth"
                       onClick={()=>gotoReservation(n.reservationId)}
                       style={{
                         display: "grid",
                         gridTemplateColumns: "70px 1fr 10px",
                         backgroundColor: !n.read?("#9af9dc"):("#f8f9fa")
                       }}
                       
                     >
                       <div
                       
                        >
                         <img
                           className="d-inline-block"
                           style={{}}
                           src={"http://staraszafa.info/"+n.photo}
                           alt="photo"
                           height="80px"
                         />
                       </div>
       
                       <div
                       
                         style={{
                           fontSize: "15px",
                           padding: "7px",
                           overflow: "hidden",
                           display: "grid",
                           gridTemplateRows: "2fr 2fr",
                         }}
                       >
                         <div style={{ fontWeight: "bold" }}>{n.text}</div>
                         <div><i>{n.date}</i></div>
                       </div>
       
                     </div>
                    ))}
                  </React.Fragment>


             

             
 
            </div>
          </div>
        </div>
      </div>
    );
  else return null;
}

function LoadingAnimation({doit}) {
  if (doit == true) return (
    <div className="d-flex justify-content-center">
      <img src={loading} alt="loading" height="50" />
    </div>
  )
  ;
  else return null;
}

function MojaSzafa({ state, flip, status, email, gotoMojaSzafa}) {
  if (status == 1 || status == 2)
    //logged in
    return (
      <div>
        <div className="d-none d-lg-block" id="navlink" onClick={flip}>
          <MojaSzafaPartial state={state}></MojaSzafaPartial>
        </div>

        <div
          className={state ? "d-none d-lg-block" : "active d-none d-lg-block"}
          id="mojaSzafaWindow"
          style={{ position: "relative" }}
        >
          <div
            className="mojaSzafaWindow shadow p-3 mb-5 bg-white rounded"
            style={{
              position: "absolute",
              left: "-60px",
              top: "2px",
              width: "320px",
            }}
          >
            <div
              style={{
                backgroundImage: `url(${profile})`,
                backgroundSize: "cover",
              }}
            >
              <div
                className="d-flex justify-content-center"
                style={{ paddingTop: "5px" }}
              >
                <img src={account} alt="account" width="30%" />
              </div>
              <div
                className="d-flex justify-content-center"
                style={{
                  color: "white",
                  paddingBottom: "5px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                }}
              >
                {email}
              </div>
            </div>
            {status === 2 ? (
              <CustomButtonAdminPanel
                text="Panel Administratora"
                link="/admin"
              ></CustomButtonAdminPanel>
            ) : null}
            <CustomButton text="Rezerwacje" link={()=>{gotoMojaSzafa(1)}}></CustomButton>
            <CustomButton text="Ustawienia Konta" link={()=>{gotoMojaSzafa(3)}}></CustomButton>
            <Logout text="Wyloguj" link="/logout"></Logout>
          </div>
        </div>
      </div>
    );
  else if (status == 0)
    //guest
    return (
      <div>
        <div className="d-none d-lg-block" id="navlink" onClick={flip}>
          <MojaSzafaPartial state={state}></MojaSzafaPartial>
        </div>

        <div
          className={state ? "d-none d-lg-block" : "active d-none d-lg-block"}
          id="mojaSzafaWindow"
          style={{ position: "relative" }}
        >
          <div
            className="mojaSzafaWindow shadow p-3 mb-5 bg-white rounded"
            style={{
              position: "absolute",
              left: "-10px",
              top: "2px",
              width: "220px",
            }}
          >
            <Logout text="Zaloguj" link="/logowanie"></Logout>
            <Logout text="Zarejestruj" link="/rejestracja"></Logout>
          </div>
        </div>
      </div>
    );
  else return null;
}
function MojaSzafaPhone({ state, flip, status, email, gotoMojaSzafa}) {
  if (status == 1 || status == 2)
    //logged in
    return (
      <div>
        <div
          className="d-flex justify-content-center d-block d-lg-none p-3"
          id="navlink"
          onClick={flip}
        >
          <MojaSzafaPartialPhone state={state}></MojaSzafaPartialPhone>
        </div>

        <div
          className={state ? "d-block d-lg-none" : "active d-block d-lg-none"}
          id="mojaSzafaWindowPhone"
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
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
              <b>{email}</b>
            </div>
          </div>
          {status == 2 ? (
            <CustomButtonAdminPanel
              text="Panel Administratora"
              link="/admin"
            ></CustomButtonAdminPanel>
          ) : null}
            <CustomButton text="Rezerwacje" link={()=>{gotoMojaSzafa(1)}}></CustomButton>
            <CustomButton text="Ustawienia Konta" link={()=>{gotoMojaSzafa(3)}}></CustomButton>
          <Logout text="Wyloguj" link="/logout"></Logout>
        </div>
      </div>
    );
  else if (status == 0)
    //guest
    return (
      <div>
        <div
          className="d-flex justify-content-center d-block d-lg-none p-3"
          id="navlink"
          onClick={flip}
        >
          <MojaSzafaPartialPhone state={state}></MojaSzafaPartialPhone>
        </div>

        <div
          className={state ? "d-block d-lg-none" : "active d-block d-lg-none"}
          id="mojaSzafaWindowPhone"
        >
          <Logout text="Zaloguj" link="/logowanie"></Logout>
          <Logout text="Zarejestruj" link="/rejestracja"></Logout>
        </div>
      </div>
    );
  else return null;
}

function PowiadomieniaPhone({ state, flip, status, newNotifications, notifications, loading, gotoReservation }) {
  if (status == 1 || status == 2)
    return (
      <div>
        <div
          className="d-flex justify-content-center d-block d-lg-none p-3 "
          id="navlink"
          onClick={flip}
        >
          {newNotifications == 0 || newNotifications == null ? (
            <div className="d-inline">
              <img
                style={{
                  paddingLeft: "19px",
                  paddingRight: "4px",
                  paddingBottom: "2px",
                }}
                src={powiadomienia}
                className="mojaszafa"
                alt="logo"
                height="31"
              />
            </div>
          ) : (
            <div className="d-inline">
              <span
                style={{
                  position: "relative",
                  left: "28px",
                  top: "-8px",
                  zIndex: "1000",
                  backgroundColor: "#E9131A",
                  padding: "3px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  borderRadius: "140px",
                  color: "#ffffff",
                  fontSize: "15px",
                }}
              >
                {newNotifications}
              </span>
              <img
                style={{
                  paddingLeft: "19px",
                  paddingRight: "4px",
                  paddingBottom: "2px",
                }}
                src={powiadomienia}
                className="mojaszafa"
                alt="logo"
                height="31"
              />
            </div>
          )}
          <div
            style={{
              paddingTop: "5px",
              paddingLeft: "4px",
            }}
          >
            Powiadomienia
          </div>
          <div
            style={{
              paddingTop: "4px",
            }}
          >
            <img
              src={arrow}
              className={state ? "arrow active" : "arrow"}
              alt="arrow"
              height="21"
            />
          </div>
        </div>

        <div
          
          className={state ? "d-block d-lg-none" : "active d-block d-lg-none"}
          id="mojaSzafaWindowPhone"
        >
          <div
              style={{
                display: "grid",
                gridAutoRows: "80px",
                gridGap: "0.7em",
              }}>

          <LoadingAnimation
                doit={loading}
                ></LoadingAnimation>



                  <React.Fragment>
                    {notifications.length==0?(
                      <div style={{margin:"auto"}}>
                        <img style={{marginBottom:"8px"}} src={info} height="28px" alt="info"></img>
                        Nie masz jeszcze żadnych powiadomień!
                      </div>
                    ):null}
                    {notifications.map((n, i) => (
                       <div
                       className={"cloth"}
                       onClick={()=>gotoReservation(n.reservationId)}
                       style={{
                         display: "grid",
                         gridTemplateColumns: "70px 1fr 10px",
                         backgroundColor: !n.read?("#9af9dc"):("#f8f9fa")
                       }}
                       
                     >
                       <div>
                         <img
                           className="d-inline-block"
                           style={{}}
                           src={"http://staraszafa.info/"+n.photo}
                           alt="photo"
                           height="80px"
                         />
                       </div>
       
                       <div
                         style={{
                           fontSize: "15px",
                           padding: "7px",
                           overflow: "hidden",
                           display: "grid",
                           gridTemplateRows: "2fr 2fr",
                         }}
                       >
                         <div style={{ fontWeight: "bold" }}>{n.text}</div>
                         <div><i>{n.date}</i></div>
                       </div>
       
                     </div>
                    ))}
                  </React.Fragment>

          </div>
             

        </div>
      </div>
    );
  else return null;
}

const CustomButton = ({ text, link }) => (
  
    <div
      onClick={link}
      id="CustomButton"
      style={{
        backgroundColor: "#E0FEF5",
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
        <div>{text}</div>
      </div>
    </div>
  
);

const CustomButtonAdminPanel = ({ text, link }) => (
  <Link style={{ color: "inherit", textDecoration: "none" }} to={link}>
    <div
      style={{
        color: "white",
        backgroundColor: "black",
      }}
    >
      <div
        className="d-flex justify-content-center"
        style={{
          color: "white",
          padding: "5px",
          marginTop: "5px",

          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        <div>{text}</div>
      </div>
    </div>
  </Link>
);

const MojaSzafaPartial = ({ state }) => (
  <div>
    <img
      style={{
        paddingLeft: "17px",
        paddingRight: "1px",
        paddingBottom: "2px",
      }}
      src={mojaSzafa}
      className="mojaszafa"
      alt="logo"
      height="33"
    />
    Moja Szafa
    <img
      src={arrow}
      className={state ? "arrow active" : "arrow"}
      alt="arrow"
      height="15"
    />
  </div>
);

const MojaSzafaPartialPhone = ({ state, link }) => (
  <div className="d-flex justify-content-center">
    <div>
      <img src={mojaSzafa} className="mojaszafa" alt="logo" height="30" />
    </div>
    <div
      style={{
        paddingTop: "5px",
        paddingLeft: "4px",
      }}
    >
      Moja Szafa
    </div>
    <div
      style={{
        paddingTop: "4px",
      }}
    >
      <img
        src={arrow}
        className={state ? "arrow active" : "arrow"}
        alt="arrow"
        height="21"
      />
    </div>
  </div>
);

const Logout = ({ text, link }) => (
  <Link style={{ color: "inherit", textDecoration: "none" }} to={link}>
    <div
      id="CustomButton"
      style={{
        backgroundColor: "#44FFC5",
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
        {text}
      </div>
    </div>
  </Link>
);

export default TopNavbar;
