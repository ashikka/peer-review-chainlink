//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract User {
    mapping(address => bool) public papers;

    constructor() {
        console.log("Deploying a User");
    }
}
