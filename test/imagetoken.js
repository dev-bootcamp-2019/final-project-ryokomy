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
  
      
})