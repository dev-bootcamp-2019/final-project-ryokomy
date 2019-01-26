pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";

/**
* @title ImageToken (ERC721)
*/
contract ImageToken is ERC721Token, Pausable {

    /** @dev use SafeMath libarary to prevent from overflow */
    using SafeMath for uint256;

    /** 
    * @title ImageToken Data
    * @dev This is mapped by tokenId
    */ 
    struct ITData {
        string imageName;
        string imageURL;
    }

    /** @dev mapping from tokenId to ITData */
    mapping(uint256 => ITData) public tokenIdToITData;

    /** 
    * @dev Initialize ERC721Token
    * @param _name Token Name of ImageToken (ERC721).
    * @param _symbol Token Symbol of ImageToken (ERC721).
    */
    constructor(string _name, string _symbol) ERC721Token(_name, _symbol) public {}

    /** 
    * @dev 
    * @param _imageName image name which will be binded to tokenId.
    * @param _imageURL image URL which will be binded to tokenId.
    */
    function mint(string _imageName, string _imageURL) public whenNotPaused {
        // calculate tokenId by incrementing
        uint256 tokenId = totalSupply().add(1);
        // "to" stands for token owner. token owner is sender of this transaction
        address to = msg.sender;
        // mint token
        _mint(to, tokenId);
        // map Image Data to tokenId
        tokenIdToITData[tokenId] = ITData({
            imageName: _imageName,
            imageURL: _imageURL
        });
    }

}