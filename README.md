# Delta Racers


# PolygonScan Link for Smart contract
https://mumbai.polygonscan.com/address/0xC69352b81B16c0D7682B23d1dEAe794cb17ad770

# About
Delta racers is a new innovative game where you can participate in races which are controlled by cryptocurrency/asset prices. Racers can buy individual car parts , build their own car , Hire drivers and race them in races against each other. The combination of the different car components give different affinity towards specific cryptocurrency prices. In all the Game plays very similar to ZED run , with the exception being that the cars performance directly depends on the underlying cryptocurrency Asset. 

# How it's made

In order to participate in a race, a user needs to build a car. The components to build the car are sold as NFTs on the platform. Each of these components have weights corresponding to cryptocurrency token values. Player then needs to pay an entry fee to join the race. 

We have used the ERC721 token smart contract from Openzeppelin for minting component NFTs, deployed on Polygon Mumbai testnet. For the racing logic, we have written a smart contract and deployed it on the Polygon Mumbai testnet. We have tried using Chainlink data feeds to fetch token prices for smart contract to calculate the winner of the race, however we faced some issues integrating it with Mumbai testnet and due to shortage of time, we decided to use Opensea APIs being fed to the smart contract from a centralized source. However, we believe the right way to feed prices is through an Oracle like Chainlink. Smart contract used for the race is also responsible for re-distributing staked MATIC tokens as rewards to the participants. For the current version, 4 participants are allowed to the race and the top 3 winners get rewards.

For the front end application, we have used ReactJS with standard NPM add-ons. We also have an express server hosted on Heroku with a connection to MongoDB Atlas. We use this to store non-critical data, like NFT image thumbnails and component data. This allows us to fetch data much faster.
