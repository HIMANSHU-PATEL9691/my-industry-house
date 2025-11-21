const Services = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Our Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="p-6 shadow rounded-lg bg-white">
          <h3 className="text-xl font-semibold">Service 1</h3>
          <p className="text-gray-600 mt-2">Best quality service.</p>
        </div>
        <div className="p-6 shadow rounded-lg bg-white">
          <h3 className="text-xl font-semibold">Service 2</h3>
          <p className="text-gray-600 mt-2">Affordable price.</p>
        </div>
        <div className="p-6 shadow rounded-lg bg-white">
          <h3 className="text-xl font-semibold">Service 3</h3>
          <p className="text-gray-600 mt-2">24/7 Support.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
