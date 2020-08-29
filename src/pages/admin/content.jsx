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
import { Alert } from "react-bootstrap";
import axios from 'axios';
import logo from "../../graphics/logo.svg";
import plus from "../../graphics/plus.svg";
import del from "../../graphics/delete.svg";
import publish from "../../graphics/publish.svg";
import edit from "../../graphics/edit.svg";
import calendar from "../../graphics/calendar.svg";
import stickArrow from "../../graphics/stickArrow.svg";
import loading from "../../graphics/loading.svg";
import arrowRight from "../../graphics/arrow-right.svg";
import search from "../../graphics/search.svg";
import dots from "../../graphics/dots.svg";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Navbar from "react-bootstrap/Navbar";

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: [],
      tags:[],
      beingAddedClothes:this.props.beingAdded,
      error:{photos:"",tags:"",name:false,price:false,code:false},
      photoChosen: 0,
      primaryPhoto: 1,
      clothChosen: 0,
      addButtonValue: "",
      TagsListed:"",

      loading: false,
      name:"",
      price:"",
      code:"",
      size:"",
      brand:"",
      fabric:"",

    };
    this.name = this.name.bind(this);
    this.price = this.price.bind(this);
    this.code = this.code.bind(this);
    this.size = this.size.bind(this);
    this.brand = this.brand.bind(this);
    this.fabric = this.fabric.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePrimary = this.handlePrimary.bind(this);
    this.toggleTag = this.toggleTag.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.addButtonChange = this.addButtonChange.bind(this);
    this.addTag = this.addTag.bind(this);
    this.resolveTags = this.resolveTags.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearTextErrors = this.clearTextErrors.bind(this);
    this.chooseCloth = this.chooseCloth.bind(this);
    this.deleteCloth = this.deleteCloth.bind(this);
    this.publishCloth = this.publishCloth.bind(this);
    this.confirmRes = this.confirmRes.bind(this);
    this.dismissRes = this.dismissRes.bind(this);
    this.clientBought = this.clientBought.bind(this);
    this.clientDidntBought = this.clientDidntBought.bind(this);

  }

  clientDidntBought(id){
    const requestOptions = {method: "POST", headers: {"Content-Type": "application/json",Accept: "application/json",authorization: ("b " + this.props.token)},
    body: JSON.stringify({_id:id}),
  };
  fetch("http://staraszafa.info/admin/clientDidntBought", requestOptions)
  .then((res) => res.json()).then((data) => {
    console.log(data);
    this.props.update(this.props.section);
  }).catch((error) => {console.log(error);this.props.update(this.props.section);});
}

  clientBought(id){
    const requestOptions = {method: "POST", headers: {"Content-Type": "application/json",Accept: "application/json",authorization: ("b " + this.props.token)},
    body: JSON.stringify({_id:id}),
  };
  fetch("http://staraszafa.info/admin/clientBought", requestOptions)
  .then((res) => res.json()).then((data) => {
    console.log(data);
    this.props.update(this.props.section);
  }).catch((error) => {console.log(error);this.props.update(this.props.section);});
}

  dismissRes(id){
    const requestOptions = {method: "POST", headers: {"Content-Type": "application/json",Accept: "application/json",authorization: ("b " + this.props.token)},
    body: JSON.stringify({_id:id}),
  };
  fetch("http://staraszafa.info/admin/dismissReservation", requestOptions)
  .then((res) => res.json()).then((data) => {
    console.log(data);
    this.props.update(this.props.section);
  }).catch((error) => {console.log(error);this.props.update(this.props.section);});
}

  confirmRes(id){
    const requestOptions = {method: "POST", headers: {"Content-Type": "application/json",Accept: "application/json",authorization: ("b " + this.props.token)},
    body: JSON.stringify({_id:id}),
  };
  fetch("http://staraszafa.info/admin/confirmRes", requestOptions)
  .then((res) => res.json()).then((data) => {
    console.log(data);
    this.props.update(this.props.section);
  }).catch((error) => {console.log(error);this.props.update(this.props.section);});
}


  publishCloth(id){
    const requestOptions = {method: "POST", headers: {"Content-Type": "application/json",Accept: "application/json",authorization: ("b " + this.props.token)},
    body: JSON.stringify({_id:id}),
  };
  fetch("http://staraszafa.info/admin/publish", requestOptions)
  .then((res) => res.json()).then((data) => {
    console.log(data);
    this.props.update(this.props.section);
  }).catch((error) => {console.log(error);this.props.update(this.props.section);});
}
  deleteCloth(id){
    const requestOptions = {method: "POST", headers: {"Content-Type": "application/json",Accept: "application/json",authorization: ("b " + this.props.token)},
    body: JSON.stringify({_id:id}),
  };
  fetch("http://staraszafa.info/admin/delete", requestOptions)
    .then((res) => res.json()).then((data) => {
      console.log(data);
      this.props.update(this.props.section);
    }).catch((error) => {console.log(error);this.props.update(this.props.section);});
  }

  clearTextErrors(photos){//argument type: boolean - true for photos, false for tags
    var err = this.state.error;
      if(photos)
      err.photos="";
      else err.tags="";
      this.setState({error:err});
  }
  chooseCloth(c){
    if(c==this.state.clothChosen){this.setState({clothChosen: 0});}
    else{this.setState({clothChosen: c});}
  }
  handleSubmit(event){
    event.preventDefault();
    this.setState({loading: true});

    //procesing photos
    var primaryCount=0;
    var photosProcessed=[];
    this.state.file.forEach((photo)=>{if(!photo.delete&&photo.idServer!=null&&photo.idServer!=""&&typeof photo.idServer!=undefined)
    { if(photo.idLocal==this.state.primaryPhoto){primaryCount++;}//to check if there is at least one primary
      photosProcessed.push({file:photo.idServer,primary:(photo.idLocal==this.state.primaryPhoto)});}})

    //processing tags
    var anySelect=false;
    var tagsProcessed=[];
    this.state.tags.forEach((tagGroup)=>{
      if(tagGroup.select){
        var children =[];
        tagGroup.child.forEach((c)=>{if(c.select){children.push(c.name); if(tagGroup.name!="Tagi Specjalne")anySelect=true;}})
        tagsProcessed.push({name:tagGroup.name,children:children});}})

console.log(primaryCount);



      var stop = false;
    //photos checks
    if(photosProcessed.length<2){
      var err = this.state.error;
      err.photos="Należy dodać przynajmniej dwa zdjęcia";
      this.setState({error:err});
      stop=true;
    }
    else if(primaryCount!=1){
      var err = this.state.error;
      err.photos="Wybierz zdjęcie główne";
      this.setState({error:err});
      stop=true;
    }
    else{
      var err = this.state.error;
      err.photos="";
      this.setState({error:err});
    }
    //tags check
    if(!anySelect){
      var err = this.state.error;
      err.tags="Wybierz tag kategorii";
      this.setState({error:err});
      stop=true;
    }
    else{
      var err = this.state.error;
      err.tags="";
      this.setState({error:err});
    }

    //values checks
    //name
    if(this.state.name==""){
      var err = this.state.error;
      err.name=true;
      this.setState({error:err});
      stop=true;
    }
    else{
      var err = this.state.error;
      err.name=false;
      this.setState({error:err});
    }
    //price
    if(this.state.price==""){
      var err = this.state.error;
      err.price=true;
      this.setState({error:err});
      stop=true;
    }
    else{
      var err = this.state.error;
      err.price=false;
      this.setState({error:err});
    }
    //code
    if(this.state.code==""){
      var err = this.state.error;
      err.code=true;
      this.setState({error:err});
      stop=true;
    }
    else{
      var err = this.state.error;
      err.code=false;
      this.setState({error:err});
    }


    if(stop)return null;


    var data=({
      photos:(photosProcessed),
      tags:(tagsProcessed),

      name:(this.state.name),
      price:(this.state.price),
      code:(this.state.code),

      size:(this.state.size),
      brand:(this.state.brand),
      fabric:(this.state.fabric),

    });
  
    const requestOptions = {method: "POST", headers: {"Content-Type": "application/json",Accept: "application/json",authorization: ("b " + this.props.token)},
      body: JSON.stringify(data),
    };
    fetch("http://staraszafa.info/admin/addcloth", requestOptions)
      .then((res) => res.json()).then((data) => {
        console.log(data);
        this.setState({loading: false});
        this.props.update(7);

      }).catch((error) => {console.log(error);this.setState({loading: false});});


  }
  name(event) {
    this.setState({ name: event.target.value });
  }
  price(event) {
    this.setState({ price: event.target.value });
  }
  code(event) {
    this.setState({ code: event.target.value });
  }
  size(event) {
    this.setState({ size: event.target.value });
  }
  brand(event) {
    this.setState({ brand: event.target.value });
  }
  fabric(event) {
    this.setState({ fabric: event.target.value });
  }
  resolveTags(){

    
    let config = {headers: {authorization: ("b " + this.props.token),}}
    axios.get("http://staraszafa.info/admin/tags", config)
    .then(res => { 

      var t=[];
      res.data.tags.map((group, i)=>{
        var children=group.children.map((child,j)=>{
          return{name: child, select: false}
        })
        t.push({name: group.name,add:false, select: false, child:children})

      });
      this.setState({tags:t});

    })
    .catch(err => { // then print response status
      this.props.checkStatus();
      console.log(err)
    })


  }
  componentDidMount() {
    this.resolveTags();
    window.scrollTo(0, 0);
  }
  toggle(id) {
    if (this.state.photoChosen == id) this.setState({ photoChosen: 0 });
    else this.setState({ photoChosen: id });
  }
  handleChange(event) {
    var l = this.state.file.length == null ? 0 : this.state.file.length;
    var photos = [];
    for (var i = 1; i <= event.target.files.length; i++) {
      photos.push({
        localPath: URL.createObjectURL(event.target.files[i - 1]),
        idLocal: i + l,
        idServer: "",
        delete: false,
        uploading: true
      });
    }
    this.setState((prevState) => ({
      file: [...prevState.file, ...photos],
    })); 
    

    const data = new FormData() 

    for(var x=0;x<event.target.files.length;x++){
    data.append('file', event.target.files[x])  
    }
    
    let config = {headers: {authorization: ("b " + this.props.token),}}
    

      axios.post("http://staraszafa.info/upload", data, config)
      .then(res => { // then print response status

        this.setState(state => {
          var element = 0;
          const file = state.file.map((item, j) => {
            if (j+1 === photos[element].idLocal) {
              var cp = item;
              cp.loading=false;
              cp.idServer=res.data.array[element];
              element++;
              return cp;
            } else  return item; 
          });
     
          return {
            file: file,
          };
        });



      })
      .catch(err => { // then print response status
        this.props.checkStatus();
        console.log(err)
      })




    
  }
  handleDelete(id){
    this.setState(state => {
        const file = state.file.map((item, j) => {
          if (j+1 === id) {
            var cp = item;
            cp.delete=true;
            return cp;
          } else {
            return item;
          }
        });
   
        return {
          file: file,
        };
      });
  }
  handlePrimary(id){
    this.setState({primaryPhoto: id});
    for(var q=0; q<this.state.file.length;q++){
      if(this.state.file[q].idLocal==id)
      {
        console.log(this.state.file[q].idServer);
        break;
      }
    }
    
  }
  toggleTag(g1, g2, currentState){
    var list="";

    this.setState(state => {
        const tags = state.tags.map((item, j) => {
          item.add=false;
          if (item.name == g1) {
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
            if(currentState==false){
            var cp = item;
            if(g1!="Tagi Specjalne"&&item.name!="Tagi Specjalne") 
            cp.select=false;
            return cp;
            }
            else {return item;}
            
          }
        });
   
        return {
          tags: tags,
        };
      });

  }
  toggleAdd(groupName){
    this.setState(state => {
      const tags = state.tags.map((item, j) => {
        if (item.name == groupName) {
          var cp = item;
          cp.add=true;
          return cp;
        } else { return item;}
      });
 
      return {
        tags: tags,
      };
    });
  }
  addButtonChange(event){
    this.setState({addButtonValue: event.target.value})
  }
  addTag(groupName){
    this.setState(state => {
      const tags = state.tags.map((item, j) => {
        item.add=false;
        if (item.name == groupName) {

          var alreadyThere = false;
          item.child.map((c, j) => {if(c.name==this.state.addButtonValue)alreadyThere=true});

          if(alreadyThere==false&&this.state.addButtonValue!=="")
          item.child.push({name: this.state.addButtonValue, select: true})
          return item;
        } else { return item;}
      });
 
      return {
        tags: tags,
      };
    });
  }

  render() {
    return (
      <div>
        <Reqs 
        dismissRes={this.dismissRes}
        confirmRes={this.confirmRes}
        gotoCloth={(id)=>this.props.history.push("/ubranie/"+id)}
        chooseCloth={this.chooseCloth}
        clothChosen={this.state.clothChosen}
        s={this.props.section} 
        requests={this.props.requests}></Reqs>
        <Rsrvd 
        clientDidntBought={this.clientDidntBought}
        clientBought={this.clientBought}
         gotoCloth={(id)=>this.props.history.push("/ubranie/"+id)}
         chooseCloth={this.chooseCloth}
         clothChosen={this.state.clothChosen}
         reserved={this.props.reserved}
        s={this.props.section}></Rsrvd>
        <Hstry 
        history={this.props.historyArray}
         gotoCloth={(id)=>this.props.history.push("/ubranie/"+id)}
         chooseCloth={this.chooseCloth}
         clothChosen={this.state.clothChosen}
        s={this.props.section}></Hstry>
        <InShop 
        gotoCloth={(id)=>this.props.history.push("/ubranie/"+id)}
           deleteCloth={this.deleteCloth}
           chooseCloth={this.chooseCloth}
           clothChosen={this.state.clothChosen}
        forSale={this.props.forSale}
        s={this.props.section}></InShop>
        <OnHold s={this.props.section}></OnHold>
        <Arch s={this.props.section}></Arch>
        <Added
        gotoCloth={(id)=>this.props.history.push("/ubranie/"+id)}
          publishCloth={this.publishCloth}
          deleteCloth={this.deleteCloth}
          chooseCloth={this.chooseCloth}
          clothChosen={this.state.clothChosen}
          beingAddedClothes={this.props.beingAdded}
          collapse={this.props.collapse}
          update={this.props.update}
          s={this.props.section}
        ></Added>
        <AddNewPhoto
        primary={this.state.primaryPhoto} 
        setPrimary={this.handlePrimary}
        del={this.handleDelete}
          photoChosen={this.state.photoChosen}
          toggle={this.toggle}
          file={this.state.file}
          handleChange={this.handleChange}
          s={this.props.section}
        ></AddNewPhoto>
        <Tags
        addTag={this.addTag}
        addButtonChange={this.addButtonChange} 
        addButtonValue={this.state.addButtonValue}
        toggleAdd={this.toggleAdd}
        toggleTag={this.toggleTag}
        s={this.props.section}
        array={this.state.tags}>
        </Tags>
        <AddNewForm
          loading={this.state.loading}
          clearTextErrors={this.clearTextErrors}
          error={this.state.error}
          onSubmit={this.handleSubmit}
          name={{value:this.state.name, change:this.name}}
          price={{value:this.state.price, change:this.price}}
          code={{value:this.state.code, change:this.code}}
          size={{value:this.state.size, change:this.size}}
          brand={{value:this.state.brand, change:this.brand}}
          fabric={{value:this.state.fabric, change:this.fabric}}
          s={this.props.section}>
        </AddNewForm>
      </div>
    );
  }
}



function Tags({array, s, toggleTag, toggleAdd, addButtonChange, addButtonValue, addTag}){
  if (s == "8")
  return (
    <div className="m-3">
       <React.Fragment>
            {array.map((e) => (

              <div className="d-inline">
                <button
                onClick={()=>toggleTag(e.name,"",e.select)}
                className={e.select ? "tag d-inline active" : "tag d-inline"}
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
                {e.name}
                </button>
                {e.select?(
                  <div className="d-inline">
                    {e.child.length==0?null:(
                  
                  
                              <React.Fragment>
                              {e.child.map((f) => (

                                <div className="d-inline">
                                  <button
                                  onClick={()=>toggleTag(e.name,f.name,f.select)}
                                  className={f.select ? "tagSub d-inline active" : "tagSub d-inline"}
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
                                  {f.name}
                                  </button>
                                  </div>
                              ))}
                            </React.Fragment>
                  
                )}
                                  <div className="d-inline">
                                  <button
                                  onClick={e.add==false?()=>{toggleAdd(e.name)}:null}
                                  className={true ? "tagAdd d-inline active" : "tagAdd d-inline"}
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
                                    {e.add?(
                                      <div className="input-group p-0 m-0">
                                      <input
                                        id="tag"
                                        type="text"
                                        name="tag"
                                        className="form-control m-0"
                                        placeholder="nowy Tag"
                                        value={addButtonValue}
                                        onChange={addButtonChange}
                                      />
                                      <div class="input-group-append">
                                      <button class="btn btn-primary" onClick={()=>addTag(e.name)}type="button">Dodaj</button>
                                     </div>
                                    </div>
                                    ):(<img src={plus} alt="plus" height="20" />)}
                                  
                                  
                                  </button>
                                   </div>
                  </div>
                ):null}
                
                </div>
            ))}
          </React.Fragment>
          
    </div>
  );
  else return null;
}

function AddNewForm({s,name,price,code,size,brand,fabric,onSubmit,error,clearTextErrors,loading}){
  if (s == "8")
  return(

    <div className="m-3">
      <form onSubmit={onSubmit}>
      <div className="form-group pt-3">
        <label htmlFor="clothName">Nazwa <span style={{color:"red"}}>*</span></label>
        <input
          id="clothName"
          type="text"
          name="clothName"
          className={error.name?"form-control is-invalid":"form-control"}
          placeholder="np. 'Żółta sukienka w grochy', 'bluza addidas'"
          value={name.value}
          onChange={name.change}
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Cena <span style={{color:"red"}}>*</span></label>
        <input
          id="price"
          type="text"
          name="price"
          className={error.price?"form-control is-invalid":"form-control"}
          placeholder="np. '24'"
          value={price.value}
          onChange={price.change}
        />
      </div>

      <div className="form-group">
        <label htmlFor="hanger">Kod wieszaka <span style={{color:"red"}}>*</span></label>
        <input
          id="hanger"
          type="text"
          name="hanger"
          className={error.code?"form-control is-invalid":"form-control"}
          placeholder="np. '012'"
          value={code.value}
          onChange={code.change}
        />
      </div>
      <div className="form-group">
        <label htmlFor="size">Rozmiar</label>
        <input
          id="size"
          type="text"
          name="size"
          className="form-control"
          placeholder="np. 'M', '35', etc"
          value={size.value}
          onChange={size.change}
        />
      </div>
      <div className="form-group">
        <label htmlFor="brand">Marka</label>
        <input
          id="brand"
          type="text"
          name="brand"
          className="form-control"
          placeholder="np. 'Fila'"
          value={brand.value}
          onChange={brand.change}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fabric">Materiał</label>
        <input
          id="fabric"
          type="text"
          name="fabric"
          className="form-control"
          placeholder="np. '70% bawełna, 30% poliester'"
          value={fabric.value}
          onChange={fabric.change}
        />
      </div>

      <div className="form-group">
        <label htmlFor="branch">Trafia do sklepu w...</label>
        <select disabled class="browser-default custom-select" id="branch">
      <option value="1" selected>Ostróda, Czarnieckiego 24</option>
      </select>
      </div>

      <AlertDismissible  show={error.tags!=""} setShow={()=>clearTextErrors(false)} message={error.tags}></AlertDismissible>
      <AlertDismissible  show={error.photos!=""} setShow={()=>clearTextErrors(true)} message={error.photos}></AlertDismissible>
      


      <button id="login" type="submit" className="active mt-3 p-2">
        <span>Dodaj</span>
        <svg viewBox="0 0 24 24">
          <path
            d="M5.208,13.209h11.17l-4.88,4.88c-0.39,0.39-0.39,1.03,0,1.42c0.39,0.39,1.02,0.39,1.411,0l6.59-6.59
            c0.39-0.391,0.39-1.02,0-1.41l-6.58-6.6c-0.391-0.391-1.021-0.391-1.411,0c-0.39,0.389-0.39,1.02,0,1.409l4.871,4.89H5.208
            c-0.55,0-1,0.451-1,1C4.208,12.759,4.659,13.209,5.208,13.209z"
          ></path>
        </svg>
      </button>


      <LoadingAnimation show={loading}></LoadingAnimation>

      </form>
      
    </div>

  );
  else return null;

}

function AlertDismissible({ show, setShow, message }) {
  if (show) {
    return (
      <Alert
        className=""
        variant="danger"
        onClose={() => setShow()}
        dismissible
      >
        <p>{message}</p>
      </Alert>
    );
  }
  return null;
}

function LoadingAnimation({show}) {
  if(show)
  return (<img src={loading} alt="loading" height="50" />);
  else return null;
  
}


function AddNewPhoto({ s, handleChange, file, toggle, photoChosen, del, primary, setPrimary}) {
  if (s == "8")
    return (
      <div className="mt-3 mb-3">
        <h4 className="ml-3">Dodaj nowe ubranie</h4>

        <div style={{ overflowX: "auto",height: "210px",  whiteSpace: "nowrap" }}>
          <button
            style={{
              fontSize: "20px",
              width: "150px",
              height: "200px",
              marginRight: "3px",
            }}
            type="button"
            className="btn btn-outline-dark ml-3"
          >
            <input
              multiple
              type="file"
              name="file"
              id="file"
              className="inputfile"
              onChange={(event) => handleChange(event)}
            />
            <label style={{ width: "100%", height: "100%" }} htmlFor="file">
              <div>
                {" "}
                <img src={plus} alt="plus" height="70" />{" "}
              </div>
              Dodaj<br></br>Zdjęcie
            </label>
          </button>

          <React.Fragment>
            {file.map((photo) => (

                <div key={photo.idLocal} className="d-inline">


                {!photo.delete ? (
                                    
                                    <div
                                    style={{
                                      marginLeft: "3px",
                                      marginRight: "3px",
                                      backgroundPosition: "center",
                                      backgroundRepeat: "no-repeat",
                                      backgroundSize: "cover",
                                      backgroundImage: `url(${photo.localPath})`,
                                      fontSize: "20px",
                                      width: "150px",
                                      height: "200px",
                                    }}
                                    onClick={() => { toggle(photo.idLocal); }}
                                    key={photo.idLocal} 
                                    type="button"
                                    className={primary==photo.idLocal? "btn btn-outline-danger" : "btn btn-outline-dark"}
                                  >
                  
                  
                                    {photoChosen == photo.idLocal ? (
                                      
                                      <div key={photo.idLocal+"bg"}  className="noPointer bg-white rounded" style={{whiteSpace: "normal" }}>
                                      <div key={photo.idLocal+"del"}  onClick={() => { del(photo.idLocal); }} className="photoWindow p-3"><div key={photo.idLocal+"delDeep"} >USUŃ</div></div>
                                      <div key={photo.idLocal+"1st"}  onClick={() => { setPrimary(photo.idLocal); }} className="photoWindow p-3"><div key={photo.idLocal+"1stDeep"} >#1</div></div>
                                      </div>
                                      
                                      
                                    ) : (
                                      null
                                    )}
                                   {photo.loading?<img key={photo.idLocal} src={loading} alt="loading" height="50" />:null}
                                   
                                  
                                  </div>
                    
                    
                ) : (
                    null
                )}
        

                </div>
            ))}
          </React.Fragment>
        </div>
      </div>
    );
  else return null;
}

function Added({ s, update, collapse, beingAddedClothes, clothChosen, chooseCloth, deleteCloth, publishCloth, gotoCloth }) {
  if (s == "7")
    return (
      <div>
        <div className="d-flex justify-content-center m-3">
          <button
            style={{
              paddingBottom: "20px",
              fontSize: "20px",
              width: "100%",
            }}
            onClick={() => {
              collapse();
              update(8);
            }}
            type="button"
            class="btn btn-outline-dark"
          >
            <div>
              <img src={plus} alt="plus" height="70" />
            </div>
            Dodaj
          </button>
        </div>

        <div
          className="d-flex justify-content-center m-3"
          style={{ fontSize: "20px", cursor: "pointer" }}
        >
          <b>OPUBLIKUJ WSZYSTKIE</b>
          <img
            style={{ paddingBottom: "5px", paddingLeft: "3px" }}
            src={stickArrow}
            alt="arrow"
            height="33"
          />
        </div>


          {/* displaying stuff */}

          <React.Fragment>
            {beingAddedClothes.map((cloth, i) => (
              <div>
              <div style={{display:"grid", gridTemplateColumns:"100px 1fr 55px"}} className="ml-3 mr-3 mt-3 bg-light">
                

              <div onClick={()=>gotoCloth(cloth._id)}>
              <img
                    className="d-inline-block"
                    style={{}}
                    src={"http://staraszafa.info/"+cloth.photo}
                    alt="photo"
                    height="130px"/>

              </div>
              <div style={{fontSize:"17px", padding: "7px",whiteSpace:"nowrap", overflow:"hidden",display:"grid", gridTemplateRows:"3fr 4fr 3fr"}}>

                <div style={{fontWeight:"bold"}}>{cloth.name}</div>
            <div><img style={{paddingBottom:"6px", paddingRight:"2px"}} src={calendar} alt="calendar"height="32px"/>{cloth.dateAdded}</div>
                <div className="align-items-end">
                  <React.Fragment>
                    {cloth.code.split("").map((num)=>{

                      var color = "#ffffff";
                      var text = "#000000"
                      switch(num){
                        case("0"):{color = "#15110E";text = "#ffffff";break;}
                        case("1"):{color = "#E1DCD8";text = "#000000";break;}
                        case("2"):{color = "#D81C10";text = "#ffffff";break;}
                        case("3"):{color = "#EB5608";text = "#ffffff";break;}
                        case("4"):{color = "#DFA70D";text = "#000000";break;}
                        case("5"):{color = "#288C47";text = "#ffffff";break;}
                        case("6"):{color = "#156DA0";text = "#ffffff";break;}
                        case("7"):{color = "#D935A4";text = "#ffffff";break;}
                        case("8"):{color = "#817684";text = "#ffffff";break;}
                        case("9"):{color = "#814EA0";text = "#ffffff";break;}
                      }

                      return(
                        <span style={{opacity:"0.7", backgroundColor:color, fontSize:"22px", color:text, padding:"4px", marginRight:"2px"}}>
                          {num}
                        </span>
                      );
                      
                    })}
                  </React.Fragment>
                  
                
                </div>
                                  

              </div>
              <div>
              <div onClick={()=>chooseCloth(i+1)} style={{width:"65px"}} className="float-right d-flex align-items-center clothButton">
                <img src={arrowRight} alt="arrow"height="40px" className={clothChosen==(i+1)?"arrowCloth active":"arrowCloth"}/>
                </div>
              </div>

                
              </div>
                    {clothChosen==(i+1)?(
                      <div>

            <div className="pl-3 pr-3 pt-3 pb-3">
            <button onClick={()=>deleteCloth(cloth._id)} style={{fontSize: "20px",width: "100%", }}type="button"className="btn btn-outline-dark">
            <div><img src={del} alt="plus" height="30" />USUŃ</div>
            </button>
            </div>
            <div className="pl-3 pr-3 pb-3">
            <button style={{fontSize: "20px",width: "100%", }}type="button"className="btn btn-outline-dark">
            <div><img src={edit} alt="plus" height="30" />EDYTUJ</div>
            </button>
            </div>
            <div className="pl-3 pr-3 pb-4">
            <button onClick={()=>publishCloth(cloth._id)} style={{fontSize: "20px",width: "100%", }}type="button"className="btn btn-outline-dark">
                    <div><img src={publish} alt="plus" height="30" /> {" "}OPUBLIKUJ</div>
            </button>
            </div>



                      </div>
                    ):null}


              </div>
            ))}
          </React.Fragment>


      </div>
    );
  else return null;
}

function Reqs({ s, requests, clothChosen, chooseCloth, gotoCloth,confirmRes,dismissRes }) {
  if (s == "1") return (
  <div>

<React.Fragment>
            {requests.map((r, i) => (
              <div>
              <div style={{display:"grid", gridTemplateColumns:"100px 1fr 55px"}} className="ml-3 mr-3 mt-3 bg-light">
                

              <div onClick={()=>gotoCloth(r.cloth._id)}>
              <img
                    className="d-inline-block"
                    style={{}}
                    src={r.cloth.thumbnail}
                    alt="photo"
                    height="130px"/>

              </div>
              <div style={{fontSize:"17px", padding: "7px",whiteSpace:"nowrap", overflow:"hidden",display:"grid", gridTemplateRows:"2fr 2fr 3fr 3fr"}}>

                <div style={{fontWeight:"bold"}}>{r.user}</div>
                <div><i>Nowa Prośba</i></div>
            <div><img style={{paddingBottom:"6px", paddingRight:"2px"}} src={calendar} alt="calendar"height="29px"/>{r.lastEventDate}</div>
                <div className="align-items-end">
                  <React.Fragment>
                    {(r.cloth.code).split("").map((num)=>{

                      var color = "#ffffff";
                      var text = "#000000"
                      switch(num){
                        case("0"):{color = "#15110E";text = "#ffffff";break;}
                        case("1"):{color = "#E1DCD8";text = "#000000";break;}
                        case("2"):{color = "#D81C10";text = "#ffffff";break;}
                        case("3"):{color = "#EB5608";text = "#ffffff";break;}
                        case("4"):{color = "#DFA70D";text = "#000000";break;}
                        case("5"):{color = "#288C47";text = "#ffffff";break;}
                        case("6"):{color = "#156DA0";text = "#ffffff";break;}
                        case("7"):{color = "#D935A4";text = "#ffffff";break;}
                        case("8"):{color = "#817684";text = "#ffffff";break;}
                        case("9"):{color = "#814EA0";text = "#ffffff";break;}
                      }

                      return(
                        <span style={{opacity:"0.7", backgroundColor:color, fontSize:"22px", color:text, padding:"4px", marginRight:"2px"}}>
                          {num}
                        </span>
                      );
                      
                    })}
                  </React.Fragment>
                  
                
                </div>
                                  

              </div>
              <div>
              <div onClick={()=>chooseCloth(i+1)} style={{width:"65px"}} className="float-right d-flex align-items-center clothButton">
                <img src={arrowRight} alt="arrow"height="40px" className={clothChosen==(i+1)?"arrowCloth active":"arrowCloth"}/>
                </div>
              </div>

                
              </div>
                    {clothChosen==(i+1)?(
                      <div>

            <div className="pl-3 pr-3 pt-3 pb-3">
            <button onClick={()=>confirmRes(r._id)} style={{fontSize: "20px",width: "100%", }}type="button"className="btn btn-outline-success">
            <div>POTWIERDŻ REZERWACJĘ</div>
            </button>
            </div>

            <div className="pl-3 pr-3 pt-3 pb-3">
            <button onClick={()=>dismissRes(r._id)} style={{fontSize: "20px",width: "100%", }}type="button"className="btn btn-outline-danger">
            <div>ODRZUĆ REZERWACJĘ</div>
            </button>
            </div>



                      </div>
                    ):null}


              </div>
            ))}
          </React.Fragment>



    
  </div>);
  else return null;
}

function Rsrvd({ s, reserved, clothChosen, chooseCloth, gotoCloth, clientBought, clientDidntBought}) {
  if (s == "2") return (
  <div>
<React.Fragment>
            {reserved.map((r, i) => (
              <div>
              <div style={{display:"grid", gridTemplateColumns:"100px 1fr 55px"}} className="ml-3 mr-3 mt-3 bg-light">
                

              <div onClick={()=>gotoCloth(r.cloth._id)}>
              <img
                    className="d-inline-block"
                    style={{}}
                    src={r.cloth.thumbnail}
                    alt="photo"
                    height="130px"/>

              </div>
              <div style={{fontSize:"17px", padding: "7px",whiteSpace:"nowrap", overflow:"hidden",display:"grid", gridTemplateRows:"2fr 2fr 3fr 3fr"}}>

                <div style={{fontWeight:"bold"}}>{r.user}</div>
                <div><i>Zarezerwowane</i></div>
            <div><img style={{paddingBottom:"6px", paddingRight:"2px"}} src={calendar} alt="calendar"height="29px"/>{r.lastEventDate}</div>
                <div className="align-items-end">
                  <React.Fragment>
                    {(r.cloth.code).split("").map((num)=>{

                      var color = "#ffffff";
                      var text = "#000000"
                      switch(num){
                        case("0"):{color = "#15110E";text = "#ffffff";break;}
                        case("1"):{color = "#E1DCD8";text = "#000000";break;}
                        case("2"):{color = "#D81C10";text = "#ffffff";break;}
                        case("3"):{color = "#EB5608";text = "#ffffff";break;}
                        case("4"):{color = "#DFA70D";text = "#000000";break;}
                        case("5"):{color = "#288C47";text = "#ffffff";break;}
                        case("6"):{color = "#156DA0";text = "#ffffff";break;}
                        case("7"):{color = "#D935A4";text = "#ffffff";break;}
                        case("8"):{color = "#817684";text = "#ffffff";break;}
                        case("9"):{color = "#814EA0";text = "#ffffff";break;}
                      }

                      return(
                        <span style={{opacity:"0.7", backgroundColor:color, fontSize:"22px", color:text, padding:"4px", marginRight:"2px"}}>
                          {num}
                        </span>
                      );
                      
                    })}
                  </React.Fragment>
                  
                
                </div>
                                  

              </div>
              <div>
              <div onClick={()=>chooseCloth(i+1)} style={{width:"65px"}} className="float-right d-flex align-items-center clothButton">
                <img src={arrowRight} alt="arrow"height="40px" className={clothChosen==(i+1)?"arrowCloth active":"arrowCloth"}/>
                </div>
              </div>

                
              </div>
                    {clothChosen==(i+1)?(
                      <div>

            <div className="pl-3 pr-3 pt-3 pb-3">
            <button onClick={()=>clientBought(r._id)} style={{fontSize: "20px",width: "100%", }}type="button"className="btn btn-outline-success">
            <div>KLIENT KUPIŁ</div>
            </button>
            </div>

            <div className="pl-3 pr-3 pt-3 pb-3">
            <button onClick={()=>clientDidntBought(r._id)} style={{fontSize: "20px",width: "100%", }}type="button"className="btn btn-outline-danger">
            <div>KLIENT ZREZYGNOWAŁ</div>
            </button>
            </div>



                      </div>
                    ):null}


              </div>
            ))}
          </React.Fragment>




  </div>);
  else return null;
}

function Hstry({ s, clothChosen, chooseCloth, gotoCloth, history }) {
  if (s == "3") return (
  <div>

    <React.Fragment>
            {history.map((r, i) => (
              <div>
              <div style={{display:"grid", gridTemplateColumns:"100px 1fr 55px"}} className="ml-3 mr-3 mt-3 bg-light">
                

              <div onClick={()=>gotoCloth(r.cloth._id)}>
              <img
                    className="d-inline-block"
                    style={{}}
                    src={r.cloth.thumbnail}
                    alt="photo"
                    height="130px"/>

              </div>
              <div style={{fontSize:"17px", padding: "7px",whiteSpace:"nowrap", overflow:"hidden",display:"grid", gridTemplateRows:"2fr 2fr 3fr 3fr"}}>

                <div style={{fontWeight:"bold"}}>{r.user}</div>
            <div><i>{r.status}</i></div>
            <div><img style={{paddingBottom:"6px", paddingRight:"2px"}} src={calendar} alt="calendar"height="29px"/>{r.lastEventDate}</div>
                <div className="align-items-end">
                  <React.Fragment>
                    {(r.cloth.code).split("").map((num)=>{

                      var color = "#ffffff";
                      var text = "#000000"
                      switch(num){
                        case("0"):{color = "#15110E";text = "#ffffff";break;}
                        case("1"):{color = "#E1DCD8";text = "#000000";break;}
                        case("2"):{color = "#D81C10";text = "#ffffff";break;}
                        case("3"):{color = "#EB5608";text = "#ffffff";break;}
                        case("4"):{color = "#DFA70D";text = "#000000";break;}
                        case("5"):{color = "#288C47";text = "#ffffff";break;}
                        case("6"):{color = "#156DA0";text = "#ffffff";break;}
                        case("7"):{color = "#D935A4";text = "#ffffff";break;}
                        case("8"):{color = "#817684";text = "#ffffff";break;}
                        case("9"):{color = "#814EA0";text = "#ffffff";break;}
                      }

                      return(
                        <span style={{opacity:"0.7", backgroundColor:color, fontSize:"22px", color:text, padding:"4px", marginRight:"2px"}}>
                          {num}
                        </span>
                      );
                      
                    })}
                  </React.Fragment>
                  
                
                </div>
                                  

              </div>
              <div>
              <div onClick={()=>chooseCloth(i+1)} style={{width:"65px"}} className="float-right d-flex align-items-center clothButton">
                <img src={arrowRight} alt="arrow"height="40px" className={clothChosen==(i+1)?"arrowCloth active":"arrowCloth"}/>
                </div>
              </div>

                
              </div>
                    {clothChosen==(i+1)?(
                      <div>

            <div className="pl-3 pr-3 pt-3 pb-3">
            <button onClick={()=>gotoCloth(r.cloth._id)} style={{fontSize: "20px",width: "100%", }}type="button"className="btn btn-outline-success">
            <div>ZOBACZ UBRANIE</div>
            </button>
            </div>




                      </div>
                    ):null}


              </div>
            ))}
          </React.Fragment>


  </div>);
  else return null;
}

function InShop({ s, forSale,clothChosen, chooseCloth, deleteCloth, gotoCloth}) {
  if (s == "4") return <div>

<React.Fragment>
            {forSale.map((cloth, i) => (
              <div >
              <div 
              style={{display:"grid", gridTemplateColumns:"100px 1fr 55px"}} className="ml-3 mr-3 mt-3 bg-light">
                

              <div onClick={()=>gotoCloth(cloth._id)}>
              <img
                    className="d-inline-block"
                    style={{}}
                    src={"http://staraszafa.info/"+cloth.photo}
                    alt="photo"
                    height="130px"/>

              </div>
              <div style={{fontSize:"17px", padding: "7px",whiteSpace:"nowrap", overflow:"hidden",display:"grid", gridTemplateRows:"2fr 2fr 3fr 3fr"}}>

                <div style={{fontWeight:"bold"}}>{cloth.name}</div>
                <div><i>Możliwa rezerwacja</i></div>
            <div><img style={{paddingBottom:"6px", paddingRight:"2px"}} src={calendar} alt="calendar"height="29px"/>{cloth.dateAdded}</div>
                <div className="align-items-end">
                  <React.Fragment>
                    {cloth.code.split("").map((num)=>{

                      var color = "#ffffff";
                      var text = "#000000"
                      switch(num){
                        case("0"):{color = "#15110E";text = "#ffffff";break;}
                        case("1"):{color = "#E1DCD8";text = "#000000";break;}
                        case("2"):{color = "#D81C10";text = "#ffffff";break;}
                        case("3"):{color = "#EB5608";text = "#ffffff";break;}
                        case("4"):{color = "#DFA70D";text = "#000000";break;}
                        case("5"):{color = "#288C47";text = "#ffffff";break;}
                        case("6"):{color = "#156DA0";text = "#ffffff";break;}
                        case("7"):{color = "#D935A4";text = "#ffffff";break;}
                        case("8"):{color = "#817684";text = "#ffffff";break;}
                        case("9"):{color = "#814EA0";text = "#ffffff";break;}
                      }

                      return(
                        <span style={{opacity:"0.7", backgroundColor:color, fontSize:"22px", color:text, padding:"4px", marginRight:"2px"}}>
                          {num}
                        </span>
                      );
                      
                    })}
                  </React.Fragment>
                  
                
                </div>
                                  

              </div>
              <div>
              <div onClick={()=>chooseCloth(i+1)} style={{width:"65px"}} className="float-right d-flex align-items-center clothButton">
                <img src={arrowRight} alt="arrow"height="40px" className={clothChosen==(i+1)?"arrowCloth active":"arrowCloth"}/>
                </div>
              </div>

                
              </div>
                    {clothChosen==(i+1)?(
                      <div>

            <div className="pl-3 pr-3 pt-3 pb-3">
            <button onClick={()=>deleteCloth(cloth._id)} style={{fontSize: "20px",width: "100%", }}type="button"className="btn btn-outline-dark">
            <div><img src={del} alt="plus" height="30" />USUŃ</div>
            </button>
            </div>



                      </div>
                    ):null}


              </div>
            ))}
          </React.Fragment>




  </div>;
  else return null;
}

function OnHold({ s }) {
  if (s == "5") return <div>Odłożone</div>;
  else return null;
}

function Arch({ s }) {
  if (s == "6") return <div>Archiwum</div>;
  else return null;
}

export default Content;
