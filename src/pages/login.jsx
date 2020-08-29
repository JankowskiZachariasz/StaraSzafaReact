import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Alert, Button} from "react-bootstrap"
import TopNavbar from "./reusable/topNavbar";
import BottomNavbar from "./reusable/bottomNavbar";
import stickArrow from "../graphics/stickArrow.svg";
import info from "../graphics/info.svg";
import tick from "../graphics/tick.svg";
import place from "../graphics/placeDark.png";
import calendar from "../graphics/calendar.svg";
import accountDark from "../graphics/accountDark.png";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorShow: true,
      password: "",
      email: "",
      section: 0,
      
      
    };

    this.ChangePassword = this.ChangePassword.bind(this);
    this.ChangeEmail = this.ChangeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ChangeErrorShow = this.ChangeErrorShow.bind(this);
    this.updateSection = this.updateSection.bind(this);
    
    
  }
  componentDidMount(){
    window.scrollTo(0, 0);
    this.props.reset();
  }


  ChangeErrorShow(newState) {
    this.setState({ errorShow: newState });
  }

  ChangePassword(event) {
    this.setState({ password: event.target.value });
  }
  ChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.reset();
    this.setState({errorShow: true});
   this.props.login(this.state.email,this.state.password,()=>{

    if(this.props.loginModifiers.newHeader=="")
    this.props.history.push("/home");
    else
    this.props.history.push("/ubranie/"+this.props.match.params.id);
    

    
   });
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
    

    // if(this.props.status==1)this.props.history.push("/home");
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
        
        <Loguj
        a={this.handleSubmit}
        b={this.state.email}
        c={this.ChangeEmail}
        d={this.state.password}
        e={this.ChangePassword}
        errors={this.props.errors}
        errShow={this.state.errorShow&&this.props.errors.show}
        errShowChange={this.ChangeErrorShow}
        loginModifiers={this.props.loginModifiers}
        ></Loguj>
      </div>
    );
  }
}
function Loguj({a,b,c,d,e, errors, errShow, errShowChange, loginModifiers}) {
  return (
    <div>
      <div className="col-lg-1 d-inline-block"></div>
      <div className=" d-inline-block col-lg-10 ">
        <div className="d-lg-flex align-content-start">
          <div className="col-lg-6 d-inline-block p-lg-5 mb-5 ">
            <LoginForm
            loginModifiers={loginModifiers}
            onSubmit={a} 
            email={b} 
            emailChange={c} 
            password={d} 
            passwordChange={e} 
            errors={errors}
            errShow={errShow}
            errChange={errShowChange}
            ></LoginForm>
          </div>
          <div className="col-lg-6 d-inline-block p-0 p-lg-5">
            {loginModifiers.newHeader==""?(<Advert></Advert>):(
              <ClothDetails
              cloth={loginModifiers.cloth} 
              data={loginModifiers.data}
              ></ClothDetails>
            )}
          </div>
        </div>
      </div>
      <div className="col-lg-1 d-inline-block"></div>
    </div>
  );
}

const Advert = () => (
  <div className="shadow bg-white rounded mt-5">
    <div className="d-flex justify-content-center pt-5 mb-3 pl-3">
      <div>
        <h5 className="mb-4 mt-2">
          <img
            src={info}
            style={{ paddingBottom: "5px", marginRight: "5px" }}
            alt="tick"
            height="45"
          />
          Dlaczego warto mieć konto?{" "}
        </h5>
        <div>
          <div className="p-3">
            <img
              src={tick}
              style={{ paddingBottom: "5px" }}
              alt="tick"
              height="27"
            />{" "}
            Błyskawiczne rezerwacje
          </div>
          <div className="p-3">
            <img
              src={tick}
              style={{ paddingBottom: "5px" }}
              alt="tick"
              height="27"
            />{" "}
            Możesz rezerwować więcej ubrań na raz
          </div>
          <div className="p-3 mb-5">
            <img
              src={tick}
              style={{ paddingBottom: "5px" }}
              alt="tick"
              height="27"
            />{" "}
            Powiadomimy Cię o dostępności ubrań
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LoginForm = ({ onSubmit, email, emailChange, password, passwordChange, errors, errShow, errChange, loginModifiers  }) => (
  <div>
    
<h3 className="pt-5">{loginModifiers.newHeader==""?("Logowanie"):(loginModifiers.newHeader)}</h3>
    <AlertDismissible show={errors.wrong&&errShow} setShow={errChange}></AlertDismissible>
    
    <form onSubmit={onSubmit}>
      <div className="form-group pt-3">
<label htmlFor="email">Adres e-mail</label>
        <input
          id="email"
          type="username"
          name="email"
          className={errors.email!=null&&errors.email!="" ? ("form-control is-invalid") : "form-control"}
          value={email}
          onChange={emailChange}
        />
        <div className="invalid-feedback">
      {errors.email}
      </div>
      </div>
      <div className="form-group">
        <label htmlFor="password">Hasło</label>
        <input
          id="password"
          type="password"
          name="password"
          className={errors.password!=null&&errors.password!="" ? ("form-control is-invalid") : "form-control"}
          value={password}
          onChange={passwordChange}
        />
        <div className="invalid-feedback">
      {errors.password}
      </div>
      </div>
      
      <Link style={{ color: "inherit", textDecoration: "none", display: "block" }} to="/przypomnieniehasla">
        ODZYSKIWANIE HASŁA
      </Link>
      
      
      <button id="login" type="submit" className="active mt-3 p-2">
        Zaloguj się
        <img src={stickArrow} alt="arrow" height="21" />
      </button>
    </form>
    <div className="mt-5 ">
      Nie masz Konta?{" "}
      <Link style={{ color: "inherit", textDecoration: "none" }} to="/rejestracja">
      <b>
        ZAREJESTRUJ SIĘ!
        <img
          style={{ paddingBottom: "5px" }}
          src={stickArrow}
          alt="arrow"
          height="27"
        />
      </b>
      </Link>
    </div>
  </div>
);
function AlertDismissible({show, setShow}) {
  
  if (show) {
    return (
      <Alert className="" variant="danger" onClose={()=>setShow(false)} dismissible>
        <p>Nieudana próba logowania</p>
      </Alert>
    );
  }
  return null;
}


function ClothDetails({cloth, data}){
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
            <b style={{color: "red"}}>{"??????"}</b> Zaloguj się, abyśmy wiedzieli kto rezerwuje.
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



export default Login;
