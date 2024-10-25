// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.27;

interface Sender {
    error WithdrawalAmountExceedsBalance(address account, uint256 amount, uint256 balance);
    event EtherSent(address indexed from, address indexed to, uint256 amount);
}

contract EtherSender is Sender {

  function balanceOf() external view returns(uint256) {
      return msg.sender.balance;
  }

  function transferEther(address payable _to, uint256 amount) public payable {
        uint256 balance = msg.sender.balance;
        if (balance < amount) {
          revert WithdrawalAmountExceedsBalance({
              account: msg.sender,
              amount: amount,
              balance: balance
          });
        }
      _to.transfer(amount);
      emit EtherSent(msg.sender, _to, amount);
  }
  
}