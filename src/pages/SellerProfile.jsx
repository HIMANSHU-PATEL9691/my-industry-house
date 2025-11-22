// src/pages/SellerProfile.jsx
import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import profileData from "../data/suppliers.json";
import ProductCard from "../components/ProductCard.jsx";

import {
  FiMapPin, FiMail, FiPhone, FiGlobe,
  FiCheckCircle, FiUsers
} from "react-icons/fi";

import { FaIndustry, FaBoxes } from "react-icons/fa";

const FALLBACK_LOGO = "/mnt/data/seller.jpg";

const TabButton = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 text-lg font-medium transition-all duration-300 rounded-t-lg
      ${isActive
        ? "bg-white border-b-4 border-yellow-600 text-yellow-700"
        : "text-gray-600 hover:bg-yellow-50 hover:text-yellow-700 border-b border-gray-300"
      }`}
  >
    {children}
  </button>
);

export default function SellerProfile() {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");

  const { suppliers } = useMemo(() => {
    let arr = [];

    if (Array.isArray(profileData)) {
      arr = profileData.map((s) => ({
        ...s,
        products: Array.isArray(s.products) ? s.products : [],
      }));
    } else if (profileData?.suppliers) {
      arr = profileData.suppliers.map((s) => ({
        ...s,
        products: Array.isArray(s.products) ? s.products : [],
      }));
    }
    return { suppliers: arr };
  }, []);

  const supplier = suppliers.find((s) => String(s.id) === paramId) || suppliers[0];

  if (!supplier) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50">
        <div className="max-w-2xl text-center p-8 bg-white rounded-2xl shadow-md border border-yellow-200">
          <h2 className="text-2xl font-semibold text-yellow-800 mb-3">
            Supplier not found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-yellow-400 hover:bg-yellow-500 text-yellow-800 font-semibold py-2 px-6 rounded-full"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const logoSrc = supplier?.logo ?? FALLBACK_LOGO;
  const products = supplier.products ?? [];
  const contact = supplier.contact ?? {};

  const BrandTile = ({ title, subtitle, Icon }) => (
    <div className="flex items-center gap-4 bg-white rounded-lg px-4 py-3 shadow-md border border-yellow-200 min-w-[180px]">
      <div className="w-12 h-12 flex items-center justify-center rounded-md bg-yellow-50 border border-yellow-200">
        <Icon className="text-yellow-700" size={22} />
      </div>
      <div>
        <div className="text-sm font-semibold text-yellow-800">{title}</div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
    </div>
  );

  const ContactTile = ({ title, value, Icon }) => (
    <div className="flex items-center gap-4 bg-white rounded-lg px-4 py-3 shadow-sm border border-yellow-200 min-w-[220px]">
      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-yellow-50 border border-yellow-200">
        <Icon className="text-yellow-700" size={18} />
      </div>
      <div>
        <div className="text-sm font-medium text-yellow-800">{title}</div>
        <div className="text-xs text-gray-500">{value}</div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <div className="p-6">
            <h3 className="text-2xl text-yellow-800 mb-6">
              About {supplier.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <BrandTile Icon={FaIndustry} title="Established" subtitle={supplier.yearEstablished ?? "—"} />
              <BrandTile Icon={FiUsers} title="Employees" subtitle={(supplier.employeeCount ?? "—") + "+"} />
              <BrandTile Icon={FiCheckCircle} title="Verified" subtitle={supplier.verified ? "Yes" : "No"} />
              <BrandTile Icon={FaBoxes} title={`${products.length} Products`} subtitle="Browse catalog" />
            </div>

            <div className="bg-white rounded-lg p-5 border border-yellow-200 shadow-md">
              <h4 className="text-lg text-yellow-800 mb-3">Company Overview</h4>
              <p className="text-gray-700 leading-relaxed">{supplier.description}</p>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="p-6">
            <h3 className="text-2xl text-yellow-800 mb-6">Contact</h3>

            <div className="flex gap-4 flex-wrap">
              <ContactTile Icon={FiMapPin} title="Address" value={contact.address} />
              <ContactTile Icon={FiPhone} title="Phone" value={contact.phone} />
              <ContactTile Icon={FiMail} title="Email" value={contact.email} />
              <ContactTile Icon={FiGlobe} title="Website" value={contact.website} />
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h3 className="text-2xl text-yellow-800 mb-4">
              All Products ({products.length})
            </h3>

            {products.length === 0 ? (
              <div className="text-gray-600">No products found.</div>
            ) : (
              <ProductCard products={products} />
            )}
          </div>
        );
    }
  };

  return (
    <div className="w-full bg-yellow-50 min-h-screen">

      {/* Top Section */}
      <div className="w-full p-6 md:p-10 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-b-3xl shadow">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          <div className="md:col-span-5 flex justify-center md:justify-start">
            <img
              src={logoSrc}
              className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-yellow-500 shadow-xl"
              alt=""
            />
          </div>

          <div className="md:col-span-7">
            <h1 className="text-3xl md:text-5xl font-bold text-yellow-800">
              {supplier.name}
            </h1>

            <p className="mt-3 flex items-center text-gray-600">
              <FiMapPin className="mr-2 text-yellow-700" />
              {supplier.location}
            </p>

            <p className="mt-4 text-gray-600">
              {supplier.description.slice(0, 180)}...
            </p>

            <div className="mt-6 flex gap-4">
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold py-2 px-5 rounded-lg shadow"
                onClick={() => window.scrollTo({ top: 9999, behavior: "smooth" })}
              >
                Quick Inquiry
              </button>

              <button
                onClick={() => setActiveTab("products")}
                className="bg-white border border-yellow-300 text-yellow-800 py-2 px-5 rounded-lg shadow"
              >
                View Products
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Sticky Tabs */}
      <div className="w-full bg-yellow-400 shadow sticky top-0 z-30">
        <div className="flex justify-center gap-12 py-3 text-lg font-semibold text-yellow-900">
          <span className="cursor-pointer" onClick={() => setActiveTab("products")}>
            Products
          </span>
          <span className="cursor-pointer" onClick={() => setActiveTab("about")}>
            About
          </span>
          <span className="cursor-pointer" onClick={() => setActiveTab("contact")}>
            Contact
          </span>
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="p-6 md:p-12">
        {renderTabContent()}
      </div>
    </div>
  );
}
