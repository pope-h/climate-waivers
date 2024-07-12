// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DisaXta is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10**18;
    uint256 public constant CLAIMABLE_DSX = 100 * 10**18;

    mapping(address => bool) public hasClaimed;

    constructor() ERC20("DisaXta", "DSX") Ownable(msg.sender) {
        _mint(address(this), INITIAL_SUPPLY);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function claimDSX() public {
        require(!hasClaimed[msg.sender], "DSX token already claimed");
        hasClaimed[msg.sender] = true;
        _transfer(address(this), msg.sender, CLAIMABLE_DSX);
    }
}