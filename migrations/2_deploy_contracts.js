const ImageToken = artifacts.require("ImageToken");

module.exports = function(deployer) {
    let name = "ImageToken"
    let symbol = "IT"
    deployer.deploy(ImageToken, name, symbol);
};