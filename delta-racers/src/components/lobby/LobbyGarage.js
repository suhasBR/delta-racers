import React from "react";
import { Link } from "react-router-dom";
import styles from "./LobbyRaces.module.css";

function LobbyGarage() {
  return (
    <div className={styles["lobby-item-full"]}>
      <h2 className={styles["lobby-title"]}>Garage</h2>
      <Link to="/garage">
      <div className={styles["lobby-items-list-container"] + " " + styles["garage"]}>
        {/* <div className={styles["lobby-items-list"]}>
         
          <div className={styles["lobby-item"]}>
            <div className={styles["lobby-image-holder"]}>
              <img
                src="/images/car.svg"
                alt="car"
                className={styles["lobby-image"]}
              />
            </div>
            <div className={styles["lobby-text-holder"]}>
              <p className={styles["lobby-text"]}>Demo Garage</p>
            </div>
          </div>
       
        </div> */}
        <div className={styles["expand-button-container"]}>
       
            <p className={styles["expand-text"]}>
            <i class="fas fa-arrow-circle-right"></i>
            </p>
       
        </div>
        
      </div>
      </Link>
    </div>
  );
}

export default LobbyGarage;
