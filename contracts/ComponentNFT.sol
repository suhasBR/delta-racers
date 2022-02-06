//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract ComponentNFT is ERC721, Ownable{

    uint256 public tokenCounter;
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256[]) public holdings;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol){
        tokenCounter = 0;
    }

    function mint(string memory _tokenURI) public payable{
        require(msg.value >= 0.01 ether, "Not enough balance" );

        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, _tokenURI);

        holdings[msg.sender].push(tokenCounter);

        tokenCounter++;

        
    }


    function _setTokenURI(uint256 _tokenId, string memory _tokenURI) internal virtual{
        require(_exists(_tokenId),"ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[_tokenId] = _tokenURI;
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns(string memory){
        require(_exists(_tokenId), "The MetaData for this tokenId does not exist in this contract");
    string memory _tokenURI = _tokenURIs[_tokenId];
    return _tokenURI;
    }


    function listNFTs(address _userAddress) public view returns(uint256[] memory){
        return holdings[_userAddress];
    }

    function withdraw() public onlyOwner{
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function getBalance() public view onlyOwner returns(uint){
        return address(this).balance;
    }


}