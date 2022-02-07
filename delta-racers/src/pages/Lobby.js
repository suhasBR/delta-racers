import React from 'react';
import styles from "./Lobby.module.css";
import Navbar from "../components/Navbar";

import LobbyRaces from "../components/lobby/LobbyRaces";
import LobbyGarage from "../components/lobby/LobbyGarage";
import LobbyCarParts from '../components/lobby/LobbyCarParts';
import LobbyDrivers from "../components/lobby/LobbyDrivers";
import Footer from '../Footer';

function Lobby() {
  return <div className={styles["lobby-page"]}>
      <Navbar/>
      <section className={styles["lobby-items"]}>
        <LobbyRaces/>
        <LobbyGarage/>
        <LobbyCarParts/>
        {/* <LobbyDrivers/> */}
       
      </section>
      <Footer/>
  </div>;
}

export default Lobby;
