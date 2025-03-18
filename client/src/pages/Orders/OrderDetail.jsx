
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const { id } = useParams();

  const order = {
    id,
    date: "2024-05-12",
    total: "$120",
    status: "Delivered",
    items: [
      { name: "Face Cream", qty: 1, price: "$40" },
      { name: "Serum", qty: 2, price: "$80" },
    ],
    shippingAddress: "123 Street, New York, USA",
    paymentMethod: "Credit Card",
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Order #{order.id}</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg mb-2">Date: {order.date}</p>
        <p className="text-lg mb-2">Total: {order.total}</p>
        <p className="text-lg mb-2">Status: {order.status}</p>

        <h3 className="font-bold mt-4">Items:</h3>
        {order.items.map((item, index) => (
          <p key={index}>
            {item.name} - {item.qty} x {item.price}
          </p>
        ))}

        <h3 className="font-bold mt-4">Shipping Address:</h3>
        <p>{order.shippingAddress}</p>

        <h3 className="font-bold mt-4">Payment Method:</h3>
        <p>{order.paymentMethod}</p>
      </div>
    </div>
  );
};

export default OrderDetail;
