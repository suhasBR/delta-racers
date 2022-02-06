import React from "react";
import {Link} from "react-router-dom";
import styles from "./LobbyRaces.module.css";

function LobbyRaces() {
  return (
    <div className={styles["lobby-item-full"]}>
      <h2 className={styles["lobby-title"]}>Races</h2>
      <div className={styles["lobby-items-list-container"]}>
        <div className={styles["lobby-items-list"]}>
          <Link to="/races" >
          <div className={styles["lobby-item"]}>
            <div className={styles["lobby-image-holder"]}>
              <img
                src="/images/car.svg"
                alt="car"
                className={styles["lobby-image"]}
              />
            </div>
            <div className={styles["lobby-text-holder"]}>
              <p className={styles["lobby-text"]}>Demo Race</p>
            </div>
          </div>
          </Link>

        </div>
        <div className={styles["expand-button-container"]}>
       
            <p className={styles["expand-text"]}>
            <i class="fas fa-arrow-circle-right"></i>
            </p>
       
        </div>
        {/* <img className={styles["wheel"]} src="/images/nft/f1_test_wheel_3.png" alt="wheel" /> */}
      </div>
    </div>
  );
}

export default LobbyRaces;
