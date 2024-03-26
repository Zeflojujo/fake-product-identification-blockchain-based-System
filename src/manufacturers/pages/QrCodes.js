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
import { generateQrCode } from '../../BlockchainService'
import Manufacturer from "../../assets/manufacturer.jpg"
import Alert from "../../+homedirectory/components/Alert"
import Loading from "../../+homedirectory/components/Loading"
import QrCodeTable from "../components/QrCodeTable"
import { RiAiGenerate } from "react-icons/ri";
import { VscGitPullRequestCreate } from "react-icons/vsc";


const QrCodes = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [modal] = useGlobalState('modal')
    // const [ipfsHash, setIpfsHash] = useState("")

  const [numberOfQrCode, setNumberOfQrCode] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  const handleGenerateQrCodeModel = () => {
    setGlobalState('modal', 'scale-100')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!numberOfQrCode ) return

    setGlobalState('modal', 'scale-0')
    setGlobalState('loading', { show: true, msg: 'Generating QrCodes...' })

    try {

      setLoadingMsg('Generating QrCodes...')
      const result = await generateQrCode({ numberOfQrCode })

      if (result) {
        resetForm()
        setAlert('QrCodes generated successfully...', 'green')
      } else {
        throw Error
      }

    } catch (error) {
      console.log('Error generating qrcode: ', error)
      setAlert('QrCode generation failed...', 'red')
    }
  }


  const closeModal = () => {
    setGlobalState('modal', 'scale-0')
    resetForm()
  }

  const resetForm = () => {
    setNumberOfQrCode("")
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
            {/* Manufacturers ManufacturerTable component is included */}
            <div className="w-4/5">
              <button
                onClick={handleGenerateQrCodeModel}
                className="flex items-center gap-2 bg-blue-500 mb-3 text-lg float-end text-white dark:bg-transparent hover:text-white dark:shadow-md dark:shadow-light-white dark:border dark:border-blue-500 dark:text-gray-500 hover:bg-blue-700  font-bold py-2 px-4 rounded-lg top-4 right-4"
              >
                <VscGitPullRequestCreate />Generate QrCode
              </button>
              <QrCodeTable />
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
                  <p className="font-semibold text-gray-400">Generate QrCode</p>
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
                      src={Manufacturer}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <input
                    className="mt-1 px-3 py-1.5 text-gray-300 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                    type="number"
                    name="numberOfQrCode"
                    placeholder="Enter No. of QrCod to generate"
                    onChange={(e) => setNumberOfQrCode(e.target.value)}
                    value={numberOfQrCode}
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

export default QrCodes



