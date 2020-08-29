import React, { Component } from "react";
import {BrowserRouter as Router,Route, Switch, Redirect,Link,useParams,useHistory,} from "react-router-dom";
import {Alert, Button} from "react-bootstrap"
import TopNavbar from "./reusable/topNavbar";
import BottomNavbar from "./reusable/bottomNavbar";
import stickArrow from "../graphics/stickArrow.svg";
import info from "../graphics/info.svg";
import tick from "../graphics/tick.svg";
import arrowR from "../graphics/arrow-right.svg";

class Remind extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",   
      result:"", 
      show:true,
      code:"", 
      password:"", 
      Rpassword:"", 
      errorMessage:"", 
      show2:true,
      considers:{code:false,password:false,Rpassword:false},
    };


    this.ChangeEmail = this.ChangeEmail.bind(this);
    this.ChangeCode = this.ChangeCode.bind(this); 
    this.ChangePassword = this.ChangePassword.bind(this);
    this.ChangeRpassword = this.ChangeRpassword.bind(this);  
    this.handleSubmit = this.handleSubmit.bind(this);   
    this.handleSubmit2 = this.handleSubmit2.bind(this);   
    this.ErrorShowToggle = this.ErrorShowToggle.bind(this);   
    this.ErrorShowToggle2 = this.ErrorShowToggle2.bind(this);  
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

  ErrorShowToggle(event) {//it isnt a toggler
    this.setState({ show: false });
  }

  ErrorShowToggle2(event) {//it isnt a toggler
    this.setState({ show2: false });
  }

  ChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  
  ChangeCode(event) {
    this.setState({ code: event.target.value });
  }

  ChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  ChangeRpassword(event) {
    this.setState({ Rpassword: event.target.value });
  }

  handleSubmit2(event) {
    event.preventDefault();

    if(this.state.code==""||this.state.password==""||this.state.Rpassword==""){
        this.setState({errorMessage:"Należy wypełnić wszystkie pola.", considers:{code:this.state.code=="",password:this.state.password=="",Rpassword:this.state.Rpassword==""}});
    }
    else if(this.state.password!=this.state.Rpassword){
        this.setState({errorMessage:"Hasła muszą być takie same.", considers:{code:false,password:true,Rpassword:true}});
    }
    else if(this.state.password.length<6){
        this.setState({errorMessage:"Hasło musi składać się z przynajmniej 6 znaków.", considers:{code:false,password:true,Rpassword:true}});
    }
    else{
        this.setState({errorMessage:"", considers:{code:false,password:false,Rpassword:false}});
        this.props.saveNewPassword(this.state.email, this.state.code, this.state.password, (result)=>{
            if(result){
                this.props.history.push("/home");
            }
            else{
                
                    this.setState({errorMessage:"Wpisano nieprawidłowy kod.", considers:{code:true,password:false,Rpassword:false}});
                
            }
        })
    }
    //email, code, newPassword, callback
    //this.setState({errorMessage:"No udało się", considers:{code:true,password:true,Rpassword:false}});
    //TODO
    // this.setState({ result: 1 });
    // this.props.remindPassword(this.state.email,(result)=>{
    //     if(result){
            
    //         this.props.history.push("/przypomnieniehasla/2of2");
    //     }
    //     else{
    //         this.setState({ result: 2 });
    //     }

    // });
  }

  handleSubmit(event) {
    event.preventDefault();
    //TODO
    this.setState({ result: 1 });
    this.props.remindPassword(this.state.email,(result)=>{
        if(result){
            
            this.props.history.push("/przypomnieniehasla/2of2");
        }
        else{
            this.setState({ result: 2 });
        }

    });
  }


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
            <div>
      <div className="col-lg-1 d-inline-block"></div>
      <div className=" d-inline-block col-lg-10 ">
        <div className="d-lg-flex align-content-start">
          <div className="col-lg-6 d-inline-block p-lg-5 mb-5 ">


            


                <Switch>
                  <Route exact path="/przypomnieniehasla/1of2">
                        <RemindForm1
                            result={this.state.result} 
                            show={this.state.show} 
                            showToggle={this.ErrorShowToggle}
                            onSubmit={this.handleSubmit}
                            email={this.state.email} 
                            emailChange={this.ChangeEmail} >
                        </RemindForm1>
                  </Route>

                  <Route exact path="/przypomnieniehasla/2of2">
                  {this.state.email!="" ? null : (
                      <Redirect to="/przypomnieniehasla/1of2" />
                    )}
                    <RemindForm2
                            considers={{code:this.state.considers.code,password:this.state.considers.password,Rpassword:this.state.considers.Rpassword}}
                            email={this.state.email}
                            onSubmit={this.handleSubmit2}
                            code={{value:this.state.code, change:this.ChangeCode}}
                            password={{value:this.state.password, change:this.ChangePassword}} 
                            Rpassword={{value:this.state.Rpassword, change:this.ChangeRpassword}}
                            errorMessage={this.state.errorMessage} 
                            show={this.state.show2} 
                            showToggle={this.ErrorShowToggle2}>
                    </RemindForm2>
                  </Route>

                  <Route>
                    <Redirect to="/przypomnieniehasla/1of2" />
                  </Route>
                </Switch>



          </div>
          <div className="col-lg-6 d-inline-block p-0 p-lg-5">
            <Advert></Advert>
          </div>
        </div>
      </div>
      <div className="col-lg-1 d-inline-block"></div>
    </div>
      </div>
    );
  }
}
function RemindForm1({onSubmit, email, emailChange, result, show, showToggle}){//result: undefined/0-default, 1-success, 2-error

    return(

        <div>
    
    <h3 className="pt-5">Odzyskiwanie Hasła - krok 1/2</h3>
    <AlertDismissible show={result==2&&show} setShow={showToggle} message={"Konto o podanym adresie e-mail nie istnieje!"} ></AlertDismissible>
    
    <form onSubmit={onSubmit}>
      <div className="form-group pt-3">
<label htmlFor="email">Adres e-mail skojarzony z kontem:</label>
        <input
          id="email"
          type="email"
          placeholder="e-mail"
          name="email"
          className={result!=2 ? ("form-control") : "form-control is-invalid"}
          value={email}
          onChange={emailChange}
        />
        <div className="invalid-feedback">
      {""}
      </div>
      </div>
      
      
      <button id="login" type="submit" className="active mt-3 p-2">
        Wyślij maila z kodem
        <img src={stickArrow} alt="arrow" height="21" />
      </button>
    </form>

  </div>
    );
}

function RemindForm2({onSubmit, code, password, Rpassword, errorMessage, show, showToggle, email, considers}){

    return(

        <div>
    
    <h3 className="pt-5">Odzyskiwanie Hasła - krok 2/2</h3>
    <AlertDismissible show={errorMessage!=""&&show} setShow={showToggle} message={errorMessage} ></AlertDismissible>
    <p className="pt-2">
      Właśnie wysłaliśmy maila z kodem na adres: <b>{email}</b>. Wpisz go w polu
      poniżej.
    </p>
    <form onSubmit={onSubmit}>

      <div className="form-group pt-3">
<label htmlFor="code">Kod z maila:</label>
        <input
          id="code"
          type="text"
          placeholder="np. '143049'"
          name="code"
          className={considers.code ? ("form-control is-invalid") : "form-control"}
          value={code.value}
          onChange={code.change}
        />
        
      </div>

      <div className="form-group pt-3">
<label htmlFor="password">Nowe hasło:</label>
        <input
          id="password"
          type="password"
          name="password"
          className={considers.password ? ("form-control is-invalid") : "form-control"}
          value={password.value}
          onChange={password.change}
        />
        
      </div>

      <div className="form-group pt-3">
<label htmlFor="Rpassword">Nowe hasło:</label>
        <input
          id="Rpassword"
          type="password"
          name="Rpassword"
          className={considers.Rpassword ? ("form-control is-invalid") : "form-control"}
          value={Rpassword.value}
          onChange={Rpassword.change}
        />
        
      </div>

     
      
      
      <button id="login" type="submit" className="active mt-3 p-2">
        Zapisz nowe hasło
        <img src={stickArrow} alt="arrow" height="21" />
      </button>
    </form>

  </div>
    );
}

function AlertDismissible({ show, setShow, message }) {
    if (show) {
      return (
        <Alert
          className=""
          variant="danger"
          onClose={() => setShow(false)}
          dismissible
        >
          <p>{message}</p>
        </Alert>
      );
    }
    return null;
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
            Jak przebiega odzyskiwanie hasła?
          </h5>
          <div>
            <div className="p-3">
              <img
                src={arrowR}
                style={{ paddingBottom: "5px" }}
                alt="tick"
                height="27"
              />{" "}
              Sprawdzamy czy konto o podanym przez Ciebie adresie e-mail istnieje.
            </div>
            <div className="p-3">
              <img
                src={arrowR}
                style={{ paddingBottom: "5px" }}
                alt="tick"
                height="27"
              />{" "}
              Wysyłamy Ci maila z kodem.
            </div>
            <div className="p-3 mb-5">
              <img
                src={arrowR}
                style={{ paddingBottom: "5px" }}
                alt="tick"
                height="27"
              />{" "}
              Używasz kodu z maila aby ustawić nowe hasło. Gotowe!
            </div>
          </div>
        </div>
      </div>
    </div>
  );

export default Remind;
