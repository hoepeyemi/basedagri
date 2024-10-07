// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable(msg.sender) {
    constructor() ERC20("EcoToken", "EKT") {

        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    /**
     * @dev Mint new tokens.
     * Only the owner can call this function.
     * @param amount The amount of tokens to be minted.
     */
    function mint(uint256 amount) public onlyOwner {
        _mint(msg.sender, amount);
    }

    /**
     * @dev Burn tokens.
     * Any token holder can burn their tokens.
     * @param amount The amount of tokens to be burned.
     */
    function burn(uint256 amount) public onlyOwner{
        _burn(msg.sender, amount);
    }
}
