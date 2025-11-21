import React, { useState } from "react";
import {
  Search,
  Filter,
  Boxes,
  Factory,
  ArrowRightCircle,
  IndianRupee,
} from "lucide-react";

export default function Products() {
  const [search, setSearch] = useState("");

  const categories = [
    { name: "Machinery", icon: <Factory size={20} /> },
    { name: "Industrial Tools", icon: <Boxes size={20} /> },
    { name: "Electrical Items", icon: <Boxes size={20} /> },
    { name: "Safety Products", icon: <Boxes size={20} /> },
    { name: "Construction Material", icon: <Boxes size={20} /> },
    { name: "Packaging Material", icon: <Boxes size={20} /> },
  ];

  const products = [
    {
      name: "Industrial Air Compressor",
      price: "₹45,000",
      moq: "1 Unit",
      supplier: "TechAir Industries",
      img: "/p1.jpg",
    },
    {
      name: "Hydraulic Power Press",
      price: "₹1,25,000",
      moq: "1 Unit",
      supplier: "SteelPro Machines",
      img: "/p2.jpg",
    },
    {
      name: "Safety Helmet (ISI Mark)",
      price: "₹180",
      moq: "50 Pcs",
      supplier: "SafeGuard Equipments",
      img: "/p3.jpg",
    },
    {
      name: "Packaging Carton Box",
      price: "₹22",
      moq: "500 Pcs",
      supplier: "PackWell Solutions",
      img: "/p4.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
        <Boxes size={35} /> Products & Catalogs
      </h1>
      <p className="text-gray-600 mb-6">
        Browse verified industrial products from trusted suppliers across India.
      </p>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Box */}
        <div className="flex bg-white w-full md:w-1/2 rounded-xl shadow border">
          <input
            type="text"
            className="flex-1 px-4 py-2 text-sm outline-none"
            placeholder="Search machinery, tools, materials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-600 px-4 text-white rounded-r-xl">
            <Search size={20} />
          </button>
        </div>

        {/* Filter Button */}
        <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition font-medium">
          <Filter size={20} /> Filters
        </button>
      </div>

      {/* CATEGORIES */}
      <h2 className="text-xl font-semibold mb-3">Categories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-10">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl p-4 shadow hover:shadow-lg cursor-pointer text-center flex flex-col items-center gap-2"
          >
            <span className="text-blue-600">{cat.icon}</span>
            <p className="font-medium text-sm">{cat.name}</p>
          </div>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <h2 className="text-xl font-semibold mb-3">Popular Products</h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p, i) => (
          <div
            key={i}
            className="bg-white border rounded-2xl shadow hover:shadow-xl overflow-hidden"
          >
            <img src={p.img} alt={p.name} className="w-full h-40 object-cover" />

            <div className="p-4">
              <h3 className="font-bold text-lg">{p.name}</h3>

              <p className="text-blue-700 font-semibold mt-2 flex items-center gap-2">
                <IndianRupee size={18} /> {p.price}
              </p>

              <p className="text-gray-600 mt-1">MOQ: {p.moq}</p>

              <p className="text-gray-500 text-sm mt-1">
                Supplier: <span className="font-medium text-gray-800">{p.supplier}</span>
              </p>

              <button className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700">
                <ArrowRightCircle size={18} /> Get Best Price
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
