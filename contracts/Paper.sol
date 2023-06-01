//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

struct PaperReview {
    bool decision;
    string comment;
}

contract Paper {
    string public status = "UNDER_REVIEW";
    string public ipfsHash;
    address public owner;
    address[] public reviewers;

    mapping(address => PaperReview) public reviews;

    constructor(string memory _ipfsHash, address _address) {
        console.log("Deploying a User");
        ipfsHash = _ipfsHash;
        owner = _address;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getIpfsHash() public view returns (string memory) {
        return ipfsHash;
    }

    function setStatus(string memory _status) private {
        status = _status;
    }

    function addReview(bool _review, string memory comment) public {
        if (
            msg.sender != owner &&
            keccak256(bytes(status)) == keccak256(bytes("UNDER_REVIEW"))
        ) {
            PaperReview memory review = PaperReview(_review, comment);
            for (uint256 index = 0; index < reviewers.length; index++) {
                if (reviewers[index] == msg.sender) {
                    reviews[msg.sender] = review;
                    return;
                }
            }
            reviews[msg.sender] = review;
            reviewers.push(msg.sender);
            uint256 numReviews = 0;
            for (uint256 index = 0; index < reviewers.length; index++) {
                if (reviews[reviewers[index]].decision) {
                    numReviews++;
                }
            }
            if (numReviews >= 2) {
                setStatus("PUBLISHED");
            }
        }
    }

    function getReviews() public view returns (PaperReview[] memory) {
        PaperReview[] memory reviewList = new PaperReview[](reviewers.length);
        for (uint256 index = 0; index < reviewers.length; index++) {
            reviewList[index] = reviews[reviewers[index]];
        }
        return reviewList;
    }
}
