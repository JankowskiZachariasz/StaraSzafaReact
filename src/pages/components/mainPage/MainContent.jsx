import React, { Component } from "react";


class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    
  }


  render() {
    return (
      <div
        style={{
          marginTop: this.props.scrolled ? this.props.navHeight + "px" : null,
          marginBottom: "10em",
        }}
        className="col-lg-10 clothContainer"
      >
        {this.props.clothes ? (
          <React.Fragment>
            {this.props.clothes.map((product) => (
              <div className="cloth" onClick={()=>this.props.history.push("/ubranie/"+product._id)}>
              <Filter

                product={product}
              ></Filter>
              </div>

            ))}
          </React.Fragment>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

function Filter({ product}) {
  return (
    <div  key={product._id}>
     
      <img
        
        style={{ outline: "3px solid white", outlineOffset: "-2px" }}
        width="100%"
        src={"http://staraszafa.info/" + product.photo}
      ></img>
      
      {product.size != "" ? (
        <div style={{ height: "0px" }}>
          <div
            style={{
              position: "relative",
              left: "2px",
              top: "-38px",
              zIndex: "1001",
              backgroundColor: "#E2E2B6",
              padding: "3px",
              paddingRight: "7px",
              height: "24px",
              width: "max-content",
              borderRadius: "10px",
              fontSize: "13px",
            }}
          >
            Rozmiar: {product.size}
          </div>
          <div
            style={{
              position: "relative",
              left: "2px",
              top: "-62px",
              zIndex: "1000",
              height: "24px",
              width: "10px",
              backgroundColor: "#E2E2B6",
            }}
          ></div>
        </div>
      ) : null}

      <div style={{ marginLeft: "2px", marginTop: "3px" }}>
        <div>{product.name}</div>
        <div>
          {product.discount ? (
            <span>
              <span
                style={{
                  textDecoration: "line-through",
                  color: "red",
                  paddingRight: "6px",
                }}
              >
                {product.price + " PLN"}
              </span>
              <span>
                {Math.round(
                  parseInt(product.price) *
                    ((100 - product.discountPercentageVAlue) / 100)
                ) + ",00 PLN"}
              </span>
            </span>
          ) : (
            product.price + " PLN"
          )}
        </div>

        <div style={{ color: "green", paddingBottom: "2em" }}>
          Możliwa rezerwacja
        </div>
      </div>
      
    </div>
  );
}

export default MainContent;
