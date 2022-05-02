// This is a skeleton starter React component generated by Plasmic.
// This file is owned by you, feel free to edit as you see fit.
import * as React from "react";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import abi from "../contract/validator.js";
var ABI = JSON.parse(abi);

const validatorAddress = "0xaC4228A108138acb86d829D6A4B09d0178200fDd";

//import { useMoralis, useMoralisFile} from "react-moralis";

//import InputField from './InputField';

//function HomeScam_() {

const HomeScam = (props) => {
  const [isActive, setActive] = useState(false);

  const activateModal = () => {
    setActive(!isActive);
  };

  useEffect(() => {
    var contract = new props.appState.watchweb3.eth.Contract(
      ABI,
      validatorAddress
    );

    //props.watchweb3.eth.getBlockNumber(function(error,response){
    //if(response)
    //{

    contract
      .getPastEvents("siteAdded", {
        //Block where contract was created. Ideally show data for 1 year?
        fromBlock: 26083674,
        toBlock: "latest",
      })
      .then(function (events) {
        for (
          let i = events.length - 1;
          i != -1 && i > events.length - 11;
          i--
        ) {
          let t = i;

          contract.methods
            .sitelist(events[t].returnValues._url)
            .call({ from: props.account })
            .then(function (response, err) {
              console.log("response in HomeScam", response);
              events[t].returnValues.yesVotes =
                response.yesVotes / Math.pow(10, 18);
              events[t].returnValues.noVotes =
                response.noVotes / Math.pow(10, 18);
              events[t].flag = false;

              if (t == 0 || t == events.length - 11) {
                props.setsiteData((prevState) => {
                  return {
                    ...prevState,
                    site: events,
                  };
                });
              }
            });
        }
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="bg-img">
      <div className={isActive ? "modal is-active" : "modal"}>
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title has-text-centered">
                <b>Connect Your Wallet</b>
              </p>
            </header>
            <section
              class="modal-card-body"
              style={{
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
              }}
            >
              <div className="columns is-centered">
                <img
                  src="/images/metamask.svg"
                  style={({ height: "300px" }, { width: "300px" })}
                ></img>
              </div>
              <div className="columns is-centered">
                <a href="https://metamask.io/download/" target="_blank">
                  <button
                    class="button is-success mb-3"
                    style={{ backgroundColor: "#F6851B" }}
                  >
                    Install Metamask
                  </button>
                </a>
              </div>
            </section>
            {/* <footer class="modal-card-foot">
              <button class="button is-success">Save changes</button>
              <button class="button">Cancel</button>
            </footer> */}
          </div>
        </div>
        <button
          class="modal-close is-large"
          aria-label="close"
          onClick={() => activateModal()}
        ></button>
      </div>
      <div className="box bg-img">
        <div className="columns is-centered">
          <div className="column has-text-centered">
            <figure className="image ">
              <img src="banner.gif"></img>
            </figure>
            <figure className="image ">
              <img src="matrixshort.gif"></img>
            </figure>
            <div className="columns is-overlay is-centered">
              <div className="column is-6 has-text-centered">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <div className="columns">
                  <div className="column ">
                    <a
                      className="button is-large is-black "
                      onClick={() => {
                        if(props.appState.account){
                          navigate("/proposer")
                        } else {
                          activateModal()
                        }
                      }}
                    >
                      Report a Scam{" "}
                    </a>
                  </div>
                  <div className="column">
                    <a
                      className="button is-large is-link "
                      onClick={() => {
                        if(props.appState.account){
                          navigate("/validator")
                        } else {
                          activateModal()
                        }
                      }}
                    >
                      {" "}
                      Validator Login
                    </a>
                  </div>
                </div>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <div className="columns is-centered">
                  <div className="box bg-img">
                    <div class="panel-block has-text-white">
                      Recently Submit Websites
                    </div>
                    {props.siteData.site.map((site, index) => {
                      return (
                        <div key={index + 1}>
                          <div class="panel-block ">
                            <br></br>
                            <br></br>
                            <div className="column is-full has-text-centered">
                              <marquee direction="down">
                                <div className="is-size-3 has-text-white">
                                  {" "}
                                  {site.returnValues._url}
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  {site.returnValues.noVotes >= 50 ? (
                                    <span class="tag is-danger">Scam!</span>
                                  ) : site.Votes >= 50 ? (
                                    <span class="tag is-success">Clean</span>
                                  ) : (
                                    <span class="tag is-info">
                                      Voting in progress
                                    </span>
                                  )}
                                </div>
                              </marquee>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//const HomeScam = React.forwardRef(HomeScam_);

export default HomeScam;
