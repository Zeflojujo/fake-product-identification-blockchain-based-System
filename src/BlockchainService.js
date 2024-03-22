import Web3 from "web3";
import { setGlobalState, getGlobalState } from "./store";
import abi from "./abis/QrCode.json";

const { ethereum } = window;
window.web3 = new Web3(ethereum);
window.web3 = new Web3(window.web3.currentProvider);

const getEtheriumContract = async () => {
  const web3 = window.web3;
  const networkId = await window.web3.eth.net.getId();
  const networkData = abi.networks[networkId];

  if (networkData) {
    const contract = new web3.eth.Contract(abi.abi, networkData.address);
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

// const addDonor = async ({
//     publicAddress,
//     name,
//     age,
//     weight,
//     gender,
//     phoneNumber,
//     password,
//   }) => {
//     try {
//       const contract = await getEtheriumContract();
//       const account = getGlobalState("connectedAccount");
  
//       await contract.methods
//         .addDonor(publicAddress, name, age, weight, gender, phoneNumber, password)
//         .send({ from: account, gas: 1000000 });
  
//       return true;
//     } catch (error) {
//       if (
//         error.message.includes("Only collection point can perform this action")
//       ) {
//         const errorMessage = "Please, Login with administrator wallet account";
//         setGlobalState("donorError", errorMessage);
//       } else if (error.message.includes("Donor is already registered")) {
//         const errorMessage = "Donor is already registered";
//         setGlobalState("donorError", errorMessage);
//       } else if (error.message.includes("Invalid public address")) {
//         const errorMessage = "Invalid publicAddress or Password";
//         setGlobalState("donorError", errorMessage);
//       } else {
//         setGlobalState("smartcontractError", "Donor Registration Failed");
//       }
//     }
//   };

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

//   const medicalCenterLogin = async ({ publicAddress, password }) => {
//     try {
//       const contract = await getEtheriumContract();
//       const account = getGlobalState("connectedAccount");
  
//       await contract.methods
//         .medicalCenterLogin(publicAddress, password)
//         .send({ from: account, gas: 1000000 });
  
//       return true;
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   const displayMedicalRecord = async () => {
//     try {
//       if (!ethereum) return console.log("Please install Metamask");
  
//       const contract = await getEtheriumContract();
//       const account = getGlobalState("connectedAccount");
  
//       const medicalRecordIdArray = await contract.methods
//         .getMedicalRecordsArr()
//         .call();
  
//       const medicalRecordData = [];
  
//       if (medicalRecordIdArray.length === 0) {
//         console.log("NO DATA");
//       }
  
//       for (let i = 0; i < medicalRecordIdArray.length; i++) {
//         const medicalRecordId = medicalRecordIdArray[i];
//         // console.log(`the registration number is: ${voterRegNumber}`);
//         const _donationTransaction = await contract.methods
//           .getMedicalRecord(account, medicalRecordId)
//           .call();
//         console.log(
//           "let me see donationTransaction details: ",
//           _donationTransaction.medicalRecordID
//         );
//         if (_donationTransaction.medicalRecordID !== 0n) {
//           medicalRecordData.push(_donationTransaction);
//         }
//         // console.log("Donation Transaction :", _donationTransaction);
//       }
  
//       setGlobalState("medicalRecords", medicalRecordData);
//     } catch (error) {
//       console.log(error);
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
    systemOwnerLogin
  };