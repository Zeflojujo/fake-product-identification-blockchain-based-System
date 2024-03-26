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
import Retailer from "../../assets/wine-retailer.jpg"
import Alert from "../../+homedirectory/components/Alert"
import Loading from "../../+homedirectory/components/Loading"
import RetailerTable from "../components/RetailerTable"


const Retailers = () => {
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
    <div className="overflow-hidden flex min-h-screen dark:bg-[#212936] dark:text-gray-300">
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
                      src={Retailer}
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
                    className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-base text-gray-700 bg-clip-padding"
                    type="text"
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
                    type="text"
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

export default Retailers


