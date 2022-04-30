import React, { Component, useState, useEffect } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function Nav(props) {
  const navigate = useNavigate();
  const connectWallet = () => {
    console.log("Reached wallet", window.ethereum);
    if (window.ethereum) {
      props.appState.isWeb3 = true;
      const ethereum = window.ethereum;

      let web3 = new Web3(ethereum);

      ethereum.enable().then((accounts) => {
        let account = accounts[0];
        web3.eth.defaultAccount = account;
        console.log(account, props.appState);

        props.setAppState((prevState) => {
          return {
            ...prevState,
            account: account,
            web3: web3,
          };
        });

        switchNetworkMumbai();
      });
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  const switchNetworkMumbai = () => {
    const ethereum = window.ethereum;
    let web3 = new Web3(ethereum);
    web3.currentProvider
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      })
      .then(function (resonse, error) {
        if (error) alert(error.message);
      });
  };

  return (
    <div>
      <nav className="navbar is-black py-3" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item ">
            <h1 className="title is-3 ml-5" style={{ color: "white" }}>
              Scambuster
            </h1>
          </div>
        </div>

        <div className="navbar-menu is-active">
          <div className="navbar-start"></div>
          <div className="navbar-menu mt-2">
            <a
              className="navbar-item ml-5"
              style={{ color: "white", fontSize: "20px", background: "none" }}
              onClick={() => {
                if (props.appState.account) {
                  navigate("/");
                } else {
                  alert("Please Connect You Wallet");
                }
              }}
            >
              Home
            </a>

            <a
              className="navbar-item"
              style={{ color: "white", fontSize: "20px", background: "none" }}
              onClick={() => {
                if (props.appState.account) {
                  navigate("/proposer");
                } else {
                  alert("Please Connect You Wallet");
                }
              }}
            >
              Submit a Website
            </a>

            <a
              className="navbar-item"
              style={{ color: "white", fontSize: "20px", background: "none" }}
              onClick={() => {
                if (props.appState.account) {
                  navigate("/validator");
                } else {
                  alert("Please Connect You Wallet");
                }
              }}
            >
              Validator Screen
            </a>

            <a
              className="navbar-item"
              style={{ color: "white", fontSize: "20px", background: "none" }}
              onClick={() => {
                if (props.appState.account) {
                  navigate("/validator");
                } else {
                  alert("Please Connect You Wallet");
                }
              }}
            >
              Search
            </a>
          </div>

          {props.appState.isWeb3 && props.appState.account ? (
            <div className="navbar-end mr-5 mt-2">
              <a className="navbar-item ">
                {" "}
                Account Connected : {props.appState.account.slice(0, 8)}...
              </a>
            </div>
          ) : (
            <div className="navbar-end mr-5 mt-2">
              <a
                className="navbar-item button is-link"
                onClick={() => connectWallet()}
              >
                Connect Metamask Wallet
              </a>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nav;
