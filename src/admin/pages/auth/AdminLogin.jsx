import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    setGlobalState,
    setLoadingMsg,
    setAlert,
} from '../../../store'
import { useState } from 'react'
import { systemOwnerLogin } from '../../../BlockchainService'
import Alert from '../../../+homedirectory/components/Alert';
import Loading from '../../../+homedirectory/components/Loading';
import { FaArrowRightToBracket } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [publicAddress, setPublicAddress] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)

    const [user, setUser] = useState({
        publicAddress: "",
        password: ""
    })

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    useEffect(() => {
        if (user.publicAddress === "" || user.password === "") {
            setIsDisabled(true);
        } else {
            setIsDisabled(false)
        }
        // console.log(isDisabled)
    }, [user])

    const handleManufacturerLogin = async (e) => {
        e.preventDefault();

        setGlobalState('loading', { show: true, msg: 'System Owner is Login...' })

        try {
            const LoginCredentials = { publicAddress, password }

            setLoadingMsg('Intializing transaction...')
            const result = await systemOwnerLogin(LoginCredentials)
            console.log(result)

            if (result) {
                setAlert('Login successfully...', 'green')
                setTimeout(() => {
                    navigate('/damu-salama/dashboard');
                    // window.location.href="/damu-salama/dashboard"
                }, 2000);
                resetForm()
            } else {
                throw Error
            }

        } catch (error) {
            console.log('Error registering donor: ', error)
            setAlert('Invalid publicAddress or password...', 'red')
        }
    }


    const resetForm = () => {
        setPublicAddress("")
        setPassword("")
    }

    return (
        <div className="flex flex-col justify-center items-center text-2xl min-h-screen py-3 bg-gray-500" >
            <div className="w-5/6 md:w-3/5 lg:w-2/5 p-6 md:p-8 rounded-lg text-gray-700 bg-[#151c25] shadow-lg shadow-blue-600">
                <Alert />
                <Loading />
                <h1 className="text-2xl md:text-3xl lg:text-3.5xl text-gray-400 font-semibold mb-4">Admin Login</h1>
                <hr className="mb-3 text-gray-600 border-2 border-gray-400" />
                <form className="text-lg" onSubmit={handleManufacturerLogin}>
                    <div className="mb-4">
                        <label htmlFor="publicAddress" className='text-gray-500 text-lg'>Public Address:</label>
                        <input
                            id="username"
                            type="publicAddress"
                            value={user.publicAddress}
                            className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                            onChange={(e) => setUser({ ...user, publicAddress: e.target.value })}
                            placeholder="publicAddress"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="text-gray-500 text-lg">Password:</label>
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
                    <button
                        type="submit"
                        className={`flex gap-1 items-center text-white justify-center bg-blue-500 hover:bg-blue-600 
                        focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 
                        py-2.5 text-center me-2 dark:bg-blue-500 dark:hover:bg-blue-600 
                        dark:focus:ring-blue-300 inline-flex items-center w-full mt-5 ${isDisabled === true ? 'px-4 py-2 rounded-md cursor-not-allowed opacity-50' : ""}`}
                        disabled={isDisabled}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin


// import React, { Suspense } from 'react';

// const LazyComponent = React.lazy(() => import('./LazyComponent'));

// function App() {
//     return (
//         <div>
//             <h1>My React App</h1>
//             <Suspense fallback={<div>Loading...</div>}>
//                 <LazyComponent />
//             </Suspense>
//         </div>
//     );
// }

// export default App;


