import React,{Fragment} from 'react';
import styles from "./Navbar.module.css";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { connectWallet } from "../actions/connect";

function Navbar() {

    const isConnected = useSelector((state) => state.user.loggedIn);
    const addr = useSelector((state) => state.user.address);
    const loading = useSelector((state) => state.user.loading);
  
    const connectWalletHandler =  () => {
      connectWallet();
    };

  return <div className={styles["navbar-full"]}>
      <div className={styles["logo-container"]}>
          <Link to="/">
          <img src="/images/logo.svg" 
          className={styles["logo-img"]}
          alt="logo"/>
          </Link>
      </div>
      <div className={styles["connect-button-holder"]}>
      {!isConnected ? (
       <Fragment>
         {
           loading ? (
            <button
            onClick={connectWalletHandler}
            className={styles["connect-button"]}
          >
            ...
          </button>
           ): (
            <button
            onClick={connectWalletHandler}
            className={styles["connect-button"]}
          >
            Connect Wallet
          </button>
           )
         }
         
          </Fragment>
        ) : (
          <button
            onClick={connectWalletHandler}
            className={styles["connect-button"]}
          >
            Connected to {addr.substring(0,5)+'....'}
          </button>
        )}
      </div>

  </div>;
}

export default Navbar;
