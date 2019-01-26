- Reentrancy  
I don't transfer ETH in the contract.

- overflow  
I used SafeMath library to prevent contract from overflow.

- timestamp  
not rely no timestamp.

- owner  
The owner of contract might have too strong power.  
But this is trade-off.  
I chose make owner to have right to stop contract.

- Tx Origin Attack  
I used msg.sender.