import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import { loadEngines } from "../../actions/components";
import { mintOne } from "../../actions/mint";
import styles from "./Engine.module.css";
import axios from 'axios';

function Engine() {

  useEffect(() => {

    loadEngines()
    
  }, []);

  const engines = useSelector((state) => state.component.engine);

  // console.log(engines);
  

  const mintNFT = async (e) => {
    const imgURI = e.target.getAttribute("uri");
    mintOne(imgURI);

    // const response = await axios.get('https://ipfs.io/ipfs/QmbEFN3xQiTUhy1eJqV8cNHCudW1F58GpbnZTGmkQymh5d');
    // console.log(response.data);
    
  }
  


  return (
    <div className={styles["car-parts-holder"]}>
      <div className={styles["car-parts-title"]}>
        <h3 className={styles["car-parts-title-text"]}>Engine</h3>
      </div>
      <div className={styles["gallery"]}>

        {
          engines && (engines.map((element,index) => {
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
                      Buy 0.01 MATIC
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

export default Engine;
