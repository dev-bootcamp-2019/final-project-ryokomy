const ImageToken = artifacts.require("ImageToken");

contract("ImageToken", function(accounts) {
    it("should deploy a ImageToken properly", () =>
    {
    let imageTokenInstance
      return ImageToken.deployed().then(function(instance) {
        imageTokenInstance = instance
          return instance.name()
      }).then(function(name) {
          assert.equal(name, "ImageToken", "ImageToken Name is invalid")
          return imageTokenInstance.symbol()
      }).then(function(symbol) {
          return assert.equal(symbol, "IT", "ImageToken Symbol is invalid")
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
  
      it("should mint multiple ImageToken from multiple accounts", function() {
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
            assert.equal(balance.toNumber(), 3, "totalSupply is invalid")
        })
    })

    it("should minted tokens' owners are correct", function() {
        let imageTokenInstance
        return ImageToken.deployed().then(function(instance) {
          imageTokenInstance = instance
            return instance.ownerOf(1)
        }).then(function(owner1) {
            assert.equal(owner1, accounts[0], "First owner is incorrect")
            return imageTokenInstance.ownerOf(2)
        }).then(function(owner2) {
            assert.equal(owner2, accounts[1], "Seconde owner is incorrect")
            return imageTokenInstance.ownerOf(3)
        }).then(function(owner3) {
            assert.equal(owner3, accounts[2], "Third owner is incorrect")
        })
    })

    it("should transfer token", function() {
        let imageTokenInstance
        return ImageToken.deployed().then(function(instance) {
          imageTokenInstance = instance
          return imageTokenInstance.safeTransferFrom(accounts[0], accounts[1], 1, {from: accounts[0], gas: 6000000})
        }).then(function(results) {
            assert.equal(Boolean(results.receipt.status), true, "transfer transaction is failed")
            return imageTokenInstance.ownerOf(1)
        }).then(function(owner1) {
            return assert.equal(owner1, accounts[1], "transfer function didn't work")
        })
    })    
      
})