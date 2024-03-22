// import React, { useEffect, useState } from "react"
// import Header from "../inc/Header"
// import Sidebar from "../inc/Sidebar"
// import { Formik, Form, Field, ErrorMessage } from "formik"
// import * as Yup from "yup"
// import { Link } from "react-router-dom"
// import { IoMdArrowRoundBack } from "react-icons/io"
// import swal from "sweetalert"
// import retailerContract from "../../abis/QrCode.json"
// import Web3 from "web3"

// const Modal = () => {
//     const [isSidebarOpen, setSidebarOpen] = useState(false)
//     const [name, setName] = useState("")
//     const [location, setLocation] = useState("")
//     const [address, setAddress] = useState("")
//     const [ipfsHash, setIpfsHash] = useState("")

//     const [web3, setWeb3] = useState("")
//     //   const [data, setData] = useState("");

//     const toggleSidebar = () => {
//         setSidebarOpen(!isSidebarOpen)
//     }
//     //   componentWillMount() {
//     //    console.log("hellow world");
//     //   };

//     useEffect(() => {
//         const init = async () => {
//             if (window.ethereum) {
//                 try {
//                     // Request MetaMask account access
//                     await window.ethereum.request({ method: "eth_requestAccounts" })

//                     // Create a new web3 instance
//                     const web3Instance = new Web3(window.ethereum)
//                     setWeb3(web3Instance)
//                 } catch (error) {
//                     console.error(`User denied account access `)
//                 }
//             } else {
//                 console.error("Please install MetaMask")
//             }
//         }
//         init()
//     }, [])

//     const handleRegisterRetailer = async (event) => {
//         try {
//             const abi = retailerContract.abi
//             const contractAddress = retailerContract.networks[5777].address

//             const contract = new web3.eth.Contract(abi, contractAddress)

//             const selectedAccount = await web3.eth.getCoinbase()
//             await contract.methods
//                 .addRetailer(name, address, location, ipfsHash)
//                 .send({ from: selectedAccount, gas: 1000000 })
//             swal({
//                 title: "Good job!",
//                 text: "Woop woop! Retailer is registered successfully!!!",
//                 icon: "success",
//                 button: "Aww yess!",
//             })

//             window.location.href = "/user/login"

//             setName("")
//             setAddress("")
//             setLocation("")
//             setIpfsHash("")
//         } catch (error) {
//             // if(error.message.includes("Only admin can perform this action")){
//             //   const errorMessage = "Someone is trying to register voter but fails";
//             //   setErrorMessage(errorMessage);
//             //   setErrorMessageOpen(true);
//             //   }
//             // if(error.message.includes("Voter is already registered")){
//             //   const errorMessage = "Voter is already registered!!!";
//             //   setErrorMessage(errorMessage);
//             //   setErrorMessageOpen(true);
//             // }
//             // if (error.message.includes("Invalid year of Study")) {
//             //   const errorMessage = "Invalid year of Study. Please check your inputs.";
//             //   setErrorMessage(errorMessage);
//             //   setErrorMessageOpen(true);
//             // }

//             console.error("Error:", error.message)
//         }
//     }

//     const initialValues = {
//         name: "",
//         location: "",
//         address: "",
//         ipfsHash: "",
//     }

//     const validationSchema = Yup.object().shape({
//         name: Yup.string().required("Name is required"),
//         location: Yup.string().required("Location is required"),
//         address: Yup.string().required("Address is required"),
//         ipfsHash: Yup.string().required("ipfsHash is required"),
//     })

//     const handleSubmit = (values, { setSubmitting }) => {
//         // Perform registration or login (this is where you would send data to the server)
//         console.log("Authentication successful!", values)
//         // setData(values);
//         setName(values.name)
//         setLocation(values.location)
//         setAddress(values.address)
//         setIpfsHash(values.ipfsHash)

//         setSubmitting(false)
//         if (!name === "" && !location === "" && !address === "" && !ipfsHash === "") {
//             handleRegisterRetailer()
//         }
//     }

//     return (
//         <div className="flex min-h-screen dark:bg-[#212936] dark:text-gray-300">
//             {/* Manufacturers Sidebar component is included */}
//             <div className="fized">
//                 <Sidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
//             </div>
//             <div className="flex flex-col w-full gap-y-4 text-3xl semibold h-full">
//                 <div className="mb-16">
//                     {/* Manufacturers Header component is included */}
//                     <Header toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
//                 </div>

//                 {/* Manufactuerers ViewFakeProduct page should be created here */}
//                 <div className="flex flex-col justify-center items-center mx-auto w-full">
//                     {/* Manufacturers Header component is included */}
//                     <Link
//                         to="/retailers"
//                         className="px-4 py-2.5 flex float-start bg-blue-600 font-medium text-sm text-white leading-tight uppercase rounded-md shadow-md shadow-gray-400
//             hover:bg-blue-700 active:bg-blue-800 transition duration-150 ease-in-out dark:text-blue-500 dark:border dark:border-blue-500 
//             dark:bg-transparent dark:shadow-transparent space-x-2 items-center dark:active:bg-blue-500 dark:active:text-white"
//                     >
//                         <IoMdArrowRoundBack size={24} />{" "}
//                         <span className="text-lg dark:text-gray-500">BACK</span>
//                     </Link>

//                     <div
//                         className={`w-4/5 px-4  md:w-3/4 lg:w-1/2 mt-8 flex-col items-center justify-center shadow-md bg-gray-100 dark:bg-transparent dark:border dark:border-blue-500 dark:shadow-md dark:rounded-md dark:shadow-gray-400`}
//                     >
//                         <h2 className="text-1xl md:text-3xl font-bold mt-4 pt-3">
//                             Register Retailer
//                         </h2>
//                         <hr className="w-full dark:border-gray-500 dark:h-1 mt-6" />

//                        
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Modal

import Header from "../inc/Header"
import Sidebar from "../inc/Sidebar"
import {
  useGlobalState,
  setGlobalState,
  setLoadingMsg,
  setAlert,
} from '../../store'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
//   import { create } from 'ipfs-http-client'
import { registerRetailer } from '../../BlockchainService'
import Donate from "../../assets/blood-donation.jpg"
// import { Link } from "react-router-dom"
import Alert from "../../+homedirectory/components/Alert"
import Loading from "../../+homedirectory/components/Loading"
import RetailerTable from "../components/RetailerTable"


const RegisterRetailer = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [modal] = useGlobalState('modal')
    // const [ipfsHash, setIpfsHash] = useState("")

  const [retailer, setRetailer] = useState({
    publicAddress: "",
    name: "",
    location:"",
    email: ""
  });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  const handleAddRetailerModel = () => {
    setGlobalState('modal', 'scale-100')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!retailer.publicAddress || !retailer.name || !retailer.location || !retailer.email) return

    setGlobalState('modal', 'scale-0')
    setGlobalState('loading', { show: true, msg: 'Registering retailer...' })

    try {

      setLoadingMsg('Intializing transaction...')
      const password = "12345678"
      const result = await registerRetailer({ publicAddress: retailer.publicAddress, name: retailer.name, location: retailer.location, email: retailer.email, password })

      if (result) {
        resetForm()
        setAlert('Registration completed...', 'green')
      } else {
        throw Error
      }

    } catch (error) {
      console.log('Error uploading file: ', error)
      setAlert('Donor Registration failed...', 'red')
    }
  }


  const closeModal = () => {
    setGlobalState('modal', 'scale-0')
    resetForm()
  }

  const resetForm = () => {
    setRetailer({
        publicAddress: "",
        name: "",
        location:"",
        email: ""
    })
  }

  return (
    <div className="flex min-h-screen dark:bg-[#212936] dark:text-gray-300">
      {/* Manufacturers Sidebar component is included */}
      <div className="relative">
        <Sidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
      </div>
      <div className="flex flex-col w-full gap-y-4 text-3xl semibold h-full">
        <div className="mb-16">
          {/* Manufacturers Header component is included */}
          <Header toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
        </div>

        {/* Manufactuerers ViewFakeProduct page should be created here */}
        <div className="flex flex-col justify-center items-center mx-auto w-full">
          {/* Manufacturers Header component is included */}

          <div className="flex flex-col justify-center items-center mx-1 md:mx-4 overflow-hidden z-0 my-11 w-full">
            {/* Manufacturers RetailerTable component is included */}
            <div className="w-4/5">
              <button
                onClick={handleAddRetailerModel}
                className="bg-blue-500 mb-3 text-lg float-end text-white dark:bg-transparent hover:text-white dark:shadow-md dark:shadow-light-white dark:border dark:border-blue-500 dark:text-gray-500 hover:bg-blue-700  font-bold py-2 px-4 rounded-lg top-4 right-4"
              >
                Add Retailer
              </button>
              <RetailerTable />
              <Alert />
              <Loading />
            </div>

            {/* <RetailerTable data={data} className="dark:bg-gray-900" /> */}
          </div>





          <div
            className={`fixed top-0 left-0 w-screen h-screen flex items-center
          justify-center bg-black bg-opacity-50 transform
          transition-transform duration-300 ${modal}`}
          >
            <div className="shadow-xl rounded-xl w-11/12 md:w-2/5 h-7/12 p-6 bg-gray-100 shadow-blue-600 dark:bg-[#151c25] dark:shadow-blue-600">
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="flex flex-row justify-between items-center">
                  <p className="font-semibold text-gray-400">Register Retailer</p>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="border-0 bg-transparent focus:outline-none"
                  >
                    <FaTimes className="text-gray-400" />
                  </button>
                </div>

                <div className="flex flex-row justify-center items-center rounded-xl mt-5">
                  <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
                    <img
                      alt="NFT"
                      className="h-full w-full object-cover cursor-pointer"
                      src={Donate}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <input
                    className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                    type="text"
                    name="publicAddress"
                    placeholder="publicAddress"
                    onChange={(e) => setRetailer({ ...retailer, publicAddress: e.target.value})}
                    value={retailer.publicAddress}
                    required
                  />
                </div>

                <div className="mt-4">
                  <input
                    className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                    type="text"
                    name="name"
                    placeholder="name"
                    onChange={(e) => setRetailer({...retailer, name: e.target.value})}
                    value={retailer.name}
                    required
                  />
                </div>

                <div className="mt-4">
                  <input
                    className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                    type="location"
                    name="location"
                    placeholder="location"
                    onChange={(e) => setRetailer({...retailer, location: e.target.value})}
                    value={retailer.location}
                    required
                  />
                </div>

                <div className="mt-4">
                  <input
                    className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                    type="number"
                    name="email"
                    placeholder="email"
                    onChange={(e) => setRetailer({...retailer, email: e.target.value})}
                    value={retailer.email}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="flex flex-row justify-center items-center
                w-full text-white text-base md:text-lg bg-blue-700
                hover:bg-[#bd255f] py-2 px-5 rounded-lg
                drop-shadow-xl border border-transparent
                hover:bg-transparent hover:text-blue-800
                hover:border hover:border-blue-700
                focus:outline-none focus:ring mt-5"
                >
                  Register
                </button>
              </form>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default RegisterRetailer


