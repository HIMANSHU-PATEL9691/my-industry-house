import React, { useState } from "react";
import {
    Search, User, Briefcase, MessageSquare, Menu, X, Globe
} from "lucide-react";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import RFQ from "./pages/RFQ";
import Suppliers from "./pages/Suppliers";
import News from "./pages/News";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Footer from "./components/Footer";

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { name: "Products & Catalogs", page: "products" },
        { name: "Sourcing & RFQ", page: "rfq" },
        { name: "Find Suppliers", page: "suppliers" },
        { name: "Industry News", page: "news" },
        { name: "My Dashboard", page: "dashboard" }
    ];

    const UtilityButton = ({ Icon, label, to }) => (
        <button
            onClick={() => navigate(`/${to}`)}
            className="flex items-center gap-1.5 py-1.5 px-2 rounded-lg hover:bg-amber-200 transition text-sm font-medium"
        >
            <Icon size={18} />
            <span className="hidden sm:inline">{label}</span>
        </button>
    );

    return (
        <div className="bg-amber-50 min-h-screen flex flex-col">

            {/* HEADER */}
            <header className="bg-amber-100 shadow-xl sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

                    {/* Logo From public/logo.png */}
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="h-10 w-auto object-contain"
                        />
                        <span className="hidden sm:inline text-xl md:text-2xl font-extrabold">
                            MYINDUSTRYHOUSE
                        </span>
                        <span className="sm:hidden font-bold text-lg">MIH</span>
                    </div>

                    {/* Desktop Search */}
                    <div className="hidden md:flex flex-1 max-w-xl">
                        <div className="flex bg-white w-full rounded-xl shadow-md">
                            <input
                                type="text"
                                className="flex-1 px-4 py-2 text-sm outline-none"
                                placeholder="Search..."
                            />
                            <button className="bg-blue-600 px-4 text-white">
                                <Search size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Utility Buttons */}
                    <div className="flex items-center gap-3">
                        <UtilityButton Icon={MessageSquare} label="Messages" to="messages" />
                        <UtilityButton Icon={Briefcase} label="Sell" to="sell" />
                        <UtilityButton Icon={Globe} label="EN" to="language" />

                        <button
                            onClick={() => navigate("/account")}
                            className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            <User size={20} />
                            <span className="hidden sm:inline">My Account</span>
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:block bg-amber-200 border-t">
                    <div className="max-w-7xl mx-auto px-4 py-2 flex gap-8 text-sm font-semibold text-gray-700">
                        {navItems.map((item) => (
                            <span
                                key={item.page}
                                onClick={() => navigate(`/${item.page}`)}
                                className={`cursor-pointer pb-1 transition 
                                    ${location.pathname === "/" + item.page
                                        ? "text-blue-700 border-b-2 border-blue-700"
                                        : "hover:text-blue-600"
                                    }`
                                }
                            >
                                {item.name}
                            </span>
                        ))}
                    </div>
                </nav>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-amber-100 shadow-xl absolute w-full">
                        <div className="p-4 flex flex-col gap-3">
                            {navItems.map((item) => (
                                <span
                                    key={item.page}
                                    onClick={() => {
                                        navigate(`/${item.page}`);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`block p-2 rounded-lg transition
                                        ${location.pathname === "/" + item.page
                                            ? "bg-amber-300 text-blue-800 font-bold"
                                            : "hover:bg-amber-300"
                                        }`
                                    }
                                >
                                    {item.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            {/* ROUTES */}
            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/rfq" element={<RFQ />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/account" element={<Account />} />
                </Routes>
            </div>

            {/* FOOTER */}
            <Footer />
        </div>
    );
}
