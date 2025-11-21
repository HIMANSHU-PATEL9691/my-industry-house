import React, { useState } from "react";
import { FileUp, PlusCircle, Send, Factory, Boxes } from "lucide-react";

export default function SourcingRFQ() {
  const [rfqList, setRfqList] = useState([]);
  const [form, setForm] = useState({
    productName: "",
    quantity: "",
    requirements: "",
    attachment: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRfq = {
      id: Date.now(),
      ...form,
      status: "Pending",
    };
    setRfqList([newRfq, ...rfqList]);

    setForm({
      productName: "",
      quantity: "",
      requirements: "",
      attachment: null,
    });
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-4">
        <Factory size={34} />
        Sourcing & RFQ Management
      </h1>
      <p className="text-gray-600 mb-6">
        Create RFQs, share with suppliers and track your sourcing requirements.
      </p>

      {/* RFQ Form */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border max-w-3xl">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <PlusCircle /> Create New RFQ
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="font-medium">Product Name</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.productName}
              onChange={(e) =>
                setForm({ ...form, productName: e.target.value })
              }
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="font-medium">Quantity Required</label>
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: e.target.value })
              }
              required
            />
          </div>

          {/* Requirement Details */}
          <div>
            <label className="font-medium">Requirement Details</label>
            <textarea
              rows="3"
              className="w-full mt-1 p-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.requirements}
              onChange={(e) =>
                setForm({ ...form, requirements: e.target.value })
              }
              required
            ></textarea>
          </div>

          {/* Attachment */}
          <div>
            <label className="font-medium">Attachment (Optional)</label>
            <label className="mt-1 flex items-center gap-2 p-2 border rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200">
              <FileUp />
              <span>
                {form.attachment ? form.attachment.name : "Upload File"}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  setForm({ ...form, attachment: e.target.files[0] })
                }
              />
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded-xl mt-2 font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Send /> Submit RFQ
          </button>
        </form>
      </div>

      {/* RFQ List */}
      <h2 className="text-2xl font-semibold mt-10 mb-4 flex items-center gap-2">
        <Boxes size={28} /> Recent RFQs
      </h2>

      {rfqList.length === 0 ? (
        <p className="text-gray-600">No RFQs created yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {rfqList.map((rfq) => (
            <div
              key={rfq.id}
              className="bg-white p-5 rounded-2xl border shadow"
            >
              <h3 className="text-lg font-bold">{rfq.productName}</h3>

              <p className="text-gray-600 mt-1">
                <strong>Quantity:</strong> {rfq.quantity}
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Requirements:</strong> {rfq.requirements}
              </p>

              {rfq.attachment && (
                <p className="text-blue-600 mt-2 underline cursor-pointer">
                  📎 {rfq.attachment.name}
                </p>
              )}

              <p className="mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    rfq.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {rfq.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
