import React, { useEffect } from "react"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import ViewFakeProduct from "./manufacturers/pages/ViewFakeProduct"
import QrCodes from "./manufacturers/pages/QrCodes"
import LoginManufacturer from "./manufacturers/pages/auth/LoginManufacturer"
import RegisterManufacturer from "./manufacturers/pages/auth/RegisterManufacturer"
import GenerateQrCode from "./manufacturers/pages/GenerateQrCode"
import ScannQrCode from "./customers/pages/ScannQrCode"
import RegisterRetailers from "./manufacturers/pages/Retailers"
import CustomerHome from "./customers/pages/Home"
import Dashboard from "./manufacturers/pages/Dashboard"
import AdminDashboard from "./admin/pages/AdminDashboard"
import AddProduct from "./manufacturers/pages/AddProduct"
import Home from "./+homedirectory/pages/home"
import AdminLogin from "./admin/pages/auth/AdminLogin"
import Manufacturers from "./admin/pages/Manufacturers"
import { displayManufacturersData, displayProducts, displayQrCodeData, isWallectConnected } from "./BlockchainService"
import Profile from "./manufacturers/pages/Profile"

const App = () => {
    useEffect(() => {
        const isConnected = async () => {
            await isWallectConnected();
            await displayManufacturersData();
            await displayQrCodeData();
            await displayProducts();
        };
        isConnected();
    },[])
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/manufacturer/dashboard" element={<Dashboard />} />
                <Route path="/manufacturer/fake-product" element={<ViewFakeProduct />} />
                <Route path="/manufacturer/qrcodes" element={<QrCodes />} />
                <Route path="/manufacturer/generate-qrcode" element={<GenerateQrCode />} />
                <Route path="/manufacturer/retailers" element={<RegisterRetailers />} />
                <Route path="/manufacturer/add-product" element={<AddProduct />} />
                <Route path="/manufacturer/profile" element={<Profile />} />

                <Route path="/manufacturer/login" element={<LoginManufacturer />} />
                <Route path="/manufacturer/register" element={<RegisterManufacturer />} />

                {/* Admin */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/manufacturer" element={<Manufacturers />} />

                {/* customer */}
                <Route path="/customer" element={<CustomerHome />} />
                <Route path="/customer/scann" element={<ScannQrCode />} />
            </Routes>
        </Router>
    )
}

export default App
