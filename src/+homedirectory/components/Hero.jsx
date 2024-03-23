// import Identicon from 'react-identicons'
import { setGlobalState, useGlobalState, truncate } from '../../store'
import System from "../../assets/manufacturer.jpg"
import { Link } from 'react-router-dom'

const Hero = () => {
    const [connectedAccount] = useGlobalState('connectedAccount')
    const onCreatedNFT = () => {
        setGlobalState('modal', 'scale-100')
    }

    return (
        <div
            className="flex flex-col md:flex-row w-4/5 justify-between 
      items-center mx-auto py-10"
        >
            <div className="md:w-3/6 w-full">
                <div>
                    <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
                        Alcoshield <br /> Fake Product Identification, <br />
                        <span className="text-gradient">FPIBS</span> System
                    </h1>
                    <p className="text-gray-500 font-semibold text-sm mt-3">
                        Protect your product from fake product and educate people to use this system to identify fake product.
                    </p>
                </div>

                <div className="flex flex-row mt-5">
                    <Link
                        to="/customer"
                        className="shadow-xl shadow-black text-white
            bg-[#e32970] hover:bg-[#bd255f]
            rounded-full cursor-pointer py-2 px-4"
                        onClick={onCreatedNFT}
                    >
                        Scann Now
                    </Link>
                </div>

                <div className="w-3/4 flex justify-between items-center mt-5">
                    <div>
                        <p className="text-white font-bold">1231k</p>
                        <small className="text-gray-300">Fake</small>
                    </div>
                    <div>
                        <p className="text-white font-bold">152k</p>
                        <small className="text-gray-300">Report</small>
                    </div>
                    <div>
                        <p className="text-white font-bold">200k</p>
                        <small className="text-gray-300">Real</small>
                    </div>
                </div>
            </div>

            <div
                className="shadow-xl shadow-black md:w-2/5 w-full 
      mt-10 md:mt-0 rounded-md overflow-hidden bg-gray-800"
            >
                <img
                    src={System}
                    alt="donate blooc"
                    className="h-60 w-full object-cover"
                />
                <div className="flex justify-start items-center p-3">
                    {/* <Identicon
            // string={connectedAccount ? connectedAccount : 'Connect Your Wallet'}
            size={50}
            className="h-10 w-10 object-contain rounded-full mr-3"
          /> */}
                    <div>
                        <p className="text-white font-semibold">
                            {connectedAccount
                                ? truncate(connectedAccount, 4, 4, 11)
                                : 'Connect Your Wallet'}
                        </p>
                        <small className="text-pink-800 font-bold">@you</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
