import React, { useEffect, useState } from 'react'
import {
  setGlobalState,
  setLoadingMsg,
  setAlert,
  useGlobalState,
  truncate,
} from '../../../store'
// import Laboratory from "../../../assets/manufacturer.jpg"
import { connectWallet, signUpManufacturer } from '../../../BlockchainService'
import Alert from '../../../+homedirectory/components/Alert';
import Loading from '../../../+homedirectory/components/Loading';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from '../../inc/Header';

const RegisterManufacturer = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [showPassword, setShowPassword] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  const [user, setUser] = useState({
    fullName: "",
    publicAddress: "",
    brand: "",
    license: "",
    country: "",
    region: "",
    state: "",
    email: "",
    agreement: false,
    password: "",
    confirmPassword: ""
  })

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  useEffect(() => {
    if (user.publicAddress === "" || user.brand === "" || user.license === "" || user.country === "" || user.region === "" || user.fullName === ""
      || user.state === "" || user.email === "" || !user.agreement || user.password === "" || user.confirmPassword === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false)
    }
    console.log(user)
  }, [user])

  const handleManugacturerLogin = async (e) => {
    e.preventDefault();

    setGlobalState('loading', { show: true, msg: 'System Owner is Login...' })

    try {
      const registerManCredentials = {
        publicAddress: user.publicAddress,
        fullName: user.fullName,
        email: user.email,
        brand: user.brand,
        license: user.license,
        country: user.country,
        region: user.region,
        state: user.state,
        agreement: user.agreement,
        password: user.password
      }

      setLoadingMsg('Intializing transaction...')
      const result = await signUpManufacturer(registerManCredentials)
      console.log(result)

      if (result) {
        setAlert('Manufacturer is registered successfully...', 'green')
        resetForm()
      } else {
        throw Error
      }

    } catch (error) {
      console.log('Error registering donor: ', error)
      setAlert('Manufacturer registration failed..!', 'red')
    }
  }


  const resetForm = () => {
    setUser({
      fullName: "",
      publicAddress: "",
      brand: "",
      license: "",
      country: "",
      region: "",
      state: "",
      email: "",
      agreement: "",
      password: "",
      confirmPassword: ""
    })
  }

  return (
    <>
      <div className="m-0 p-4 flex justify-end">
        {connectedAccount ? (
          <button
            className="hidden md:block px-4 py-1.5 bg-blue-600 font-medium text-sm md:text-xs text-white leading-tight uppercase rounded-full shadow-md shadow-gray-400
            hover:bg-blue-700 active:bg-blue-800 transition duration-150 ease-in-out dark:text-blue-500 dark:border dark:border-blue-500 
            dark:bg-transparent dark:shadow-transparent dark:active:bg-blue-500 dark:active:text-white dark:hover:text-gray-300"
          >
            {truncate(connectedAccount, 4, 5, 12)}
          </button>
        ) : (
          <button
            onClick={connectWallet}
            className="hidden md:block px-4 py-1.5 bg-blue-600 font-medium text-sm md:text-xs text-white leading-tight uppercase rounded-full shadow-md shadow-gray-400
          hover:bg-blue-700 active:bg-blue-800 transition duration-150 ease-in-out dark:text-blue-500 dark:border dark:border-blue-500 
          dark:bg-transparent dark:shadow-transparent dark:active:bg-blue-500 dark:active:text-white dark:hover:text-gray-300"
          >
            Connect Wallet
          </button>
        )}
      </div>
      <div className="flex flex-col justify-center items-center text-2xl min-h-screen py-3 bg-gray-500" >
        <div className="m-3 xs:w-6/6 sm:w-5/6 md:w-4/5 lg:w-3/5 p-6 md:p-8 rounded-lg text-gray-700 bg-[#151c25] shadow-xl shadow-[#3229e3] h-7/12">
          <Alert />
          <Loading />
          <h1 className="text-2xl md:text-3xl lg:text-3.5xl text-gray-400 font-semibold mb-4">Manufacturer Registration Form</h1>
          <hr className="mb-3 text-gray-600 border-2 border-gray-500" />

          <form className="text-lg" onSubmit={handleManugacturerLogin}>

            <div className="mb-4">
              <h1 className="text-gray-300 text-xl font-semibold md:text-2xl">Account Details:</h1>
              <hr className="mb-3 text-gray-600 border-1 border-gray-500" />
            </div>

            <div className="grid md:grid-cols-2 gap-x-2 mb-4 w-full mt-4">
              <div className="mb-4">
                <label htmlFor="publicAddress" className='text-gray-500 text-lg'>Wallet Public Address:</label>
                <input
                  id="publicAddress"
                  type="publicAddress"
                  value={user.publicAddress}
                  className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                  onChange={(e) => setUser({ ...user, publicAddress: e.target.value })}
                  placeholder="publicAddress"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fullName" className='text-gray-500 text-lg'>Full Name:</label>
                <input
                  id="fullName"
                  type="fullName"
                  value={user.fullName}
                  className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                  onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                  placeholder="fullName"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className='text-lg text-gray-500'>Email:</label>
              <input
                id="email"
                type="email"
                value={user.email}
                className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-x-2 mb-4 w-full mt-4">
              <div className="mb-4">
                <label htmlFor="password" className="text-lg text-gray-500">Password:</label>
                <div className="flex flex-row justify-end items-center">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={user.password}
                    className="relative w-full border-2 border-gray-500 focus:outline-none focus:border-blue-500 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                  />
                  {!showPassword ? <FaEyeSlash size={24} onClick={togglePasswordVisibility} className="absolute mr-4 text-gray-500 pt-2" /> : <FaEye size={24} onClick={togglePasswordVisibility} className="absolute mr-4 text-gray-500 pt-2 " />}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="text-lg text-gray-500">Confirm Password:</label>
                <div className="flex flex-row justify-end items-center">
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={user.confirmPassword}
                    className="relative w-full border-2 border-gray-500 focus:outline-none focus:border-blue-500 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                    onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                    placeholder="confirm password"
                  />
                  {!showPassword ? <FaEyeSlash size={24} onClick={togglePasswordVisibility} className="absolute mr-4 text-gray-500 pt-2" /> : <FaEye size={24} onClick={togglePasswordVisibility} className="absolute mr-4 text-gray-500 pt-2 " />}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h1 className="text-gray-300 text-xl font-semibold md:text-2xl">Company Details:</h1>
              <hr className="mb-3 text-gray-600 border-1 border-gray-500" />
            </div>

            <div className="grid md:grid-cols-2 gap-x-2 mb-4 w-full mt-4">
              <div className="mb-4">
                <label htmlFor="brand" className='text-lg text-gray-500'>Brand:</label>
                <input
                  id="brand"
                  type="brand"
                  value={user.brand}
                  className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                  onChange={(e) => setUser({ ...user, brand: e.target.value })}
                  placeholder="brand"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="license" className='text-lg text-gray-500'>License:</label>
                <input
                  id="license"
                  type="license"
                  value={user.license}
                  className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                  onChange={(e) => setUser({ ...user, license: e.target.value })}
                  placeholder="license"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-x-2 mb-4 w-full mt-4">
              <div className="mb-4">
                <label htmlFor="country" className='text-lg text-gray-500'>Country:</label>
                <input
                  id="country"
                  type="country"
                  value={user.country}
                  className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                  onChange={(e) => setUser({ ...user, country: e.target.value })}
                  placeholder="country"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="region" className='text-lg text-gray-500'>Region:</label>
                <input
                  id="region"
                  type="region"
                  value={user.region}
                  className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                  onChange={(e) => setUser({ ...user, region: e.target.value })}
                  placeholder="region"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-1 gap-x-2 mb-4 w-full mt-4">
              <div className="mb-4">
                <label htmlFor="state" className='text-lg text-gray-500'>State:</label>
                <input
                  id="state"
                  type="state"
                  value={user.state}
                  className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                  onChange={(e) => setUser({ ...user, state: e.target.value })}
                  placeholder="state"
                />
              </div>

            </div>

            <div className="flex flex-row gap-3 mb-4">
              <input
                id='agreement'
                type='checkbox'
                name='agreement'
                value={user.agreement}
                className="w-5"
                onChange={(e) => setUser({ ...user, agreement: !user.agreement })}
              />
              <label htmlFor='agreement' className="text-lg text-gray-300">Please make sure you read <span className="text-blue-500 cursor-pointer">our terms and condition</span> and <span className="text-blue-500 cursor-pointer">agree the services</span></label>
            </div>

            <button
              type="submit"
              className={`flex gap-1 items-center text-white justify-center bg-blue-500 hover:bg-blue-600 
                        focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 
                        py-2.5 text-center me-2 dark:bg-blue-500 dark:hover:bg-blue-600 
                        dark:focus:ring-blue-300 inline-flex items-center w-full mt-5 ${isDisabled === true ? 'px-4 py-2 rounded-md cursor-not-allowed opacity-50' : ""}`}
              disabled={isDisabled}
            >
              Sign-Up
            </button>
            <div className="mt-4 flex justify-center items-center">
              <span className="text-gray-300 text-sm md:text-base lg:text-lg">Already have an Accout?</span>
              <Link to="/manufacturer/login" className="text-sm md:text-base lg: text-lg text-blue-500 font-bold p-2 rounded hover:underline">
                Sign-In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterManufacturer

