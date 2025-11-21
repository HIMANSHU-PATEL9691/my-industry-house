import React from "react";
import { User, Mail, Phone, MapPin, Lock, Settings, LogOut } from "lucide-react";

export default function Account() {
    return (
        <div className="min-h-screen bg-amber-50 py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                        <User size={40} />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">My Account</h2>
                        <p className="text-gray-500 text-sm">
                            Manage your profile, contact details and login security.
                        </p>
                    </div>
                </div>

                {/* Profile Section */}
                <div className="grid md:grid-cols-2 gap-6">

                    {/* Personal Info */}
                    <div className="bg-amber-100 p-6 rounded-xl shadow-inner">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <User size={20} /> Personal Information
                        </h3>

                        <div className="space-y-3">
                            <p className="flex items-center gap-2 text-gray-700">
                                <Mail size={18} className="text-blue-600" />
                                <span>Email:</span>
                                <strong>himanshu@example.com</strong>
                            </p>

                            <p className="flex items-center gap-2 text-gray-700">
                                <Phone size={18} className="text-blue-600" />
                                <span>Phone:</span>
                                <strong>+91 9876543210</strong>
                            </p>

                            <p className="flex items-center gap-2 text-gray-700">
                                <MapPin size={18} className="text-blue-600" />
                                <span>Location:</span>
                                <strong>Gujarat, India</strong>
                            </p>
                        </div>
                    </div>

                    {/* Security Settings */}
                    <div className="bg-amber-100 p-6 rounded-xl shadow-inner">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <Lock size={20} /> Login & Security
                        </h3>

                        <div className="space-y-3">
                            <button className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition shadow-md flex items-center justify-center gap-2">
                                <Lock size={18} /> Change Password
                            </button>

                            <button className="w-full bg-white border border-gray-300 py-2 rounded-xl hover:bg-gray-100 transition shadow-md flex items-center justify-center gap-2">
                                <Settings size={18} /> Account Settings
                            </button>
                        </div>
                    </div>
                </div>

                {/* Logout Button */}
                <div className="mt-8 text-center">
                    <button className="mx-auto bg-red-600 text-white px-6 py-2 rounded-xl text-lg font-medium shadow-lg hover:bg-red-700 transition flex items-center gap-2 justify-center">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
