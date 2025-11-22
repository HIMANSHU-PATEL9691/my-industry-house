import React from "react";

// ---------------- PRODUCT CARD ----------------
export const ProductCard = ({ product, onClick }) => {
    return (
        <div
            className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-xl transition"
            onClick={() => onClick(product)}
        >
            <div className="h-40 bg-gray-200 rounded mb-3 flex items-center justify-center">
                <span className="text-gray-700">Image</span>
            </div>
            <h3 className="font-bold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.category}</p>
        </div>
    );
};

// ---------------- PRODUCT MODAL ----------------
export const ProductModal = ({ product, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-96">
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="mt-2">{product.description}</p>
                <button
                    onClick={onClose}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

// ---------------- CONTACT MODAL ----------------
export const ContactSupplierModal = ({ product, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-96">
                <h2 className="text-xl font-bold">Contact Supplier</h2>
                <p className="mt-2">Product: {product.name}</p>

                <button
                    onClick={onClose}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

// ---------------- COMPARE BAR ----------------
export const CompareBar = ({ selectedProducts, onCompare }) => {
    if (!selectedProducts.length) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex justify-between items-center">
            <p>{selectedProducts.length} items selected</p>
            <button
                onClick={onCompare}
                className="bg-yellow-500 px-4 py-2 rounded"
            >
                Compare Now
            </button>
        </div>
    );
};

// ---------------- COMPARISON MODAL ----------------
export const ComparisonModal = ({ products, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-[600px]">
                <h2 className="text-xl font-bold mb-4">Compare Products</h2>

                {products.map((p) => (
                    <div key={p._id} className="border p-3 rounded mb-2">
                        <h3 className="font-bold">{p.name}</h3>
                        <p className="text-sm">{p.category}</p>
                    </div>
                ))}

                <button
                    onClick={onClose}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

// ---------------- TESTIMONIALS ----------------
export const Testimonials = () => {
    return (
        <div className="py-10 text-center bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">What Customers Say</h2>
            <p className="text-gray-700">⭐⭐⭐⭐⭐ Excellent B2B Platform!</p>
        </div>
    );
};

// ---------------- PRICING SECTION ----------------
export const HomePricing = () => {
    return (
        <div className="py-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Pricing Plans</h2>
            <p className="text-gray-700">Basic • Premium • Enterprise</p>
        </div>
    );
};
