import React, { Fragment } from "react";
import Navbar from "../components/Navbar";
import styles from "./Landing.module.css";

import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { connectWallet } from "../actions/connect";
import { useNavigate } from "react-router-dom";

function Landing() {
  const isConnected = useSelector((state) => state.user.loggedIn);
  const addr = useSelector((state) => state.user.address);
  const loading = useSelector((state) => state.user.loading);

  let navigate = useNavigate();

  const goToLobby = async () => {
    if (!isConnected) {
      await connectWallet();
      navigate("/lobby");
    } else {
      //navigate to lobby
      navigate("/lobby");
    }
  };

  return (
    <div className={styles["landing-page"]}>
      <Navbar />
      <section className={styles["car-holder"]}>
        <img className={styles.car} src="/images/nft/landing.png" alt="car" />
      </section>
      <section className={styles["connect-button-main-holder"]}>
        <button onClick={goToLobby} className={styles["connect-button-main"]}>
          Start Racing
        </button>
      </section>
      <section className={styles["about-container"]}>
        <div className={styles.about}>
          <h3 className={styles["about-title"]}>About</h3>
          <p className={styles["about-text"]}>
            Delta racers is a new innovative game where you can participate in
            races which are controlled by cryptocurrency/asset prices. Racers
            can buy individual car parts , build their own car , Hire drivers
            and race them in races against each other. The combination of the
            different car components give different affinity towards specific
            cryptocurrency prices. By racing multiple times racers can discover
            these affinities and increase their chance of winning prices. In all
            the Game plays very similar to ZED run , with the exception being
            that the cars performance directly depends on the Underlying
            cryptocurrency Asset.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Landing;
