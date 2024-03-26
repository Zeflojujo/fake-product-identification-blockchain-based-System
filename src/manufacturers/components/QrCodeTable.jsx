import React, { useState, useEffect } from 'react';
// import swal from 'sweetalert';
import { useGlobalState } from '../../store'
import swal from 'sweetalert';
// import { deleteDonor } from '../../BlockchainService';
import { MdDelete } from 'react-icons/md';
import QRCode from "qrcode.react"
import { PiDownloadSimpleDuotone } from "react-icons/pi"
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const QrCodeTable = () => {
  const [qrCodes] = useGlobalState("qrCodes");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [allQrCodes, setAllQrCodes] = useState([])
  const [end, setEnd] = useState(5)


  const handleMouseEnter = (rowIndex) => {
    setHoveredRow(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const getQrCodes = () => {
    return qrCodes.slice(0, end)
  }

  useEffect(() => {
    setAllQrCodes(getQrCodes())
    console.log(qrCodes)
  }, [qrCodes, end])

  function handleLoadMore() {
    setEnd(end + 5)
  }

  const downloadQRCode = () => {
    const qrCodeURL = document
      .getElementById("qrCodeEl")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream")
    console.log(qrCodeURL)
    let aEl = document.createElement("a")
    aEl.href = qrCodeURL
    aEl.download = "QR_Code.png"
    document.body.appendChild(aEl)
    aEl.click()
    document.body.removeChild(aEl)
  }

  return (
    <>

      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">Qr-Code Data</h1>
      </div>

      <div className="p-4">

        <div className="shadow-md overflow-x-auto" style={{ zIndex: '-999' }}>
          <table className="min-w-full overflow-x-auto  bg-white border-b border-gray-700 dark:bg-[#212936] dark:text-gray-300 dark:border-gray-700">
            <thead className='bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900 dark:gray-300'>
              <tr className='border-none'>
                <th className="py-2 px-4 border-b text-center text-lg">S/N</th>
                <th className="py-2 px-4 border-b text-start text-lg uppercase">Qr-Code Id</th>
                <th className="py-2 px-4 border-b text-start text-lg uppercase">Qr-Code Hash</th>
                <th className="py-2 px-4 border-b text-start text-lg uppercase">Qr-Code </th>
                <th className="py-2 px-4 border-b text-start text-lg uppercase">Downloads </th>

                <th className="py-2 px-4 border-b text-center text-lg flex col-span-2 justify-center uppercase">Actions</th>
                <th className="py-2 px-4 border-b text-center"></th>
              </tr>
            </thead>
            <tbody>
              {allQrCodes.length === 0 ? (
                <tr>
                  <td colSpan={9} className="flex justify-center col-span-8 items-center mx-auto py-4 px-4 text-gray-700 text-base border-b dark:text-gray-500">
                    No Record Found
                  </td>
                </tr>
              ) : (

                allQrCodes.map((qrCode, index) => (
                  <tr
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{index + 1}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{qrCode.blockId.toString()} </td>
                    <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{qrCode.qrHash} </td>
                    <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>
                      <QRCode
                        id="qrCodeEl"
                        value={qrCode.qrHash}
                        size={50}
                        className="flex justify-center m-auto"
                      />
                    </td>
                    <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>
                      <button
                        onClick={downloadQRCode}
                        className="flex px-2 py-1 items-center w-3/4 justify-center mt-2 bg-orange-500 text-white rounded-md space-x-2 text-lg hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium text-center me-6"
                      >
                        <PiDownloadSimpleDuotone size={30} /> <span className="space-x-3">Download</span>
                      </button>
                    </td>
                    {/* <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{qrCode} </td> */}

                    <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent flex items-center gap-2 dark:text-gray-500 dark:border-red-500'><RiDeleteBin6Fill />Delete</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {
            Number(qrCodes.length) > end ?
              <div className="w-full">
                <button
                  onClick={handleLoadMore}
                  className="flex justify-center my-4 mx-auto  items-center gap-2 bg-blue-500 mb-3 text-lg text-white dark:bg-transparent hover:text-white dark:shadow-md dark:shadow-light-white dark:border dark:border-blue-500 dark:text-gray-500 hover:bg-blue-700  font-bold py-2 px-4 rounded-lg top-4 right-4"
                >
                  <AiOutlineLoading3Quarters />Load More...
                </button>
              </div>
              :
              ""
          }


        </div>
      </div>

    </>

  );
};

export default QrCodeTable;
