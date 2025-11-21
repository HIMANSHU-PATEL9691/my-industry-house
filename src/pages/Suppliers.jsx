import React, { useState } from "react";
import { Phone, Mail, MapPin, Factory, Search } from "lucide-react";

const SUPPLIERS = [
  {
    id: 1,
    name: "Shree Industrial Suppliers",
    category: "Machinery",
    location: "Ahmedabad, Gujarat",
    phone: "+91 9876543210",
    email: "contact@shreeind.in",
  },
  {
    id: 2,
    name: "Techno Lubricants Co.",
    category: "Lubricants",
    location: "Vadodara, Gujarat",
    phone: "+91 9823456781",
    email: "info@techlube.com",
  },
  {
    id: 3,
    name: "PowerGen Electricals",
    category: "Electricals",
    location: "Surat, Gujarat",
    phone: "+91 9123456701",
    email: "sales@powergen.in",
  },
  {
    id: 4,
    name: "Metal Craft Industries",
    category: "Raw Materials",
    location: "Rajkot, Gujarat",
    phone: "+91 9812345078",
    email: "metalcraft@gmail.com",
  },
];

export default function SupplierPage() {
  const [search, setSearch] = useState("");

  const filtered = SUPPLIERS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <Factory size={32} /> Supplier Directory
      </h1>
      <p className="text-gray-600 mb-6">
        Find trusted industrial suppliers across machinery, electricals, raw materials
        and more.
      </p>

      {/* Search */}
      <div className="relative w-full max-w-md mb-6">
        <Search className="absolute left-3 top-3 text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search suppliers..."
          className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Supplier List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl shadow-md p-5 border hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-1">{s.name}</h2>
              <p className="text-blue-600 font-medium">{s.category}</p>

              {/* Details */}
              <div className="mt-3 space-y-2 text-gray-600">
                <p className="flex gap-2 items-center">
                  <MapPin size={18} /> {s.location}
                </p>
                <p className="flex gap-2 items-center">
                  <Phone size={18} /> {s.phone}
                </p>
                <p className="flex gap-2 items-center overflow-hidden">
                  <Mail size={18} /> {s.email}
                </p>
              </div>

              {/* Button */}
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition">
                Contact Supplier
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No suppliers found.</p>
        )}
      </div>
    </div>
  );
}
