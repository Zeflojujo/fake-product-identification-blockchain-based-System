import React, { useState } from 'react';
import Header from "../layouts/AdminHeader"
import Sidebar from "../layouts/AdminSidebar"

function AdminDashboard() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="overflow-hidden flex h-full dark:bg-[#212936] dark:text-gray-300">

            {/* Manufacturers Sidebar component is included */}
            <Sidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
            <div className="flex flex-col gap-y-4 text-3xl semibold h-full">

                {/* Manufacturers Header component is included */}
                <div className="mb-24">
                    <Header toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
                </div>


                {/* Manufactuerers ViewQrCodes page should be created here */}
                <div className="mx-8">
                    <h1>Admin Dashboard Page</h1>
                </div>


            </div>
        </div>

    );
}

export default AdminDashboard;

