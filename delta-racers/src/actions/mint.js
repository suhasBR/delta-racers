import axios from 'axios';
import {ethers} from 'ethers';
import ComponentNFTABI from '../abi/ComponentNFT.json';
import SimpleStorage_abi from '../abi/SimpleStorage_abi.json';

export const contractAddress = "0x9b06477Ef111Eb07644E5657eD4d53fA3F7716FF";
// const contractAddress = "0xCF31E7c9E7854D7Ecd3F3151a9979BC2a82B4fe3"

export const mintOne = async (uri) => {

    let  tempProvider = new ethers.providers.Web3Provider(window.ethereum);

    let tempSigner = tempProvider.getSigner();


    let tempContract = new ethers.Contract(contractAddress, ComponentNFTABI, tempSigner);
    
    console.log(tempContract);

    //exeucte mint function from contract
    try {
        await tempContract.functions.mint(uri, {value:'10000000000000000'});
        checkEvents();
        
    } catch (error) {
        console.log(error);        
    }
}

const checkEvents = async () => {
    let  tempProvider = new ethers.providers.Web3Provider(window.ethereum);

    let tempSigner = tempProvider.getSigner();


    let tempContract = new ethers.Contract(contractAddress, ComponentNFTABI, tempSigner);


    tempContract.on("minted", async (addr, uri) => {
      console.log("minted successfully",addr,uri);
      alert('minted successfully !');
      const cid = uri.split('//')[1];
      const precursor = 'https://ipfs.io/ipfs/'
    

      try {
        const response = await axios.get(precursor+cid);

        const owner = addr.toUpperCase();
        const cluster = response.data;
        const imgSrc = cluster.image;
        const attributes = cluster.attributes;
        const type = cluster.type;

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({
            owner,
            type,
            imgSrc,
            attributes
        });

        console.log(JSON.parse(body));

        const res = await axios.post('https://warm-sands-67318.herokuapp.com/api/v1/user/mint',body,config);



          
      } catch (error) {
          console.log(error);
      }
    
      

    });
  };