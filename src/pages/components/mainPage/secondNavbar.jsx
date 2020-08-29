import React, { Component } from "react";
import banner from "../../../graphics/banner.jpg";
import arrow from "../../../graphics/arrow-down.svg";

class SecondNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: [],
      categories: this.props.tags,
      cFlip: false,
      sFlip: false,
    };

    this.handleCflip = this.handleCflip.bind(this);
    this.handleSflip = this.handleSflip.bind(this);
  }

  handleCflip() {
    if (!this.state.cFlip && this.state.sFlip) this.setState({ sFlip: false });
    this.setState({ cFlip: !this.state.cFlip });
  }

  handleSflip() {
    if (!this.state.sFlip && this.state.cFlip) this.setState({ cFlip: false });
    this.setState({ sFlip: !this.state.sFlip });
  }

  render() {
    return (
      <div
        style={{zIndex:"2000"}}
        ref={this.props.secondNav}
        className={this.props.scrolled ? "scrolled shadow" : null}
      >
        <InlineButtons
          b1={this.state.cFlip}
          b2={this.state.sFlip}
          f1={this.handleCflip}
          f2={this.handleSflip}
        ></InlineButtons>

        <WindowExpandableCategories
          section={this.props.section}
          toggleTag={this.props.toggleTag}
          array={this.props.tags}
          state={this.state.cFlip}
        ></WindowExpandableCategories>

        <WindowExpandableSizes
          toggleSize={this.props.toggleSize}
          sizes={this.props.sizes}
          state={this.state.sFlip}
        ></WindowExpandableSizes>
      </div>
    );
  }
}

function InlineButtons({ b1, b2, f1, f2 }) {
  return (
    <div className="col-lg-10 main">
      <div
        style={{
          backgroundColor: "#f8f9fa",
          overflow: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <ButtonMine s={b1} f={f1} text={"Kategorie"}></ButtonMine>
        <ButtonMine s={b2} f={f2} text={"Rozmiary"}></ButtonMine>
      </div>
    </div>
  );
}

function ButtonMine({ s, f, text }) {
  return (
    <div className="d-inline-block" onClick={f}>
      <div
        style={{
          padding: "20px",
          paddingLeft: "15px",
          paddingRight: "15px",
          fontSize: "17px",
          cursor: "pointer",
          height: "66px",
        }}
      >
        {text}
        <img
          src={arrow}
          className={s ? "arrow active" : "arrow"}
          alt="arrow"
          height="15"
        />
      </div>
    </div>
  );
}

function WindowExpandableCategories({ state, array, toggleTag, section }) {
  return (
    <div className="col-lg-10 main">
      <div
        style={{ backgroundColor: "#f8f9fa" }}
        className={state ? "d-block " : "active d-block"}
        id="mojaSzafaWindowPhone"
      >
        <div className="m-2">
          <React.Fragment>
            {array.map((e, ii) => (
              <div key={e.name + e.child[0]}>
                {ii + 1 == section ? (
                  <div className="d-inline">
                    <button
                      className={
                        e.select ? "tag d-inline active" : "tag d-inline"
                      }
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
                      {e.name + ":"}
                    </button>
                    {e.select ? (
                      <div className="d-inline">
                        {e.child.length == 0 ? null : (
                          <React.Fragment>
                            {e.child.map((f) => (
                              <div className="d-inline">
                                <button
                                  onClick={() =>
                                    toggleTag(e.name, f.name, f.select)
                                  }
                                  className={
                                    f.select
                                      ? "tagSub d-inline active"
                                      : "tagSub d-inline"
                                  }
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
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ))}
          </React.Fragment>
        </div>
      </div>
    </div>
  );
}

function WindowExpandableSizes({ state, sizes, toggleSize }) {
  return (
    <div className="col-lg-10 main">
      <div
        style={{ backgroundColor: "#f8f9fa" }}
        className={state ? "d-block " : "active d-block"}
        id="mojaSzafaWindowPhone"
      >
        <div className="m-2">
          <React.Fragment>
            {sizes.map((s, ii) => (
              <div key={s.name} className="d-inline">
                <button
                  onClick={()=>toggleSize(s.name,s.select)}
                  className={
                    s.select ? "tagSub d-inline active" : "tagSub d-inline"
                  }
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
                  {s.name}
                </button>
              </div>
            ))}
          </React.Fragment>
        </div>
      </div>
    </div>
  );
}

export default SecondNavbar;
