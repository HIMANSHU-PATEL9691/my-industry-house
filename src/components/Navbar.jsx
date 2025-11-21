import React, { useState } from "react";
import {
    Search,
    User,
    Briefcase,
    MessageSquare,
    Menu,
    X,
    Globe,
    Factory
} from "lucide-react";

export default function App() {
    // State management for navigation and mobile menu
    const [currentPage, setCurrentPage] = useState("home");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // This handler will be used by the navbar to indicate navigation
    const handleNavigation = (page) => {
        setCurrentPage(page);
        console.log("Navigating to:", page);
    };

    // Primary Color: Light Amber/Golden Yellow (Background)
    // Accent Color: Moderate Blue (Buttons and Highlights)
    // Primary Text Color: Dark Gray (for readability)

    const navItems = [
        { name: "Products & Catalogs", page: "products" },
        { name: "Sourcing & RFQ", page: "rfq", isPrimary: true },
        { name: "Find Suppliers", page: "suppliers" },
        { name: "Industry News", page: "news" },
        { name: "My Dashboard", page: "dashboard" },
    ];

    const UtilityButton = ({ Icon, label, onClick }) => (
        <button
            onClick={onClick}
            className="flex items-center gap-1.5 py-1.5 px-2 rounded-lg hover:bg-amber-200 transition duration-150 text-sm font-medium"
        >
            <Icon size={18} />
            <span className="hidden sm:inline">{label}</span>
        </button>
    );

    return (
        <div className=" bg-amber-50 font-sans">
            <header className="bg-amber-100 text-gray-800 shadow-xl sticky top-0 z-20 font-inter">
                {/* Top Header */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
                    {/* Logo */}
                    <h1
                        className="flex items-center gap-2 text-xl md:text-2xl font-extrabold cursor-pointer hover:text-blue-700 transition"
                        onClick={() => handleNavigation("home")}
                    >
                        <Factory size={28} className="text-blue-600" />
                        <span className="hidden sm:inline">MYINDUSTRYHOUSE</span>
                        <span className="sm:hidden">MIH</span>
                    </h1>

                    {/* Desktop Search */}
                    <div className="hidden md:flex flex-1 max-w-xl">
                        <div className="flex bg-white w-full text-gray-800 rounded-xl overflow-hidden shadow-md">
                            <input
                                type="text"
                                placeholder="Search components, materials, suppliers..."
                                className="flex-1 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 rounded-l-xl"
                            />
                            <button className="bg-blue-600 px-4 text-white hover:bg-blue-700 transition rounded-r-xl">
                                <Search size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Utility Buttons */}
                    <div className="flex items-center gap-1 sm:gap-3 text-gray-800">
                        <UtilityButton Icon={MessageSquare} label="Messages" onClick={() => handleNavigation("messages")} />
                        <UtilityButton Icon={Briefcase} label="Sell" onClick={() => handleNavigation("sell")} />
                        <UtilityButton Icon={Globe} label="EN" onClick={() => handleNavigation("language")} />

                        {/* Profile */}
                        <button
                            onClick={() => handleNavigation("account")}
                            className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg text-sm font-medium"
                        >
                            <User size={20} />
                            <span className="hidden sm:inline">My Account</span>
                        </button>

                        {/* Mobile Menu Icon */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-amber-200 transition"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Desktop Navigation Menu */}
                <nav className="hidden md:block bg-amber-200 border-t border-amber-300">
                    <div className="max-w-7xl mx-auto px-4 py-2 flex gap-8 text-sm font-semibold text-gray-700">
                        {navItems.map((item) => (
                            <span
                                key={item.page}
                                onClick={() => handleNavigation(item.page)}
                                className={`cursor-pointer py-1 transition duration-150 ${
                                    currentPage === item.page
                                        ? "text-blue-700 border-b-2 border-blue-700"
                                        : "hover:text-blue-600"
                                }`}
                            >
                                {item.name}
                            </span>
                        ))}
                    </div>
                </nav>

                {/* Mobile Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden bg-amber-100 shadow-xl absolute w-full border-t border-amber-300">
                        <div className="p-4 flex flex-col gap-3">
                            {/* Search */}
                            <div className="flex bg-white text-gray-800 rounded-xl overflow-hidden shadow-inner">
                                <input
                                    type="text"
                                    className="flex-1 px-3 py-2 text-sm outline-none"
                                    placeholder="Search..."
                                />
                                <button className="bg-blue-600 px-3 text-white hover:bg-blue-700 rounded-r-xl">
                                    <Search size={18} />
                                </button>
                            </div>

                            {/* Links */}
                            {navItems.map((item) => (
                                <span
                                    key={item.page}
                                    onClick={() => {
                                        handleNavigation(item.page);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`block p-2 rounded-lg font-medium text-gray-700 transition ${
                                        currentPage === item.page
                                            ? "bg-amber-300 text-blue-800 font-bold"
                                            : "hover:bg-amber-300 hover:text-blue-800"
                                    }`}
                                >
                                    {item.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
}