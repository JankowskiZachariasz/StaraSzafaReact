import React, { Component } from "react";
import {toast} from 'react-toastify';
import TopNavbar from "./reusable/topNavbar";
import BottomNavbar from "./reusable/bottomNavbar";
import Banner from "./components/mainPage/Banner";
import SecondNavbar from "./components/mainPage/secondNavbar";
import MainContent from "./components/mainPage/MainContent";
import Footer from "./reusable/Footer";
import Navbar from "react-bootstrap/Navbar";

class MainPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      navHeight: 66,
      scrolled: false,
      
    };

    this.handleScroll=this.handleScroll.bind(this);
    this.debouncedScroll=this.debouncedScroll.bind(this);
    this.updateSection=this.updateSection.bind(this);
    this.bannerDestination=this.bannerDestination.bind(this);
    this.resolveHeight = this.resolveHeight.bind(this);

    this.toggleSizeMiddleMan = this.toggleSizeMiddleMan.bind(this);
    this.toggleTagMiddleMan = this.toggleTagMiddleMan.bind(this);

    
    this.stickyNav = React.createRef();
    this.secondNav = React.createRef();
    
    
    this.frameId=0;
  }

  toggleSizeMiddleMan(...args){
    this.props.toggleSize(...args);
    this.props.history.push("/home/_");
  }

  toggleTagMiddleMan(...args){
    this.props.toggleTag(...args);
    this.props.history.push("/home/_");

  }

  render() {
    return (
      <div>
        <div style={{minHeight:"100vh"}}>
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
          status={this.props.status} 
          email={this.props.email}>
        </TopNavbar>

        <BottomNavbar
        {...this.props}
          chosenBranchIndex={this.props.chosenBranchIndex}
          changeBranch={this.props.changeBranch}
          chosenBranch={this.props.chosenBranch}
          shops={this.props.availableShops}
          status={this.props.status}
          section={this.props.section}
          update={this.updateSection}>
        </BottomNavbar>

        
        <div className="col-lg-10 main ">
        <Banner 
        bannerDestination={this.bannerDestination}
        banner={this.props.banner[0]} >
        </Banner></div>

        {/* referance for the sticky navbar (SecondNavbar)*/}
        <div ref={this.stickyNav} style={{width:"100%",height:"0px"}}></div>

        <SecondNavbar 
        toggleSize={this.toggleSizeMiddleMan}
        sizes={this.props.sizes}
        secondNav={this.secondNav}
        toggleTag={this.toggleTagMiddleMan}
        tags={this.props.tags} 
        section={this.props.section} 
        scrolled={this.state.scrolled}>
        </SecondNavbar>

        
        <MainContent 
        navHeight={this.state.navHeight}
        scrolled={this.state.scrolled}
        tags={this.props.tags} 
        section={this.props.section} 
        clothes={this.props.clothes}
        {...this.props}>
        </MainContent>
       </div>
        <Footer></Footer>
      </div>
    );
  }


  resolveHeight(){
    this.setState({
      navHeight: this.secondNav.current.getBoundingClientRect().height,
    })
  }
 
  bannerDestination(){
    
      this.props.toggleTag("Tagi Specjalne", this.props.banner[0].destinationTag, false,true);
      this.props.history.push("/home/_");
      this.props.updateSection(4);
  }


  debouncedScroll() {
    if (!this.frameId) {
      const frameId = requestAnimationFrame(this.handleScroll);
      this.frameId = frameId;
    }
  }

  handleScroll(event) {
    this.frameId = 0;
    var scrollTop=this.stickyNav.current.getBoundingClientRect().top;
    this.setState({scrolled: scrollTop<=0?true:false})
    this.resolveHeight();
      
  }


  componentDidMount() {
    window.addEventListener("scroll", this.debouncedScroll);
    this.props.checkStatus();
    if(this.props.refresh) window.scrollTo(0, 0);
    if(this.props.info=="logged-out")
    {
    toast.info("Poprawnie wylogowano!",{autoClose: 3000, position: toast.POSITION.BOTTOM_LEFT});
    this.props.resetState();
    }
    else if(this.props.info=="Reservation successfull")
    {
    toast.info("Wyslano prosbe o rezerwacje!",{autoClose: 3000, position: toast.POSITION.BOTTOM_LEFT});
    this.props.resetState();
    }
    
    if(this.props.match.params.section!=null)
    {
      switch(this.props.match.params.section)
      {
        case("damskie"):{ this.props.toggleTag("Damskie","",false,true); this.props.updateSection(1); break;}
        case("meskie"):{ this.props.toggleTag("Męskie","",false,true); this.props.updateSection(2); break;}
        case("dzieciece"):{ this.props.toggleTag("Dziecięce","",false,true); this.props.updateSection(3); break;}
        case("promocje"):{ this.props.toggleTag("Tagi Specjalne","",false,true); this.props.updateSection(4); break;}
      }
    }
    
  }


  componentWillUnmount() {
    window.removeEventListener("scroll", this.debouncedScroll);
  }

  updateSection = (newSec) => {
    this.props.updateSection(newSec);
    switch(newSec){
      case(1):{this.props.history.push("/home/damskie"); this.props.toggleTag("Damskie","",false,true); break;}
      case(2):{this.props.history.push("/home/meskie"); this.props.toggleTag("Męskie","",false,true); break;}
      case(3):{this.props.history.push("/home/dzieciece"); this.props.toggleTag("Dziecięce","",false,true); break;}
      case(4):{this.props.history.push("/home/promocje"); this.props.toggleTag("Tagi Specjalne","",false,true); break;}
    }
  };




}

export default MainPage;
