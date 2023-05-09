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
