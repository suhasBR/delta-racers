import React from "react";
import Drivers from "../components/componentPage/Drivers";
import Engine from "../components/componentPage/Engine";
import Monocoque from "../components/componentPage/Monocoque";
import Wheels from "../components/componentPage/Wheels";
import Navbar from "../components/Navbar";
import styles from "./Components.module.css";

function Components() {
  return (
    <div className={styles["components-page"]}>
      <Navbar />
      <Engine/>
      <Wheels/>
      <Monocoque/>
      <Drivers/>
    </div>
  );
}

export default Components;
