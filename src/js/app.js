App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract()
  },

  initContract: function() {
    $.getJSON('ImageToken.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var ImageTokenArtifact = data;
      App.contracts.ImageToken = TruffleContract(ImageTokenArtifact);

      // Set the provider for our contract.
      App.contracts.ImageToken.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      return
      // return App.getBalances();
    });

    App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#createButton', App.handleCreate);
  },

  handleCreate: function(event) {
    event.preventDefault();

    var imageName = $('#ImageName').val();
    var imageURL = $('#ImageURL').val();

    console.log('imageName: ' + imageName + ', imageURL: ' + imageURL);

    var imageTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.ImageToken.deployed().then(function(instance) {
        imageTokenInstance = instance;

        return imageTokenInstance.mint(imageName, imageURL, {from: account, gas: 6000000});
      }).then(function(result) {
        alert('Create Successful!');
        // return getBalances()
        return App.getBalances(); // TODO: check
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  getBalances: function() {
    console.log('Getting balances...');

    let imageTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.ImageToken.deployed().then(function(instance) {
        imageTokenInstance = instance;

        return imageTokenInstance.balanceOf(account);
      }).then(function(result) {
        balance = result.c[0];

        $('#ImageTokenBalance').text(balance);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
