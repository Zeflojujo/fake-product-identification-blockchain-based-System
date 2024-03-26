import React, { useState, useEffect } from 'react';
// import swal from 'sweetalert';
import { useGlobalState } from '../../store'
import { MdDelete } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';


const RetailerTable = () => {
  const [retailers] = useGlobalState("retailers");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [allRetailers, setAllRetailers] = useState([])
  const [end, setEnd] = useState(6)


  const handleMouseEnter = (rowIndex) => {
    setHoveredRow(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const getRetailers = () => {
    return retailers.slice(0, end)
  }

  useEffect(() => {
    setAllRetailers(getRetailers())
    console.log(retailers)
  }, [retailers, end])

  // const deleteRegisterHandler = async (publicAddress) => {
  //   console.log("donor deleted public address is: ", publicAddress)

  //   swal({
  //     title: "Are you sure?",
  //     text: "Once deleted, you will not be able to recover this imaginary file!",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   })
  //     .then(async (willDelete) => {
  //       if (willDelete) {
  //         swal("Poof! Your imaginary file has been deleted!", {
  //           icon: "success",
  //         });
  //         const result = await deleteDonor({ publicAddress })

  //         if (result) {
  //           window.location.reload()
  //         } else {
  //           throw Error
  //         }
  //         console.log("donor deleted public address is: ", publicAddress)
  //       } else {
  //         swal("Your imaginary file is safe!", {
  //           icon: 'info'
  //         });
  //       }
  //     });

  // }

  function handleLoadMore() {
    setEnd(end + 5)
  }

  return (
    <>

      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">List of Retailers</h1>
      </div>

      <div className="p-4">



        {/* <CreateNewsModal showModal={isModalOpen} closeModal={closeModal} /> */}


        <div className="shadow-md overflow-x-auto" style={{ zIndex: '-999' }}>
          <table className="min-w-full overflow-x-auto  bg-white border-b border-gray-700 dark:bg-[#212936] dark:text-gray-300 dark:border-gray-700">
            <thead className='bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900 dark:gray-300'>
              <tr className='border-none'>
                <th className="py-2 px-4 border-b text-center text-lg">S/N</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">Public Address</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">Name</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">Location</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">Email</th>

                <th className="py-2 px-4 border-b text-center text-lg flex col-span-2 justify-center uppercase">Actions</th>
                <th className="py-2 px-4 border-b text-center"></th>
              </tr>
            </thead>
            <tbody>
              {allRetailers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="flex justify-center col-span-8 items-center mx-auto py-4 px-4 text-gray-700 text-base border-b dark:text-gray-500">
                    No Record Found
                  </td>
                </tr>
              ) : (

                allRetailers.map((donor, index) => (
                  <tr
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{index + 1}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donor.publicAddress}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donor.name}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donor.age.toString()}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donor.weight.toString()}</td>

                    <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 gap-1 flex items-center dark:border-red-500'><MdDelete size={17} />Delete</button></td>
                    {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => deleteNewsHandler(item.id)} className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-red-500'>Delete</button></td> */}
                    {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => UpdataNewsHandler(item.id)} className='border border-solid bg-cyan-400 hover:bg-cyan-600 active:bg-cyan-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-cyan-400'>Update</button></td> */}
                  </tr>
                ))
              )}
            </tbody>

          </table>
          {
            Number(retailers.length) > end ?
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

export default RetailerTable;
