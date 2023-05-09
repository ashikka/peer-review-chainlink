//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Paper.sol";

contract User {
    mapping(address => Paper) public papers;
    string public username;

    constructor() {
        console.log("Deploying a User");
    }

    function deployPaper(string memory _ipfsHash) public returns(address newContract) {
        Paper p = new Paper(_ipfsHash);
        papers[address(p)] = p;
        return address(p);
    }
}
