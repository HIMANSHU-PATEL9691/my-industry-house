import React from "react";

const FALLBACK = "/mnt/data/product.jpg";

// Reusable Tailwind Button
const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-lg font-medium transition bg-yellow-400 text-white hover:bg-yellow-500 ${className}`}
  >
    {children}
  </button>
);

// PRODUCT CARD — now accepts MULTIPLE products
const ProductCard = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
    {products?.map((product, i) => (
      <div key={i} className="overflow-hidden bg-white rounded-xl shadow">
        <div className="w-full h-48 flex items-center justify-center overflow-hidden">
          <img
            src={product?.image || FALLBACK}
            alt={product?.name || "product"}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-1 truncate">
            {product?.name}
          </h4>
          <p className="text-sm text-gray-500">{product?.category}</p>

          <div className="mt-3 flex justify-between items-center">
            <span className="text-xl font-bold text-yellow-700">
              {product?.price}
            </span>

            <Button className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
              Inquire
            </Button>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Min Order: {product?.minOrder}
          </p>
        </div>
      </div>
    ))}
  </div>
);

// DEAL OF THE DAY CARD
const DealItem = ({ product }) => (
  <div className="border-2 border-yellow-400 rounded-xl p-4 flex gap-4 items-center bg-white shadow-sm">
    <img
      src={product?.image || FALLBACK}
      className="w-32 h-32 object-cover rounded-lg"
      alt="deal"
    />

    <div>
      <h3 className="text-xl font-semibold text-gray-800">{product?.name}</h3>
      <p className="text-gray-500 text-sm">{product?.category}</p>
      <p className="mt-2 text-yellow-700 font-bold text-lg">{product?.price}</p>

      <p className="text-xs text-gray-400">Min Order: {product?.minOrder}</p>

      <button className="mt-3 px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition">
        Inquire
      </button>
    </div>
  </div>
);

export default function ProductPage({ products = [] }) {
  return (
    <div className="p-6 space-y-10">

      {/* Latest Products */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Latest Products</h2>
          <Button className="bg-transparent text-gray-700 hover:bg-gray-100">
            View All Products
          </Button>
        </div>

        <ProductCard products={products} />
      </section>

      {/* Promo Banners */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-blue-100 rounded-2xl p-6 flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <h3 className="text-xl font-semibold">Bulk Construction Supplies</h3>
            <p className="text-gray-700">Starting from just $199!</p>
            <Button>Shop Now</Button>
          </div>

          <img
            src="/images/login.png"
            className="w-56 h-56 object-cover rounded-xl flex-shrink-0 ml-4"
            alt=""
          />
        </div>

        <div className="bg-yellow-100 rounded-2xl p-6 flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <h3 className="text-xl font-semibold">Premium Hardware Tools</h3>
            <p className="text-gray-700">Highly durable & long-lasting.</p>
            <Button>Shop Now</Button>
          </div>

          <img
            src={FALLBACK}
            className="w-56 h-56 object-cover rounded-xl flex-shrink-0 ml-4"
            alt=""
          />
        </div>

      </section>

      {/* Best Selling Products */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Best Selling Products</h2>
          <Button className="bg-transparent text-gray-700 hover:bg-gray-100">
            View All
          </Button>
        </div>

        <ProductCard products={products} />
      </section>

      {/* Deal Of The Day */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Deal Of The Day</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.slice(0, 3).map((p, i) => (
            <DealItem key={i} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
}
