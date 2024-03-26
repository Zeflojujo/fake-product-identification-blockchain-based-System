// import timelessLogo from '../assets/timeless.png'
import { Link } from 'react-router-dom'
import { connectWallet } from '../../BlockchainService'
import { useGlobalState, truncate } from '../../store'
import zeflotechLogo from '../../assets/zeflojujoLogo.png'

const Header = () => {
    const [connectedAccount] = useGlobalState('connectedAccount')
    return (
        <nav className="w-4/5 flex md:justify-center justify-between items-center py-4 mx-auto">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <Link to={"/"}>
                    <img
                        className="w-24 md:w-24 cursor-pointer"
                        src={zeflotechLogo}
                        alt="zefloTech Logo"
                    />
                </Link>
            </div>

            <ul
                className="md:flex-[0.5] text-white md:flex
                hidden list-none flex-row justify-center gap-8 
                items-center flex-initial"
            >
                <li className="mx-4 cursor-pointer"><Link className='font-semibold hover:text-blue-700 text-blue-600 pb-2 border-b-2 border-blue-600' to="/">Home</Link></li>
                <li className="mx-4 cursor-pointer"><Link className='text-white font-semibold hover:text-blue-700' to="/manufacturer/login">Manufacturer</Link></li>
                <li className="mx-4 cursor-pointer"><Link className='text-white font-semibold hover:text-blue-700' to="/retailer/login">Retailer</Link></li>
                <li className="mx-4 cursor-pointer"><Link className='text-white font-semibold hover:text-blue-700' to="/customer">Customer</Link></li>
            </ul>

            {connectedAccount ? (
                <button
                    className="shadow-xl shadow-black text-white
                    bg-[#e32970] hover:bg-[#bd255f] md:text-xs py-2 px-4
                    rounded-full cursor-pointer"
                >
                    {truncate(connectedAccount, 4, 5, 12)}
                </button>
            ) : (
                <button
                    className="shadow-xl shadow-black text-white
                    bg-[#e32970] hover:bg-[#bd255f] md:text-xs p-2
                    rounded-full cursor-pointer"
                    onClick={connectWallet}
                >
                    Connect Wallet
                </button>
            )}
        </nav>
    )
}

export default Header
