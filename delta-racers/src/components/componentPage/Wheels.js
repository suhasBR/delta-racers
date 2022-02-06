import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import { loadWheels } from "../../actions/components";
import { mintOne } from "../../actions/mint";
import styles from "./Engine.module.css";

function Wheels() {

  useEffect(() => {

    loadWheels()

    
  }, []);

  const wheels = useSelector((state) => state.component.wheels);

  console.log(wheels);
  

  const mintNFT = (e) => {
    const imgURI = e.target.getAttribute("uri");
    mintOne(imgURI);
  }
  


  return (
    <div className={styles["car-parts-holder"]}>
      <div className={styles["car-parts-title"]}>
        <h3 className={styles["car-parts-title-text"]}>Wheels</h3>
      </div>
      <div className={styles["gallery"]}>

        {
          wheels && (wheels.map((element,index) => {
            return (
              <div className={styles["gallery-item"]} key={element._id}>
              <div className={styles["gallery-image-holder"]}>
                <img
                  className={styles["gallery-image"]}
                  src={element.imgSrc}
                  alt={element.type}
                />
              </div>
              <div className={styles["mint-button-container"]}>
                  <button
                  uri={element.uri} 
                  onClick = {(e) => mintNFT(e)}
                  className={styles["mint-button"]} >
                      Buy
                  </button>
              </div>
            </div>
            )
          }))
        }
{/* 
        <div className={styles["gallery-item"]}>
          <div className={styles["gallery-image-holder"]}>
            <img
              className={styles["gallery-image"]}
              src="/images/first.jpg"
              alt="first"
            />
          </div>
          <div className={styles["mint-button-container"]}>
              <button className={styles["mint-button"]}>
                  Buy
              </button>
          </div>
        </div> */}

      </div>
    </div>
  );
}

export default Wheels;

