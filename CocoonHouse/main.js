/* CONNECT_AUTOMATICALLY
  true: automatically connect to Web3 Provider on page load.
  false: enable "click to connect" button
*/
main();

async function main() {

  // INITIALIZAING STEPS (SKIP TO THE BOTTOM TO WRITE YOUR OWN CODE)

  // Check website compatibility
  if (navigator.userAgent.indexOf("Safari") != -1
    && navigator.userAgent.indexOf("Chrome") == -1) {
    alert("Please switch to a browser that supports Web3 (Chrome, Firefox, Brave, Edge, or Opera)");

    return;
  }
  console.log("Browser is Web3 compatible");

  // Check if MetaMask is installed
  if (!window.ethereum) {
    alert("No Web3 Provider detected, please install MetaMask (https://metamask.io)");
    return;
  }
  console.log("MetaMask is installed");


  // (REQUIRED) Connect to a Web3 provider (MetaMask in most cases)
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

  // If the network changes, refresh the page. (e.g. the user switches from mainnet to goerli)
  provider.on("network", (newNetwork, oldNetwork) => {
    if (oldNetwork) {
      window.location.reload();
    }
  });

  try {
    // (REQUIRED) Request to connect current wallet to the dApp
    await provider.send("eth_requestAccounts", []);
  } catch (error) {
    const errorMessage = "Cannot connect to wallet. There might be an issue with another browser extenstion. Try disabling some browser extensions (other than MetaMask), then attempt to reconnect."
    console.error(errorMessage, error);
    alert(errorMessage);
    return;
  }
  console.log("Wallet connected");


  // Check if user is signed in to correct network
  const chainId = await provider.getNetwork();
  if (chainId.chainId != 80001) {
    alert("Please switch to the Mumbai Polygon Test Network in MetaMask. The page will refresh automatically after switching.");
    return;
  }
  console.log("Connected to Mumbai");

  // AT THIS POINT, THE USER SHOULD BE SUCCESSFULLY CONNECTED TO THE DAPP

  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  // (REQUIRED) Connect the signer to the contract
  const contractWithSigner = contract.connect(signer);

  // Display the address of the signed-in wallet
  const signerAddress = await signer.getAddress();
  console.log(`Connected Wallet: ${signerAddress}`);





  //----------------------------------------------------//
  //-----------ADD YOUR CODE BELOW THIS LINE------------//
  //----------------------------------------------------//

  // when I click on the setText button...
  $('#submit').click(function () {
    destroyedPhrase();
  })


  listDestroyedItems();


  function destroyedPhrase() {
    // grab the user input from the input text box
    const textToSet = $('#textInput').val();

    // pass the converted text to number in the contract
    contractWithSigner.destroyedPhrase(textToSet);
  }


  async function listDestroyedItems() {

    // $('.destroyed').empty();
    const nameList = await contract.getNames();
    
    console.log(nameList);

    const listLength = nameList.length;

    nameList.forEach(name => {
      let newName =
        `<div class="images__card">
        <img src="img/cocoonfinal2.jpg" alt="#">
        <h2>Cocoon</h2>
        <p>${name}</p>
      </div>`

      $('.images__container').append(newName);
    })
  }


  contract.on("nameSetEvent", (message, newName) => {
    console.log(newName);
    const nameNode =
      `<div class="images__card">
  <img src="img/cocoonfinal2.jpg" alt="cocoon">
  <h2>Cacoon</h2>
  <p>${newName}</p>
</div>`

    console.log(nameNode);
    $('.images__container').append(nameNode);

  })

}