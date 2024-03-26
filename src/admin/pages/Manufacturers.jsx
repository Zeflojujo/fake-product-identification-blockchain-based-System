import Header from "../layouts/AdminHeader"
import Sidebar from "../layouts/AdminSidebar"
import {
    useGlobalState,
    setGlobalState,
    setLoadingMsg,
    setAlert,
} from '../../store'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
//   import { create } from 'ipfs-http-client'
import Retailer from "../../assets/wine-retailer.jpg"
import Alert from "../../+homedirectory/components/Alert"
import Loading from "../../+homedirectory/components/Loading"
import ManufacturersTable from "../components/ManufacturersTable"


const Manufacturers = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const [modal] = useGlobalState('modal')
    // const [ipfsHash, setIpfsHash] = useState("")


    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
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
                <div className="flex flex-col justify-center items-center mx-auto">
                    {/* Manufacturers Header component is included */}

                    <div className="flex flex-col justify-center items-center mx-1 md:mx-4 overflow-hidden z-0 my-11">
                        {/* Manufacturers RetailerTable component is included */}
                        <div className="w-4/5">
                            <ManufacturersTable />
                            <Alert />
                            <Loading />
                        </div>

                        {/* <RetailerTable data={data} className="dark:bg-gray-900" /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manufacturers


