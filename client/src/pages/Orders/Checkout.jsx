import { useState } from "react";

const Checkout = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    payment: "COD",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order Placed Successfully!");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>
      <form className="bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          className="w-full p-2 border mb-2"
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          className="w-full p-2 border mb-2"
          onChange={handleChange}
          required
        />
        <input
          name="city"
          placeholder="City"
          className="w-full p-2 border mb-2"
          onChange={handleChange}
          required
        />
        <input
          name="zip"
          placeholder="ZIP Code"
          className="w-full p-2 border mb-2"
          onChange={handleChange}
          required
        />
        <select
          name="payment"
          className="w-full p-2 border mb-2"
          onChange={handleChange}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="Card">Credit/Debit Card</option>
        </select>

        <button className="bg-black text-white w-full p-2 mt-2">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
