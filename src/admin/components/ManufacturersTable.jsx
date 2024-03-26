import React, { useState, useEffect } from 'react';
// import swal from 'sweetalert';
import { setAlert, setGlobalState, setLoadingMsg, useGlobalState } from '../../store'
import { verifyManufacturer } from '../../BlockchainService'
import { MdDelete } from 'react-icons/md';
import { FaRegTimesCircle } from 'react-icons/fa';
import { TbAdjustmentsCancel, TbTopologyStar3 } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

const ManufacturersTable = () => {
    const [manufacturers] = useGlobalState("manufacturers")
    const [hoveredRow, setHoveredRow] = useState(null);
    const [allManufacturers, setAllManufacturers] = useState([]);
    const [end, setEnd] = useState(6);
    const [modal] = useGlobalState("modal");
    const [manufacturerAddress, setManufacturerAddress] = useState("");


    const handleMouseEnter = (rowIndex) => {
        setHoveredRow(rowIndex);
    };

    const handleMouseLeave = () => {
        setHoveredRow(null);
    };

    const handleVerifyManufacturerModel = (manufacturerPublicAddress) => {
        setGlobalState('modal', 'scale-100')
        setManufacturerAddress(manufacturerPublicAddress);
    }

    const closeModal = () => {
        setGlobalState('modal', 'scale-0')
        resetForm()
    }

    const resetForm = () => {
        setManufacturerAddress("");
    }

    const getManufacturers = () => {
        return manufacturers.slice(0, end)
    }

    useEffect(() => {
        setAllManufacturers(getManufacturers())
        console.log(manufacturers)
    }, [manufacturers, end])

    const handlerVerifyManufacturer = async (e) => {
        e.preventDefault()

        if (!manufacturerAddress) return

        setGlobalState('modal', 'scale-0')
        setGlobalState('loading', { show: true, msg: 'Verifying manufacturer...' })

        try {

            setLoadingMsg('Verifying manufacturer...')

            const result = await verifyManufacturer({ manufacturerAddress })

            if (result) {
                resetForm()
                setAlert('Verification is completed..!', 'green')
            } else {
                throw Error
            }

        } catch (error) {
            console.log('Error uploading file: ', error)
            setAlert('Manufacturer Verification failed...', 'red')
        }
    }

    return (
        <>

            <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">List of Manufacturers</h1>
            </div>

            <div className="pr-4">



                {/* <CreateNewsModal showModal={isModalOpen} closeModal={closeModal} /> */}


                <div className="shadow-md overflow-x-auto" style={{ zIndex: '-999' }}>
                    <table className="min-w-full overflow-x-auto  bg-white border-b border-gray-700 dark:bg-[#212936] dark:text-gray-300 dark:border-gray-700">
                        <thead className='bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900 dark:gray-300'>
                            <tr className='border-none'>
                                <th className="py-2 px-4 border-b text-center text-lg">S/N</th>
                                <th className={`py-2 px-4 border-b text-center text-lg uppercase`}>ManPublicAddress</th>
                                <th className={`py-2 px-4 border-b text-center text-lg uppercase`}>FullName</th>
                                <th className={`py-2 px-4 border-b text-center text-lg uppercase`}>Email</th>
                                <th className={`py-2 px-4 border-b text-center text-lg uppercase`}>Brand</th>
                                <th className={`py-2 px-4 border-b text-center text-lg uppercase`}>LicenseUri</th>
                                <th className={`py-2 px-4 border-b text-center text-lg uppercase`}>Country</th>
                                <th className={`py-2 px-4 border-b text-center text-lg uppercase`}>Region</th>
                                <th className={`py-2 px-4 border-b text-center text-lg uppercase`}>State</th>
                                <th className={`py-2 px-4 border-b text-center text-lg uppercase`}>Agreement</th>
                                <th className={`py-2 px-4 border-b text-center text-lg uppercase`}>IsVerified</th>

                                <th className="py-2 px-4 border-b text-center text-lg flex col-span-2 justify-center uppercase">Actions</th>
                                <th className="py-2 px-4 border-b text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {allManufacturers.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="flex justify-center col-span-8 items-center mx-auto py-4 px-4 text-gray-700 text-base border-b dark:text-gray-500">
                                        No Record Found
                                    </td>
                                </tr>
                            ) : (

                                allManufacturers.map((manufacturer, index) => (
                                    <tr
                                        key={index}
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{index + 1}</td>
                                        <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{manufacturer.manPublicAddress}</td>
                                        <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{manufacturer.fullName}</td>
                                        <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{manufacturer.email}</td>
                                        <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{manufacturer.brand}</td>
                                        <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{manufacturer.licenseUri}</td>
                                        <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{manufacturer.country}</td>
                                        <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{manufacturer.region}</td>
                                        <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{manufacturer.state}</td>
                                        <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{manufacturer.agreement.toString()}</td>
                                        <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{manufacturer.isVerified.toString()}</td>

                                        <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => handleVerifyManufacturerModel(manufacturer.manPublicAddress)} className='border border-solid bg-orange-400 hover:bg-orange-500 active:bg-orange-400 px-3 py-1 border-r-2 text-white dark:bg-transparent flex items-center gap-1 dark:text-gray-500 dark:border-orange-500'><IoMdCheckmarkCircleOutline size={17} />Verify</button></td>
                                        <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 gap-1 flex items-center dark:border-red-500'><MdDelete size={17} />Delete</button></td>
                                        {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => UpdataNewsHandler(item.id)} className='border border-solid bg-cyan-400 hover:bg-cyan-600 active:bg-cyan-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-cyan-400'>Update</button></td> */}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div
                    className={`fixed top-0 left-0 w-screen h-screen flex items-center
                        justify-center bg-black bg-opacity-50 transform
                        transition-transform duration-300 ${modal}`}
                >
                    <div className="shadow-xl rounded-xl w-11/12 md:w-2/5 h-7/12 p-6 bg-gray-100 shadow-blue-400 dark:bg-[#151c25] dark:shadow-[#e32970]">

                        <form className="flex flex-col" onSubmit={handlerVerifyManufacturer}>
                            <div className="flex flex-row justify-between items-center">
                                {/* <p className="font-semibold text-gray-400">Complete Blood Checking</p> */}
                                <h2 className="flex justify-center mx-auto w-full items-center text-red-500 rounded-full text-1xl md:text-3xl font-bold mt-4 pt-3">
                                    <FaRegTimesCircle className="text-red-400 text-5xl" />
                                </h2>
                            </div>

                            <div className="mt-4">
                                <input
                                    className="hidden mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                    type="text"
                                    name="manufacturerAddress"
                                    value={manufacturerAddress}
                                    disabled
                                    required
                                />
                            </div>

                            <div className="mt-4">
                                <span className="block text-1xl font-bold text-center font-medium text-gray-600 dark:text-gray-300">
                                    Are you sure?
                                </span>
                                <span className="block text-[20px] mt-3 text-center font-medium text-gray-600 dark:text-gray-300">
                                    You want to verify this manufacturer
                                </span>
                            </div>

                            <div className="flex gap-2">

                                <button
                                    type="submit"
                                    className="w-3/4 flex gap-1 items-center text-white justify-center bg-blue-500 hover:bg-blue-600 
                                        focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 
                                        py-2.5 text-center me-2 dark:bg-[#e32970] dark:hover:bg-[#bd255f] 
                                        dark:focus:ring-[#bd255f] inline-flex items-center w-full mt-5"
                                >
                                    <TbTopologyStar3 size={17} />
                                    verify
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="w-1/4 flex items-center gap-1 text-white justify-center bg-orange-400 hover:bg-orange-500 
                                        focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-lg px-5 
                                        py-2.5 text-center me-2 dark:bg-orange-400 dark:hover:bg-orange-500 
                                        dark:focus:ring-orange-300 inline-flex items-center w-full mt-5"
                                >
                                    <TbAdjustmentsCancel size={17} />
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            </div>

        </>

    );
};

export default ManufacturersTable;
