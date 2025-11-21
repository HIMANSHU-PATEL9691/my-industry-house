const Contact = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Contact Us</h1>

      <form className="mt-6 space-y-4 max-w-md">
        <input type="text" placeholder="Your Name" className="w-full border px-4 py-2 rounded" />
        <input type="email" placeholder="Email" className="w-full border px-4 py-2 rounded" />
        <textarea placeholder="Message" className="w-full border px-4 py-2 rounded"></textarea>

        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
