// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

interface IWtoken is IERC20 {
    function mint(address to, uint256 amount) external;
    function burn(address from , uint256 amount) external;
}

contract ApeChainBridge is Ownable{
     
    constructor(address _WRUPEE) Ownable(msg.sender){
       WRUPEE = IWtoken(_WRUPEE);
    }
    
    event Burned(address indexed addr,uint indexed amount);

    IWtoken public WRUPEE;

    mapping(address => uint256) balance;

    function withdraw(uint256 amount) public {
        require(balance[msg.sender]>= amount,"Insufficient balance");
        balance[msg.sender] -= amount;
        WRUPEE.mint(msg.sender,amount);
    }

    function burned(uint amount) public {
       require(WRUPEE.balanceOf(msg.sender)>= amount, "Please submit tokens");
       WRUPEE.burn(msg.sender, amount);
       emit Burned(msg.sender,amount);
    } 

    function lockOnOppositeChain(address user , uint256 amount) public onlyOwner {
           balance[user] += amount;
    }
}
//0xDaB5058Ac0C79221DA223ddb64DC31Cf023e6A9f - Apechain
//0x1e9E2B1Ef6c69169DFb1dB75F216CA174BC3e95c - owner 
  
// before calling that burn() first call approve                           