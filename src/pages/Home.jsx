import React, { useState, useEffect, useMemo } from 'react';
import { Search, Heart, Eye, Minus, X, Factory, DollarSign, Users, Grid, Package, Zap, FlaskConical, Utensils, Folder, CheckCircle, Truck, Shield, Quote, Menu, Briefcase, MessageSquare, Globe, User, Plus, ShoppingCart } from 'lucide-react';

// --- MOCK DATA ---
const MOCK_PRODUCTS = [
    { _id: 'p1', name: 'CNC Lathe Machine', price: 15000, supplier: 'PrecisionFab', isFeatured: true, rating: 4.8, minOrder: 1, details: 'High-precision industrial lathe with automated turret.' },
    { _id: 'p2', name: 'PCB Assembly Robot', price: 22000, supplier: 'TechBotics', isFeatured: true, rating: 4.5, minOrder: 1, details: 'Fast, automated PCB assembly robot with vision system.' },
    { _id: 'p3', name: 'Bulk Chemical Mixer', price: 8000, supplier: 'ChemSupply Co', isFeatured: false, rating: 4.2, minOrder: 5, details: 'Stainless steel chemical mixer for high-volume production.' },
    { _id: 'p4', name: 'High Torque Motor', price: 500, supplier: 'ElectroDrives', isFeatured: true, rating: 4.9, minOrder: 20, details: 'Heavy duty motor for continuous industrial operation.' },
    { _id: 'p5', name: 'Industrial Valve Set', price: 1200, supplier: 'Flow Control', isFeatured: false, rating: 4.1, minOrder: 10, details: 'Precision flow control valve set, corrosion resistant.' },
    { _id: 'p6', name: 'Safety Goggles (Bulk)', price: 3, supplier: 'SafeGear', isFeatured: true, rating: 4.7, minOrder: 1000, details: 'ANSI approved industrial safety eyewear.' },
];

const mockTestimonials = [
    { quote: "IndustryHouse transformed our sourcing process. We cut down lead times by 30% and found three new high-quality metal suppliers almost instantly.", name: "Aarav K.", title: "Procurement Manager, Metalfab Inc." },
    { quote: "The platform's verification process gave us the confidence to partner with global manufacturers. It's the most reliable B2B marketplace we've used.", name: "Sarah L.", title: "CEO, Stellar Automation" },
    { quote: "Excellent service and competitive pricing. We sourced a complex PCB component that we couldn't find anywhere else. Highly recommend.", name: "Chen W.", title: "R&D Director, Tech Solutions" },
];

// Adjusted categories for the new theme
const mockCategories = [
    { name: 'Machinery', icon: Factory, color: 'text-teal-600', bgColor: 'bg-teal-100' },
    { name: 'Components', icon: Zap, color: 'text-cyan-600', bgColor: 'bg-cyan-100' },
    { name: 'Chemicals', icon: FlaskConical, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
    { name: 'Logistics', icon: Truck, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
    { name: 'Safety Gear', icon: Shield, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { name: 'Tools', icon: Package, color: 'text-fuchsia-600', bgColor: 'bg-fuchsia-100' },
];

const mockEssentials = [
    { name: 'Printer Toner Cartridges', image: 'Printer', link: '/essentials/toner' },
    { name: 'Power Tools & Equip.', image: 'Power Tools', link: '/essentials/tools' },
    { name: 'CCTV Cameras', image: 'CCTV Camera', link: '/essentials/cctv' },
    { name: 'Office Supplies', image: 'Office Supplies', link: '/essentials/office' },
];

// --- MOCK HOOKS (INLINED) ---

const useAuth = () => ({
    products: MOCK_PRODUCTS,
    isAuthenticated: false,
    login: () => console.log('Mock Login'),
});

const useFavorites = () => {
    const [favorites, setFavorites] = useState(['p4']);
    const isFavorite = (id) => favorites.includes(id);
    const handleToggleFavorite = (id) => {
        setFavorites(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
        console.log(`Toggled favorite for: ${id}`);
    };
    return { isFavorite, handleToggleFavorite };
};

const useRecentlyViewed = () => {
    const [recentlyViewedIds, setRecentlyViewedIds] = useState(['p5', 'p3']);
    const addRecentlyViewed = (id) => {
        setRecentlyViewedIds(prev => {
            const newList = prev.filter(p => p !== id);
            return [id, ...newList].slice(0, 3);
        });
        console.log(`Added to recently viewed: ${id}`);
    };
    return { recentlyViewedIds, addRecentlyViewed };
};

const useCompare = () => {
    const [compareIds, setCompareIds] = useState([]);
    const isComparing = (id) => compareIds.includes(id);
    const handleToggleCompare = (id) => {
        setCompareIds(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id].slice(0, 3));
        console.log(`Toggled compare for: ${id}`);
    };
    const clearCompareList = () => setCompareIds([]);
    return { compareIds, handleToggleCompare, isComparing, clearCompareList };
};

// --- CORE SUB-COMPONENTS ---

const Link = ({ to, children, className = '' }) => (
    <a href="#" onClick={(e) => { e.preventDefault(); console.log(`Navigating to: ${to}`); }} className={className}>
        {children}
    </a>
);

// Adjusted ProductCard for #B4E9E9 theme
const ProductCard = ({ product, onClick, isFavorite, onToggleFavorite, onToggleCompare, isComparing }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 flex flex-col">
        <div 
            className="h-40 bg-gray-100 flex items-center justify-center relative cursor-pointer"
            onClick={() => onClick(product)}
        >
            {/* Using a light cyan background for the placeholder to match the theme: #B4E9E9 / #005050 */}
            <img 
                src={`https://placehold.co/300x160/B4E9E9/005050?text=${product.name.split(' ')[0]}`}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/300x160/CBD5E1/475569?text=Product`; }}
            />
            <div className="absolute top-2 right-2 flex gap-1">
                <button 
                    className={`p-2 rounded-full transition ${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                    onClick={(e) => { e.stopPropagation(); onToggleFavorite(product._id); }}
                    aria-label="Toggle Favorite"
                >
                    <Heart size={18} />
                </button>
            </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold text-gray-800 truncate" onClick={() => onClick(product)}>{product.name}</h3>
            {/* Price: Using a medium teal color */}
            <p className="text-2xl font-bold my-1" style={{ color: '#007B7B' }}>${product.price.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mb-2">MOQ: {product.minOrder}</p>
            <div className="mt-auto flex justify-between items-center pt-2 border-t border-gray-100">
                {/* Compare Button: Using light accent #B4E9E9 and primary accent #00A3A3 */}
                <button 
                    className={`text-sm py-1 px-3 rounded-full transition ${isComparing ? 'text-white' : 'text-gray-900'}`}
                    style={{ 
                        backgroundColor: isComparing ? '#00A3A3' : '#B4E9E9',
                        color: isComparing ? '#FFFFFF' : '#005050',
                    }}
                    onClick={(e) => { e.stopPropagation(); onToggleCompare(product._id); }}
                >
                    {isComparing ? 'Comparing' : 'Compare'}
                </button>
                <button className="text-sm font-medium" style={{ color: '#00A3A3' }} onClick={() => onClick(product)}>
                    Details &rarr;
                </button>
            </div>
        </div>
    </div>
);

// Adjusted ProductModal for #B4E9E9 theme
const ProductModal = ({ product, onClose, onContact, onViewProduct }) => {
    useEffect(() => {
        onViewProduct(product._id);
    }, [product._id, onViewProduct]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative transform transition-all duration-300 scale-100" onClick={e => e.stopPropagation()}>
                <button className="absolute top-3 right-3 p-2 bg-gray-100 rounded-full hover:bg-gray-200 z-10" onClick={onClose}>
                    <X size={20} />
                </button>
                <div className="p-8 grid md:grid-cols-2 gap-8">
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img 
                            src={`https://placehold.co/400x300/B4E9E9/005050?text=${product.name.split(' ')[0]}`}
                            alt={product.name}
                            className="w-full h-full object-contain rounded-lg"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
                        <p className="text-4xl font-extrabold my-3" style={{ color: '#007B7B' }}>${product.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-500 mb-4">Supplier: <span className="font-semibold" style={{ color: '#00A3A3' }}>{product.supplier}</span></p>
                        
                        <div className="space-y-3 text-gray-700">
                            {/* Checkmarks: Using a moderate teal */}
                            <p className="flex items-center gap-2"><CheckCircle size={18} style={{ color: '#00A3A3' }} /> **Details:** {product.details}</p>
                            <p className="flex items-center gap-2"><CheckCircle size={18} style={{ color: '#00A3A3' }} /> **MOQ:** {product.minOrder} units</p>
                            <p className="flex items-center gap-2"><CheckCircle size={18} style={{ color: '#00A3A3' }} /> **Rating:** {product.rating}</p>
                        </div>

                        {/* Button: Using primary accent color */}
                        <button onClick={onContact} className="w-full mt-6 text-white py-3 rounded-lg text-lg font-semibold transition duration-150 shadow-md"
                            style={{ backgroundColor: '#00A3A3', hoverBackgroundColor: '#007B7B' }}>
                            Contact Supplier for Quote
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Adjusted ContactSupplierModal for #B4E9E9 theme
const ContactSupplierModal = ({ product, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Inquire about {product.name}</h3>
            <p className="text-gray-600 mb-4">Enter your requirements to get a customized quote from {product.supplier}.</p>
            
            <form className="space-y-4">
                <input type="number" placeholder="Quantity needed" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
                <textarea placeholder="Specific requirements or questions..." rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required></textarea>
                {/* Button: Using primary accent color */}
                <button type="submit" className="w-full text-white py-3 rounded-lg font-semibold transition duration-150"
                    style={{ backgroundColor: '#00A3A3', hoverBackgroundColor: '#007B7B' }}>
                    Send Inquiry
                </button>
            </form>
            <button className="absolute top-3 right-3" onClick={onClose}><X size={20} className="text-gray-500" /></button>
        </div>
    </div>
);

// Adjusted CompareBar for #B4E9E9 theme
const CompareBar = ({ selectedProducts, onRemove, onClear, onCompare }) => {
    if (selectedProducts.length === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 text-white p-3 shadow-2xl z-40" style={{ backgroundColor: '#005050' }}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">
                    <span className="font-semibold flex-shrink-0">{selectedProducts.length} Items Selected:</span>
                    {selectedProducts.map(p => (
                        <div key={p._id} className="rounded-full py-1 px-3 text-sm flex items-center gap-2" style={{ backgroundColor: '#007B7B' }}>
                            {p.name}
                            <button onClick={() => onRemove(p._id)} className="text-white hover:text-red-300 ml-1" aria-label={`Remove ${p.name}`}>
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex gap-3 flex-shrink-0">
                    <button onClick={onClear} className="text-sm hover:text-gray-300">Clear All</button>
                    <button 
                        onClick={onCompare} 
                        disabled={selectedProducts.length < 2}
                        className={`py-2 px-4 rounded-lg text-sm font-bold transition ${selectedProducts.length >= 2 ? 'text-gray-900 hover:opacity-90' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                        style={{ backgroundColor: selectedProducts.length >= 2 ? '#B4E9E9' : undefined }}
                    >
                        Compare ({selectedProducts.length})
                    </button>
                </div>
            </div>
        </div>
    );
};

// Adjusted ComparisonModal for #B4E9E9 theme
const ComparisonModal = ({ products, onClose }) => {
    const features = ['Price', 'Supplier', 'MOQ', 'Rating', 'Details'];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl relative" onClick={e => e.stopPropagation()}>
                <button className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 z-10" onClick={onClose}>
                    <X size={20} />
                </button>
                <div className="p-8">
                    {/* Header: Using primary accent color */}
                    <h3 className="text-3xl font-bold mb-6" style={{ color: '#00A3A3' }}>Product Comparison ({products.length})</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-200">
                                    <th className="sticky left-0 bg-gray-100 px-4 py-3 text-left text-sm font-semibold text-gray-700 w-40">Feature</th>
                                    {products.map(p => (
                                        <th key={p._id} className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-l border-gray-200">
                                            {p.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {features.map(feature => (
                                    <tr key={feature} className="border-b hover:bg-gray-50">
                                        <td className="sticky left-0 bg-white px-4 py-3 font-medium text-gray-800 border-r border-gray-200">{feature}</td>
                                        {products.map(p => (
                                            <td key={`${p._id}-${feature}`} className="px-4 py-3 text-sm text-gray-600 border-l border-gray-100">
                                                {feature === 'Price' ? `$${p.price.toLocaleString()}` :
                                                feature === 'Supplier' ? p.supplier :
                                                feature === 'MOQ' ? `${p.minOrder} units` :
                                                feature === 'Rating' ? `${p.rating} / 5` :
                                                p.details}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Adjusted Testimonials for #B4E9E9 theme
const Testimonials = () => (
    // Dark background for strong contrast
    <div className="home-section text-white py-16 px-4 sm:px-6 lg:px-8 rounded-2xl shadow-xl my-12" style={{ backgroundColor: '#005050' }}>
        {/* Title: Using light accent color for visibility */}
        <h2 className="section-title text-center mb-10" style={{ color: '#B4E9E9' }}>Trusted by Industry Leaders</h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-gray-800">
                    {/* Quote icon: Using primary accent color */}
                    <Quote className="h-6 w-6 mb-4" style={{ color: '#00A3A3' }} />
                    <p className="italic mb-4">"{testimonial.quote}"</p>
                    {/* Name: Using primary accent color */}
                    <p className="font-bold" style={{ color: '#00A3A3' }}>{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
            ))}
        </div>
    </div>
);

// Adjusted AuthPopup for #B4E9E9 theme
const AuthPopup = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-xl w-full max-w-sm p-8 shadow-2xl relative text-center" onClick={e => e.stopPropagation()}>
            <button className="absolute top-3 right-3" onClick={onClose}><X size={20} className="text-gray-500" /></button>
            {/* Icon: Using primary accent color */}
            <User size={48} className="mx-auto mb-4" style={{ color: '#00A3A3' }} />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Unlock Full Access</h3>
            <p className="text-gray-600 mb-6">Log in or register now to save favorites, contact suppliers, and compare products.</p>
            {/* Button: Using primary accent color */}
            <Link to="/register" className="w-full inline-block text-white py-3 rounded-lg font-semibold transition duration-150"
                style={{ backgroundColor: '#00A3A3', hoverBackgroundColor: '#007B7B' }}>
                Sign Up for Free
            </Link>
        </div>
    </div>
);

// Adjusted HomePricing for #B4E9E9 theme
const HomePricing = () => (
    <div className="home-section bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 rounded-2xl shadow-inner my-12">
        {/* Title: Using primary accent color */}
        <h2 className="section-title text-center mb-10" style={{ color: '#00A3A3' }}>Pricing Plans for Sellers</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-gray-300 text-center">
                <h3 className="text-xl font-bold mb-2">Basic</h3>
                <p className="text-4xl font-extrabold mb-4">$0 <span className="text-base font-normal text-gray-500">/ month</span></p>
                <ul className="text-left space-y-2 text-gray-700 mb-6">
                    {/* Checkmark: Using primary accent color */}
                    <li className='flex items-center'><CheckCircle size={18} style={{ color: '#00A3A3' }} className='mr-2'/> 10 Product Listings</li>
                    <li className='flex items-center'><CheckCircle size={18} style={{ color: '#00A3A3' }} className='mr-2'/> Standard Visibility</li>
                    <li className='flex items-center'><CheckCircle size={18} style={{ color: '#00A3A3' }} className='mr-2'/> Basic Buyer Leads</li>
                </ul>
                <button className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition">Get Started</button>
            </div>
            {/* Popular Plan: Using primary accent color for strong visual contrast */}
            <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-teal-500 text-center relative transform scale-105" style={{ borderColor: '#00A3A3' }}>
                <span className="absolute top-0 right-0 text-white text-xs font-bold py-1 px-3 rounded-bl-lg" style={{ backgroundColor: '#00A3A3' }}>POPULAR</span>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#00A3A3' }}>Premium</h3>
                <p className="text-5xl font-extrabold mb-4">$49 <span className="text-base font-normal text-gray-500">/ month</span></p>
                <ul className="text-left space-y-2 text-gray-700 mb-6">
                    <li className='flex items-center'><CheckCircle size={18} style={{ color: '#00A3A3' }} className='mr-2'/> Unlimited Listings</li>
                    <li className='flex items-center'><CheckCircle size={18} style={{ color: '#00A3A3' }} className='mr-2'/> High Visibility Boost</li>
                    <li className='flex items-center'><CheckCircle size={18} style={{ color: '#00A3A3' }} className='mr-2'/> Qualified Buyer Leads</li>
                    <li className='flex items-center'><CheckCircle size={18} style={{ color: '#00A3A3' }} className='mr-2'/> Dedicated Support</li>
                </ul>
                {/* Button: Using primary accent color */}
                <button className="w-full text-white py-3 rounded-lg text-lg font-semibold transition" style={{ backgroundColor: '#00A3A3', hoverBackgroundColor: '#007B7B' }}>Choose Plan</button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-gray-300 text-center">
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <p className="text-4xl font-extrabold mb-4">$99 <span className="text-base font-normal text-gray-500">/ month</span></p>
                <ul className="text-left space-y-2 text-gray-700 mb-6">
                    <li className='flex items-center'><CheckCircle size={18} style={{ color: '#00A3A3' }} className='mr-2'/> All Premium features</li>
                    <li className='flex items-center'><CheckCircle size={18} style={{ color: '#00A3A3' }} className='mr-2'/> Custom Branding</li>
                    <li className='flex items-center'><CheckCircle size={18} style={{ color: '#00A3A3' }} className='mr-2'/> Market Analytics</li>
                </ul>
                <button className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition">Get Started</button>
            </div>
        </div>
    </div>
);

// New components (Categories, Essentials, Advantages) adjusted for #B4E9E9 theme
const TopCategories = ({ products, handleOpenModal, isFavorite, handleToggleFavorite, isComparing, handleToggleCompare }) => (
    <div className="home-section my-16">
        <h2 className="section-title text-3xl font-bold text-gray-800 text-center mb-12">Explore Our Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {mockCategories.map((category, index) => (
                <Link to={`/category/${category.name.toLowerCase()}`} key={index} className="flex flex-col items-center p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300 bg-white border border-gray-100">
                    <div className={`${category.bgColor} p-4 rounded-full mb-3`}>
                        <category.icon size={32} className={category.color} />
                    </div>
                    <p className="text-sm font-semibold text-gray-700 text-center">{category.name}</p>
                </Link>
            ))}
        </div>
        
        <div className="mt-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Trending Products in Machinery</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.slice(0, 4).map(product => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onClick={() => handleOpenModal(product)}
                        isFavorite={isFavorite(product._id)}
                        onToggleFavorite={handleToggleFavorite}
                        onToggleCompare={handleToggleCompare}
                        isComparing={isComparing(product._id)}
                    />
                ))}
            </div>
        </div>
    </div>
);

const IndustrialEssentials = () => (
    <div className="home-section my-16 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="section-title text-3xl font-bold text-gray-800 mb-6 flex items-center">
            {/* Icon: Using primary accent color */}
            <Folder size={30} style={{ color: '#00A3A3' }} className="mr-3" />
            Industrial Essentials
        </h2>
        <p className="text-gray-600 mb-6">Find daily consumables and MRO (Maintenance, Repair, and Operations) supplies.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {mockEssentials.map((item, index) => (
                <Link to={item.link} key={index} className="block group">
                    <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition duration-300">
                        {/* Placeholder: Using light accent #B4E9E9 / #005050 */}
                        <img 
                            src={`https://placehold.co/300x200/B4E9E9/005050?text=${item.image.replace(/\s/g, '+')}`} 
                            alt={item.name} 
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition"></div>
                        <p className="absolute bottom-3 left-3 text-white font-semibold text-base">{item.name}</p>
                    </div>
                </Link>
            ))}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
                <Link to="/products/industrial-packaging" className="block group">
                    {/* Link background: Using light accent #B4E9E9 */}
                    <div className="p-4 rounded-lg border border-teal-200 hover:bg-teal-100 transition" style={{ backgroundColor: '#B4E9E9' }}>
                        <p className="font-bold" style={{ color: '#005050' }}>Industrial Packaging & Films</p>
                        <p className="text-sm text-gray-500">View All</p>
                    </div>
                </Link>
                <Link to="/products/bulk-chemicals" className="block group">
                    <div className="p-4 bg-teal-50 rounded-lg border border-teal-200 hover:bg-teal-100 transition">
                        <p className="font-bold text-teal-700">Bulk Chemicals & Solvents</p>
                        <p className="text-sm text-gray-500">View All</p>
                    </div>
                </Link>
            </div>
        </div>
    </div>
);

const AdvantagesSection = () => (
    // Background: Using light accent #B4E9E9
    <div className="home-section my-16 p-10 rounded-xl shadow-inner max-w-7xl mx-auto" style={{ backgroundColor: '#B4E9E9' }}>
        {/* Title: Using primary accent color */}
        <h2 className="section-title text-3xl font-bold text-center mb-8" style={{ color: '#00A3A3' }}>Advantages to Our Program</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {/* Cards: Using primary accent color for border */}
            <div className="p-4 bg-white rounded-lg shadow-md border-b-4" style={{ borderColor: '#00A3A3' }}>
                <Briefcase size={36} className="mx-auto mb-3" style={{ color: '#00A3A3' }} />
                <p className="font-semibold text-gray-800">Smart Business Tools</p>
                <p className="text-sm text-gray-500">Data insights to guide procurement.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md border-b-4" style={{ borderColor: '#00A3A3' }}>
                <Shield size={36} className="mx-auto mb-3" style={{ color: '#00A3A3' }} />
                <p className="font-semibold text-gray-800">Verified Suppliers</p>
                <p className="text-sm text-gray-500">Partner with confidence.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md border-b-4" style={{ borderColor: '#00A3A3' }}>
                <Globe size={36} className="mx-auto mb-3" style={{ color: '#00A3A3' }} />
                <p className="font-semibold text-gray-800">Global Reach</p>
                <p className="text-sm text-gray-500">Source internationally with ease.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md border-b-4" style={{ borderColor: '#00A3A3' }}>
                <DollarSign size={36} className="mx-auto mb-3" style={{ color: '#00A3A3' }} />
                <p className="font-semibold text-gray-800">Transparent Pricing</p>
                <p className="text-sm text-gray-500">Get the best value for your spend.</p>
            </div>
        </div>
    </div>
);

// --- MAIN HOME COMPONENT ---

const Home = () => {
    const { products, isAuthenticated } = useAuth();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isContactModalOpen, setContactModalOpen] = useState(false);
    
    const { isFavorite, handleToggleFavorite } = useFavorites();
    const { recentlyViewedIds, addRecentlyViewed } = useRecentlyViewed();
    const { compareIds, handleToggleCompare, isComparing, clearCompareList } = useCompare();
    
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0); // Custom slider state

    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0,
    });

    const banners = [
        {
            type: 'image',
            desktopImageUrl: 'https://images.unsplash.com/photo-1517070208548-269324c4491f?q=80&w=2070&auto=format&fit=crop',
            mobileImageUrl: 'https://images.unsplash.com/photo-1517070208548-269324c4491f?q=80&w=1080&auto=format&fit=crop',
            title: 'Sourcing Simplified for Industry',
            subtitle: 'Connect with verified manufacturers and find all your components in one place.',
            buttonText: 'Post an RFQ Now',
            buttonLink: '/rfq',
            duration: 5000
        },
        {
            type: 'image',
            desktopImageUrl: 'https://images.unsplash.com/photo-1581092921440-4c3030e1c083?q=80&w=2070&auto=format&fit=crop',
            mobileImageUrl: 'https://images.unsplash.com/photo-1581092921440-4c3030e1c083?q=80&w=1080&auto=format&fit=crop',
            title: 'Advanced Solutions for Modern Industry',
            subtitle: 'Find cutting-edge machinery and tools to boost your productivity.',
            buttonText: 'Discover Machinery',
            buttonLink: '/products?category=Hardware',
            duration: 5000
        }
    ];

    // --- useEffects for AuthPopup, Countdown, and Custom Slider ---

    // Auth Popup
    useEffect(() => {
        const popupShown = sessionStorage.getItem('authPopupShown');
        if (!popupShown && !isAuthenticated) {
            const timer = setTimeout(() => {
                setShowAuthPopup(true);
                sessionStorage.setItem('authPopupShown', 'true');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isAuthenticated]);

    // Countdown Timer
    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date("2026-02-1") - +new Date();
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return timeLeft;
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Custom Auto-Slider Logic
    useEffect(() => {
        const duration = banners[activeSlide]?.duration || 5000;
        const autoSlide = setInterval(() => {
            setActiveSlide(prev => (prev + 1) % banners.length);
        }, duration);

        return () => clearInterval(autoSlide);
    }, [activeSlide, banners.length]);


    // --- Memoized Data and Handlers ---

    const featuredProducts = useMemo(() => products.filter(p => p.isFeatured), [products]);
    const recentlyViewedProducts = useMemo(() => products.filter(p => recentlyViewedIds.includes(p._id)), [products, recentlyViewedIds]);
    
    const handleOpenModal = (product) => setSelectedProduct(product);
    const handleCloseModal = () => {
        setSelectedProduct(null);
        setContactModalOpen(false);
    };
    const handleOpenContactModal = () => {
        if (!isAuthenticated) {
            setShowAuthPopup(true);
        } else {
            setContactModalOpen(true);
        }
    };
    
    const getCompareProducts = () => products.filter(p => compareIds.includes(p._id));

    // --- Render Functions ---

    const renderCountdownItem = (value, unit) => (
        <div className="flex flex-col items-center p-3 bg-white text-gray-800 rounded-lg shadow-inner min-w-[60px]">
            <span className="text-2xl font-extrabold">{value}</span>
            <span className="text-xs font-semibold uppercase">{unit}</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans antialiased">
            {showAuthPopup && <AuthPopup onClose={() => setShowAuthPopup(false)} />}
            
            {/* 1. Hero Slider Section - NO CHANGE to image, just text color */}
            <div className="relative w-full h-[50vh] sm:h-[65vh] overflow-hidden">
                {banners.map((banner, index) => (
                    <div 
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        style={{
                            backgroundImage: `url(${banner.desktopImageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Hero Overlay and Content */}
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        <div className="relative flex flex-col items-center justify-center h-full text-white text-center p-6 z-20">
                            <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">{banner.title}</h1>
                            <p className="text-base sm:text-xl mb-8 max-w-2xl drop-shadow-md">{banner.subtitle}</p>
                            {/* Button: Using primary accent color */}
                            <Link to={banner.buttonLink} className="py-3 px-8 text-white font-bold rounded-full text-lg transition shadow-lg"
                                style={{ backgroundColor: '#00A3A3', hoverBackgroundColor: '#007B7B' }}>
                                {banner.buttonText}
                            </Link>
                        </div>
                    </div>
                ))}
                {/* Slider Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-30">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeSlide ? 'w-8' : 'bg-white opacity-50'}`}
                            style={{ backgroundColor: index === activeSlide ? '#00A3A3' : undefined }}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* 2. Bonus Banner (Fixed Timer) - Using Dark Background & Light Accent */}
            <div className="text-white py-4 px-4 sm:px-6 lg:px-8 shadow-xl" style={{ backgroundColor: '#ffd677' }}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex-1 text-center md:text-left">
                        {/* Title: Using light accent color */}
                        <h3 className="text-xl font-bold" style={{ color: 'BLACK' }}>Limited Time Offer!</h3>
                        <p className="text-sm font-bold"  style={{ color: 'BLACK' }} >
                            Register as a seller now and get a{""}
                            {/* Strong text: Using light accent color */}
                            <strong style={{ color: 'BLACK' }}> FREE premium plan for 3 months!</strong>
                        </p>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="flex gap-2">
                            {renderCountdownItem(timeLeft.days || '00', 'Days')}
                            {renderCountdownItem(timeLeft.hours || '00', 'Hrs')}
                            {renderCountdownItem(timeLeft.minutes || '00', 'Mins')}
                            {renderCountdownItem(timeLeft.seconds || '00', 'Secs')}
                        </div>
                        {/* Button: Using primary accent color */}
                        <Link to="/register" className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-md text-sm font-medium"
                            style={{ backgroundColor: '#BLUE', hoverBackgroundColor: '#d66e29' }}>
                            Register Now
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* 3. Top Categories Section */}
                <TopCategories 
                    products={products}
                    handleOpenModal={handleOpenModal}
                    isFavorite={isFavorite}
                    handleToggleFavorite={handleToggleFavorite}
                    isComparing={isComparing}
                    handleToggleCompare={handleToggleCompare}
                />
                
                {/* 4. Industrial Essentials Section */}
                <IndustrialEssentials />

                {/* 5. Advantages to Our Program Section */}
                <AdvantagesSection />

                {/* 6. Recently Viewed Products */}
                {recentlyViewedProducts.length > 0 && (
                    <div className="my-16">
                        <h2 className="section-title text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Recently Viewed</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {recentlyViewedProducts.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    onClick={() => handleOpenModal(product)}
                                    isFavorite={isFavorite(product._id)}
                                    onToggleFavorite={handleToggleFavorite}
                                    onToggleCompare={handleToggleCompare}
                                    isComparing={isComparing(product._id)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* 7. Featured Products */}
                <div className="my-16">
                    <h2 className="section-title text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onClick={() => handleOpenModal(product)}
                                isFavorite={isFavorite(product._id)}
                                onToggleFavorite={handleToggleFavorite}
                                onToggleCompare={handleToggleCompare}
                                isComparing={isComparing(product._id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
            {/* 8. Seller Pricing */}
            <HomePricing />

            {/* 9. Testimonials */}
            <Testimonials />

            {/* 10. Final CTA - Using light accent background and primary accent button */}
            <div className="py-16 px-4 sm:px-6 lg:px-8 text-center my-12 rounded-2xl shadow-lg max-w-7xl mx-auto" style={{ backgroundColor: '#B4E9E9' }}>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Ready to Start Your Sale?</h2>
                <p className="text-lg text-gray-600 mb-6">Join thousands of businesses that are already thriving on Industry House.</p>
                {/* Button: Using primary accent color */}
                <Link to="/register" className="py-3 px-10 text-white font-bold rounded-full text-lg transition shadow-xl"
                    style={{ backgroundColor: '#00A3A3', hoverBackgroundColor: '#007B7B' }}>
                    Register for Free
                </Link>
            </div>

            {/* 11. Modals */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={handleCloseModal}
                    onContact={handleOpenContactModal}
                    onViewProduct={addRecentlyViewed}
                />
            )}

            {isContactModalOpen && selectedProduct && (
                <ContactSupplierModal
                    product={selectedProduct}
                    onClose={handleCloseModal}
                />
            )}

            {/* 12. Compare Bar */}
            <CompareBar 
                selectedProducts={getCompareProducts()}
                onRemove={handleToggleCompare}
                onClear={clearCompareList}
                onCompare={() => setIsCompareModalOpen(true)}
            />

            {isCompareModalOpen && (
                <ComparisonModal 
                    products={getCompareProducts()}
                    onClose={() => setIsCompareModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Home;