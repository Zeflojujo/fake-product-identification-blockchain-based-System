import React, { useEffect, useRef, useState } from "react";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "../../assets/qr-frame.svg";
import swal from "sweetalert";

import Web3 from "web3"
import qrCodeContract from "../../abis/QrCode.json"
import { scanItem } from "../../BlockchainService";
import { TbAdjustmentsCancel, TbTopologyStar3 } from "react-icons/tb";
import { setGlobalState, useGlobalState } from "../../store";
import { MdErrorOutline } from "react-icons/md";
import { FaRegThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const networkId = "http://127.0.0.1:7545"

const QrScann = () => {
  // QR States
  const scanner = useRef(null);
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [modal] = useGlobalState("modal");
  const [modal2] = useGlobalState("modal2");

  // Result
  // const [scannedResult, setScannedResult] = useState();

  const [isOriginal, setIsOriginal] = useState(false)

  const closeModal = () => {
    setGlobalState('modal', 'scale-0')
  }

  const closeModal2 = () => {
    setGlobalState('modal2', 'scale-0')
  }

  // Success
  const onScanSuccess = (result) => {
    // 🖨 Print the "result" to browser console.
    console.log(result);
    // ✅ Handle success.
    // 😎 You can do whatever you want with the scanned result.
    // setScannedResult(result?.data);
    getScannItemResult(result?.data);



  };

  // Fail
  const onScanFail = (err) => {
    // 🖨 Print the "err" to browser console.
    console.log(err);
  };

  useEffect(() => {
    if (videoEl.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner.current
        .start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl.current) {
        scanner.current?.stop();
      }
    };
  }, []);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);


  const getScannItemResult = async (qrHash) => {

    const _isOriginal = await scanItem(qrHash);

    console.log("Is original product? ", _isOriginal)

    if (_isOriginal) {

      setIsOriginal(true)

      // swal({
      //   title: "GUINUINE PRODUCT!",
      //   text: "Wine is verified successfully!",
      //   icon: "success",
      //   button: "view the details",
      // });
      setGlobalState('modal2', 'scale-100')

    } else {
      setGlobalState('modal', 'scale-100')
    }

    console.log("isOriginal: ", _isOriginal)

  }


  const handleReport = async () => {

    console.log("fake product is reported")
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[69vh]">
        <div className="absolute mt-[-300px] z-10 text-white">
          <h2 className="flex justify-center items-center">Please put the qrcode to fit in the frame</h2>
        </div>
        {/* {scannedResult && (
          <p className="relative flex items-center justify-center top-0 left-0 z-50 px-4 py-2 text-black dark:text-gray-300">
            Scanned Result: {scannedResult}
          </p>
      )} */}
        <div className="relative w-full md:max-w-2xl mt-20">
          <video
            ref={videoEl}
            className="w-full h-[89vh] mt-20 bg-black rounded-lg "
          ></video>
          <div ref={qrBoxEl} className="flex items-center justify-center">
            <img
              src={QrFrame}
              alt="Qr Frame"
              width={656}
              height={656}
              className="h-auto absolute flex z-50 items-center justify-center"
            />
          </div>

        </div>

      </div>

      <div
        className={`fixed top-0 left-0 w-screen h-screen flex items-center
                    justify-center bg-black bg-opacity-50 transform
                    transition-transform duration-300 ${modal}`}
      >
        <div className="shadow-lg rounded-xl w-11/12 md:w-2/5 h-7/12 p-6 bg-gray-100 shadow-blue-400 dark:bg-[#151c25] dark:shadow-[#e32970]">

          <form className="flex flex-col">
            <div className="flex flex-row justify-between items-center">
              {/* <p className="font-semibold text-gray-400">Complete Blood Checking</p> */}
              <h2 className="flex justify-center mx-auto w-full items-center text-red-500 rounded-full text-1xl md:text-3xl font-bold mt-4 pt-3">
                {/* <FaRegTimesCircle  /> */}
                <MdErrorOutline size={72} className="text-red-400 text-5xl" />
              </h2>
            </div>

            <div className="mt-4">
              <span className="block text-red-500 text-3xl font-bold text-center font-medium dark:text-gray-300">
                FAKE PRODUCT.
              </span>
              <span className="block text-[20px] mt-3 text-center font-medium text-gray-600 dark:text-gray-300">
                This product is not comming from legit manufacturer
              </span>
            </div>

            <div className="flex gap-2 justify-center mx-8">

              <button
                type="submit"
                onClick={closeModal}
                className="w-fit justfy-end flex items-center gap-1 text-white justify-center bg-orange-400 hover:bg-orange-500 
                focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-lg px-5 
                py-2.5 text-center me-2 dark:bg-orange-400 dark:hover:bg-orange-500 
                dark:focus:ring-orange-300 inline-flex items-center w-full mt-5"
              >
                <FaRegThumbsUp size={17} />
                okay
              </button>
            </div>
            <hr className="border-2 my-8" />
            <div className="flex justify-start mx-8">
              <button onClick={handleReport}
                className="text-orange-600 text-xl flex justify-center cursor-pointer underline">
                Report Infringment
              </button>
            </div>

          </form>

        </div>
      </div>

      <div
        className={`fixed top-0 left-0 w-screen h-screen flex items-center
                        justify-center bg-black bg-opacity-50 transform
                        transition-transform duration-300 ${modal2}`}
      >
        <div className="shadow-lg rounded-xl w-11/12 md:w-2/5 h-7/12 p-6 bg-gray-100 shadow-blue-400 dark:bg-[#151c25] dark:shadow-[#e32970]">

          <form className="flex flex-col">
            <div className="flex flex-row justify-between items-center">
              {/* <p className="font-semibold text-gray-400">Complete Blood Checking</p> */}
              <h2 className="flex justify-center mx-auto w-full items-center text-red-500 rounded-full text-1xl md:text-3xl font-bold mt-4 pt-3">
                {/* <FaRegTimesCircle  /> */}
                {/* <FaRegCircleCheck size={72} className="text-green-400 text-5xl" /> */}
                <IoMdCheckmarkCircleOutline size={72} className="text-green-400 text-5xl" />
              </h2>
            </div>

            {/* <div className="mt-4">
              <input
                className="hidden mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                type="text"
                name="manufacturerAddress"
                value={manufacturerAddress}
                disabled
                required
              />
            </div> */}

            <div className="mt-4">
              <span className="block mb-4 text-green-500 text-3xl font-bold text-center font-medium dark:text-gray-300">
                GUINUINE PRODUCT!
              </span>
              <span className="block text-[20px] mt-3 text-center font-medium text-gray-600 dark:text-gray-300">
                This wine is safe to use enjoy!
              </span>
            </div>

            <div className="flex gap-2 justify-center mx-8">

              <button
                type="submit"
                onClick={closeModal2}
                className="w-fit justfy-end flex gap-1 items-center text-white justify-center bg-blue-500 hover:bg-blue-600 
                          focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 
                          py-2.5 text-center me-2 dark:bg-[#e32970] dark:hover:bg-[#bd255f] 
                          dark:focus:ring-[#bd255f] inline-flex items-center w-full mt-5"
              >
                <FaRegThumbsUp size={17} />
                okay
              </button>

            </div>
            <hr className="border-2 text-gray-700 my-8" />
            <div className="flex justify-start mx-8">
              <Link to={"/customer/product-details"}
                className="text-blue-600 text-xl flex justify-center cursor-pointer underline">
                View wine details
              </Link>
            </div>

          </form>

        </div>
      </div>
    </>


  );
};

export default QrScann;
