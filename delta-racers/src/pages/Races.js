import React, { useState, useEffect, Fragment } from "react";
import Navbar from "../components/Navbar";
import styles from "./Races.module.css";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import Race from "../abi/Race.json";
import Footer from "../Footer";

const RaceContractAddress = "0x5DC933E751576addE7b9C7E528913484eBFD6D41";

function Races() {
  const [racers, addRacers] = useState([]);
  const [raceStatus, changeRaceStatus] = useState("");
  const [lockButton, changeLockButton] = useState(false);
  const [showResults, changeShowResults] = useState(false);

  useEffect(() => {
    checkRacers();
  }, []);

  const addr = useSelector((state) => state.user.address);

  const checkRacers = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = tempProvider.getSigner();
    let tempContract = new ethers.Contract(
      RaceContractAddress,
      Race,
      tempSigner
    );
    try {
      const updatedRacers = await tempContract.functions.getRacers();
      console.log(updatedRacers[0]);
      addRacers(updatedRacers[0]);

      const raceStatus = await tempContract.functions.getRaceStatus();
      console.log(raceStatus[0]);

      if (raceStatus[0] == 0) {
        changeRaceStatus("Race Not Begun");
      }

      if (raceStatus[0] == 1) {
        changeRaceStatus("Race has begun");
        changeLockButton(true);
      }

      if (raceStatus[0] == 2) {
        changeRaceStatus("Race has ended, view results below");
        changeShowResults(true);
        changeLockButton(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkEvents = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = tempProvider.getSigner();
    let tempContract = new ethers.Contract(
      RaceContractAddress,
      Race,
      tempSigner
    );

    tempContract.on("NewRacer", (nam, addr, position) => {
      console.log("got the event");
      console.log(nam, addr, position);
      alert('joined the race !');
      checkRacers();
    });

    tempContract.on("RaceBegan", () => {
      console.log("race began");
      changeRaceStatus("Race has begun");
      changeLockButton(true);
      checkRacers();
    });

    tempContract.on("RaceEnded", () => {
      console.log("race ended");
      changeRaceStatus("Race has ended, view results below");
      changeShowResults(true);
      changeLockButton(true);
      checkRacers();
    });
  };

  const handleStakeButtonClicked = () => {
    stake(addr);
  };

  const stake = async (addr) => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = tempProvider.getSigner();
    let tempContract = new ethers.Contract(
      RaceContractAddress,
      Race,
      tempSigner
    );

    let temp = Array.from({length: 10}, () => Math.floor(Math.random() * 300));

    // console.log(tempContract.functions);
    try {
      await tempContract.functions.addRacers(
        "dummy1",
        temp,
        { value: "1000000000000000000" }
      );

      const updatedRacers = await tempContract.functions.getRacers();
      console.log(updatedRacers);
      addRacers(updatedRacers[0]);

      checkEvents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles["race-page"]}>
      <Navbar />
      <section className={styles["race-main-section"]}>
        <div className={styles["table-holder"]}>
          <h2>Participants</h2>
          <table className={styles["table"]}>
            <thead>
              <tr>
                <th>Position</th>
                <th>Address</th>
                <th>Stake</th>
              </tr>
            </thead>

            <tbody>
              {racers &&
                racers.map((element, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{element.addr.substring(0, 6)}...</td>
                      <td>{1}MATIC</td>
                    </tr>
                  );
                })}
              {/* 
               <tr>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                </tr> */}
            </tbody>
          </table>
        </div>
        <div className={styles["interaction-holder"]}>
          <h2>Race 101</h2>
          <p>To join the race, transfer entry fee of 1 MATIC</p>

          {!lockButton ? (
            <button
              onClick={handleStakeButtonClicked}
              className={styles["stake-button"]}
            >
              Join Race
            </button>
          ) : (
            <button
              disabled
              onClick={handleStakeButtonClicked}
              className={styles["stake-button"]}
            >
              Join Race
            </button>
          )}

          <p>{raceStatus}</p>
        </div>
      </section>

      <section className={styles["results-section"]}>
        {showResults && (
          <Fragment>
            <h2>Final Standings</h2>
            <table className={styles["table"]}>
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Address</th>
                  <th>Points</th>
                </tr>
              </thead>

              <tbody>
                {racers &&
                  racers.map((element, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{element.addr.substring(0, 6)}...</td>
                        <td>{parseInt(element.score._hex,16)}</td>
                      </tr>
                    );
                  })}

                {/* <tr>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                </tr> */}
              </tbody>
            </table>
          </Fragment>
        )}
      </section>
      <Footer/>
    </div>
  );
}

export default Races;
