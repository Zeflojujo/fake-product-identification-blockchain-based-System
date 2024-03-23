import { useEffect, useState } from 'react'
import { setGlobalState, useGlobalState } from '../../store'
import Manufacturer from "../../assets/manufacturer.jpg"
import Manufacturer02 from "../../assets/manufacturer02.jpg"
import Retailer from "../../assets/wine-retailer.jpg"
import Production from "../../assets/wine-production.jpg"
import Customer from "../../assets/qr-code.png"
import { Link } from 'react-router-dom'
import { FaAngleDoubleRight } from 'react-icons/fa'

const Categories = () => {
    // const [count] = useState(4)

    return (
        <div className="bg-[#151c25] gradient-bg-artworks">
            <div className="w-4/5 py-10 mx-auto">
                <h4 className="flex justify-center text-white text-3xl font-bold uppercase text-gradient">
                    Fake Product Identification System Categories
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5">

                    <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
                        <img
                            src={Manufacturer}
                            alt="manufacturerImage"
                            className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
                        />
                        <h4 className="text-white font-semibold">System Owner</h4>
                        <p className="text-gray-400 text-xs my-1">Collect blood units from Donors and ship it to the Authorized Medical Center</p>
                        <div className="flex justify-center items-center mt-3 text-white">
                            <Link
                                to="/admin/login"
                                className="flex justify-center items-center gap-2 shadow-lg shadow-black text-white text-sm bg-[#e32970]
                  hover:bg-[#bd255f] cursor-pointer rounded-full px-4 py-1"
                            >
                                Sign In <FaAngleDoubleRight />
                            </Link>
                        </div>
                    </div>

                    <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
                        <img
                            src={Manufacturer02}
                            alt="SystemImage"
                            className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
                        />
                        <h4 className="text-white font-semibold">Manufacturer</h4>
                        <p className="text-gray-400 text-xs my-1">Donor who donate blood at the collection point</p>
                        <div className="flex justify-center items-center mt-3 text-white">
                            <Link
                                to="/manufacturer/login"
                                className="flex justify-center items-center gap-2 shadow-lg shadow-black text-white text-sm bg-[#e32970]
                  hover:bg-[#bd255f] cursor-pointer rounded-full px-4 py-1"
                            >
                                Sign In <FaAngleDoubleRight />
                            </Link>
                        </div>
                    </div>

                    <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
                        <img
                            src={Retailer}
                            alt="blood"
                            className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
                        />
                        <h4 className="text-white font-semibold">Retailer</h4>
                        <p className="text-gray-400 text-xs my-1">Places where the qrcode is generated and the retailer is working with!</p>
                        <div className="flex justify-center items-center mt-3 text-white">

                            <Link
                                to="/retailer/login"
                                className="flex justify-center items-center gap-2 shadow-lg shadow-black text-white text-sm bg-[#e32970]
                  hover:bg-[#bd255f] cursor-pointer rounded-full px-4 py-1"
                            //   onClick={setNFT}
                            >
                                Sign In <FaAngleDoubleRight />
                            </Link>
                        </div>
                    </div>

                    <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
                        <img
                            src={Customer}
                            alt="blood"
                            className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
                        />
                        <h4 className="text-white font-semibold">Customer</h4>
                        <p className="text-gray-400 text-xs my-1">Collect Blood Samples from the Authorized collection point and use it in need for patients</p>
                        <div className="flex justify-center items-center mt-3 text-white">
                            <Link
                                to="/customer"
                                className="flex justify-center items-center gap-2 shadow-lg shadow-black text-white text-sm bg-[#e32970]
                  hover:bg-[#bd255f] cursor-pointer rounded-full px-4 py-1"
                            >
                                Scann Now <FaAngleDoubleRight />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Categories
