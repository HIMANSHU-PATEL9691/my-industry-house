import React from "react";
import {
    Factory,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="bg-amber-200 text-gray-800 mt-10 border-t border-amber-300">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Brand */}
                <div>
                    <h2
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 text-2xl font-extrabold text-blue-700 cursor-pointer"
                    >
                        <Factory size={28} /> MYINDUSTRYHOUSE
                    </h2>
                    <p className="mt-3 text-sm text-gray-700">
                        Your trusted B2B marketplace for industrial components, raw materials,
                        machinery, and suppliers.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-3 mt-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white rounded-xl shadow hover:bg-blue-600 hover:text-white transition cursor-pointer"
                        >
                            <Facebook size={20} />
                        </a>

                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white rounded-xl shadow hover:bg-blue-600 hover:text-white transition cursor-pointer"
                        >
                            <Twitter size={20} />
                        </a>

                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white rounded-xl shadow hover:bg-blue-600 hover:text-white transition cursor-pointer"
                        >
                            <Instagram size={20} />
                        </a>

                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white rounded-xl shadow hover:bg-blue-600 hover:text-white transition cursor-pointer"
                        >
                            <Linkedin size={20} />
                        </a>

                        {/* 🔥 Added YouTube */}
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white rounded-xl shadow hover:bg-red-600 hover:text-white transition cursor-pointer"
                        >
                            <Youtube size={20} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                        <li onClick={() => navigate("/products")} className="hover:text-blue-700 cursor-pointer">Products & Catalogs</li>
                        <li onClick={() => navigate("/rfq")} className="hover:text-blue-700 cursor-pointer">Sourcing & RFQ</li>
                        <li onClick={() => navigate("/suppliers")} className="hover:text-blue-700 cursor-pointer">Find Suppliers</li>
                        <li onClick={() => navigate("/news")} className="hover:text-blue-700 cursor-pointer">Industry News</li>
                        <li onClick={() => navigate("/dashboard")} className="hover:text-blue-700 cursor-pointer">My Dashboard</li>
                    </ul>
                </div>

                {/* For Buyers */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">For Buyers</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                        <li onClick={() => navigate("/rfq")} className="hover:text-blue-700 cursor-pointer">Post Your RFQ</li>
                        <li onClick={() => navigate("/suppliers")} className="hover:text-blue-700 cursor-pointer">Supplier Verification</li>
                        <li onClick={() => navigate("/compare-quotes")} className="hover:text-blue-700 cursor-pointer">Compare Quotes</li>
                        <li onClick={() => navigate("/logistics")} className="hover:text-blue-700 cursor-pointer">Logistics Support</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                    <div className="flex items-center gap-2 text-sm mb-2">
                        <Mail size={18} className="text-blue-600" />
                        <span>support@myindustryhouse.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                        <Phone size={18} className="text-blue-600" />
                        <span>+91 98765 43210</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <MapPin size={18} className="text-blue-600" />
                        <span>Gujarat, India</span>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="bg-amber-300 py-3 text-center text-sm font-medium text-gray-700">
                © {new Date().getFullYear()} MYINDUSTRYHOUSE — All Rights Reserved.
            </div>
        </footer>
    );
}
