import axios from 'axios';
import { addEngine, addMonocoque, addWheels, addDrivers } from '../reducers/components';
import { store } from "../store";

// import engines from '../nfts/engines.json'
// import engines from '../nfts/engines.json'
// import engines from '../nfts/engines.json'


export const loadEngines = async () => {

    try {
        const res = await axios.get('https://warm-sands-67318.herokuapp.com/api/v1/NFTs/getNFTbyType',{
            params:{
                type : 'engine'
            }
        });
        
        //loading from the JSON file locally stored
        store.dispatch(addEngine(res.data));
    } catch (error) {
        console.log(error);
        
    }
}

export const loadMonocoque = async () => {

    try {
        const res = await axios.get('https://warm-sands-67318.herokuapp.com/api/v1/NFTs/getNFTbyType',{
            params:{
                type : 'monocoque'
            }
        });
        
        store.dispatch(addMonocoque(res.data));
    } catch (error) {
        console.log(error);
        
    }
}

export const loadWheels = async () => {

    try {
        const res = await axios.get('https://warm-sands-67318.herokuapp.com/api/v1/NFTs/getNFTbyType',{
            params:{
                type : 'wheel'
            }
        });
        
        store.dispatch(addWheels(res.data));
    } catch (error) {
        console.log(error);
        
    }
}


export const loadDrivers = async () => {

    try {
        const res = await axios.get('https://warm-sands-67318.herokuapp.com/api/v1/NFTs/getNFTbyType',{
            params:{
                type : 'driver'
            }
        });
        
        store.dispatch(addDrivers(res.data));
    } catch (error) {
        console.log(error);
        
    }
}