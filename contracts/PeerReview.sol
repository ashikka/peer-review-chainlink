//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./User.sol";

contract PeerReview {
    address[] public users;
    mapping (address => address) public usersMap;
    constructor() {
        console.log("Deploying PeerReview Contract");
    }

    function createUser() public returns(address newUser) {
        if (usersMap[msg.sender] != address(0)) {
            return usersMap[msg.sender];
        } 
        console.log("Creating a User");
        address from = msg.sender;
        User u = new User(from);
        usersMap[from] = address(u);

        users.push(from);
        return address(u);
    }

    function getUser(address _user) public view returns(address user) {
        return usersMap[_user];
    }

    function getMyUser() public view returns(address user) {
        return usersMap[msg.sender];
    }

    function getUsers() public view returns(address[] memory userList) {
        return users;
    }
}
