import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import styles from "./Garage.module.css";
import ComponentNFTABI from "../abi/ComponentNFT.json";
import axios from "axios";

import { contractAddress } from "../actions/mint";
import { updateNFTs } from "../actions/connect";

function Garage() {
  const [nfts, addNFTs] = useState([]);

  const addr = useSelector((state) => state.user.address);

  useEffect(() => {
    // collectNFTs();
  }, [addr]);

  const [option, changeOption] = useState("");

  const handleChange = async (e) => {
    changeOption(e.target.value);

    const addr1 = addr.toUpperCase();

    const type = e.target.value.toLowerCase();

    try {
      const res = await axios.get('http://localhost:5000/api/v1/user/getNFTByOwner',{
        params: {
          owner:addr1,
          type:type
        }
      });
      // const res = await axios.get(`http://localhost:5000/api/v1/user/getNFTByOwner?owner=${addr1}&type=${type}`);
      console.log(res.data.data);

      addNFTs(res.data.data);

    } catch (error) {
      console.log(error);
    }
    
  };

  const collectNFTs = async () => {
    //first get the NFTs
    // let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    // let tempSigner = tempProvider.getSigner();
    // let tempContract = new ethers.Contract(
    //   contractAddress,
    //   ComponentNFTABI,
    //   tempSigner
    // );
    // try {
    //   let tempArr = await tempContract.functions.listNFTs(addr);
    //   tempArr = tempArr[0];

    //   let completeJSONArr = [];

    //   const promises = [];

      // tempArr.forEach(async (element) => {
        // const result =await axios
        //   .get(
        //     `https://api.covalenthq.com/v1/80001/tokens/0x4745536356Dd9c51fb8a968284c5E52363971A3b/nft_metadata/${Number(element._hex)}/?&key=ckey_29f89556ca6f4264a060f06dd1e`
        //   )
            
        //   completeJSONArr = [...completeJSONArr,response.data.data.items[0].nft_data[0].external_data]

      // });

    //   const results = await Promise.all(promises);

    //   const actualDatas = results.map((result) =>result);
      
    //   addNFTs(nfts => [...nfts, ...actualDatas]);

    // } catch (error) {
    //   console.log(error);
    // }

    try {
      //if address is invalid then return
      if(!addr){
        return;
      }

      //fetch all NFTs held by the account using Coavlent API
      const res = await axios.get(`https://api.covalenthq.com/v1/80001/address/${addr}/balances_v2/?nft=true&key=ckey_29f89556ca6f4264a060f06dd1e`)
      //filter the NFTs to include only those from our smart contract
      const contractElements = res.data.data.items.filter((element) => {
        return element['contract_address'] == "0x4745536356dd9c51fb8a968284c5e52363971a3b";
      })
      const userNFTData = contractElements[0]['nft_data'];
      const userNFTDataFiltered = userNFTData.map((element) => element['external_data'])
      // console.log(userNFTDataFiltered)
      addNFTs(userNFTDataFiltered);

      updateNFTs(userNFTDataFiltered);

      
    } catch (error) {
      console.log(error);
    }

    


  };

  return (
    <div className={styles["garage-page"]}>
      <Navbar />
      <h2 className={styles["garage-title"]}>Garage</h2>
      <section className={styles["garage-main-section"]}>
        <div className={styles["car-holder"]}>
          <img
            src="/images/car.svg"
            alt="sample-car"
            className={styles["car-image"]}
          ></img>
        </div>
        <div className={styles["component-selector"]}>
          <h4 className={styles["component-selector-title"]}>
            Available Components
          </h4>
          <select
            className={styles["selector"]}
            selected={option}
            onChange={(e) => handleChange(e)}
          >
            <option disabled selected value>
              Select a Component
            </option>
            <option className={styles["option"]}>Monocoque</option>
            <option className={styles["option"]}>Wheel</option>
            <option className={styles["option"]}>Engine</option>
            <option className={styles["option"]}>Driver</option>
          </select>
          <div className={styles["nft-gallery"]}>
            {nfts &&
              nfts.map((element, index) => {
                console.log(element)
                return (
                  <div className={styles["nft"]} key={index}>
                    <img
                      src={'https://ipfs.io/ipfs/'+(element['imgSrc'].split("//")[1])}
                      alt='nft'
                      className={styles["image"]}
                    />
                  </div>
                );
              })
            }
          </div>
        </div>
      </section>
    </div>
  );
}

export default Garage;
