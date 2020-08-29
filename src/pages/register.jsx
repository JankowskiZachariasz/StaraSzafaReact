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
import TopNavbar from "./reusable/topNavbar";
import BottomNavbar from "./reusable/bottomNavbar";
import stickArrow from "../graphics/stickArrow.svg";
import info from "../graphics/info.svg";
import tick from "../graphics/tick.svg";
import refresh from "../graphics/refresh.svg";
import loading from "../graphics/loading.svg";
import { Alert } from "react-bootstrap";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code:"",
      password:"",
      Rpassword:"",
      loadingAnimation: false,
      SendAgainStatus: 0,
      FirstName: "",
      name: "",
      email: "",
      checkBox1: false,
      checkBox2: false,
      errorShow: true,
      forwarded: { email: "" },
      errors:{message:"",show:false},
      concerns:{code:false,password:false,Rpassword:false}
    };
    this.ChangeErrorShow = this.ChangeErrorShow.bind(this);
    this.ChangeErrorShow2 = this.ChangeErrorShow2.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeRpassword = this.handleChangeRpassword.bind(this);
    this.updateSection = this.updateSection.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.reset();
  }

  updateSection = (newSec) => {


    switch(newSec){
      case(1):{this.props.history.push("/home/damskie");break;}
      case(2):{this.props.history.push("/home/meskie");break;}
      case(3):{this.props.history.push("/home/dzieciece");break;}
      case(4):{this.props.history.push("/home/promocje");break;}
    }


  };

  flipCheckBox1 = () => {
    this.setState((state) => ({ checkBox1: !state.checkBox1 }));
  };

  flipCheckBox2 = () => {
    this.setState((state) => ({ checkBox2: !state.checkBox2 }));
  };

  ChangeErrorShow(newState) {
    this.setState({ errorShow: newState });
  }

  ChangeErrorShow2(newState) {
    this.setState({ errors: {show: newState} });
  }

  handleChangeFirstName(event) {
    this.setState({ FirstName: event.target.value });
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangeCode(event) {
    this.setState({ code: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleChangeRpassword(event) {
    this.setState({ Rpassword: event.target.value });
  }

  handleCreateAccount(event){
    event.preventDefault();
    if(this.state.password==""||this.state.Rpassword==""||this.state.code==""){
      this.setState({errors:{message:"Należy wypełnić wszystkie pola.",show:true}, concerns:{code:this.state.code=="",password:this.state.password=="",Rpassword:this.state.Rpassword==""}});
    }
    else if(this.state.password!=this.state.Rpassword)this.setState({errors:{message:"Hasła muszą być takie same.",show:true},concerns:{code:false,password:true,Rpassword:true}})
    else if(this.state.password.length<6)this.setState({errors:{message:"Hasło musi składać się z przynajmniej 6 znaków.",show:true}, concerns:{code:false,password:true,Rpassword:true}})
    else {
      this.setState({errors:{message:"",show:false}, concerns:{code:false,password:false,Rpassword:false}})
      // password, email, code, success, error)
      this.props.register2(
        this.state.password,
        this.state.forwarded.email,
        this.state.code,
        ()=>{this.props.history.push("/home");},
        (err)=>{
            console.log(err);
            if(err==1)this.setState({errors:{message:"Błąd serwera. Rozpoczęcie rejestracji od początku powinno naprawić problem.",show:true}});
            else if(err==2)this.setState({errors:{message:"Podano nieprawidłowy kod.",show:true}});
            
        }

      );
    }
  }

  handleSubmit(event) {
    //TODO
    event.preventDefault();
    this.setState({ loadingAnimation: true });
    this.props.register1(
      this.state.FirstName,
      this.state.name,
      this.state.email,
      () => {
        this.setState({
          loadingAnimation: false,
          forwarded: { email: this.state.email },
        });
        this.props.history.push("/rejestracja/2of2");
      }, //seccess
      () => {
        this.setState({ loadingAnimation: false, errorShow: true });
      }
    ); //problem

    //this.props.history.push("/rejestracja/1.5");
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
              <div className="col-lg-6 d-inline-block p-lg-5 mb-5">
                <Switch>
                  <Route exact path="/rejestracja/1of2">
                    <RegisterForm1
                      errors={this.props.errors}
                      errChange={this.ChangeErrorShow}
                      NotificationShow={
                        this.state.errorShow &&
                        this.props.errors.message != null
                      }
                      loading={this.state.loadingAnimation}
                      email={this.state.email}
                      emailOnChange={this.handleChangeEmail}
                      name={this.state.name}
                      nameOnChange={this.handleChangeName}
                      FirstName={this.state.FirstName}
                      FirstNameOnChange={this.handleChangeFirstName}
                      FieldsFilled={
                        this.state.name != "" &&
                        this.state.FirstName != "" &&
                        this.state.email != ""
                      }
                      onSubmit={this.handleSubmit}
                      cb1={this.state.checkBox1}
                      cb2={this.state.checkBox2}
                      fCb1={() => this.flipCheckBox1()}
                      fCb2={() => this.flipCheckBox2()}
                    ></RegisterForm1>
                  </Route>

                  <Route exact path="/rejestracja/2of2">
                    {this.state.forwarded.email != "" ? null : (
                      <Redirect to="/rejestracja/1of2" />
                    )}
                    <RegisterForm2
                    errorLights={this.state.concerns}
                    submit={this.handleCreateAccount}
                    disableErrorNotification2={this.ChangeErrorShow2}
                    errors={this.state.errors}
                      code={{change:this.handleChangeCode,value:this.state.code}}
                      password={{change:this.handleChangePassword,value:this.state.password}}
                      Rpassword={{change:this.handleChangeRpassword,value:this.state.Rpassword}}
                      email={this.state.forwarded.email}
                      sendAgain={() => {
                        this.setState({ SendAgainStatus: 1 });
                        this.props.sendAgain(
                          this.state.FirstName,
                          this.state.name,
                          this.state.email,
                          () => {
                            this.setState({ SendAgainStatus: 2 });
                          },
                          () => {
                            this.setState({ SendAgainStatus: 3 });
                          }
                        );
                      }}
                      loading={this.state.SendAgainStatus}
                    ></RegisterForm2>
                  </Route>

                  <Route>
                    <Redirect to="/rejestracja/1of2" />
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

function LoadingAnimation(key) {
  if (key == true) return <img src={loading} alt="loading" height="50" />;
  else return null;
}

const RegisterForm1 = ({errors,errChange,NotificationShow,loading,email,emailOnChange,name,nameOnChange,onSubmit,FirstName,FirstNameOnChange,FieldsFilled,cb1,cb2,fCb1,fCb2,}) => (
  <div>
    <h3 className="pt-5">Rejestracja - krok 1/2</h3>
    <AlertDismissible
      show={NotificationShow}
      setShow={errChange}
      message={errors.message}
    ></AlertDismissible>
    <form onSubmit={onSubmit}>
      <div className="form-group pt-3">
        <label htmlFor="Firstname">Imię *</label>
        <input
          id="Firstname"
          type="firstname"
          name="firstname"
          className="form-control"
          placeholder="np. 'Andrzej'"
          value={FirstName}
          onChange={FirstNameOnChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Nazwisko *</label>
        <input
          id="name"
          type="lastname"
          name="lastname"
          className="form-control"
          placeholder="np. 'Kowalski'"
          value={name}
          onChange={nameOnChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Adres e-mail *</label>
        <input
          id="email"
          type="email"
          name="email"
          className={
            errors.message != null && errors.message != ""
              ? "form-control is-invalid"
              : "form-control"
          }
          placeholder="email na który wyślemy kod"
          value={email}
          onChange={emailOnChange}
        />
      </div>
      <CheckBox id="ch1" Text={TickBox1} active={cb1} flip={fCb1}></CheckBox>
      <CheckBox id="ch2" Text={TickBox2} active={cb2} flip={fCb2}></CheckBox>

      <SendEmailButton show={cb1 && cb2 && FieldsFilled}></SendEmailButton>

      {LoadingAnimation(loading)}
    </form>
  </div>
);

const SendEmailButton = ({ show }) => {
  if (show)
    return (
      <button id="login" type="submit" className="active mt-3 p-2">
        <span>Wyślij maila z kodem</span>
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
        <span>Wyślij maila z kodem</span>
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

const RegisterForm2 = ({errorLights,submit,disableErrorNotification2,errors,code, password, Rpassword, email, sendAgain, loading }) => (
  <div>
    <h3 className="pt-5">Rejestracja - krok 2/2</h3>
    <AlertDismissible
      show={errors.show}
      setShow={disableErrorNotification2}
      message={errors.message}
    ></AlertDismissible>
    <p className="pt-2">
      Właśnie wysłaliśmy maila z kodem na adres: <b>{email}</b>. Wpisz go w polu
      poniżej.
    </p>
    <div className=" d-flex align-items-start  " onClick={sendAgain}>
      <div className=" d-inline-block mt-3" style={{ cursor: "pointer" }}>
        WYŚLIJ PONOWNIE
        <img
          style={{ paddingBottom: "5px", paddingLeft: "3px" }}
          src={refresh}
          alt="arrow"
          height="23"
        />
      </div>
      <div className=" d-inline-block">{sendAgainFeedback(loading)}</div>
    </div>

    <form
    onSubmit={submit}
     >
      <div className="form-group pt-3">
        <label htmlFor="code">Kod z maila *</label>
        <input
          id="code"
          type="text"
          name="code"
          className={errorLights.code ? ("form-control is-invalid") : "form-control"}
          placeholder="np. '178342'"
          value={code.value}
          onChange={code.change}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Hasło *</label>
        <input
          id="password"
          type="password"
          name="password"
          className={errorLights.password ? ("form-control is-invalid") : "form-control"}
          value={password.value}
          onChange={password.change}
        />
      </div>
      <div className="form-group">
        <label htmlFor="Rpassword">Powtórz Hasło *</label>
        <input
          id="Rpassword"
          type="password"
          name="Rpassword"
          className={errorLights.Rpassword ? ("form-control is-invalid") : "form-control"}
          value={Rpassword.value}
          onChange={Rpassword.change}
        />
      </div>
      <CreateAccountButton show={code.value!=""&&password.value!=""&&Rpassword.value==password.value}></CreateAccountButton >

      {LoadingAnimation(false)}
    </form>

  </div>
);

const CreateAccountButton = ({ show }) => {
  if (show)
    return (
      <button id="login" type="submit" className="active mt-3 p-2">
        <span>Stwórz konto</span>
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
      <button id="login" type="submit" className="mt-3 p-2">
        <span>Stwórz konto</span>
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

function sendAgainFeedback(status) {
  switch (status) {
    case 0: {
      return null;
    }
    case 1: {
      return <img src={loading} alt="loading" height="50" />;
    }
    case 2: {
      return (
        <img
          style={{ paddingTop: "14px", paddingLeft: "13px" }}
          src={tick}
          alt="loading"
          height="40"
        />
      );
    }
    case 3: {
    }
  }
}

function CheckBox({ id, Text, active, flip }) {
  const Element = Text;
  return (
    <div className="checkBox">
      <input className={active == true ? "active" : ""} type="custom" id={id} />
      <label onClick={flip} for={id}>
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
        <span>{<Element></Element>}</span>
      </label>
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

const TickBox1 = () => (
  <div>
    {" "}
    Został mi udostępniony <Link to="/regulamin">regulamin strony</Link>.
  </div>
);

const TickBox2 = () => (
  <div>
    {" "}
    Zgadzam się na przetwarzanie moich danych osobowych, zgodnie z{" "}
    <Link to="/politykaprywatnosci">polityką prywatności</Link>.
  </div>
);

export default Register;
