const ImageToken = artifacts.require("ImageToken");

contract("ImageToken", function(accounts) {
    it("should deploy a ImageToken properly", () =>
    {
      return ImageToken.deployed().then(function(instance) {
          return instance.name()
      }).then(function(name) {
          return assert.equal(name, "ImageToken", "Image Name is invalid")
      })
    })
  
    it("should mint a ImageToken from first account", function() {
        return ImageToken.deployed()
        .then(function(instance) {
            return instance.mint("firstImage", "firstURL", {from: accounts[0], gas: 6000000})
        })
        .then(function(results) {
            return assert.equal(Boolean(results.receipt.status), true, "mint transaction is failed")
        })
      })
  
      it("should mint a ImageToken from multiple accounts", function() {
        let imageTokenInstance
        return ImageToken.deployed()
        .then(function(instance) {
            imageTokenInstance = instance
            return instance.mint("firstImage", "firstURL", {from: accounts[1], gas: 6000000})
        })
        .then(function(results) {
            assert.equal(Boolean(results.receipt.status), true, "first mint transaction is failed")
            return imageTokenInstance.mint("secondImage", "scondURL", {from: accounts[2], gas: 6000000})
        })
        .then(function(results) {
            assert.equal(Boolean(results.receipt.status), true, "seconde mint transaction is failed")
            return imageTokenInstance.totalSupply()
        })
        .then(function(balance) {
            console.log(balance)
            assert.equal(balance.toNumber(), 3, "totalSupply is invalid")
        })
    })
    
      
})