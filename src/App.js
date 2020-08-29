import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

//pages
import AboutUs from "./pages/smallPages/aboutUs";
import Contact from "./pages/smallPages/contact";
import Terms from "./pages/smallPages/TermsAndConditions";
import Privacy from "./pages/smallPages/privacy";

import Mojaszafa from "./pages/mojaszafa";
import Reservation from "./pages/reservation";
import Reserve from "./pages/reserve";
import Cloth from "./pages/cloth";
import MainPage from "./pages/mainPage";
import Login from "./pages/login";
import Register from "./pages/register";
import Remind from "./pages/remind";
//admin pages
import Home from "./pages/admin/home";


toast.configure();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adminCounts:{reqCount: 0, reservedCount: 0, historyCount: 0},

      mojaszafaSection:{
        button1:true,
        button2:false,
        section: 1,
      },

      viewReservationId:{
        notFound: false,
        cloth: null,
        reservation: null,
        surname: "",
        address: "",
      },

      loginModifiers:{redirectAfterSuccess:"", newHeader:"",data:{},cloth:{}},
      reserveButtonClicked:false,
      reserveDetails:{},
      reservedCloth:null,
      loginReserveDetails:{},

      newNotifications: "0",
      banner:[{destinationTag:"",firstLine:"",SecondLine:""}],

      availableShops:[{address:"",shortName:"",_id:""}],
      chosenBranch: "",
      chosenBranchIndex: 0,

      section: 1,
      sizes:[{name:"nieokreślone",select:false}],
      sizeFilteredClothes: [],
      filteredClothes: [],
      clothes: [],//massive array with clothes
      tags: [{name:"Damskie",select:true,child:[]},{name:"Męskie",select:true,child:[]},{name:"Dziecięce",select:true,child:[]}, {name:"Tagi Specjalne",select:true,child:[]}],//all availabl tags, based on the clothes

      checkStatus:false,
      registerErrors: {},
      loginErrors: {},
      mainPageState: "",
      backEndAdress: "http://staraszafa.info",
      status: ((localStorage.getItem("status")==null)?0:localStorage.getItem("status")), //(0-guest(unknown), 1-customer, 2-admin )
      token: localStorage.getItem("token"),
      serverConfirmedEmail: localStorage.getItem("email"),
    };

    this.resetLoginErrors = this.resetLoginErrors.bind(this);
    this.resetState = this.resetState.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    this.login = this.login.bind(this);
    this.Logout = this.Logout.bind(this);
    this.Refresh = this.Refresh.bind(this);
    this.register1 = this.register1.bind(this);
    this.register2 = this.register2.bind(this);
    this.sendAgain = this.sendAgain.bind(this);
    this.remindPassword = this.remindPassword.bind(this);
    this.saveNewPassword = this.saveNewPassword.bind(this);
    this.changeBranch = this.changeBranch.bind(this);
    this.fetchClothes = this.fetchClothes.bind(this);
    this.resolveTags = this.resolveTags.bind(this);
    this.onlyUnique = this.onlyUnique.bind(this);
    this.toggleTag = this.toggleTag.bind(this);
    this.filter = this.filter.bind(this);
    this.updateSection = this.updateSection.bind(this);
    this.extractSizes = this.extractSizes.bind(this);
    this.toggleSize = this.toggleSize.bind(this);
    this.filterSize = this.filterSize.bind(this);
    this.setReserveData = this.setReserveData.bind(this);
    this.setLoginModifiers = this.setLoginModifiers.bind(this);
    this.MarkAsRead = this.MarkAsRead.bind(this);
    this.setMainPageNotification = this.setMainPageNotification.bind(this);
    this.setViewReservationId = this.setViewReservationId.bind(this);
    this.setMojaSzafaSection = this.setMojaSzafaSection.bind(this);
    this.setMojaSzafaButton = this.setMojaSzafaButton.bind(this);

  }

  setMojaSzafaButton(eiter1or2, currentState){
    if(eiter1or2){
        if(!this.state.button1&&this.state.button2)
        this.setState({mojaszafaSection:{button1:!currentState, button2: false, section: this.state.mojaszafaSection.section}})
        else
      this.setState({mojaszafaSection:{button1:!currentState, section: this.state.mojaszafaSection.section}})}
    
    else{
      if(this.state.button1&&!this.state.button2)
      this.setState({mojaszafaSection:{button2:!currentState, button1: false, section: this.state.mojaszafaSection.section}})
      else
      this.setState({mojaszafaSection:{button2:!currentState, section: this.state.mojaszafaSection.section}})}
    
}

  setMojaSzafaSection(newSec){
    var bt1=newSec==3||newSec==4||newSec==5?false:true;
    this.setState({
      mojaszafaSection:{
        button1:bt1,
        button2:!bt1,
        section: newSec,
      }
    })

  }

  setViewReservationId(id){
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: "b " + this.state.token,
      },
      body: JSON.stringify({ _id: id }),
    };
    fetch("http://staraszafa.info/api/getReservation", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success)
          this.setState({
            viewReservationId:{
            cloth: data.cloth,
            reservation: data.reservation,
            surname: data.surname,
            address: data.address,
            }
            
          });
        else this.setState({viewReservationId:{ cloth:null, notFound: true} });
      })
      .catch((error) => {
        this.setState({viewReservationId:{ cloth:null, notFound: true} });
        console.log(error);
      });



    this.setState({
      viewReservationId: id,
    })
  }

  setMainPageNotification(msg){
    this.setState({mainPageState:msg});
  }

  MarkAsRead(){
    this.setState({newNotifications:0});
  }

  setLoginModifiers(loginModifiers){
    this.setState({loginModifiers:loginModifiers});
  }

  setReserveData(data, cloth){
    this.setState({
      reserveDetails: data,
      reservedCloth: cloth,
    });
  }

  filterSize(filteredClothes,sizes){
    var finalClothes=[];
    //only selected sizes
    var selected=[];
    sizes.map(z=>{
      if(z.select)
      selected.push(z.name);
    });
    if(selected.length==0){
      this.setState({
        sizeFilteredClothes:filteredClothes,
      });
      return 0;
    }
    
    filteredClothes.map(x=>{
      
      selected.map(y=>{
        if((x.size==y)||(x.size==""&&y=="nieokreślone"))
        finalClothes.push(x);
      })
    });
    this.setState({sizeFilteredClothes:finalClothes,
    });
  }

  toggleSize(name, currentState){
    var cp = this.state.sizes.map(x=>{
      if(x.name==name){
        x.select=!currentState;
      }
      return x;
    });
    this.setState({sizes:cp});
    this.filterSize(this.state.filteredClothes,cp);
    
  }

  updateSection(newSec){
    this.setState({section: newSec})
    
  }

  extractSizes(filteredClothes){
    var sizes=[];
    filteredClothes.map(c=>{
      if(c.size!="")
      sizes.push(c.size);
      else
      sizes.push("nieokreślone");
    })
    sizes=sizes.filter( this.onlyUnique ).sort().map(str=>({name:str,select:false}));

    this.setState({sizes:sizes});
    this.filterSize(filteredClothes,sizes);
  }

  filter(rawArrayClothes,tags,s){

    var filtered=[];


    var section=(s==1||s==2||s==3||s==4)?s:this.state.section;
    
    rawArrayClothes.map((product, num)=>{

      var discount = false;
      var discountPercentageVAlue = 0;
      var display = false;
      var match = false;
      var noTagSelected = true;
  //withing tags group
  if (
    product.tags[0].name == tags[section - 1].name ||
    (section == 4 && product.tags.length == 2)
  )
    display = true;

  //specific tags
  if (section == 4 && display) {
    tags[section - 1].child.map((x) => {
      if (x.select) noTagSelected = false;
      product.tags[1].children.map((y) => {
        if (x.name == y && x.select == true) match = true;
      });
    });
  } else if (display) {
    tags[section - 1].child.map((x) => {
      if (x.select) noTagSelected = false;
      product.tags[0].children.map((y) => {
        if (x.name == y && x.select == true) match = true;
      });
    });
  } else return null;

  if ((display && match) || (noTagSelected && display)) {
    product.price =
      product.price.includes(".") || product.price.includes(",")
        ? product.price
        : product.price + ",00";

    //resolving promo
    if (product.tags.length == 2)
      product.tags[1].children.map((x) => {
        if (x == "Lato 2020: -50%") {
          discount = true;
          discountPercentageVAlue = 50;
        } else if (x == "Lato 2020: -30%") {
          discount = true;
          discountPercentageVAlue = 30;
        }
      });

      filtered.push({...product,discount:discount, discountPercentageVAlue:discountPercentageVAlue});
  } else return null;

    });
    
    this.setState({filteredClothes:filtered})
    this.extractSizes(filtered);
  }

  onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
  }

  toggleTag(g1, g2, currentState, reset){
    var sect=0;
    switch(g1)
      {
        case("Damskie"):{  sect=1; break;}
        case("Męskie"):{sect=2; break;}
        case("Dziecięce"):{  sect=3; break;}
        case("Tagi Specjalne"):{  sect=4; break;}
      }
    // var list="";

    // this.setState(state => {
        const tg = this.state.tags.map((item, j) => {
          item.add=false;
          if (item.name == g1) {
            if(reset){
              item.child.map((child, j) => {
                child.select=false;
              })
            }
            var cp = item;
            if(g2==""){
              cp.select=!currentState;
            }
            else{
              
              item.child.map((child, j) => {
                
                if (child.name == g2) {
                  var childCp = child;
                  childCp.select=!currentState;
                  return childCp;
                }
                else {
                  return child;
                }
              })
              
            }
            
            return cp;
          } else {
            return item;
            
          }
        });
  
        this.setState({tags: tg,});
        this.filter(this.state.clothes,tg,sect);
      // });

  }

  resolveTags(clothes,callback){

    var tags=[{name:"Damskie",select:true,child:[]},{name:"Męskie",select:true,child:[]},{name:"Dziecięce",select:true,child:[]}, {name:"Tagi Specjalne",select:true,child:[]}];
    clothes.map((c,i)=>{
      c.tags.map((t,l)=>{
        var addIndex=0;
        switch(t.name){
          
          case("Damskie"):{addIndex=0;break;}
          case("Męskie"):{addIndex=1;break;}
          case("Dziecięce"):{addIndex=2;break;}
          case("Tagi Specjalne"):{addIndex=3;break;}
        }
          t.children.map((child)=>{
            tags[addIndex].child.push(child);
          })
      })
    });

    for(var u=0;u<4;u++){
      tags[u].child=tags[u].child.filter( this.onlyUnique );
      tags[u].child=tags[u].child=tags[u].child=tags[u].child.map((q)=>{return({name:q,select:false})});
      
    }

    this.setState({
      tags: tags
    })
    if(callback)callback(clothes,tags);
  }

  fetchClothes(obj,callback){
    
   
    
    var shopId=obj.availableShops[this.state.chosenBranchIndex]._id;
     

    const requestOptions = {method: "POST", headers: {"Content-Type": "application/json",Accept: "application/json"},
      body: JSON.stringify({_id: shopId}),
    };
    fetch("http://staraszafa.info/api/clothes", requestOptions)
      .then((res) => res.json()).then((data) => {
        
          this.setState({clothes: data.onSale})
          console.log(data.onSale)
          if(callback)
          callback(data.onSale,this.filter);//->further to resolving tags
      }).catch((error) => {console.log(error);this.setState({loading: false});});
  }

  changeBranch(i){

    this.setState({
      chosenBranch: this.state.availableShops[i].shortName,
      chosenBranchIndex: i,
    })

  }

  saveNewPassword = (email, code, newPassword, callback) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({email: email, code: code, newPassword: newPassword }),
    };
    fetch("http://staraszafa.info/api/newpassword", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data != null) {
          console.log(data);
          if(data.success){
            this.setState({
              token: data.token,
              status: 1,
              serverConfirmedEmail: data.username,
              loginErrors: {
                email: "",
                password: "",
                wrong: false,
                show: false,
              },
            });
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.username);
            
            callback(true);}
          else{callback(false);}
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  remindPassword = (email, callback) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({email: email }),
    };
    fetch("http://staraszafa.info/api/remindpassword", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data != null) {
          console.log(data);
          if(data.success){callback(true);}
          else{callback(false);}
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  register1 = (FirstName, name, email, success, reset) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ FirstName: FirstName, name: name, email: email }),
    };
    fetch("http://staraszafa.info/api/register", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data != null) {
          console.log(data);

          if (data.emailOk && data.emailSent) success();
          if (!data.emailOk) {
                reset();
                this.setState({registerErrors:{message: "Konto z adresem email: '"+email+"' już istnieje."}})
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  register2 = (password, email, code, success, error) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ password: password, email: email, code: code }),
    };
    fetch("http://staraszafa.info/api/createaccount", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data != null) {
          console.log(data);

          if (data.success){ 
            

            this.setState({
              token: data.token,
              status: 1,
              serverConfirmedEmail: data.username,
              loginErrors: {
                email: "",
                password: "",
                wrong: false,
                show: false,
              },
            });
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.username);
            success();}
          else {error(data.error);}
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  sendAgain = (FirstName, name, email, done, problem) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ FirstName: FirstName, name: name, email: email }),
    };
    fetch("http://staraszafa.info/api/register", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data != null) {
          console.log(data);

          if (data.emailOk && data.emailSent) done();
          if (!data.emailOk) {
                problem();
                this.setState({registerErrors:{message: "Konto z adresem email: '"+email+"' już istnieje."}})
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  componentDidMount() {
    this.checkStatus(this.fetchClothes);
  }

  checkStatus = (callback) => {
    console.log("sprawdzam status")
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: "Bearer " + this.state.token,
        Accept: "application/json",
      },
      body: JSON.stringify({ data: "checking the authentication status" }),
    };
    fetch("http://staraszafa.info/api/status", requestOptions)
      .then((res) => res.json())
      .then((data) => {

        
      if ((data != null&&
        (this.state.status!=data.status||
          this.state.serverConfirmedEmail!=data.email
           ||this.state.newNotifications!=data.notifications
           ||this.state.banner[0].firstLine!=data.banner[0].firstLine
           ||this.state.availableShops[0].shortName!=data.branch[0].shortName
           ||this.state.adminCounts!=data.adminCounts
          )
        )||this.state.checkStatus) {
          console.log(data);
          this.setState({
            adminCounts:data.adminCounts,
            checkStatus: false,
            status: data.status,
            serverConfirmedEmail: data.email,
            newNotifications: data.notifications,
            banner:data.banner,
            availableShops:data.branch,
            chosenBranch:data.branch[0].shortName,
          });
          localStorage.setItem("status", data.status);
          localStorage.setItem("email", data.email);
          
        }

        if(callback)
          callback({
            availableShops:data.branch,
            chosenBranch:data.branch[0].shortName,
          },this.resolveTags);
      


      })
      .catch((error) => {
        this.setState({status: 0});
        localStorage.setItem("status", 0);
        console.log(error);
      });
  };

  resetState = () => {
    this.setState({ mainPageState: "" });
  };

  resetLoginErrors = () => {
    this.setState({
      loginErrors: { email: "", password: "", wrong: false, show: false },
    });
  };

  resetRegisterErrors = () => {
    this.setState({
      registerErrors: {}
    });
  };

  login = (email, password, success) => {
    if (!this.isEmpty(email) && !this.isEmpty(password)) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ password: password, email: email }),
      };
      fetch("http://staraszafa.info/api/login", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          if (data != null) {
            
            this.setState({
              token: data.token,
              status: data.status,
              serverConfirmedEmail: email,
              loginErrors: {
                email: "",
                password: "",
                wrong: false,
                show: false,
              },
            });
            localStorage.setItem("status", data.status);
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", email);
            success();
          }
        })
        .catch((error) => {
          this.setState({ loginErrors: { wrong: true, show: true } });
        });
        
    } else {
      var emailRes = this.isEmpty(email) ? "Proszę wpisać email" : "";
      var passwordRes = this.isEmpty(password) ? "Proszę wpisać hasło" : "";
      this.setState({
        loginErrors: { email: emailRes, password: passwordRes, show: true },
      });
    }
  };
  Logout = () => {
    this.setState({
      token: "",
      status: 0,
      checkStatus: true,
      mainPageState: "logged-out",
      serverConfirmedEmail: "",
    });
    localStorage.setItem("token", "");
    localStorage.setItem("email", "");

    return null;
  };

  Refresh = () => {
    window.location.reload(false);
  };

  RegisterProps = (props) => {
    return (
      <Register
      setMojaSzafaSection={this.setMojaSzafaSection}
      setViewReservationId={this.setViewReservationId}
        MarkAsRead={this.MarkAsRead}
        token={this.state.token}
        chosenBranchIndex={this.state.chosenBranchIndex}
        changeBranch={this.changeBranch}
        chosenBranch={this.state.chosenBranch}
        availableShops={this.state.availableShops}
        newNotifications={this.state.newNotifications}
        status={this.state.status}
        email={this.state.serverConfirmedEmail}

        register1={this.register1}
        register2={this.register2}
        sendAgain={this.sendAgain}
        errors={this.state.registerErrors}
        reset={() => this.resetRegisterErrors()}
        {...props}
      />
    );
  };

  LoginProps = (props) => {
    return (
      <Login
      setMojaSzafaSection={this.setMojaSzafaSection}
      setViewReservationId={this.setViewReservationId}
        MarkAsRead={this.MarkAsRead}
        token={this.state.token}
        chosenBranchIndex={this.state.chosenBranchIndex}
        changeBranch={this.changeBranch}
        chosenBranch={this.state.chosenBranch}
        availableShops={this.state.availableShops}
        newNotifications={this.state.newNotifications}
        status={this.state.status}
        email={this.state.serverConfirmedEmail}
        setLoginModifiers={this.setLoginModifiers}
        loginModifiers={{redirectAfterSuccess:"", newHeader:"",data:{},cloth:{}}}
        login={this.login}
        errors={this.state.loginErrors}
        reset={() => this.resetLoginErrors()}
        {...props}
      />
    );
  };

  Login_Props = (props) => {
    return (
      <Login
      setMojaSzafaSection={this.setMojaSzafaSection}
      setViewReservationId={this.setViewReservationId}
        MarkAsRead={this.MarkAsRead}
        token={this.state.token}
        chosenBranchIndex={this.state.chosenBranchIndex}
        changeBranch={this.changeBranch}
        chosenBranch={this.state.chosenBranch}
        availableShops={this.state.availableShops}
        newNotifications={this.state.newNotifications}
        status={this.state.status}
        email={this.state.serverConfirmedEmail}
        setLoginModifiers={this.setLoginModifiers}
        loginModifiers={this.state.loginModifiers}
        login={this.login}
        errors={this.state.loginErrors}
        reset={() => this.resetLoginErrors()}
        {...props}
      />
    );
  };

  
  RemindProps = (props) => {
    return (
      <Remind
      setMojaSzafaSection={this.setMojaSzafaSection}
        setViewReservationId={this.setViewReservationId}
        MarkAsRead={this.MarkAsRead}
        token={this.state.token}
        chosenBranchIndex={this.state.chosenBranchIndex}
        changeBranch={this.changeBranch}
        chosenBranch={this.state.chosenBranch}
        availableShops={this.state.availableShops}
        newNotifications={this.state.newNotifications}
        status={this.state.status}
        email={this.state.serverConfirmedEmail}
      
        saveNewPassword={this.saveNewPassword}
        remindPassword={this.remindPassword}
        {...props}
      />
    );
  };

  AdminProps = (props) => {
    return (
      <Home
        adminCounts={this.state.adminCounts}
        checkStatus={this.checkStatus}  
        status={this.state.status}
        token={this.state.token}
        {...props}
      />
    );
  };

  MainPageProps = (props) => {
    return (
      <MainPage
      setMojaSzafaSection={this.setMojaSzafaSection}
      setViewReservationId={this.setViewReservationId}
      MarkAsRead={this.MarkAsRead}
      chosenBranchIndex={this.state.chosenBranchIndex}
      changeBranch={this.changeBranch}
      chosenBranch={this.state.chosenBranch}
      availableShops={this.state.availableShops}
      newNotifications={this.state.newNotifications}
      status={this.state.status}
      email={this.state.serverConfirmedEmail}
      token={this.state.token}
      toggleSize={this.toggleSize}
      sizes={this.state.sizes}
      section={this.state.section}
      updateSection={this.updateSection}
      toggleTag={this.toggleTag}
      tags={this.state.tags}
      clothes={this.state.sizeFilteredClothes}
      banner={this.state.banner}
      checkStatus={this.checkStatus} 
      info={this.state.mainPageState}
      resetState={this.resetState} {...props}
      />
    );
  };

  ClothProps = (props) => {
    return (
      <Cloth
      setMojaSzafaSection={this.setMojaSzafaSection}
      setViewReservationId={this.setViewReservationId}
      MarkAsRead={this.MarkAsRead}
      setLoginModifiers={this.setLoginModifiers}
      checkStatus={this.checkStatus} 
      setReserveData={this.setReserveData}
      token={this.state.token}
      availableShops={this.state.availableShops}
      chosenBranchIndex={this.state.chosenBranchIndex}
      changeBranch={this.changeBranch}
      chosenBranch={this.state.chosenBranch}
      availableShops={this.state.availableShops}
      newNotifications={this.state.newNotifications}
      status={this.state.status}
      email={this.state.serverConfirmedEmail}

      {...props}
      />
    );
  };


  ReserveProps = (props) => {
    return (
      <Reserve
      setMojaSzafaSection={this.setMojaSzafaSection}
      setViewReservationId={this.setViewReservationId}
      setMainPageNotification={this.setMainPageNotification}
      MarkAsRead={this.MarkAsRead}
      reservedCloth={this.state.reservedCloth}
      reserveDetails={this.state.reserveDetails}
      token={this.state.token}
      availableShops={this.state.availableShops}
      chosenBranchIndex={this.state.chosenBranchIndex}
      changeBranch={this.changeBranch}
      chosenBranch={this.state.chosenBranch}
      availableShops={this.state.availableShops}
      newNotifications={this.state.newNotifications}
      status={this.state.status}
      email={this.state.serverConfirmedEmail}

      {...props}
      />
    );
  };

  
  ReservationProps = (props) => {
    return (
      <Reservation
      // setMainPageNotification={this.setMainPageNotification}
      setMojaSzafaSection={this.setMojaSzafaSection}
      viewReservationId={this.state.viewReservationId}
      setViewReservationId={this.setViewReservationId}
      MarkAsRead={this.MarkAsRead}
      reservedCloth={this.state.reservedCloth}
      reserveDetails={this.state.reserveDetails}
      token={this.state.token}
      availableShops={this.state.availableShops}
      chosenBranchIndex={this.state.chosenBranchIndex}
      changeBranch={this.changeBranch}
      chosenBranch={this.state.chosenBranch}
      availableShops={this.state.availableShops}
      newNotifications={this.state.newNotifications}
      status={this.state.status}
      email={this.state.serverConfirmedEmail}

      {...props}
      />
    );
  };

  MojaszafaProps = (props) => {
    return (
      <Mojaszafa
      setMojaSzafaButton={this.setMojaSzafaButton}
      mojaszafaSection={this.state.mojaszafaSection}
      setMojaSzafaSection={this.setMojaSzafaSection}
      setViewReservationId={this.setViewReservationId}
      MarkAsRead={this.MarkAsRead}
      setLoginModifiers={this.setLoginModifiers}
      checkStatus={this.checkStatus} 
      setReserveData={this.setReserveData}
      token={this.state.token}
      availableShops={this.state.availableShops}
      chosenBranchIndex={this.state.chosenBranchIndex}
      changeBranch={this.changeBranch}
      chosenBranch={this.state.chosenBranch}
      availableShops={this.state.availableShops}
      newNotifications={this.state.newNotifications}
      status={this.state.status}
      email={this.state.serverConfirmedEmail}

      {...props}
      />
    );
  };

  AboutUsProps = (props) => {
    return (
      <AboutUs
      setMojaSzafaSection={this.setMojaSzafaSection}
        setViewReservationId={this.setViewReservationId}
        MarkAsRead={this.MarkAsRead}
        token={this.state.token}
        chosenBranchIndex={this.state.chosenBranchIndex}
        changeBranch={this.changeBranch}
        chosenBranch={this.state.chosenBranch}
        availableShops={this.state.availableShops}
        newNotifications={this.state.newNotifications}
        status={this.state.status}
        email={this.state.serverConfirmedEmail}
      
        saveNewPassword={this.saveNewPassword}
        remindPassword={this.remindPassword}
        {...props}
      />
    );
  };

  ContactProps = (props) => {
    return (
      <Contact
        setMojaSzafaSection={this.setMojaSzafaSection}
        setViewReservationId={this.setViewReservationId}
        MarkAsRead={this.MarkAsRead}
        token={this.state.token}
        chosenBranchIndex={this.state.chosenBranchIndex}
        changeBranch={this.changeBranch}
        chosenBranch={this.state.chosenBranch}
        availableShops={this.state.availableShops}
        newNotifications={this.state.newNotifications}
        status={this.state.status}
        email={this.state.serverConfirmedEmail}
      
        saveNewPassword={this.saveNewPassword}
        remindPassword={this.remindPassword}
        {...props}
      />
    );
  };
  
  TermsProps = (props) => {
    return (
      <Terms
        setMojaSzafaSection={this.setMojaSzafaSection}
        setViewReservationId={this.setViewReservationId}
        MarkAsRead={this.MarkAsRead}
        token={this.state.token}
        chosenBranchIndex={this.state.chosenBranchIndex}
        changeBranch={this.changeBranch}
        chosenBranch={this.state.chosenBranch}
        availableShops={this.state.availableShops}
        newNotifications={this.state.newNotifications}
        status={this.state.status}
        email={this.state.serverConfirmedEmail}
      
        saveNewPassword={this.saveNewPassword}
        remindPassword={this.remindPassword}
        {...props}
      />
    );
  };

  PrivacyProps = (props) => {
    return (
      <Privacy
        setMojaSzafaSection={this.setMojaSzafaSection}
        setViewReservationId={this.setViewReservationId}
        MarkAsRead={this.MarkAsRead}
        token={this.state.token}
        chosenBranchIndex={this.state.chosenBranchIndex}
        changeBranch={this.changeBranch}
        chosenBranch={this.state.chosenBranch}
        availableShops={this.state.availableShops}
        newNotifications={this.state.newNotifications}
        status={this.state.status}
        email={this.state.serverConfirmedEmail}
      
        saveNewPassword={this.saveNewPassword}
        remindPassword={this.remindPassword}
        {...props}
      />
    );
  };
  
  

  isEmpty = (b) => {
    if (typeof b == "undefined") return true;
    else if (b == "") return true;
    else return false;
  };

  render() {
    return (
      <div>
        
        <React.StrictMode>
          {/* <Button onClick={() => this.checkStatus()}></Button> */}
          <Router>
            <Switch>

              <Route exact path="/onas" component={this.AboutUsProps} />
              <Route exact path="/kontakt" component={this.ContactProps} />
              <Route exact path="/regulamin" component={this.TermsProps} />
              <Route exact path="/politykaprywatnosci" component={this.PrivacyProps} />

              {/* {routes for registered users} */}
              <Route exact path="/mojaszafa/" component={this.MojaszafaProps} />
              <Route exact path="/mojaszafa/:section" component={this.MojaszafaProps} />
              <Route exact path="/rezerwacja/:id" component={this.ReservationProps} />
              <Route exact path="/rezerwuj/:id" component={this.ReserveProps} />

              {/* admin routes */}
              <Route exact path="/admin"component={this.AdminProps} />
              <Route exact path="/admin/:section"component={this.AdminProps} />
              <Route exact path="/admin/:section/:id"component={this.AdminProps} />
              {/* <Route exact path="/produkt/:id"component={() => <ClothPage status={this.state.status} />} /> */}

              {/* public / none-sensitive routes */}
              <Route exact path="/ubranie/:id" component={this.ClothProps} />
              <Route exact path="/przypomnieniehasla" component={this.RemindProps} />
              <Route exact path="/przypomnieniehasla/:progress" component={this.RemindProps} />
              <Route exact path="/rejestracja" component={this.RegisterProps} />
              <Route exact path="/rejestracja/:progress" component={this.RegisterProps}/>
              <Route exact path="/logowanie_" component={this.Login_Props} />
              <Route exact path="/logowanie_/:id" component={this.Login_Props} />
              <Route exact path="/logowanie" component={this.LoginProps} />
              <Route exact path="/logowanie/:id" component={this.LoginProps} />
              <Route exact path="/logout"> <this.Logout></this.Logout> <Redirect to="/home" /></Route>
              <Route exact path="/home/:section" component={this.MainPageProps}/>
              <Route exact path="/home" component={this.MainPageProps}/>
              <Route exact path="/" component={this.MainPageProps}/>
              <Route component={this.MainPageProps}/>
              
            </Switch>
          </Router>
        </React.StrictMode>
      </div>
    );
  }
}

export default App;
