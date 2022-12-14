// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.8.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.8.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.8.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.8.0/utils/Counters.sol";

// we need the Strings utility contract to provide the Strings.toString() function used in the safeMint function
import "@openzeppelin/contracts@4.8.0/utils/Strings.sol";

contract MintSequentialNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("ByeBye", "BYE") {}

    string[] names;

    mapping(address => string) public addressToEnterPhrases;

    event nameSetEvent(string message, string newNames);

    function getNames() public view returns (string[] memory) {
        return names;
    }


    function destroyedPhrase(string memory _inputName) public {
        addressToEnterPhrases[msg.sender] = _inputName;
        names.push(_inputName);
        emit nameSetEvent("A new text was set.", _inputName);
    }

    function _baseURI() internal pure override returns (string memory) {
        // set the baseURI, which will be used later when returning the complete tokenURI
        return
            "/Users/anniehu/Documents/GitHub/doug/bfashow2/visual/images/metadata";
    }

    function safeMint(address to) public onlyOwner {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        // concatenate the tokenId of the current minted token to the baseURI.
        string memory uri = string.concat(Strings.toString(tokenId), ".json");
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
