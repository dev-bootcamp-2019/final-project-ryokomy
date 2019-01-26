1. Circuit Breaker  
I used OpenZeppelin Pausable contract to implement Circuit Breaker.  
For emergency, I added whenNotPaused modifier to mint function.
2. Restricting Access  
ImageToken contract inherited from ERC721 token.  
So it implements ownable modifier.  
This is used for Transfer function and other some functions not to transfer your tokens by an attacker without permission.


This is a simple contract.  
So I chose not to implement other design patterns in vain.