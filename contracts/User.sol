//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Paper.sol";

contract User {
    mapping(address => Paper) public papers;
    address[] public papers_array;
    address public user_address;
    address public peer_review_address;
    uint256 public trust_rating;

    // address public constant adminAddress = 0x1Af0a1185c0c96906A0a88748Db7e16e1976A67b;

    constructor(address _address, uint256 trustRating) {
        user_address = _address;
        peer_review_address = msg.sender;
        trust_rating = trustRating;
        console.log("Deploying a User");
    }

    function getPapers() public view returns (address[] memory _address) {
        return papers_array;
    }

    function setTrustRating(uint256 _trust_rating) public {
        // if (msg.sender == adminAddress) {
        trust_rating = _trust_rating;
        // }
    }

    function getPaper(address _paperAddress) public view returns (Paper) {
        return papers[_paperAddress];
    }

    function deployPaper(string memory _ipfsHash)
        public
        returns (address newContract)
    {
        if (msg.sender == user_address) {
            Paper p = new Paper(_ipfsHash, user_address, peer_review_address);
            papers[address(p)] = p;
            papers_array.push(address(p));
            return address(p);
        }
    }
}
