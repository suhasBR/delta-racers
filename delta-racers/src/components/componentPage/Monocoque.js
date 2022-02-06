import React, {useEffect} from "react";
import { loadMonocoque } from "../../actions/components";
import styles from "./Engine.module.css";
import { mintOne } from "../../actions/mint";
import { useSelector } from "react-redux";

function Monocoque() {


  useEffect(() => {

    loadMonocoque()
    
  }, []);

  const monocoque = useSelector((state) => state.component.monocoque);

  const mintNFT = (e) => {
    const imgURI = e.target.getAttribute("uri");
    mintOne(imgURI);
  }



  return (
    <div className={styles["car-parts-holder"]}>
      <div className={styles["car-parts-title"]}>
        <h3 className={styles["car-parts-title-text"]}>Monocoque</h3>
      </div>
      <div className={styles["gallery"]}>

      {
          monocoque && (monocoque.map((element,index) => {
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

        {/* <div className={styles["gallery-item"]}>
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

export default Monocoque;
