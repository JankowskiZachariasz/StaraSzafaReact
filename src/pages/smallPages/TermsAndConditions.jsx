import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Alert, Button} from "react-bootstrap"
import TopNavbar from "../reusable/topNavbar";
import BottomNavbar from "../reusable/bottomNavbar";
import Footer from "../reusable/Footer";
import stickArrow from "../../graphics/stickArrow.svg";
import info from "../../graphics/info.svg";
import tick from "../../graphics/tick.svg";
import place from "../../graphics/placeDark.png";
import calendar from "../../graphics/calendar.svg";
import accountDark from "../../graphics/accountDark.png";

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    };


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

  render() {
  
    return (
      <div>
        

        <div className="bg-light"  style={{minHeight:"100vh"}}>
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
     
     <div className="col-lg-6 mt-lg-5 p-4"style={{margin: "auto", maxWidth:"800px"}}>
         <div className=" shadow bg-white rounded mt-2 p-lg-5 mb-5">
             
             <div class="d-flex justify-content-center"style={{paddingTop: "40px",}} ><h3>Regulamin Strony</h3></div>

 <div class="d-flex justify-content-center"style={{paddingTop: "60px",}} ><h5>§ 1</h5></div>
 <div class="d-flex justify-content-center"><h5><b>Postanowienia Ogólne</b></h5></div>
 
    <ol>
        <li  style={{paddingTop: "23px",fontSize:"17px"}}>Niniejszy regulamin określa zasady na jakich działa strona internetowa ‘StaraSzafa.info’ i skierowany jest do jej użytkowników.</li>
    </ol>

    <div class="d-flex justify-content-center"style={{paddingTop: "60px",}} ><h5>§ 2</h5></div>
 <div class="d-flex justify-content-center"><h5><b>Definicje</b></h5></div>
         
 <ul>
        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        Strona – Strona internetowa dostępna pod adresem: staraszafa.info, której administratorem jest firma Stara Szafa Ewa Witt (Regon: 510423013, NIP: 7440006536, adres: Rynek 11, 14-260 Lubawa)
        </li>

        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        Użytkownik – każda osoba odwiedzająca stronę
        </li>

        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        Zarejestrowany Użytkownik – Użytkownik, który założył konto na stronie w sekcji ‘Zarejestruj’. Każdy taki użytkownik musi posiadać adres e-mail, który jest weryfikowany w trakcie rejestracji.
        </li>

        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        Konto – wpis w naszej bazie danych, który zawiera informacje na temat zarejestrowanego użytkownika. Posiadanie tego wpisu jest niezbędne, aby móc rezerwować przedmioty dostępne na stronie. Każdy taki wpis zawiera następujące informacje:
        <ol>
        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        Imię 
        </li>

        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        Nazwisko
        </li>

        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
         Kod identyfikacyjny
        </li>

        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
         Adres e-mail
        </li>

        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
         Zaszyfrowane hasło
        </li>

        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
         Data dołączenia
        </li>

        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
         Limit dostępnych Rezerwacji
        </li>

        </ol>
        </li>

        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        Przedmiot – każde ubranie widoczne na stronie, które jest dostępne do rezerwacji
        </li>

        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        Rezerwacja – wyrażenie chęci wizyty w sklepie w celu zobaczenia i/lub przymierzenia i/lub zakupienia danego przedmiotu. Rezerwacja nie jest wiążąca ani dla użytkownika, ani dla firmy Stara Szafa Ewa Witt. Każda rezerwacja trwa 3 dni robocze (pierwszy dzień to następny dzień roboczy po dniu, w którym złożono prośbę o rezerwację). W tym okresie firma Stara Szafa dokłada wszelkich starań, aby przedmiot był dostępny dla rezerwującego użytkownika, gdy ten przyjdzie do jednego z naszych sklepów wskazanego w formularzu rezerwacji. Każda rezerwacja w danej chwili znajduje się w jednym z następujących stadiów:
        <ol>
        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        „Prośba o rezerwację czeka na rozpatrzenie”
        </li>

        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        „Rezerwacja potwierdzona” – od tego momentu rejestrujący użytkownik może odwiedzić wskazany w formularzu sklep (w godzinach otwarcia) i zrealizować swoją rezerwację, powołując się na swoje nazwisko.
        </li>

        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        „Rezerwacja nie została odebrana na czas” – jeżeli użytkownik nie zjawi się w sklepie przed końcem trwania rezerwacji, zostanie ona zakończona a ubranie, której dotyczyła stanie się ponownie dostępne dla wszystkich klientów.
        </li>

        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        „Kupiono” – Użytkownik odwiedził sklep, zobaczył zarezerwowany przedmiot i go kupił
        </li>

        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        „Nie kupiono” – Użytkownik odwiedził sklep, zobaczył zarezerwowany przedmiot, ale nie zdecydował się go kupić
        </li>
        </ol>
        </li>

        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        Aktywna rezerwacja – każda rezerwacja, która jest na etapie „1 „lub” 2”
        </li>

        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        Formularz Rezerwacji – jest to formularz wypełniany w kontekście jednego ustalonego przedmiotu, w którym użytkownik wyraża swoją wolę wizyty w sklepie w celu zrealizowania rezerwacji.
        </li>

        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        Limit Rezerwacji – jest to liczba całkowita, która określa limit aktywnych rezerwacji dla danego użytkownika.
        </li>
    </ul>

    <div class="d-flex justify-content-center"style={{paddingTop: "60px",}} ><h5>§ 3</h5></div>
 <div class="d-flex justify-content-center"><h5><b>Zasady korzystania ze strony</b></h5></div>

<ol>
    
        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        Korzystanie z serwisu jest całkowicie bezpłatne.
        </li>
        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        Firma Stara Szafa rezerwuje sobie prawo do arbitralnego ustalania limitu rezerwacji dla każdego użytkownika. Jest to narzędzie, które ma służyć do nagradzania stałych klientów i ograniczania nadużyć.
        </li>
        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        Istnienie rezerwacji opiera się na zaufaniu i nie jest wiążące dla żadnej ze stron.
        </li>
        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        Korzystanie ze strony oznacza akceptację regulaminu.
        </li>
        <li  style={{paddingTop: "23px",fontSize:"17px"}}>
        Każdy użytkownik może poprosić o usunięcie jego konta. Takie życzenie można wyrazić wysyłając stosowny e-mail na adres staraszafa.lubawa@gmail.com. Taki e-mail musi zostać wysłany z adresu, który pokrywa się z adresem konta, które ma zostać usunięte.
        </li>

</ol>

<div class="d-flex justify-content-center"style={{paddingTop: "60px",}} ><h5>§ 4</h5></div>
 <div class="d-flex justify-content-center"><h5><b>Wymagania techniczne</b></h5></div>
<ul>
<li  style={{paddingBottom:"50px",paddingTop: "23px",fontSize:"17px"}}>
Do poprawnego działania strony niezbędna jest przeglądarka Internetowa obsługująca JavaScript.
        </li>

</ul>


     </div>
    </div>
    </div>
    <Footer></Footer>
      </div>
    );
  }
}


export default Contact;
