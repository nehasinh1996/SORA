
import { Link } from "react-router-dom";

const Orders = () => {
  const orders = [
    { id: "12345", date: "2024-05-12", total: "$120", status: "Delivered" },
    { id: "67890", date: "2024-05-10", total: "$85", status: "Shipped" },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-4 border-b flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold">Order #{order.id}</p>
              <p className="text-gray-600">Date: {order.date}</p>
              <p className="text-gray-600">Total: {order.total}</p>
            </div>
            <div>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md">
                {order.status}
              </span>
              <Link
                to={`/order-detail/${order.id}`}
                className="ml-4 text-blue-500 underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
