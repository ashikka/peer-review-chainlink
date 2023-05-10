import "hardhat/console.sol";

contract Paper {
    string public status = "UNDER_REVIEW";
    string public ipfsHash;
    address public owner;

    mapping(address => bool) public reviews;


    constructor(string memory _ipfsHash) public {
        console.log("Deploying a User");
        ipfsHash = _ipfsHash;
        owner = msg.sender;
    }

    function setStatus(string memory _status) public {
        status = _status;
    }
    
    function addReview(address _reviewer, bool _review) public {
        reviews[_reviewer] = _review;
    }
}

/**
 User
  - address of the owner
  - list/mapping of papers deployed by this user
  getPapers() - returns an array of addresses to Paper contracts deployed by this user
  deployPaper() - deploys a new Paper contract under this user. (can only be run by the owner)


 */