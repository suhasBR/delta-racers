/* Example in Node.js */
const axios = require('axios');

let returnArr = [];

let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,USDT,BNB,ADA,SOL,XRP,LUNA,DOGE,DOT', { 
    headers: {
        'X-CMC_PRO_API_KEY': 'c74ed1c2-f0fe-4266-b7c7-0f4662f50dbd',
      },
    });
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const json = response.data.data;
    
    // console.log(Object.keys(json));
    // returnArr = Object.keys(json).map((element) => {
    //     return Math.floor((json[element]['quote']['USD']['price'])*100)
    // })

    returnArr[0] = Math.floor((json['BTC']['quote']['USD']['price'])*1000)
    returnArr[1] = Math.floor((json['ETH']['quote']['USD']['price'])*1000)
    returnArr[2] = Math.floor((json['USDT']['quote']['USD']['price'])*1000)
    returnArr[3] = Math.floor((json['BNB']['quote']['USD']['price'])*1000)
    returnArr[4] = Math.floor((json['ADA']['quote']['USD']['price'])*1000)
    returnArr[5] = Math.floor((json['SOL']['quote']['USD']['price'])*1000)
    returnArr[6] = Math.floor((json['XRP']['quote']['USD']['price'])*1000)
    returnArr[7] = Math.floor((json['LUNA']['quote']['USD']['price'])*1000)
    returnArr[8] = Math.floor((json['DOGE']['quote']['USD']['price'])*1000)
    returnArr[9] = Math.floor((json['DOT']['quote']['USD']['price'])*1000)

    console.log(returnArr);
   

    // console.log(json);
    resolve(returnArr);
    
  }
})


