// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";



contract WToken is ERC20, ERC20Burnable, Ownable {
    constructor(address initial_Owner)
        ERC20("WRUPEE", "WINR")
        Ownable(initial_Owner)
    {}

    function mint(address to, uint256 amount) public  onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public onlyOwner{
        burnFrom(from,amount);
    }
}

//0x80c9dBeeb4A861B854556c7eF2231474d73E5C2c - Apechain
//0xDaB5058Ac0C79221DA223ddb64DC31Cf023e6A9f - Owner 
//10000000000000000000