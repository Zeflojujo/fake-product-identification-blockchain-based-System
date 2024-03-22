import React from "react"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import ViewFakeProduct from "./manufacturers/pages/ViewFakeProduct"
import ViewQrCodes from "./manufacturers/pages/ViewQrCodes"
import LoginManufacturer from "./manufacturers/pages/auth/LoginManufacturer"
import RegisterManufacturer from "./manufacturers/pages/auth/RegisterManufacturer"
import GenerateQrCode from "./manufacturers/pages/GenerateQrCode"
import ScannQrCode from "./customers/pages/ScannQrCode"
import RegisterRetailers from "./manufacturers/pages/Retailers"
import AddRetailers from "./manufacturers/pages/RegisterRetailer"
import CustomerHome from "./customers/pages/Home"
import Dashboard from "./manufacturers/pages/Dashboard"
import AddProduct from "./manufacturers/pages/AddProduct"
import Home from "./+homedirectory/pages/home"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/fake-product" element={<ViewFakeProduct />} />
                <Route path="/qrcodes" element={<ViewQrCodes />} />
                <Route path="/generate-qrcode" element={<GenerateQrCode />} />
                <Route path="/retailers" element={<RegisterRetailers />} />
                <Route path="/add-retailer" element={<AddRetailers />} />
                <Route path="/add-product" element={<AddProduct />} />

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
