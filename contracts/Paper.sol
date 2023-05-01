import "hardhat/console.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Paper is Ownable {
    string public status = "UNDER_REVIEW";
    string public ipfsHash;

    mapping(address => bool) public reviews;


    constructor(string memory _ipfsHash) public {
        console.log("Deploying a User");
        ipfsHash = _ipfsHash;
    }

    function setStatus(string memory _status) public {
        status = _status;
    }
    
    function addReview(address _reviewer, bool _review) public {
        reviews[_reviewer] = _review;
    }
}
