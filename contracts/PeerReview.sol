//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./User.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract PeerReview is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;
    
    address[] public users;
    mapping (address => address) public usersMap;

    uint256 private constant ORACLE_PAYMENT = (1 * LINK_DIVISIBILITY) / 10; // 0.1 * 10**18

   constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
    }

    function createUser(string memory scholarUrl) public returns(address newUser) {
        Chainlink.Request memory req = buildChainlinkRequest(
            stringToBytes32("0d27436ce10e416f93d5993d5f248c2e"),
            address(this),
            this.fulfillCreateUser.selector
        );

        req.add(
            "scholarUrl",
            scholarUrl
        );

        req.add(
            "address",
            Strings.toHexString(uint160(msg.sender), 20)
        );

        sendChainlinkRequestTo(0xd0bd08d367Ffa09a23b634a55886Ab262E700c26, req, ORACLE_PAYMENT);

        return address(0);
 }

    function fulfillCreateUser(
        bytes32 _requestId,
        bool valid,
        string  memory user,
        uint256 trustRating
    ) public recordChainlinkFulfillment(_requestId) returns(address newUser) {
        address from = parseAddr(user);

        if (usersMap[from] != address(0)) {
            return usersMap[from];
        } 

        if (!valid) {
            return address(0);
        }

        console.log("Creating a User");

        User u = new User(from, trustRating);
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

    function stringToBytes32(
        string memory source
    ) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            // solhint-disable-line no-inline-assembly
            result := mload(add(source, 32))
        }
    }

    function parseAddr(string memory _a) internal pure returns (address _parsedAddress) {
    bytes memory tmp = bytes(_a);
    uint160 iaddr = 0;
    uint160 b1;
    uint160 b2;
    for (uint i = 2; i < 2 + 2 * 20; i += 2) {
        iaddr *= 256;
        b1 = uint160(uint8(tmp[i]));
        b2 = uint160(uint8(tmp[i + 1]));
        if ((b1 >= 97) && (b1 <= 102)) {
            b1 -= 87;
        } else if ((b1 >= 65) && (b1 <= 70)) {
            b1 -= 55;
        } else if ((b1 >= 48) && (b1 <= 57)) {
            b1 -= 48;
        }
        if ((b2 >= 97) && (b2 <= 102)) {
            b2 -= 87;
        } else if ((b2 >= 65) && (b2 <= 70)) {
            b2 -= 55;
        } else if ((b2 >= 48) && (b2 <= 57)) {
            b2 -= 48;
        }
        iaddr += (b1 * 16 + b2);
    }
    return address(iaddr);
}
}
