//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./ComponentNFT.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

//hardhat debugging
import "hardhat/console.sol";

contract Race is ComponentNFT{

    uint maxRacersCount;
    uint currentRacersCount;
    uint entryFeeWei;
    uint entryFeeMatic;

    bool raceEnded = false;

    AggregatorV3Interface[] internal priceFeeds;
    

    struct Racer{
        string uname;
        address addr;
        int256 score;
        //each token value weight out of 1000 normalized
        //represents racer's portfolio aggregate
        int256 btc;
        int256 eth;
        int256 usdt;
        int256 bnb;
        int256 ada;
        int256 sol;
        int256 xrp;
        int256 luna;
        int256 doge;
        int256 dot;
    }

    Racer[] public racers;

    int256[] initialPrices;

    int256[] finalPrices;

    int256[] deltaPrices;

    event NewRacer(string uname, address addr, uint position);
    event RaceBegan();

    

    constructor (string memory name, string memory symbol) ComponentNFT(name, symbol){

        //initialize the price feeds
        priceFeeds[0] = AggregatorV3Interface(0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c);
        priceFeeds[1] = AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);
        priceFeeds[2] = AggregatorV3Interface(0x3E7d1eAB13ad0104d2750B8863b489D65364e32D);
        priceFeeds[3] = AggregatorV3Interface(0x8993ED705cdf5e84D0a3B754b5Ee0e1783fcdF16);
        priceFeeds[4] = AggregatorV3Interface(0xAE48c91dF1fE419994FFDa27da09D5aC69c30f55);
        priceFeeds[5] = AggregatorV3Interface(0x4ffC43a60e009B551865A93d232E33Fce9f01507);
        priceFeeds[6] = AggregatorV3Interface(0xCed2660c6Dd1Ffd856A5A82C67f3482d88C50b12);
        priceFeeds[7] = AggregatorV3Interface(0x91E9331556ED76C9393055719986409e11b56f73);
        priceFeeds[8] = AggregatorV3Interface(0x2465CefD3b488BE410b941b1d4b2767088e2A028);
        priceFeeds[9] = AggregatorV3Interface(0x1C07AFb8E2B827c5A4739C6d59Ae3A5035f28734);

        //initialize the race constraints
        maxRacersCount = 10;
        currentRacersCount = 0;

        //define entry fee
        entryFeeMatic = 1;
        entryFeeWei = (10 ** 18) * entryFeeMatic;

        raceEnded = false;
    }

   

    function getLatestPrice(AggregatorV3Interface feedType) internal view returns(int){
        (,int price,,,) = feedType.latestRoundData();
        return price;
    }

    function getDecimals(AggregatorV3Interface feedType) internal view returns(uint8){
        uint8 decimals = feedType.decimals();
        return decimals;
    }

    /*
    @notice Function addRacers to allow users to join as racers by paying the entry fee
    */

    function addRacers(
    string memory _uname, 
    int256 _btc, 
    int256 _eth,
    int256 _usdt,
    int256 _bnb,
    int256 _ada,
    int256 _sol,
    int256 _xrp,
    int256 _luna,
    int256 _doge,
    int256 _dot
    ) external payable{

        //verify staking amount, maxRacers and if race has ended
        require(msg.value >= entryFeeWei,"Insufficient staking amount to start the race");
        require(currentRacersCount < maxRacersCount, "Maximum limit reached for this race, try another one");
        require(!raceEnded, "Sorry, race has ended");

        //create new racer and push it to the racers array
        racers.push(Racer(_uname, msg.sender, 0, _btc, _eth, _usdt, _bnb ,_ada, _sol, _xrp, _luna, _doge, _dot));
        

        //emit user acceptance event
        emit NewRacer(_uname, msg.sender, currentRacersCount+1);
        currentRacersCount++;
    }


    function beginRace() public {
        //get latest prices and assign them to initialPrices

        for(uint i=0;i<10;i++){
            initialPrices[i] = getLatestPrice(priceFeeds[i]);
        }

        raceEnded = false;

        //emit beginning of the race
        emit RaceBegan();
    }

    function endRace() public{
        //get the latest prices and calculate the delta

        for(uint8 i=0;i<10;i++){
            finalPrices[i] = getLatestPrice(priceFeeds[i]);
            deltaPrices[i] = finalPrices[i] - initialPrices[i];
        }

        //update score for each user
        for(uint8 i=0;i<maxRacersCount;i++){
            int256 _tempScore = 0;

            _tempScore += (racers[i].btc * deltaPrices[0]);
            _tempScore += (racers[i].eth * deltaPrices[1]);
            _tempScore += (racers[i].usdt * deltaPrices[2]);
            _tempScore += (racers[i].bnb * deltaPrices[3]);
            _tempScore += (racers[i].ada * deltaPrices[4]);
            _tempScore += (racers[i].sol * deltaPrices[5]);
            _tempScore += (racers[i].xrp * deltaPrices[6]);
            _tempScore += (racers[i].luna * deltaPrices[7]);
            _tempScore += (racers[i].doge * deltaPrices[8]);
            _tempScore += (racers[i].dot * deltaPrices[9]);

            racers[i].score = _tempScore;
        }

        //sort the racers array based on their score
        for(uint i=0;i<maxRacersCount-1;i++){
            for(uint j=0;j<(maxRacersCount-1-i);j++){
                if(racers[j].score < racers[j+1].score){
                    Racer memory temp = racers[j];
                    racers[j] = racers[j+1];
                    racers[j+1] = temp;
                }
            }

        }

        //redestribute stakes
        payable(racers[0].addr).transfer(420000000000000000 * entryFeeMatic * currentRacersCount);
        payable(racers[1].addr).transfer(297500000000000000 * entryFeeMatic * currentRacersCount);
        payable(racers[2].addr).transfer(127500000000000000 * entryFeeMatic * currentRacersCount);

        //distribute the remaining among other racers
        uint remainingEach = (entryFeeMatic * currentRacersCount * 140000000000000000)/(currentRacersCount-3);

        for(uint8 i=3;i<(currentRacersCount-3);i++){
            payable(racers[i].addr).transfer(remainingEach);
        }
    }




    

}