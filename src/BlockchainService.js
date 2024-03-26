import Web3 from "web3";
import { setGlobalState, getGlobalState } from "./store";
import qrcodeAbi from "./abis/QrCode.json";
import CryptoJS from "crypto-js"

const { ethereum } = window;
window.web3 = new Web3(ethereum);
window.web3 = new Web3(window.web3.currentProvider);

const getEtheriumContract = async () => {
  const web3 = window.web3;
  const networkId = await window.web3.eth.net.getId();
  const networkData = qrcodeAbi.networks[networkId];

  if (networkData) {
    const contract = new web3.eth.Contract(qrcodeAbi.abi, networkData.address);
    return contract;
  } else {
    return null;
  }
};

const connectWallet = async () => {
  try {
    if (!ethereum) return console.log("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0].toLowerCase());
  } catch (error) {
    console.log(error);
  }
};

const isWallectConnected = async () => {
  try {
    if (!ethereum) return console.log("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0].toLowerCase());
      await isWallectConnected();
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0].toLowerCase());
    } else {
      setGlobalState("connectedAccount", "");
      reportError("Please connect wallet.");
    }
  } catch (error) {
    console.log(error);
  }
};

const signUpManufacturer = async ({
    publicAddress,
    fullName,
    email,
    brand,
    license,
    country,
    region,
    state,
    agreement,
    password
}) => {
  try {

    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");
    console.log("connectedAccount: ", account)

    const passwordHash = window.web3.utils.sha3(password);
    console.log("hashed password: ", passwordHash)

    await contract.methods.signUpManufacturer(
      publicAddress,
      fullName,
      email,
      brand,
      license,
      country,
      region,
      state,
      agreement,
      passwordHash
    ).send({from: account, gas: 1000000});

    return true;
    
  } catch (error) {
    console.log(error.message);
  }
}

const verifyManufacturer = async ({
  manufacturerAddress
}) => {
  try {

    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    console.log("manufacturer address: ", manufacturerAddress)

    await contract.methods.verifyManufacturer(manufacturerAddress).send({from: account, gas: 1000000});

    return true;
    
  } catch (error) {
    console.log(error.message)
  }
}

const registerRetailer = async ({
  publicAddress,
  name,
  location,
  email,
  password
}) => {
  try {
    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods.addRetailer(publicAddress, name, location, email, password).send({from: account, gas: 1000000})
    
    return true;
  } catch (error) {
      console.log(error.message)
  }
}

const generateQrCode = async ({
  numberOfQrCode
}) => {

  try {
    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    //retrieve data array from smartcontract
    const dataRetrieved = await retrieveManufacturerData();
    console.log("retrieved Data: ", dataRetrieved);

    for(let i=0; i<numberOfQrCode; i++) {

      const qrCodeHash = CryptoJS.SHA1(dataRetrieved + Math.random()).toString()
      console.log("qrCodeHash: ", qrCodeHash)

      await contract.methods.storeQrHash(qrCodeHash).send({from: account, gas: 1000000})
    }

    return true;
    
  } catch (error) {
    console.log(error.message)
  }
}

const deleteQrHash = async ({ publicAddress }) => {
  try {
    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .deleteQrHash(publicAddress)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error.message);
  }
};

const addProduct = async ({
  qrHash,
  blockId,
  productName,
  description
}) => {

  try {

    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods.addItemDetails(
      qrHash,
      blockId,
      productName,
      description
      ).send({ from: account, gas: 1000000 })

      return true
      
    } catch (error) {
      console.log(error.message)
    }

}

//     numberOfQrCode,
//     }) => {
//       try {
//         const contract = await getEtheriumContract();
//         const account = getGlobalState("connectedAccount");

//         //retrieve data array from smartcontract
//         const dataRetrieved = await retrieveManufacturerData();
//         console.log("retrieved Data: ", dataRetrieved);

//         let nonce = await window.web3.eth.getTransactionCount(account);
        
//         for(let i=0; i<numberOfQrCode; i++) {

//           const qrCodeHash = CryptoJS.SHA1(dataRetrieved + Math.random()).toString()
//           console.log("qrCodeHash: ", qrCodeHash)

//             // Get the nonce for the account
      
//           // Create a transaction object with the method data
//           const transactionObject = contract.methods.storeQrHash(qrCodeHash);
      
//           const gasEstimate = await transactionObject.estimateGas();
      
//           // Get the gas price
//           const gasPrice = await window.web3.eth.getGasPrice();
      
//           // Create a raw transaction
//           const rawTransaction = {
//             nonce: window.web3.utils.toHex(nonce),
//             gasLimit: window.web3.utils.toHex(gasEstimate),
//             gasPrice: window.web3.utils.toHex(gasPrice),
//             to: contract.options.address,
//             data: transactionObject.encodeABI(),
//           };
      
//           // Sign the transaction
//           const signedTransaction = await window.web3.eth.accounts.signTransaction(
//             rawTransaction,
//             "0x5bf5cb62ea74e5ca51cd682390d1ba3a411941de75c3357a10effbc4b32b003e" // Replace privateKey with the private key of the account
//           );

      
//           // Send the signed transaction
//           const receipt = await window.web3.eth.sendSignedTransaction(
//             signedTransaction.rawTransaction
//           );
      
//           console.log("QrCode generation receipt: ", receipt);

//           // Increment the nonce for the next transaction
//           nonce++;

//         }
    
//         // Handle success
//         return true;
//       } catch (error) {
//         // Handle errors
//         if (
//           error.message.includes("Only collection point can perform this action")
//         ) {
//           const errorMessage = "Please, Login with administrator wallet account";
//           setGlobalState("donorError", errorMessage);
//         } else if (error.message.includes("Donor is already registered")) {
//           const errorMessage = "Donor is already registered";
//           setGlobalState("donorError", errorMessage);
//         } else if (error.message.includes("Invalid public address")) {
//           const errorMessage = "Invalid publicAddress or Password";
//           setGlobalState("donorError", errorMessage);
//         } else {
//           setGlobalState("smartcontractError", "Donor Registration Failed");
//         }
//       }
//     };

const systemOwnerLogin = async ({ publicAddress, password }) => {
  try {
    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .systemOwnerLogin(publicAddress, password)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error);
  }
};

const manufacturerLogin = async ({ publicAddress, password }) => {
  try {
    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    const passwordHash = window.web3.utils.sha3(password);

    await contract.methods.manufacturerLogin(publicAddress, passwordHash).send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error);
  }
};

const displayManufacturersData = async () => {
      try {
        // if (!ethereum) return console.log("Please install Metamask");
    
        const contract = await getEtheriumContract();
        const account = getGlobalState("connectedAccount");
    
        const manufacturerArray = await contract.methods.getManufacturerArray().call();
    
        const manufacturersData = [];
        // console.log("manufacturerArray: ", manufacturerArray)
    
        if (manufacturerArray.length === 0) {
          console.log("NO DATA");
        }
    
        for (let i = 0; i < manufacturerArray.length; i++) {
          const manufacturerAddress = manufacturerArray[i];

          const _manufacturer = await contract.methods.getManufacturer(manufacturerAddress).call();
          // console.log("let me see manufacturer details: ",_manufacturer);

          manufacturersData.push(_manufacturer);
        }
    
        setGlobalState("manufacturers", manufacturersData);
      } catch (error) {
        console.log(error);
      }
    };

    const retrieveManufacturerData = async () => {
      try {
        // if (!ethereum) return console.log("Please install Metamask");
    
        const contract = await getEtheriumContract();
        const manufacturerAddress = getGlobalState("connectedAccount");

          const manufacturerData = await contract.methods.getManufacturer(manufacturerAddress).call();
          // console.log("let me see manufacturer details: ", manufacturerData);

        setGlobalState("manufacturer", manufacturerData);
        return manufacturerData;
      } catch (error) {
        console.log(error);
      }
    };

    const displayQrCodeData = async () => {
      try {
        // if (!ethereum) return console.log("Please install Metamask");
    
        const contract = await getEtheriumContract();
        const account = getGlobalState("connectedAccount");
    
        const qrCodeHashArray = await contract.methods.getManfItemIDList().call();
    
        const qrCodeData = [];
        console.log("QrCodeData: ", qrCodeHashArray)
    
        if (qrCodeHashArray.length === 0) {
          console.log("NO DATA");
        }
    
        for (let i = 0; i < qrCodeHashArray.length; i++) {
          const qrCodeHashID = qrCodeHashArray[i];

          const _qrCodeHash = await contract.methods.getQrHashAndID(account, qrCodeHashID).call();
          console.log("let me see qrCode details: ",_qrCodeHash);

          if ( _qrCodeHash.qrHash !== "" ) {
              qrCodeData.push(_qrCodeHash);
            }
        }
    
        setGlobalState("qrCodes", qrCodeData);
      } catch (error) {
        console.log(error);
      }
    };

    const displayProducts = async () => {
      try {
        // if (!ethereum) return console.log("Please install Metamask");
    
        const contract = await getEtheriumContract();
        const account = getGlobalState("connectedAccount");
    
        // const productsArray = await contract.methods.getProductsArray().call();
        const productsArray =[1,2,3,4,5,67,7]
    
        const productsData = [];
        // console.log("productsArray: ", productsArray)
    
        if (productsArray.length === 0) {
          console.log("NO DATA");
        }
    
        for (let i = 0; i < productsArray.length; i++) {
          const productId = productsArray[i];

          // const _product = await contract.methods.getProduct(productId).call();
          const _product = [1,2,3,4,5,6,7]
          // console.log("let me see product details: ",_product);

          productsData.push(_product);
        }
    
        setGlobalState("products", productsData);
      } catch (error) {
        console.log(error);
      }
    }

    const displayDetailsForScannedItem = async (qrHash) => {
      try {
        // if (!ethereum) return console.log("Please install Metamask");
    
        const contract = await getEtheriumContract();
        const medicalCenterAddress = getGlobalState("connectedAccount");
    
        const detailsForScannedItem = await contract.methods
          .moreDetailsForScannedItem(qrHash)
          .call();
        // console.log("Medical Center :", _medicalCenter);
    
        setGlobalState("detailsForScannedItem", detailsForScannedItem);
      } catch (error) {
        console.log(error);
      }
    };

    const scanItem = async (qrHash) => {
      try {
        const contract = await getEtheriumContract();
        const account = getGlobalState("connectedAccount");

        console.log("qrHash passed is: ", qrHash)
    
        const result = await contract.methods.scanItem(qrHash).call();
  
        console.log("scaned result: ", result)
    
        return result;
      } catch (error) {
        console.log(error.message);
      }
    };

  

  



  




  

//   const displayBloodSupplied = async () => {
//     try {
//       // if (!ethereum) return console.log("Please install Metamask");
  
//       const contract = await getEtheriumContract();
  
//       const transactionIdArray = await contract.methods
//         .getDonationTransactionArr()
//         .call();
  
//       console.log("list of transactionID", transactionIdArray);
  
//       const donationTransactionData = [];
  
//       if (transactionIdArray.length === 0) {
//         console.log("NO DATA");
//       }
  
//       for (let i = 0; i < transactionIdArray.length; i++) {
//         const transactionId = transactionIdArray[i];
//         // console.log(`the registration number is: ${voterRegNumber}`);
//         const _donationTransaction = await contract.methods
//           .getAllDonationTransaction(transactionId)
//           .call();
//         console.log(
//           "donation of blood for specific medical center: ",
//           _donationTransaction
//         );
//         if (
//           _donationTransaction.bloodTestResult === "ACCEPTED" &&
//           _donationTransaction.status === 1n && _donationTransaction.supplyStatus !== 2n && _donationTransaction.isSupplied === true
//         ) {
//           donationTransactionData.push(_donationTransaction);
//         }
//         console.log("Supplied Transaction :", donationTransactionData);
//       }
  
//       setGlobalState("bloodSupplied", donationTransactionData);
//     } catch (error) {
//       console.log(error);
//     }
//   };



export {
    connectWallet,
    isWallectConnected,
    systemOwnerLogin,
    manufacturerLogin,
    signUpManufacturer,
    verifyManufacturer,
    registerRetailer,
    generateQrCode,
    addProduct,
    deleteQrHash,
    scanItem,
    displayManufacturersData,
    displayQrCodeData,
    displayProducts,
    displayDetailsForScannedItem
  };