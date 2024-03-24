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

    const contract = getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods.verifyManufacturer(manufacturerAddress).send({from: account, gas: 1000000});
    
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

  //retrieve data array from smartcontract
  const dataRetrieved = await retrieveManufacturerData();
  console.log("retrieved Data: ", dataRetrieved);

  const qrCodeHash = CryptoJS.SHA1(dataRetrieved.join("") + Math.random()).toString()

  try {
    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    for(let i=0; i<numberOfQrCode; i++) {
      await contract.methods.storeQrHash(qrCodeHash).send({from: account, gas: 1000000})
    }

    return true;
    
  } catch (error) {
    console.log(error.message)
  }
}

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
    
        if (manufacturerArray.length === 0) {
          console.log("NO DATA");
        }
    
        for (let i = 0; i < manufacturerArray.length; i++) {
          const manufacturerAddress = manufacturerArray[i];

          const _manufacturer = await contract.methods.getManufacturer(manufacturerAddress).call();
          console.log("let me see manufacturer details: ",_manufacturer);

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
          console.log("let me see manufacturer details: ", manufacturerData);

        setGlobalState("manufacturer", manufacturerData);
        return manufacturerData;
      } catch (error) {
        console.log(error);
      }
    };

//   const deleteDonor = async ({ publicAddress }) => {
//     try {
//       const contract = await getEtheriumContract();
//       const account = getGlobalState("connectedAccount");
  
//       await contract.methods
//         .deleteDonor(publicAddress)
//         .send({ from: account, gas: 1000000 });
  
//       return true;
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

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
    displayManufacturersData
  };