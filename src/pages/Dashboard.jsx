import React from "react";
import { 
    ClipboardList, ShoppingBag, MessageSquare, Heart, 
    ArrowRight, Star, Package, Clock
} from "lucide-react";

export default function Dashboard() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-6">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
                <p className="text-gray-600 text-sm">Welcome back! Here's your recent activity.</p>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                
                <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
                    <ClipboardList className="text-blue-600" size={28} />
                    <h2 className="text-xl font-bold mt-2">12</h2>
                    <p className="text-gray-600 text-sm">RFQs Submitted</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
                    <ShoppingBag className="text-green-600" size={28} />
                    <h2 className="text-xl font-bold mt-2">7</h2>
                    <p className="text-gray-600 text-sm">Orders Placed</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
                    <MessageSquare className="text-orange-600" size={28} />
                    <h2 className="text-xl font-bold mt-2">4</h2>
                    <p className="text-gray-600 text-sm">New Messages</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
                    <Heart className="text-red-600" size={28} />
                    <h2 className="text-xl font-bold mt-2">18</h2>
                    <p className="text-gray-600 text-sm">Saved Products</p>
                </div>

            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow p-5 mb-8">
                <h2 className="text-lg font-bold mb-3">Quick Actions</h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <button className="p-3 bg-blue-50 rounded-xl hover:bg-blue-100 font-medium flex items-center justify-between">
                        Create new RFQ <ArrowRight size={16} />
                    </button>
                    <button className="p-3 bg-blue-50 rounded-xl hover:bg-blue-100 font-medium flex items-center justify-between">
                        Track Order <ArrowRight size={16} />
                    </button>
                    <button className="p-3 bg-blue-50 rounded-xl hover:bg-blue-100 font-medium flex items-center justify-between">
                        Browse Products <ArrowRight size={16} />
                    </button>
                    <button className="p-3 bg-blue-50 rounded-xl hover:bg-blue-100 font-medium flex items-center justify-between">
                        View Messages <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            {/* Recent RFQs */}
            <div className="bg-white rounded-xl shadow p-5 mb-8">
                <h2 className="text-lg font-bold mb-4">Recent RFQs</h2>

                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50">
                            <div>
                                <h3 className="font-semibold">Industrial Machine Parts #{i}</h3>
                                <p className="text-sm text-gray-600">Quantity: 1000 units</p>
                            </div>
                            <span className="text-sm text-gray-500">
                                <Clock size={16} className="inline mr-1" />
                                2 days ago
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recently Viewed Products */}
            <div className="bg-white rounded-xl shadow p-5">
                <h2 className="text-lg font-bold mb-4">Recently Viewed Products</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="p-3 border rounded-lg hover:shadow-lg transition cursor-pointer">
                            <div className="h-24 bg-gray-200 rounded-lg mb-2"></div>
                            <h4 className="font-semibold text-sm">Product #{i}</h4>
                            <div className="flex items-center text-yellow-500 text-xs mt-1">
                                <Star size={14} />
                                <span>4.{i}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
