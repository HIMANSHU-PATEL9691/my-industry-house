// src/pages/SUPPLIER.jsx
import React, { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import categories from "../data/categories.json";
import suppliersRaw from "../data/suppliers.json"; // could be array OR object

export default function Sellers() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // fallback image (local uploaded file)
  const FALLBACK_LOGO = "/mnt/data/e13fc6f02d914a058b8e2cbd1d1356f5.gif";

  // --- NORMALIZE suppliersRaw INTO suppliers ARRAY (CORRECTED) ---
  let suppliers;
  if (Array.isArray(suppliersRaw)) {
    suppliers = suppliersRaw; // already array of suppliers
  } else if (suppliersRaw && Array.isArray(suppliersRaw.suppliers)) {
    suppliers = suppliersRaw.suppliers; // { suppliers: [...] }
  } else if (suppliersRaw && suppliersRaw.supplier) {
    suppliers = [suppliersRaw.supplier]; // single supplier object -> array
  } else {
    suppliers = [];
    console.warn(
      "Unrecognized suppliers.json structure — expected array or { suppliers: [...] } or { supplier: {...} }",
      suppliersRaw
    );
  }

  // Add logic to close sidebar on navigation (a good practice for mobile)
  const handleNavigate = (path) => {
    navigate(path);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <div className="bg-white w-full min-h-screen">
      
      {/* 🧭 FIXED HEADER/NAVBAR FOR MOBILE (TOGGLE BUTTON) 🧭 */}
      {/* This ensures the toggle button is always accessible on mobile */}
      <header className="sticky top-0 z-50 bg-white shadow-md lg:hidden p-4 flex items-center justify-between border-b border-yellow-100">
        <h1 className="text-xl font-serif text-[#6b4f22] font-bold">
          Suppliers
        </h1>
        <button 
          onClick={() => setMobileOpen(true)}
          aria-label="Open filter menu"
          className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 transition"
        >
          <FiMenu size={24} className="text-[#6b4f22]" />
        </button>
      </header>
      
      {/* 🖼️ FLEX LAYOUT FOR SIDEBAR + CONTENT 🖼️ */}
      <div className="flex relative">
        {/* SIDEBAR (Left) */}
        {/* Key Changes: 
            1. Fixed `top-0` and `h-screen` to make it cover the viewport (on mobile).
            2. Increased z-index to 50 for mobile overlay.
            3. `lg:sticky lg:top-0` to pin it on desktop.
            4. Overlay background when open on mobile.
        */}
        <aside
          className={`
            bg-[#fff6e8] shadow-xl h-screen overflow-y-auto p-5 
            fixed top-0 left-0 z-50 border-r border-yellow-200
            w-[260px] 
            transform transition-transform duration-300 
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
            
            lg:sticky lg:translate-x-0 lg:h-auto lg:min-h-screen lg:z-40 lg:top-0
          `}
        >
          {/* Close on mobile (only visible on mobile) */}
          <div className="flex justify-end mb-4 lg:hidden">
            <button onClick={() => setMobileOpen(false)} aria-label="Close filter menu">
              <FiX size={28} className="text-[#6b4f22]" />
            </button>
          </div>

          <h2 className="text-2xl font-serif text-[#6b4f22] mb-4">
            Filter Categories
          </h2>

          {/* Search (Sidebar) */}
          <div className="relative mb-5">
            <div className="flex items-center bg-[#fff8e5] rounded-full shadow-inner border border-yellow-300">
              <span className="absolute left-4 text-gray-400">
                <FiSearch />
              </span>
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full rounded-full pl-12 pr-4 py-2.5 bg-[#fffaf0] focus:outline-none focus:ring-1 focus:ring-yellow-400"
              />
            </div>
          </div>

          {/* Category list */}
          <div className="space-y-3">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-yellow-100/50 cursor-pointer transition"
              >
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 accent-yellow-300 border-yellow-400"
                />
                <span className="text-[#6b4f22] font-medium">{cat.name}</span>
              </label>
            ))}
          </div>
        </aside>
        
        {/* MOBILE OVERLAY */}
        {mobileOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          ></div>
        )}

        {/* RIGHT CONTENT */}
        {/* Key Changes: 
            1. Added `w-full` for full width on small screens.
            2. Adjusted vertical padding `py-6` and horizontal padding `px-4 sm:px-6`
        */}
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl sm:text-4xl font-serif text-[#6b4f22] text-center mt-2 lg:mt-11">
            Verified Industrial Suppliers
          </h1>

          <p className="mt-2 text-center text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Trusted companies · Bulk orders · Fast delivery · Quality assurance
          </p>

          {/* Search (Main Content) */}
          <div className="w-full max-w-xl relative mx-auto mt-6">
            <div className="flex items-center bg-[#fff8e5] rounded-full shadow-lg border border-yellow-300">
              <span className="absolute left-5 text-gray-400">
                <FiSearch size={20} />
              </span>

              <input
                type="text"
                placeholder="Search suppliers or products"
                className="w-full rounded-full pl-12 pr-6 py-3 bg-[#fffaf0] focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>
          
          {/* Suppliers Cards */}
          {/* Key Change: Adjusted grid columns for better flow on different screen sizes */}
          <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {suppliers.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-10">
                No suppliers found. Check your{" "}
                <code className="bg-gray-100 p-1 rounded">src/data/suppliers.json</code> format (should be array or
                object with "supplier" / "suppliers").
              </div>
            )}

            {suppliers.map((sup) => (
              <div
                key={sup.id ?? sup.name}
                className="bg-white border-2 border-yellow-300 rounded-3xl p-5 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {sup.verified && (
                  <div className="inline-block self-start bg-gradient-to-r from-yellow-200 to-yellow-100 text-[#8a5f1f] text-sm px-4 py-1 rounded-full shadow mb-2">
                    Verified Supplier
                  </div>
                )}

                <div className="flex items-center gap-4 mt-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-full border border-yellow-300 overflow-hidden bg-white flex items-center justify-center">
                    {sup.logo ? (
                      // use provided logo
                      <img
                        src={sup.logo}
                        alt={sup.name}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      // fallback to uploaded gif image if no logo present
                      <img
                        src={FALLBACK_LOGO}
                        alt="fallback"
                        className="w-full h-full object-contain p-1"
                      />
                    )}
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-[#6b4f22] leading-tight">
                      {sup.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{sup.location}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleNavigate(
                      `/seller-profile/${
                        sup.id ?? encodeURIComponent(sup.name)
                      }`
                    );
                  }}
                  className="mt-5 w-full bg-yellow-100 text-[#8a5f1f] font-medium py-2 rounded-full shadow-md hover:bg-yellow-200 transition duration-200 self-end"
                >
                  View Profile & Products
                </button>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}