import React from "react"
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
import AddProduct from "./manufacturers/pages/AddProduct"
import Home from "./+homedirectory/pages/home"

const App = () => {
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

                <Route path="/manufacturer/login" element={<LoginManufacturer />} />
                <Route path="/manufacturer/register" element={<RegisterManufacturer />} />

                {/* customer */}
                <Route path="/customer" element={<CustomerHome />} />
                <Route path="/customer/scann" element={<ScannQrCode />} />
            </Routes>
        </Router>
    )
}

export default App
