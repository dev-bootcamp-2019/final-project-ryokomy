App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    await App.initWeb3();
    await App.initContract();
    await App.bindEvents();

    // Account Address
    let accounts = await App.getAccounts();
    $('#AccountAddress').text(String(accounts[0]));

    // updateBalance
    await App.updateBalance()

  },

  initWeb3: async function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
      web3 = new Web3(App.web3Provider);
    }
  },

  initContract: async function() {
    $.getJSON('ImageToken.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var ImageTokenArtifact = data;
      App.contracts.ImageToken = TruffleContract(ImageTokenArtifact);

      // Set the provider for our contract.
      App.contracts.ImageToken.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      return
    });
  },

  bindEvents: async function() {
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
        return App.updateBalance();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  getAccounts: async function() {
    return new Promise((resolve, reject) => {
      web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(accounts)
      })
    })
  },

  updateBalance: async function() {
    console.log('Getting balances...');

    let imageTokenInstance = await App.contracts.ImageToken.deployed();
    let account = (await App.getAccounts())[0];
    try{
      let balance = (await imageTokenInstance.balanceOf(account)).c[0]
      $('#ImageTokenBalance').text(balance);
    }
    catch(err) {
      console.error(err)
      throw err
    }
  },

};

$(function() {
  $(window).load(async function() {
    await App.init();
  });
});
