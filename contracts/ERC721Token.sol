pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";

contract ImageToken is ERC721Token, Pausable {

    using SafeMath for uint256;

    struct ITData {
        string imageName;
        string imageURL;
    }

    mapping(uint256 => ITData) public tokenIdToITData;

    constructor(string _name, string _symbol) ERC721Token(_name, _symbol) public {}

    function mint(string _imageName, string _imageURL) public whenNotPaused {
        uint256 tokenId = totalSupply().add(1);
        address to = msg.sender;
        _mint(to, tokenId);
        tokenIdToITData[tokenId] = ITData({
            imageName: _imageName,
            imageURL: _imageURL
        });
    }

}