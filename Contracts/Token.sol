// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";


contract Token is ERC20, Ownable {
    constructor()
        ERC20("RUPEE", "INR")
        Ownable(msg.sender)
    {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

// 0x5E3Dd28cF940B00638B639D23B36cB347E4b9767 - Sepolia
// 0x1e9E2B1Ef6c69169DFb1dB75F216CA174BC3e95c - owner