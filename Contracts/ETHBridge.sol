//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ETHBridge is Ownable{

    constructor(address _RUPEE) Ownable(msg.sender){
          RUPEE = IERC20(_RUPEE);
    }

    event Lock(address indexed _from, uint256 indexed _amount);

    IERC20 public RUPEE;
    mapping(address => uint256) balances;

  
   function lock(address _tokenAddress, uint256 _amount)  public  {
    require(_amount > 0 ,"Amount cannot be zero");
    require(_tokenAddress == address(RUPEE));
    require(IERC20(_tokenAddress).allowance(msg.sender,address(this)) >= _amount , "please approve");
    IERC20(_tokenAddress).transferFrom(msg.sender, address(this), _amount);
    emit Lock(msg.sender , _amount);

   }

   function unlock(address _tokenAddress , uint256 _amount) public {
    require(_amount> 0, "Amount cannot be zero");
    require(_amount<= balances[msg.sender], "Insufficiant balance");
    balances[msg.sender] -= _amount;
    IERC20(_tokenAddress).transfer(msg.sender,_amount);
   }

   function burnedOnOtherSide(address _user , uint256 _amount ) onlyOwner public {
       balances[_user] += _amount;
   }

}
//0x081587A7a8fFb06172A0520C8bfbA1bCCA6a2Be1 - Sepolia
// 0x1e9E2B1Ef6c69169DFb1dB75F216CA174BC3e95c - owner